import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight, Hash, Activity } from 'lucide-react';
import { RiskRule, SystemOperationalState } from '../types/vara';

interface RiskRulesGridProps {
  rules: RiskRule[];
  state: SystemOperationalState;
  portfolioValue: number;
  lang: 'fa' | 'en';
}

export const RiskRulesGrid: React.FC<RiskRulesGridProps> = ({
  rules,
  state,
  portfolioValue,
  lang,
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);

  // Compute percentage utilization of the limit
  const getCapacityPercent = (rule: RiskRule): number => {
    if (rule.comparator === '<=') {
      return Math.min(100, Math.round((rule.currentValue / rule.threshold) * 100));
    } else {
      // For >= (e.g. LCR >= 180%), if currentValue is 242%, capacity safety is high
      return Math.min(100, Math.round((rule.threshold / rule.currentValue) * 100));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Telemetry Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">
            {lang === 'fa' ? 'کل دارایی تحت نظارت' : 'Total Asset Under Custody'}
          </span>
          <span className="text-base font-bold text-white font-mono block mt-1">
            ${(portfolioValue / 1_000_000).toFixed(2)}M
          </span>
          <span className="text-[10px] text-slate-500 font-mono">USD Net Realized</span>
        </div>

        <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">
            {lang === 'fa' ? 'ارزش در معرض ریسک (VaR)' : '1D 99% VaR'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-base font-bold text-teal-400 font-mono">
              {rules.find(r => r.id === 'R-01')?.currentDisplay || '1.84%'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">/ 3.50%</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">
            {lang === 'fa' ? '۴۷٪ زیر سقف' : '-47% below ceiling'}
          </span>
        </div>

        <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">
            {lang === 'fa' ? 'افت ارزش ۲۴ ساعته' : '24h Max Drawdown'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-base font-bold text-slate-200 font-mono">
              {rules.find(r => r.id === 'R-02')?.currentDisplay || '0.92%'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">/ 4.00%</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">
            {lang === 'fa' ? 'مهار کامل' : 'Contained'}
          </span>
        </div>

        <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">
            {lang === 'fa' ? 'اهرم مؤثر خالص' : 'Net Effective Leverage'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-base font-bold text-slate-200 font-mono">
              {rules.find(r => r.id === 'R-03')?.currentDisplay || '1.35x'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">/ 2.50x</span>
          </div>
          <span className="text-[10px] text-teal-400 font-mono">
            {lang === 'fa' ? 'سرمایه امن' : 'De-leveraged'}
          </span>
        </div>

        <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">
            {lang === 'fa' ? 'پوشش نقدینگی (LCR)' : 'Liquidity Buffer (LCR)'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-base font-bold text-emerald-400 font-mono">
              {rules.find(r => r.id === 'R-04')?.currentDisplay || '242.5%'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">&ge; 180%</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">
            {lang === 'fa' ? 'مازاد +۶۲.۵٪' : '+62.5% Surplus'}
          </span>
        </div>

        <div className="bg-[#0E1526] border border-slate-800 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">
            {lang === 'fa' ? 'واگرایی فید اوراکل' : 'Oracle Dispersion'}
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-base font-bold text-teal-400 font-mono">
              {rules.find(r => r.id === 'R-05')?.currentDisplay || '0.08%'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">/ 0.45%</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">
            {lang === 'fa' ? 'همگام و بدون تاخیر' : 'Synchronized'}
          </span>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>
              {lang === 'fa' ? 'ماتریس ناورداهای صلب ریسک (Frozen Invariant Matrix)' : 'Frozen Invariant Rule Set Matrix'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'fa'
              ? '۶ قانون ریاضی نسخه تثبیت‌شده (Frozen)؛ هرگونه تخطی از این قوانین بلافاصله وضعیت سیستم را تغییر می‌دهد.'
              : 'Deterministic mathematical invariants. Any parameter violation deterministically trips safety circuit.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-teal-400 inline-block"></span>
          <span>{lang === 'fa' ? 'اعتبارسنجی قطعی: ۶/۶ فعال' : 'Deterministic Check: 6/6 Active'}</span>
        </div>
      </div>

      {/* Grid of 6 Invariant Rule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule) => {
          const capacity = getCapacityPercent(rule);
          const isBreach = rule.status === 'BREACH';
          const isWarn = rule.status === 'WARN';
          const isPass = rule.status === 'PASS';

          return (
            <div
              key={rule.id}
              className={`rounded-xl border transition-all p-4 relative ${
                isBreach
                  ? 'bg-[#180A0D] border-red-500/60 shadow-red-950/20 shadow-lg'
                  : isWarn
                  ? 'bg-[#1A150A] border-amber-500/40 shadow-amber-950/10'
                  : 'bg-[#0E1526] border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px] font-semibold border border-slate-700">
                    {rule.id}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {lang === 'fa' ? rule.categoryFa : rule.category}
                  </span>
                </div>

                {/* Status Badge */}
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                    isPass
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : isWarn
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {isPass && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  {isWarn && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                  {isBreach && <AlertCircle className="w-3 h-3 text-red-400" />}
                  <span>{rule.status}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-3">
                <h4 className="text-sm font-semibold text-white">
                  {lang === 'fa' ? rule.nameFa : rule.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {lang === 'fa' ? rule.descriptionFa : rule.description}
                </p>
              </div>

              {/* Mathematical Invariant Formula */}
              <div className="mt-3 py-1.5 px-2.5 rounded bg-[#080C14] border border-slate-800/80 font-mono text-xs text-teal-300 flex items-center justify-between">
                <span className="text-slate-500 text-[10px]">INVARIANT:</span>
                <span className="font-semibold tracking-wide text-right" dir="ltr">
                  {rule.invariantFormula}
                </span>
              </div>

              {/* Live Metric Gauge */}
              <div className="mt-4 pt-3 border-t border-slate-800/70">
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="text-slate-400">
                    {lang === 'fa' ? 'مقدار اندازه‌گیری شده:' : 'Measured:'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-bold ${
                        isBreach ? 'text-red-400' : isWarn ? 'text-amber-400' : 'text-white'
                      }`}
                    >
                      {rule.currentDisplay}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      (حد: {rule.thresholdDisplay})
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isBreach
                        ? 'bg-red-500'
                        : isWarn
                        ? 'bg-amber-400'
                        : 'bg-teal-500'
                    }`}
                    style={{ width: `${capacity}%` }}
                  />
                </div>
              </div>

              {/* Cryptographic SHA-256 Proof */}
              <div className="mt-3.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <div className="flex items-center gap-1 truncate max-w-[80%]" title={rule.sha256Proof}>
                  <Hash className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">{rule.sha256Proof.slice(0, 18)}...</span>
                </div>
                <span>
                  {Math.round((Date.now() - rule.lastEvaluatedTimestamp) / 1000)}s ago
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
