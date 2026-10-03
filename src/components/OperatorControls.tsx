import React, { useState } from 'react';
import { SlidersHorizontal, ShieldAlert, KeyRound, CheckCircle2, RotateCcw, AlertOctagon, Play, Lock, AlertTriangle } from 'lucide-react';
import { SystemOperationalState, RiskRule, GoldenDataset } from '../types/vara';
import { evaluateVector } from '../data/frozenSemantics';

interface OperatorControlsProps {
  operationalState: SystemOperationalState;
  onStateChange: (newState: SystemOperationalState, reason: string) => void;
  onApplyVector: (vector: GoldenDataset['vector'], reason: string) => void;
  onResetBaseline: () => void;
  lang: 'fa' | 'en';
}

export const OperatorControls: React.FC<OperatorControlsProps> = ({
  operationalState,
  onStateChange,
  onApplyVector,
  onResetBaseline,
  lang,
}) => {
  // Simulation vector inputs
  const [var99, setVar99] = useState<number>(1.84);
  const [maxDrawdown, setMaxDrawdown] = useState<number>(0.92);
  const [leverage, setLeverage] = useState<number>(1.35);
  const [lcr, setLcr] = useState<number>(242.5);
  const [oracleDev, setOracleDev] = useState<number>(0.08);
  const [counterparty, setCounterparty] = useState<number>(8.4);

  // Recovery keys
  const [keyAlpha, setKeyAlpha] = useState('');
  const [keyBeta, setKeyBeta] = useState('');
  const [recoveryError, setRecoveryError] = useState<string | null>(null);

  // Dry run result
  const [dryRunResult, setDryRunResult] = useState<{
    state: SystemOperationalState;
    rules: RiskRule[];
  } | null>(null);

  const handleDryRun = () => {
    const vector = {
      portfolioValueUsd: 148500000,
      var99,
      maxDrawdown,
      leverage,
      lcr,
      oracleDeviation: oracleDev,
      counterparty,
    };
    const result = evaluateVector(vector);
    setDryRunResult({
      state: result.state,
      rules: result.rules,
    });
  };

  const handleApplyToEngine = () => {
    const vector = {
      portfolioValueUsd: 148500000,
      var99,
      maxDrawdown,
      leverage,
      lcr,
      oracleDeviation: oracleDev,
      counterparty,
    };
    onApplyVector(vector, 'Operator Manual Parameter Adjustment');
  };

  const handleExecuteEmergencyTrip = () => {
    onStateChange('CIRCUIT_BREAKER_TRIGGERED', 'Manual Operator Emergency Circuit Trip (Safety Drill)');
  };

  const handleExecuteRecovery = () => {
    setRecoveryError(null);
    if (!keyAlpha.trim() || !keyBeta.trim()) {
      setRecoveryError(lang === 'fa' ? 'هر دو کلید امضای بازیابی الزامی است.' : 'Both authorization keys are required.');
      return;
    }

    // Reset parameters to baseline safe vector and clear trip
    onResetBaseline();
    setKeyAlpha('');
    setKeyBeta('');
  };

  const isTripped = operationalState === 'CIRCUIT_BREAKER_TRIGGERED';

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-teal-400">
                {lang === 'fa' ? 'کنسول کنترل و مدیریت ایمنی' : 'OPERATOR SAFETY GOVERNANCE'}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-800 text-slate-300 border border-slate-700">
                ADMIN ACCESS L3
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-mono mt-0.5">
              {lang === 'fa' ? 'شبیه‌سازی تنش و اقدامات کنترلی ناورداها' : 'Stress Injection & Controlled Invariant Actions'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {lang === 'fa'
                ? 'ابزارهای استاندارد کارشناس ریسک جهت آزمایش مقاومت ناورداها، آزمون قطع اضطراری بریکر و اجرای پروتکل بازیابی دو امضایی بدون تخطی از قوانین تثبیت‌شده (Frozen).'
                : 'Controlled engineering interface for dry-run invariant testing, manual circuit breaker drills, and dual-key multi-signature recovery.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Parameter Vector Sandbox */}
        <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="border-b border-slate-800/80 pb-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2 font-mono">
              <SlidersHorizontal className="w-4 h-4 text-teal-400" />
              <span>{lang === 'fa' ? 'جعبه‌آزمون پارامترهای ریسک (Sandbox)' : 'Parameter Vector Sandbox'}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'fa'
                ? 'مقادیر متغیرها را تغییر دهید تا واکنش ناورداهای صلب ارزیابی شود.'
                : 'Adjust market variables to test mathematical invariant triggers in real-time.'}
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* 1D VaR */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">1D 99% VaR (Limit: 3.50%):</span>
                <span className={var99 > 3.50 ? 'text-red-400 font-bold' : 'text-teal-300'}>{var99}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.05"
                value={var99}
                onChange={(e) => setVar99(parseFloat(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Drawdown */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">24h Drawdown (Limit: 4.00%):</span>
                <span className={maxDrawdown > 4.00 ? 'text-red-400 font-bold' : 'text-slate-200'}>{maxDrawdown}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="7.0"
                step="0.05"
                value={maxDrawdown}
                onChange={(e) => setMaxDrawdown(parseFloat(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Leverage */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Net Leverage (Limit: 2.50x):</span>
                <span className={leverage > 2.50 ? 'text-red-400 font-bold' : 'text-slate-200'}>{leverage}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="4.0"
                step="0.05"
                value={leverage}
                onChange={(e) => setLeverage(parseFloat(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            {/* LCR */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Liquidity LCR (Min: 180%):</span>
                <span className={lcr < 180 ? 'text-red-400 font-bold' : 'text-emerald-400'}>{lcr}%</span>
              </div>
              <input
                type="range"
                min="120"
                max="320"
                step="5"
                value={lcr}
                onChange={(e) => setLcr(parseFloat(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Oracle Deviation */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Oracle Deviation (Limit: 0.45%):</span>
                <span className={oracleDev > 0.45 ? 'text-red-400 font-bold' : 'text-teal-300'}>{oracleDev}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="1.20"
                step="0.01"
                value={oracleDev}
                onChange={(e) => setOracleDev(parseFloat(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={handleDryRun}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{lang === 'fa' ? 'ارزیابی آزمایشی (Dry Run)' : 'Evaluate Dry-Run'}</span>
            </button>

            <button
              onClick={handleApplyToEngine}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <span>{lang === 'fa' ? 'اعمال روی کنسول زنده' : 'Apply Vector Live'}</span>
            </button>

            <button
              onClick={onResetBaseline}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'بازنشانی به حالت پایه' : 'Reset Baseline'}</span>
            </button>
          </div>

          {/* Dry Run Outcome Preview */}
          {dryRunResult && (
            <div className="mt-3 p-3 bg-[#080C14] border border-slate-800 rounded-lg text-xs font-mono">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400">
                  {lang === 'fa' ? 'نتیجه آزمایشی بردار ورودی:' : 'Simulated State:'}
                </span>
                <span
                  className={`font-bold ${
                    dryRunResult.state === 'NORMAL_OPERATIONAL'
                      ? 'text-emerald-400'
                      : dryRunResult.state === 'ELEVATED_RISK_WATCH'
                      ? 'text-amber-400'
                      : 'text-red-400'
                  }`}
                >
                  {dryRunResult.state}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block">
                {dryRunResult.rules.filter(r => r.status === 'BREACH').length > 0
                  ? `Breaches: ${dryRunResult.rules.filter(r => r.status === 'BREACH').map(r => r.id).join(', ')}`
                  : 'Zero Invariant Violations.'}
              </span>
            </div>
          )}
        </div>

        {/* Right: Emergency Circuit Breaker & Dual-Key Recovery */}
        <div className="space-y-4">
          {/* Emergency Breaker Panel */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="border-b border-slate-800/80 pb-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 font-mono">
                <Lock className="w-4 h-4 text-red-400" />
                <span>{lang === 'fa' ? 'قطع دستی مدار اضطراری (Emergency Circuit Trip)' : 'Manual Emergency Trip'}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'fa'
                  ? 'جهت شبیه‌سازی مانور ایمنی یا توقف فوری تبادلات در صورت تشخیص ناامنی فیزیکی یا شبکه.'
                  : 'Immediately halts execution pipeline and raises critical halt flag across all trading nodes.'}
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#180A0D] border border-red-500/40 rounded-lg">
              <div>
                <span className="text-xs font-bold text-red-300 block font-mono">
                  {isTripped
                    ? (lang === 'fa' ? 'مدار قطع است (Halted)' : 'CIRCUIT TRIPPED & HALTED')
                    : (lang === 'fa' ? 'مدار مسلح و فعال (Armed & Ready)' : 'CIRCUIT BREAKER ARMED')}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {lang === 'fa' ? 'آستانه تریپ: هرگونه شکست ناوردا یا دستور سرپرست' : 'Trigger condition: Any rule breach or operator trip'}
                </span>
              </div>

              {!isTripped && (
                <button
                  onClick={handleExecuteEmergencyTrip}
                  className="px-3.5 py-2 text-xs font-mono font-bold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors shadow-xs"
                >
                  {lang === 'fa' ? 'قطع اضطراری مدار' : 'TRIP CIRCUIT NOW'}
                </button>
              )}
            </div>
          </div>

          {/* Dual-Key Recovery Protocol */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="border-b border-slate-800/80 pb-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 font-mono">
                <KeyRound className="w-4 h-4 text-teal-400" />
                <span>{lang === 'fa' ? 'پروتکل بازیابی دو امضایی (Dual-Key Recovery)' : 'Dual-Key Recovery Protocol'}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'fa'
                  ? 'در صورت فعال شدن بریکر، بازگردانی سامانه مستلزم تأیید دو کلید معتبر مجزا از سرپرستان ریسک و امنیت است.'
                  : 'Restoring state from emergency halt strictly enforces dual authorization.'}
              </p>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">
                  {lang === 'fa' ? 'کلید اول سرپرست ریسک (Risk Officer Key):' : 'Key Alpha (Risk Officer):'}
                </label>
                <input
                  type="text"
                  value={keyAlpha}
                  onChange={(e) => setKeyAlpha(e.target.value)}
                  placeholder="e.g. SEC-ALPHA-2026-AUTHORIZED"
                  className="w-full bg-[#080C14] border border-slate-800 rounded-lg p-2 text-white placeholder-slate-600 focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">
                  {lang === 'fa' ? 'کلید دوم ناظر امنیت (Security Officer Key):' : 'Key Beta (Security Officer):'}
                </label>
                <input
                  type="text"
                  value={keyBeta}
                  onChange={(e) => setKeyBeta(e.target.value)}
                  placeholder="e.g. SEC-BETA-2026-COMPLIANT"
                  className="w-full bg-[#080C14] border border-slate-800 rounded-lg p-2 text-white placeholder-slate-600 focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              {recoveryError && (
                <div className="p-2 bg-red-500/10 border border-red-500/30 rounded text-red-300 text-[11px]">
                  {recoveryError}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleExecuteRecovery}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-mono font-medium rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'احراز دو امضا و بازنشانی ایمن سامانه' : 'Authorize Recovery & Reset Normal State'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
