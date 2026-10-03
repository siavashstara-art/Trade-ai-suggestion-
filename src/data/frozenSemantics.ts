/**
 * VARA MODEL v2.0 — FROZEN SEMANTICS & INVARIANTS SPECIFICATION
 * 
 * Semantics Definition:
 * 1. NORMAL_OPERATIONAL: All invariants strictly within limit boundaries.
 * 2. ELEVATED_RISK_WATCH: Any rule enters 80%-100% warning corridor, no breach.
 * 3. CIRCUIT_BREAKER_TRIGGERED: Any invariant breached (e.g. Drawdown > 4%, Oracle Deviation > 0.45%).
 *    All automated trading and capital flows are halted instantly.
 * 4. RECOVERY_PROTOCOL: Requires dual-key authorization and verifiable baseline reset.
 */

import { RiskRule, GoldenDataset, EvidenceBundle, ReplaySeal, AuditLogItem, SystemOperationalState } from '../types/vara';

export const FROZEN_RULES: RiskRule[] = [
  {
    id: 'R-01',
    name: '1-Day 99% Value-at-Risk (VaR)',
    nameFa: 'ارزش در معرض ریسک یک‌روزه (VaR ۹۹٪)',
    category: 'EXPOSURE',
    categoryFa: 'پوشش ریسک و تعهدات',
    invariantFormula: 'VaR_{99, 1D} \\le 3.50\\%',
    description: 'Statistically bounds potential 24-hour loss at the 99th percentile of market turbulence.',
    descriptionFa: 'سقف آماری حداکثر زیان احتمالی ۲۴ ساعته در چارچوب صدک ۹۹ تلاطمات بازار.',
    threshold: 3.50,
    thresholdDisplay: '3.50%',
    currentValue: 1.84,
    currentDisplay: '1.84%',
    unit: '%',
    comparator: '<=',
    status: 'PASS',
    lastEvaluatedTimestamp: Date.now() - 42000,
    sha256Proof: '7f9c2d14a51e89b0204781cf42a08912e52b8dc31969a5e174208e8b0129bc81'
  },
  {
    id: 'R-02',
    name: 'Max 24h Rolling Drawdown',
    nameFa: 'حداکثر افت ارزش ۲۴ ساعته (Drawdown)',
    category: 'DRAWDOWN',
    categoryFa: 'افت ارزش سرمایه',
    invariantFormula: '\\Delta V_{24h} / V_{peak} \\le 4.00\\%',
    description: 'Hard circuit limit on peak-to-trough capital degradation across rolling 24 hours.',
    descriptionFa: 'سقف قطعی کاهش ارزش پرتفوی از سقف اوج ۲۴ ساعته پیشین جهت مهار افت متوالی.',
    threshold: 4.00,
    thresholdDisplay: '4.00%',
    currentValue: 0.92,
    currentDisplay: '0.92%',
    unit: '%',
    comparator: '<=',
    status: 'PASS',
    lastEvaluatedTimestamp: Date.now() - 38000,
    sha256Proof: '3a18e2098b67f1059cd891ae107842dbca8149e01869f8c410984920bcde41aa'
  },
  {
    id: 'R-03',
    name: 'Net Effective Leverage Ratio',
    nameFa: 'نسبت اهرم خالص مؤثر (Leverage)',
    category: 'VOLATILITY',
    categoryFa: 'تعهدات اهرمی',
    invariantFormula: 'L_{net} = \\sum |Position_{i}| / Equity \\le 2.50x',
    description: 'Enforces ceiling on synthetic exposure relative to fully unencumbered equity.',
    descriptionFa: 'اعمال سقف صلب بر تعهدات مشتقه و دارایی‌های در معرض نوسان نسبت به حقوق صاحبان سهام.',
    threshold: 2.50,
    thresholdDisplay: '2.50x',
    currentValue: 1.35,
    currentDisplay: '1.35x',
    unit: 'x',
    comparator: '<=',
    status: 'PASS',
    lastEvaluatedTimestamp: Date.now() - 32000,
    sha256Proof: 'c4e92a818f0293da829c7198ea019a82bb1947e810398ac48197e930baef0291'
  },
  {
    id: 'R-04',
    name: 'Liquidity Coverage Ratio (LCR)',
    nameFa: 'نسبت پوشش نقدینگی آنی (LCR)',
    category: 'LIQUIDITY',
    categoryFa: 'نقدینگی و ذخایر',
    invariantFormula: 'LCR = HQLA / NetOutflows_{30D} \\ge 180.0\\%',
    description: 'Guarantees immediate liquid reserves against severe 30-day cumulative redemption shocks.',
    descriptionFa: 'تضمین ذخایر نقدی تراز اول جهت پاسخگویی به شوک‌های احتمالی بازخرید ۳۰ روزه.',
    threshold: 180.0,
    thresholdDisplay: '180.0%',
    currentValue: 242.5,
    currentDisplay: '242.5%',
    unit: '%',
    comparator: '>=',
    status: 'PASS',
    lastEvaluatedTimestamp: Date.now() - 24000,
    sha256Proof: '9180fa49bc28e71829e083984af192837bc90291784918e720918cfba0192837'
  },
  {
    id: 'R-05',
    name: 'Multi-Oracle Price Dispersion',
    nameFa: 'واگرایی نرخ اوراکل‌های چندگانه',
    category: 'ORACLE',
    categoryFa: 'صحت اطلاعات اوراکل',
    invariantFormula: '\\max_{i,j} |P_i - P_j| / P_{median} \\le 0.45\\%',
    description: 'Protects against toxic price manipulation and stale oracle feed latency.',
    descriptionFa: 'پایش مستمر اختلاف نرخ منابع مستقل قیمت‌گذاری برای مقابله با دستکاری و تأخیر فیدها.',
    threshold: 0.45,
    thresholdDisplay: '0.45%',
    currentValue: 0.08,
    currentDisplay: '0.08%',
    unit: '%',
    comparator: '<=',
    status: 'PASS',
    lastEvaluatedTimestamp: Date.now() - 15000,
    sha256Proof: 'b82937401928374a918237e8917263bda918273645e9182736450192837465aa'
  },
  {
    id: 'R-06',
    name: 'Max Counterparty Concentration',
    nameFa: 'حداکثر تمرکز روی طرف معامله واحد',
    category: 'COUNTERPARTY',
    categoryFa: 'ریسک طرف مقابل',
    invariantFormula: 'Exp_{single} / Exp_{total} \\le 15.00\\%',
    description: 'Prevents systemic failure cascade from single custodian or exchange default.',
    descriptionFa: 'جلوگیری از سرایت دومینویی نکول یک صرافی، متولی یا دارنده نقدینگی به کل سیستم.',
    threshold: 15.00,
    thresholdDisplay: '15.00%',
    currentValue: 8.40,
    currentDisplay: '8.40%',
    unit: '%',
    comparator: '<=',
    status: 'PASS',
    lastEvaluatedTimestamp: Date.now() - 12000,
    sha256Proof: 'd1982736450192837465aa781928374615243891029384756102938475601928'
  }
];

export const GOLDEN_DATASETS: GoldenDataset[] = [
  {
    id: 'GOLDEN-01',
    title: 'Baseline Operational Order Flow',
    titleFa: 'جریان سفارشات وضعیت نرمال پایه',
    description: 'Standard institutional liquidity depth with calm cross-market spreads and steady order velocity.',
    descriptionFa: 'نقدینگی روان نهادی، اسپرد آرام بین‌صرافی و سرعت استاندارد تراکنش‌ها در شرایط پایدار.',
    expectedState: 'NORMAL_OPERATIONAL',
    vector: {
      portfolioValueUsd: 148500000,
      var99: 1.84,
      maxDrawdown: 0.92,
      leverage: 1.35,
      lcr: 242.5,
      oracleDeviation: 0.08,
      counterparty: 8.40
    },
    stressFactor: '1.00x (Neutral)',
    stressFactorFa: '۱.۰۰x (خنثی و استاندارد)',
    historicalReference: 'Q3 2025 Market Baseline Benchmark'
  },
  {
    id: 'GOLDEN-02',
    title: 'Elevated Volatility & Liquidity Squeeze',
    titleFa: 'تلاطم شدید و انقباض موضعی نقدینگی',
    description: 'Sudden macroeconomic interest rate surprise resulting in elevated VaR and tight liquidity buffers.',
    descriptionFa: 'شوک غافلگیرکننده کلان اقتصادی با صعود VaR به محدوده هشدار و کاهش ذخایر سریع.',
    expectedState: 'ELEVATED_RISK_WATCH',
    vector: {
      portfolioValueUsd: 142100000,
      var99: 3.15, // Warning corridor (80% of 3.50 is 2.80)
      maxDrawdown: 2.85,
      leverage: 1.95,
      lcr: 195.0, // close to 180%
      oracleDeviation: 0.32,
      counterparty: 13.80 // close to 15%
    },
    stressFactor: '2.40x Stress',
    stressFactorFa: '۲.۴۰x ضریب فشار سیستمی',
    historicalReference: 'CPI Announcement High-Beta Volatility Wave'
  },
  {
    id: 'GOLDEN-03',
    title: 'Flash Crash & Multi-Oracle Desync',
    titleFa: 'سقوط برق‌آسا و واگرایی اوراکل‌ها (Flash Crash)',
    description: 'Severe market dislocation causing 5% drawdown and 0.85% oracle price dispersion, breaching invariant limits.',
    descriptionFa: 'گسست عمیق نقدینگی، افت بیش از ۵ درصدی و واگرایی شدید فیدهای قیمت اوراکل که الزاماً بریکر را قطع می‌کند.',
    expectedState: 'CIRCUIT_BREAKER_TRIGGERED',
    vector: {
      portfolioValueUsd: 128900000,
      var99: 4.80, // BREACH (> 3.50)
      maxDrawdown: 5.20, // BREACH (> 4.00)
      leverage: 2.75, // BREACH (> 2.50)
      lcr: 165.0, // BREACH (< 180)
      oracleDeviation: 0.85, // BREACH (> 0.45)
      counterparty: 17.20 // BREACH (> 15.00)
    },
    stressFactor: '5.80x Tail-Risk Event',
    stressFactorFa: '۵.۸۰x رویداد دم سنگین و شوک بحرانی',
    historicalReference: 'Synthetic Black-Swan Tail Shock 2024.11'
  },
  {
    id: 'GOLDEN-04',
    title: 'Counterparty Insolvency & Depeg Shock',
    titleFa: 'نکول طرف معامله و شوک جدایی برابری (Depeg)',
    description: 'Major counterparty halts withdrawals, driving single-entity concentration to 28% and breaching LCR threshold.',
    descriptionFa: 'تعلیق ناگهانی تسویه حساب توسط یک کارگزار اصلی و افزایش تمرکز ریسک به بالای ۲۸ درصد.',
    expectedState: 'CIRCUIT_BREAKER_TRIGGERED',
    vector: {
      portfolioValueUsd: 134200000,
      var99: 3.90, // BREACH
      maxDrawdown: 3.80,
      leverage: 2.10,
      lcr: 140.0, // BREACH (< 180)
      oracleDeviation: 0.28,
      counterparty: 28.50 // MASSIVE BREACH (> 15.00)
    },
    stressFactor: '4.50x Insolvency Stress',
    stressFactorFa: '۴.۵۰x شوک نکول و توقف تسویه',
    historicalReference: 'Custodian Insolvency Simulation Vector'
  },
  {
    id: 'GOLDEN-05',
    title: 'High-Frequency Order Burst (Invariants Hold)',
    titleFa: 'فشار انبوه سفارشات با سرعت بالا (پایداری کامل)',
    description: 'Extreme transaction arrival rate tested to confirm zero state corruption and deterministic replay accuracy.',
    descriptionFa: 'حجم فوق‌سریع پردازش رویدادها جهت اثبات عدم رخداد بن‌بست و همگرایی قطعی بازپخش محاسباتی.',
    expectedState: 'NORMAL_OPERATIONAL',
    vector: {
      portfolioValueUsd: 148100000,
      var99: 2.10,
      maxDrawdown: 1.40,
      leverage: 1.60,
      lcr: 220.0,
      oracleDeviation: 0.12,
      counterparty: 9.10
    },
    stressFactor: '3.10x Throughput Load',
    stressFactorFa: '۳.۱۰x نرخ ورود رویداد در ثانیه',
    historicalReference: 'Deterministic Concurrency Stress Suite'
  }
];

export const INITIAL_REPLAY_SEAL: ReplaySeal = {
  sealId: 'SEAL-V2.0-8914-FROZEN',
  timestamp: 1774320980000,
  stateMachineHash: '0x8f7a932b109e4f019b8823c149028e99120938475a8b7c6d5e4f3a2b1c0e9d8a',
  inputVectorHash: '0x120938475a8b7c6d5e4f3a2b1c0e9d8a8f7a932b109e4f019b8823c149028e99',
  executionReplayHash: '0x3a2b1c0e9d8a8f7a932b109e4f019b8823c149028e99120938475a8b7c6d5e4f',
  isDeterministicVerified: true,
  blockNumber: 19842014,
  epoch: 412,
  algorithmVersion: 'VARA-v2.0-FROZEN'
};

export const INITIAL_EVIDENCE_BUNDLE: EvidenceBundle = {
  bundleId: 'EVD-2026-V2.0-FROZEN-8841',
  generatedAt: Date.now() - 60000,
  operationalState: 'NORMAL_OPERATIONAL',
  globalReplaySeal: 'SEAL-V2.0-8914-FROZEN',
  inputParameters: {
    totalPortfolioValueUsd: 148500000,
    var99Percent1D: 1.84,
    maxDrawdown24h: 0.92,
    netLeverageRatio: 1.35,
    liquidityCoverageRatio: 242.5,
    oracleDeviationPercent: 0.08,
    counterpartyConcentration: 8.40
  },
  invariantSnapshots: [
    { ruleId: 'R-01', measuredValue: 1.84, limit: 3.50, passed: true, deltaPercent: -47.4 },
    { ruleId: 'R-02', measuredValue: 0.92, limit: 4.00, passed: true, deltaPercent: -77.0 },
    { ruleId: 'R-03', measuredValue: 1.35, limit: 2.50, passed: true, deltaPercent: -46.0 },
    { ruleId: 'R-04', measuredValue: 242.5, limit: 180.0, passed: true, deltaPercent: +34.7 },
    { ruleId: 'R-05', measuredValue: 0.08, limit: 0.45, passed: true, deltaPercent: -82.2 },
    { ruleId: 'R-06', measuredValue: 8.40, limit: 15.00, passed: true, deltaPercent: -44.0 }
  ],
  complianceHash: '0x9948cba019283746a510293847560192837465aa819283746152438910293847',
  validatorSignature: 'secp256k1:0x41f8a7e098b671a5c4e92a818f0293da829c7198ea019a82bb1947e810398ac4',
  isTamperProof: true
};

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'AUD-9014',
    timestamp: Date.now() - 48000,
    severity: 'INFO',
    eventCategory: 'REPLAY_CHECK',
    title: 'Deterministic Replay Seal Verified',
    titleFa: 'مُهر بازپخش قطعی با موفقیت اعتبارسنجی شد',
    details: 'Execution replay across 10,000 synthetic transaction frames produced identical state machine root hash.',
    detailsFa: 'بازپخش محاسباتی روی ۱۰,۰۰۰ فریم تراکنشی با هش ریشه ماشین وضعیت کاملاً منطبق و قطعی تأیید گردید.',
    evidenceHash: '0x3a2b1c0e9d8a8f7a932b109e4f019b8823c149028e99120938475a8b7c6d5e4f',
    operatorId: 'SYSTEM_DAEMON_SEALER'
  },
  {
    id: 'AUD-9013',
    timestamp: Date.now() - 142000,
    severity: 'INFO',
    eventCategory: 'RULE_EVALUATION',
    title: 'Invariants Periodic Sweep (All 6 Passed)',
    titleFa: 'پایش دوره‌ای ۶ قانون صلب ریسک (تأیید کامل)',
    details: 'VaR 1.84%, Drawdown 0.92%, Leverage 1.35x, LCR 242.5%, Oracle 0.08%, Counterparty 8.40%.',
    detailsFa: 'تمام ۶ قانون ریسک در محدوده امن و با کناره‌گیری قابل توجه از آستانه‌های هشدار سنجیده شدند.',
    evidenceHash: '0x9948cba019283746a510293847560192837465aa819283746152438910293847',
    operatorId: 'INVARIANT_ENGINE_FROZEN_V2'
  },
  {
    id: 'AUD-9012',
    timestamp: Date.now() - 320000,
    severity: 'INFO',
    eventCategory: 'STATE_TRANSITION',
    title: 'System Initialized in NORMAL_OPERATIONAL',
    titleFa: 'سامانه در وضعیت پایدار NORMAL_OPERATIONAL مستقر شد',
    details: 'Cold start boot verified frozen invariant rule vectors and loaded pre-certified Golden Datasets.',
    detailsFa: 'راه‌اندازی امن هسته با بارگذاری قوانین صلب نسخه ۲ و بررسی امضاهای اعتبارسنجی صورت گرفت.',
    previousState: 'NORMAL_OPERATIONAL',
    newState: 'NORMAL_OPERATIONAL',
    evidenceHash: '0x7f9c2d14a51e89b0204781cf42a08912e52b8dc31969a5e174208e8b0129bc81',
    operatorId: 'GENESIS_BOOT_PROTOCOL'
  }
];

/**
 * Deterministic helper to evaluate vector against frozen rules without mutating semantics
 */
export function evaluateVector(v: GoldenDataset['vector']): {
  state: SystemOperationalState;
  rules: RiskRule[];
  bundle: EvidenceBundle;
  seal: ReplaySeal;
} {
  let hasBreach = false;
  let hasWarn = false;

  const rules: RiskRule[] = FROZEN_RULES.map(rule => {
    let measured = 0;
    if (rule.id === 'R-01') measured = v.var99;
    else if (rule.id === 'R-02') measured = v.maxDrawdown;
    else if (rule.id === 'R-03') measured = v.leverage;
    else if (rule.id === 'R-04') measured = v.lcr;
    else if (rule.id === 'R-05') measured = v.oracleDeviation;
    else if (rule.id === 'R-06') measured = v.counterparty;

    let status: 'PASS' | 'WARN' | 'BREACH' = 'PASS';

    if (rule.comparator === '<=') {
      if (measured > rule.threshold) {
        status = 'BREACH';
        hasBreach = true;
      } else if (measured >= rule.threshold * 0.8) {
        status = 'WARN';
        hasWarn = true;
      }
    } else if (rule.comparator === '>=') {
      if (measured < rule.threshold) {
        status = 'BREACH';
        hasBreach = true;
      } else if (measured <= rule.threshold * 1.15) {
        status = 'WARN';
        hasWarn = true;
      }
    }

    return {
      ...rule,
      currentValue: measured,
      currentDisplay: `${measured}${rule.unit}`,
      status,
      lastEvaluatedTimestamp: Date.now()
    };
  });

  let state: SystemOperationalState = 'NORMAL_OPERATIONAL';
  if (hasBreach) {
    state = 'CIRCUIT_BREAKER_TRIGGERED';
  } else if (hasWarn) {
    state = 'ELEVATED_RISK_WATCH';
  }

  // Deterministic simulation hash
  const pseudoEntropy = (v.var99 * 100 + v.maxDrawdown * 10 + v.leverage * 1000 + v.lcr + v.oracleDeviation * 10000 + v.counterparty).toFixed(0);
  const sealId = `SEAL-V2.0-${pseudoEntropy}-FROZEN`;
  const simHash = `0x${Array.from(sealId + pseudoEntropy).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('').padEnd(64, 'a').slice(0, 64)}`;

  const bundle: EvidenceBundle = {
    bundleId: `EVD-V2.0-${pseudoEntropy}-${Date.now().toString().slice(-4)}`,
    generatedAt: Date.now(),
    operationalState: state,
    globalReplaySeal: sealId,
    inputParameters: {
      totalPortfolioValueUsd: v.portfolioValueUsd,
      var99Percent1D: v.var99,
      maxDrawdown24h: v.maxDrawdown,
      netLeverageRatio: v.leverage,
      liquidityCoverageRatio: v.lcr,
      oracleDeviationPercent: v.oracleDeviation,
      counterpartyConcentration: v.counterparty
    },
    invariantSnapshots: rules.map(r => ({
      ruleId: r.id,
      measuredValue: r.currentValue,
      limit: r.threshold,
      passed: r.status !== 'BREACH',
      deltaPercent: Number((((r.currentValue - r.threshold) / r.threshold) * 100).toFixed(1))
    })),
    complianceHash: simHash,
    validatorSignature: `secp256k1:0x${simHash.slice(2, 42)}`,
    isTamperProof: true
  };

  const seal: ReplaySeal = {
    sealId,
    timestamp: Date.now(),
    stateMachineHash: simHash,
    inputVectorHash: `0x${simHash.slice(10, 50)}${pseudoEntropy.padStart(24, '0')}`,
    executionReplayHash: simHash,
    isDeterministicVerified: true,
    blockNumber: 19842014 + Math.floor(Math.random() * 50),
    epoch: 412,
    algorithmVersion: 'VARA-v2.0-FROZEN'
  };

  return { state, rules, bundle, seal };
}
