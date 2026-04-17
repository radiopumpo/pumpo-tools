// ============================================================
// SMC-DATA.JS — Smart Money Concepts Knowledge Base
// Pumpo Tools — SMC Suite POC
// ============================================================

const SMC_DATA = {

  // ── SESSIONS & KILLZONES ──────────────────────────────────
  sessions: {
    asian: {
      name: 'Asian Session (Tokyo)',
      utc: '18:00 – 03:00 NY',
      ny_time: '18:00 – 03:00 NY',
      london_time: '23:00 – 08:00 London',
      role: 'Range formation. Sets the liquidity pools that London and NY will target. 18:00–03:00 NY time.',
      characteristics: [
        'Low volatility, tight consolidation',
        'Asian High and Asian Low become key liquidity targets',
        'Price often coils inside a defined range',
        'Avoid trading — wait for the range to be established',
      ],
      killzone: false,
      probability: 'Low — range formation only',
      color: '#4a9eff',
    },
    london: {
      name: 'London Session',
      utc: '07:00 – 16:00 UTC',
      ny_time: '02:00 – 11:00 NY',
      london_time: '07:00 – 16:00 London',
      role: 'Primary trend initiator. Often raids Asian liquidity before setting the day\'s direction.',
      killzone: { start_ny: '02:00', end_ny: '05:00', label: 'London Killzone' },
      silver_bullet: { start_ny: '03:00', end_ny: '04:00', label: 'London Silver Bullet' },
      characteristics: [
        'Opens with expansion — often takes Asian high or low first',
        'London killzone 02:00–05:00 NY: highest probability reversal window',
        'Silver bullet 03:00–04:00 NY: 1-hour window for precision FVG entries',
        'If London is bearish, expect NY to continue or reverse — read the context',
        'Weekly high or low often forms in London on Monday or Tuesday',
      ],
      probability: 'High — primary session for setups',
      color: '#40e0d0',
    },
    newyork_am: {
      name: 'New York AM Session',
      utc: '13:30 – 17:00 UTC',
      ny_time: '07:00 – 10:00 NY',
      role: 'Highest volume session. Confirms or reverses London direction. NYSE open at 09:30 is critical.',
      killzone: { start_ny: '07:00', end_ny: '10:00', label: 'NY AM Killzone' },
      silver_bullet: { start_ny: '10:00', end_ny: '11:00', label: 'NY AM Silver Bullet' },
      characteristics: [
        'NY AM killzone 07:00–10:00: most active, highest probability',
        '09:30 NYSE open: institutional order flow begins — watch for FVG fills',
        'Silver bullet 10:00–11:00: 1-hour window after open volatility settles',
        'Often takes out London session high or low for liquidity before continuing',
        'If in line with weekly bias: high confidence continuation setups',
      ],
      probability: 'Highest — primary execution window',
      color: '#ff0080',
    },
    newyork_lunch: {
      name: 'New York Lunch',
      utc: '17:00 – 18:30 UTC',
      ny_time: '12:00 – 13:00 NY',
      role: 'Dead zone. Institutional participation drops. Choppy, unreliable price action.',
      killzone: false,
      characteristics: [
        'Avoid all entries',
        'Price often ranges or reverses moves made in AM session',
        'Low volume creates false signals',
        'Use this time to review the day and plan PM entries',
      ],
      probability: 'Very low — avoid',
      color: '#ffaa00',
    },
    newyork_pm: {
      name: 'New York PM Session',
      utc: '18:30 – 21:00 UTC',
      ny_time: '13:30 – 16:00 NY',
      role: 'Secondary execution window. Often continues the AM session direction.',
      killzone: { start_ny: '13:30', end_ny: '16:00', label: 'NY PM Window' },
      silver_bullet: { start_ny: '14:00', end_ny: '15:00', label: 'NY PM Silver Bullet' },
      characteristics: [
        'Silver bullet 14:00–15:00: 1-hour FVG entry window',
        'Continuation of AM session bias most common',
        'Lower volume than AM — tighter stops required',
        'Bond market closes at 15:00 — watch for volatility shift',
        'NY close 17:00: forex day closes, gaps possible on reopen',
      ],
      probability: 'Moderate — secondary window',
      color: '#9b59ff',
    },
  },

  // ── WEEKLY BIAS PROBABILITIES ─────────────────────────────
  weekly_bias: {
    bearish: {
      weekly_high_monday: 0.40,
      weekly_high_tuesday: 0.40,
      combined_mon_tue: 0.80,
      description: 'In a bearish week, 80% of the time the weekly high forms Monday or Tuesday. If it\'s Wednesday and the high hasn\'t been set, probability shifts.',
    },
    bullish: {
      weekly_low_monday: 0.40,
      weekly_low_tuesday: 0.40,
      combined_mon_tue: 0.80,
      description: 'In a bullish week, 80% of the time the weekly low forms Monday or Tuesday.',
    },
    note: 'Sunday candle (crypto/forex) or Monday open (equities) sets the reference. New week opens are significant liquidity magnets.',
  },

  // ── REFERENCE LEVELS ─────────────────────────────────────
  reference_levels: {
    nwо: { name: 'New Week Open (NWO)', description: 'Price level where the new week opens. Acts as a magnet — price frequently returns to this level.', timeframe: 'Weekly' },
    nmo: { name: 'New Month Open (NMO)', description: 'Opening price of the new month. Significant institutional reference level. Major premium/discount anchor.', timeframe: 'Monthly' },
    nqo: { name: 'New Quarter Open (NQO)', description: 'Opening price of the new quarter (Jan, Apr, Jul, Oct). Highest timeframe reference. Quarterly shifts often mark major reversals.', timeframe: 'Quarterly' },
    midnight_open: { name: 'Midnight Open', description: '00:00 NY time price level. Daily reference. Defines premium (above) and discount (below) for the day.', timeframe: 'Daily' },
    asia_high: { name: 'Asian High', description: 'Highest point of the Asian session range. Buy-side liquidity above. London/NY often targets this first.', timeframe: 'Daily' },
    asia_low: { name: 'Asian Low', description: 'Lowest point of the Asian session range. Sell-side liquidity below. London/NY often targets this first.', timeframe: 'Daily' },
  },

  // ── CORE CONCEPTS ─────────────────────────────────────────
  concepts: [

    // ─ MODULE 1: MARKET STRUCTURE ─
    {
      id: 'market_structure',
      name: 'Market Structure',
      category: 'Foundation',
      icon: '📊',
      status: 'built',
      description: 'The backbone of all SMC analysis. Price moves in structured sequences of highs and lows. Reading structure correctly defines the bias for every trade.',
      rules: [
        'Bullish structure: series of Higher Highs (HH) and Higher Lows (HL)',
        'Bearish structure: series of Lower Highs (LH) and Lower Lows (LL)',
        'Break of Structure (BOS): price closes beyond a significant swing point in the direction of the existing trend — continuation signal',
        'Market Structure Shift (MSS): first break against the trend — potential reversal signal',
        'Inducement: a minor swing point that appears to be a BOS but is designed to trap traders before the real move',
        'Always read structure top-down: monthly → weekly → daily → 4H → 1H → 15M',
        'The higher the timeframe structure, the more weight it carries',
        'Internal structure (lower timeframes) must align with external structure (higher timeframes) for A+ setups',
      ],
      visual_type: 'annotated_chart',
      key_levels: ['swing_high', 'swing_low', 'BOS_level', 'MSS_level'],
      related: ['liquidity', 'order_blocks', 'top_down'],
    },

    // ─ MODULE 2: LIQUIDITY ─
    {
      id: 'liquidity',
      name: 'Liquidity',
      category: 'Foundation',
      icon: '💧',
      status: 'built',
      description: 'Price is engineered to seek liquidity — the pools of stop-loss orders placed by retail traders. Understanding where liquidity sits is understanding where price is going.',
      rules: [
        'Buy-side liquidity (BSL) sits above swing highs, equal highs, and trendline highs — these are sell-stop orders',
        'Sell-side liquidity (SSL) sits below swing lows, equal lows, and trendline lows — these are buy-stop orders',
        'Equal highs and equal lows are the most obvious liquidity pools — they attract price like magnets',
        'Trendline liquidity: retail traders place stops just beyond trendlines — price hunts these before reversing',
        'After taking liquidity, price needs a reason to reverse — look for OB or FVG at the raid point',
        'Relative equal highs/lows (within 5-10 pips of each other) are high-probability targets',
        'The bigger the liquidity pool (more stops), the more likely price is engineered to reach it',
        'A liquidity grab without a structural shift is just a wick — wait for MSS confirmation',
      ],
      visual_type: 'annotated_chart',
      key_levels: ['equal_highs', 'equal_lows', 'swing_high_bsl', 'swing_low_ssl'],
      related: ['market_structure', 'order_blocks', 'fvg'],
    },

    // ─ MODULE 3: FAIR VALUE GAPS ─
    {
      id: 'fvg',
      name: 'Fair Value Gaps (FVG)',
      category: 'Entry Arrays',
      icon: '⚡',
      status: 'built',
      description: 'A three-candle pattern where the wicks of candle 1 and candle 3 do not overlap, creating an imbalance in price delivery. Institutions return price to fill these gaps.',
      rules: [
        'Bullish FVG: gap between high of candle 1 and low of candle 3 (candle 2 is the impulse up)',
        'Bearish FVG: gap between low of candle 1 and high of candle 3 (candle 2 is the impulse down)',
        'Price can react from the FVG edge (aggressive), the 50% midpoint (standard), or after full fill (conservative). If price closes entirely through without reacting, the setup is void.',
        'FVG in line with higher timeframe bias = high probability entry',
        'Inversed FVG: once fully filled, the FVG flips to resistance (bullish FVG becomes bearish after fill)',
        'Not all FVGs are equal — FVGs on higher timeframes carry more weight',
        'FVG + Order Block confluence = A+ entry',
        'If price aggressively pushes through an FVG without filling, the FVG becomes a strong magnet for the next return',
        'Volume imbalance: high-volume candles create FVGs that are more likely to be respected',
      ],
      visual_type: 'annotated_chart',
      related: ['order_blocks', 'liquidity', 'ote'],
    },

    // ─ MODULE 4: ORDER BLOCKS ─
    {
      id: 'order_blocks',
      name: 'Order Blocks',
      category: 'Entry Arrays',
      icon: '🧱',
      status: 'built',
      description: 'The last opposing candle before an impulsive move. Represents where institutional orders were placed. Price returns to these zones to fill remaining orders.',
      rules: [
        'Bullish OB: the last bearish (down) candle before a strong bullish impulse that breaks structure',
        'Bearish OB: the last bullish (up) candle before a strong bearish impulse that breaks structure',
        'The body of the OB defines the zone — wicks are less important',
        'Refine the OB to the 50% level (midpoint of the candle body) for precision entries',
        'OB validity: the impulse away from the OB must break at least one structural level',
        'Breaker block: a former OB that has been violated becomes a breaker — flips from support to resistance',
        'Mitigation block: price returns to an OB that previously failed to hold and "mitigates" the remaining orders',
        'OB + FVG overlap = highest probability entry zone',
        'OB in a killzone = time + price confluence = A+ setup',
        'An OB is invalidated when price closes through the entire body (not just a wick through)',
      ],
      visual_type: 'annotated_chart',
      related: ['fvg', 'liquidity', 'market_structure', 'ote'],
    },

    // ─ MODULE 5: SESSIONS & KILLZONES ─
    {
      id: 'sessions_killzones',
      name: 'Sessions & Killzones',
      category: 'Time',
      icon: '🕐',
      status: 'built',
      description: 'Price is not random — it follows a time-based delivery algorithm. Knowing when institutional activity peaks transforms pattern recognition into probabilistic trading.',
      rules: [
        'Asian session (18:00–03:00 NY): range formation, do not trade — wait for the range',
        'London killzone (02:00–05:00 NY): primary reversal or continuation window',
        'London silver bullet (03:00–04:00 NY): 1-hour precision window for FVG entries',
        'NY AM killzone (07:00–10:00 NY): highest volume, highest probability',
        'NYSE open 09:30 NY: watch for institutional order flow to fill FVGs',
        'NY AM silver bullet (10:00–11:00 NY): post-open precision window',
        'NY lunch (12:00–13:00 NY): avoid — choppy, unreliable',
        'NY PM silver bullet (14:00–15:00 NY): secondary continuation window',
        'Weekly high/low: 80% probability formed Monday or Tuesday',
        'New Week Open (NWO), New Month Open (NMO), New Quarter Open (NQO) are major reference levels',
        'Time without a valid price array = no trade, regardless of setup quality',
        'Price array without a valid time window = wait for the window before entering',
      ],
      visual_type: 'session_clock',
      related: ['market_structure', 'liquidity', 'top_down'],
    },

    // ─ MODULE 6: TOP-DOWN ANALYSIS ─
    {
      id: 'top_down',
      name: 'Top-Down Analysis',
      category: 'Protocol',
      icon: '🔭',
      status: 'built',
      description: 'The systematic process of reading market context from the highest timeframe down to the entry timeframe. Every trade must be justified by alignment across multiple timeframes.',
      rules: [
        'Start monthly: what is the overall structure? Where is the liquidity target?',
        'Weekly: is price in premium or discount relative to monthly range? What is the weekly bias?',
        'Daily: where are the daily order blocks and FVGs? What session created them?',
        '4H: refine the daily array. Where is the 4H structure? Is there a 4H MSS in line with bias?',
        '1H: identify the entry array. OB or FVG that aligns with higher timeframe bias.',
        '15M: the trigger timeframe. Look for MSS on 15M after liquidity grab for entry confirmation.',
        '5M/1M (optional): precise entry. Refine the OTE within the 15M array.',
        'Never trade against the monthly or weekly structure — even if the daily setup looks perfect',
        'The entry timeframe is where you pull the trigger — not where you form the bias',
        'Confluence = same array visible and valid on multiple timeframes',
      ],
      visual_type: 'timeframe_cascade',
      related: ['market_structure', 'sessions_killzones', 'order_blocks'],
    },

    // ─ PLACEHOLDER MODULES ─
    { id: 'premium_discount', name: 'Premium & Discount', category: 'Foundation', icon: '⚖️', status: 'placeholder', description: 'Buy in discount (below 50% of range), sell in premium (above 50%). The equilibrium filter for all entries.' },
    { id: 'ote', name: 'Optimal Trade Entry (OTE)', category: 'Entry Arrays', icon: '🎯', status: 'placeholder', description: 'The 0.618–0.786 Fibonacci retracement zone. When aligned with an OB or FVG, this is the highest-precision entry model.' },
    { id: 'rejection_blocks', name: 'Rejection Blocks', category: 'Entry Arrays', icon: '↩️', status: 'placeholder', description: 'Refined entry within an OB, using the wick sequence to identify the exact rejection zone.' },
    { id: 'mitigation_blocks', name: 'Mitigation Blocks', category: 'Entry Arrays', icon: '🔄', status: 'placeholder', description: 'Where a failed move is mitigated. Price returns to clear remaining orders before continuing.' },
    { id: 'breaker_blocks', name: 'Breaker Blocks', category: 'Entry Arrays', icon: '🔀', status: 'placeholder', description: 'A violated order block that flips from support to resistance (or vice versa).' },
    { id: 'propulsion_blocks', name: 'Propulsion Blocks', category: 'Entry Arrays', icon: '🚀', status: 'placeholder', description: 'The consolidation base before an explosive move. High-probability continuation entry.' },
    { id: 'void_vacuum', name: 'Void / Vacuum', category: 'Price Delivery', icon: '🌀', status: 'placeholder', description: 'Thin price areas with little trading history. Price moves through these rapidly — avoid entries inside voids.' },
    { id: 'rbd_dbr', name: 'RBD / DBR / RBR / DBD', category: 'Price Delivery', icon: '📐', status: 'placeholder', description: 'Rally-Base-Drop, Drop-Base-Rally, Rally-Base-Rally, Drop-Base-Drop. The four supply/demand formation patterns.' },
    { id: 'inducement', name: 'Inducement', category: 'Liquidity', icon: '🪤', status: 'placeholder', description: 'A minor structural point designed to trap traders into a false break before the real move occurs.' },
    { id: 'quarterly_theory', name: 'Quarterly Theory (IPDA)', category: 'Time', icon: '📅', status: 'placeholder', description: 'Interbank Price Delivery Algorithm. Price moves in 3-month cycles: accumulation, manipulation, distribution.' },
  ],

  // ── INSTRUMENTS ───────────────────────────────────────────
  instruments: [
    { symbol: 'FX:EURUSD',  label: 'EUR/USD',  type: 'Forex',   icon: '💶' },
    { symbol: 'FX:GBPUSD',  label: 'GBP/USD',  type: 'Forex',   icon: '💷' },
    { symbol: 'FX:USDJPY',  label: 'USD/JPY',  type: 'Forex',   icon: '💴' },
    { symbol: 'FX:AUDUSD',  label: 'AUD/USD',  type: 'Forex',   icon: '🦘' },
    { symbol: 'FX:GBPJPY',  label: 'GBP/JPY',  type: 'Forex',   icon: '💱' },
    { symbol: 'CAPITALCOM:US500',  label: 'S&P 500', type: 'Index', icon: '🇺🇸' },
    { symbol: 'CAPITALCOM:US100',  label: 'NAS 100', type: 'Index', icon: '💻' },
    { symbol: 'CAPITALCOM:US30',   label: 'DOW 30',  type: 'Index', icon: '🏭' },
    { symbol: 'TVC:GOLD',    label: 'Gold',     type: 'Commodity', icon: '🥇' },
    { symbol: 'TVC:USOIL',  label: 'Crude Oil', type: 'Commodity', icon: '🛢️' },
    { symbol: 'BINANCE:BTCUSDT', label: 'BTC/USD', type: 'Crypto', icon: '₿' },
    { symbol: 'BINANCE:ETHUSDT', label: 'ETH/USD', type: 'Crypto', icon: '⟠' },
  ],

  // ── DECISION ENGINE WEIGHTS ───────────────────────────────
  engine_weights: {
    htf_bias:       { max: 20, label: 'HTF Bias Aligned' },
    killzone:       { max: 15, label: 'Killzone Active' },
    liquidity_raid: { max: 20, label: 'Liquidity Grab Confirmed' },
    mss:          { max: 15, label: 'MSS Confirmed' },
    entry_array:    { max: 15, label: 'Entry Array (OB/FVG)' },
    risk_valid:     { max: 10, label: 'Risk:Reward Valid' },
    target_clear:   { max: 5,  label: 'Target Identified' },
  },

  score_tiers: [
    { min: 85, max: 100, label: 'A+ Setup',    action: 'Execute at full size',    color: '#40b870' },
    { min: 70, max: 84,  label: 'A Setup',     action: 'Execute at reduced size', color: '#9b59ff' },
    { min: 50, max: 69,  label: 'B Setup',     action: 'Paper trade only',        color: '#ffaa00' },
    { min: 0,  max: 49,  label: 'No Trade',    action: 'Stand aside',             color: '#e05050' },
  ],
};
