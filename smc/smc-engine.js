// ============================================================
// SMC-ENGINE.JS — Decision Engine Logic
// Pumpo Tools — SMC Suite POC
// ============================================================

const SMCEngine = {

  // ── CURRENT STATE ─────────────────────────────────────────
  state: {
    // Gate inputs (set by user via Decision Engine UI)
    monthly_structure: null,     // 'bullish' | 'bearish' | 'ranging'
    weekly_structure: null,
    weekly_position: null,       // 'premium' | 'discount' | 'equilibrium'
    weekly_target: null,         // 'buyside' | 'sellside'
    weekly_day: null,            // 'monday'|'tuesday'|'wednesday'|'thursday'|'friday'
    weekly_high_set: null,       // true | false (has the weekly high/low been formed yet)
    session: null,               // 'asian'|'london'|'newyork_am'|'lunch'|'newyork_pm'
    in_killzone: null,           // true | false
    silver_bullet: null,         // true | false
    liquidity_raided: null,      // true | false
    raid_direction: null,        // 'buyside'|'sellside' (which liquidity was taken)
    choch_confirmed: null,       // true | false
    choch_direction: null,       // 'bullish'|'bearish'
    has_ob: null,                // true | false
    has_fvg: null,               // true | false
    at_ote: null,                // true | false (price at 0.618-0.786 retracement)
    rr_ratio: null,              // number (e.g. 2.5)
    target_identified: null,     // true | false
  },

  // ── GATE EVALUATION ──────────────────────────────────────
  evaluateGates() {
    const s = this.state;
    const results = {};

    // Gate 1 — HTF Bias (20pts)
    const bias_aligned =
      s.monthly_structure && s.weekly_structure &&
      s.monthly_structure !== 'ranging' &&
      s.weekly_structure !== 'ranging' &&
      s.monthly_structure === s.weekly_structure;
    results.htf_bias = {
      score: bias_aligned ? 20 : (s.monthly_structure && s.weekly_structure ? 8 : 0),
      pass: bias_aligned,
      label: SMC_DATA.engine_weights.htf_bias.label,
      max: 20,
      detail: bias_aligned
        ? `${s.monthly_structure?.toUpperCase()} bias confirmed on both monthly and weekly`
        : s.monthly_structure !== s.weekly_structure && s.monthly_structure && s.weekly_structure
          ? 'Monthly and weekly structure conflict — reduced confidence'
          : 'Incomplete bias assessment',
    };

    // Gate 2 — Session / Killzone (15pts)
    const session_score = s.silver_bullet ? 15 : s.in_killzone ? 12 : s.session === 'lunch' ? 0 : s.session === 'asian' ? 2 : 6;
    results.killzone = {
      score: session_score,
      pass: session_score >= 12,
      label: SMC_DATA.engine_weights.killzone.label,
      max: 15,
      detail: s.silver_bullet ? 'Silver bullet window — highest precision'
        : s.in_killzone ? 'Inside killzone — high probability window'
        : s.session === 'lunch' ? 'NY Lunch — avoid all entries'
        : s.session === 'asian' ? 'Asian session — range forming, not a trade window'
        : 'Outside killzone — reduced probability',
    };

    // Gate 3 — Liquidity Raid (20pts)
    const raid_aligned = s.liquidity_raided &&
      ((s.raid_direction === 'sellside' && s.weekly_structure === 'bullish') ||
       (s.raid_direction === 'buyside' && s.weekly_structure === 'bearish'));
    results.liquidity_raid = {
      score: raid_aligned ? 20 : s.liquidity_raided ? 10 : 0,
      pass: raid_aligned,
      label: SMC_DATA.engine_weights.liquidity_raid.label,
      max: 20,
      detail: raid_aligned ? `${s.raid_direction?.toUpperCase()} liquidity raided — aligned with ${s.weekly_structure} bias`
        : s.liquidity_raided ? 'Liquidity raided but direction conflicts with HTF bias'
        : 'No liquidity raid confirmed — wait for sweep before entry',
    };

    // Gate 4 — ChoCH (15pts)
    const choch_aligned = s.choch_confirmed &&
      ((s.choch_direction === 'bullish' && s.weekly_structure === 'bullish') ||
       (s.choch_direction === 'bearish' && s.weekly_structure === 'bearish'));
    results.choch = {
      score: choch_aligned ? 15 : s.choch_confirmed ? 5 : 0,
      pass: choch_aligned,
      label: SMC_DATA.engine_weights.choch.label,
      max: 15,
      detail: choch_aligned
        ? `${s.choch_direction?.toUpperCase()} ChoCH confirmed — structural shift in line with bias`
        : s.choch_confirmed ? 'ChoCH confirmed but opposes HTF bias — caution'
        : 'No ChoCH yet — do not enter without structural confirmation',
    };

    // Gate 5 — Entry Array (15pts)
    const array_score = (s.has_ob && s.has_fvg && s.at_ote) ? 15
      : (s.has_ob && s.has_fvg) ? 12
      : (s.has_ob || s.has_fvg) && s.at_ote ? 10
      : s.has_ob || s.has_fvg ? 7 : 0;
    const array_quality = array_score >= 15 ? 'A+' : array_score >= 12 ? 'A' : array_score >= 7 ? 'B' : 'None';
    results.entry_array = {
      score: array_score,
      pass: array_score >= 7,
      label: SMC_DATA.engine_weights.entry_array.label,
      max: 15,
      quality: array_quality,
      detail: array_quality === 'A+' ? 'OB + FVG + OTE confluence — maximum precision'
        : array_quality === 'A' ? 'OB + FVG — strong entry array'
        : array_quality === 'B' ? 'Single array present — proceed with caution'
        : 'No valid entry array identified — do not enter',
    };

    // Gate 6 — Risk Parameters (10pts)
    const rr = parseFloat(s.rr_ratio) || 0;
    const rr_score = rr >= 3 ? 10 : rr >= 2 ? 8 : rr >= 1.5 ? 4 : 0;
    results.risk_valid = {
      score: rr_score,
      pass: rr >= 2,
      label: SMC_DATA.engine_weights.risk_valid.label,
      max: 10,
      detail: rr >= 3 ? `${rr}:1 R:R — excellent`
        : rr >= 2 ? `${rr}:1 R:R — acceptable (minimum met)`
        : rr > 0 ? `${rr}:1 R:R — below minimum 2:1 requirement`
        : 'R:R not calculated',
    };

    // Gate 7 — Target (5pts)
    results.target_clear = {
      score: s.target_identified ? 5 : 0,
      pass: s.target_identified === true,
      label: SMC_DATA.engine_weights.target_clear.label,
      max: 5,
      detail: s.target_identified ? 'Clear liquidity target identified'
        : 'No clear target — define a liquidity pool as the objective',
    };

    // ── WEEKLY BIAS WARNING ───────────────────────────────
    let weekly_warning = null;
    if (s.weekly_day && s.weekly_high_set !== null) {
      const bias = s.weekly_structure;
      const day = s.weekly_day;
      const highSet = s.weekly_high_set;
      if (bias === 'bearish' && !highSet && (day === 'wednesday' || day === 'thursday' || day === 'friday')) {
        weekly_warning = 'Weekly high not yet set — probability decreasing as week progresses for bearish bias';
      } else if (bias === 'bullish' && !highSet && (day === 'wednesday' || day === 'thursday' || day === 'friday')) {
        weekly_warning = 'Weekly low not yet set — probability decreasing as week progresses for bullish bias';
      } else if (bias === 'bearish' && !highSet && (day === 'monday' || day === 'tuesday')) {
        weekly_warning = 'High probability zone — weekly high likely forming now (Monday/Tuesday bearish bias)';
      }
    }

    // ── TOTAL SCORE ───────────────────────────────────────
    const total = Object.values(results).reduce((sum, g) => sum + g.score, 0);
    const tier = SMC_DATA.score_tiers.find(t => total >= t.min && total <= t.max) || SMC_DATA.score_tiers[3];

    // ── BIAS DIRECTION ────────────────────────────────────
    const direction = choch_aligned
      ? (s.choch_direction === 'bullish' ? 'LONG' : 'SHORT')
      : bias_aligned
        ? (s.weekly_structure === 'bullish' ? 'LONG BIAS' : 'SHORT BIAS')
        : 'NEUTRAL';

    return { gates: results, total, tier, direction, weekly_warning };
  },

  // ── RESET ─────────────────────────────────────────────────
  reset() {
    Object.keys(this.state).forEach(k => { this.state[k] = null; });
  },

  // ── SET FIELD ─────────────────────────────────────────────
  set(field, value) {
    this.state[field] = value;
  },
};
