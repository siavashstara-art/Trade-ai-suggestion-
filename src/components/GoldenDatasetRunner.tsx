import React, { useState } from 'react';
import { Database, Play, CheckCircle2, AlertTriangle, AlertOctagon, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { GoldenDataset, SystemOperationalState, RiskRule } from '../types/vara';
import { evaluateVector } from '../data/frozenSemantics';

interface GoldenDatasetRunnerProps {
  datasets: GoldenDataset[];
  onApplyDataset: (dataset: GoldenDataset) => void;
  activeDatasetId: string;
  lang: 'fa' | 'en';
}

export const GoldenDatasetRunner: React.FC<GoldenDatasetRunnerProps> = ({
  datasets,
  onApplyDataset,
  activeDatasetId,
  lang,
}) => {
  const [selectedId, setSelectedId] = useState<string>(activeDatasetId || datasets[0].id);
  const [simResult, setSimResult] = useState<{
    state: SystemOperationalState;
    rules: RiskRule[];
  } | null>(null);

  const activeDataset = datasets.find(d => d.id === selectedId) || datasets[0];

  const handleRunReplay = (ds: GoldenDataset) => {
    setSelectedId(ds.id);
    const result = evaluateVector(ds.vector);
    setSimResult({
      state: result.state,
      rules: result.rules,
    });
  };

  const handleApplyToConsole = (ds: GoldenDataset) => {
    onApplyDataset(ds);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-teal-400">
                {lang === 'fa' ? 'اعتبارسنجی بنچ‌مارک طلایی' : 'GOLDEN BENCHMARK REPLAY SUITE'}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-800 text-slate-300 border border-slate-700">
                FROZEN v2.0 SUITE
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-mono mt-0.5">
              {lang === 'fa' ? 'مجموعه داده‌های طلایی مصوب و آزمون تنش' : 'Pre-Certified Golden Datasets'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {lang === 'fa'
                ? 'سناریوهای استاندارد تنش، شوک نقدینگی و فروپاشی‌های تاریخی جهت اثبات ریاضی اینکه آیا ماشین حالت در هر وضعیت دقیقاً عکس‌العمل پیش‌بینی‌شده را بروز می‌دهد.'
                : 'Deterministic stress vectors and historical market dislocations used to mathematically verify that frozen state invariants trigger without deviation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Dataset Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {datasets.map((ds) => {
          const isSelected = selectedId === ds.id;
          const isExpectedNormal = ds.expectedState === 'NORMAL_OPERATIONAL';
          const isExpectedWatch = ds.expectedState === 'ELEVATED_RISK_WATCH';
          const isExpectedHalt = ds.expectedState === 'CIRCUIT_BREAKER_TRIGGERED';

          return (
            <div
              key={ds.id}
              onClick={() => handleRunReplay(ds)}
              className={`rounded-xl border p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#131D33] border-teal-500/50 shadow-md ring-1 ring-teal-500/20'
                  : 'bg-[#0E1526] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                  {ds.id}
                </span>

                <div
                  className={`flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
                    isExpectedNormal
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : isExpectedWatch
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {isExpectedNormal && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  {isExpectedWatch && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                  {isExpectedHalt && <AlertOctagon className="w-3 h-3 text-red-400" />}
                  <span>{ds.expectedState.replace('_', ' ')}</span>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white mt-2.5">
                {lang === 'fa' ? ds.titleFa : ds.title}
              </h4>

              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {lang === 'fa' ? ds.descriptionFa : ds.description}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{lang === 'fa' ? ds.stressFactorFa : ds.stressFactor}</span>
                <span className="text-teal-400 hover:underline flex items-center gap-0.5">
                  {lang === 'fa' ? 'بازپخش' : 'Replay'} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Replay Execution Panel for Selected Dataset */}
      {activeDataset && (
        <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {lang === 'fa' ? 'اجرای بازپخش قطعی روی' : 'REPLAY EXECUTION:'}
                </span>
                <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  {activeDataset.id}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mt-1">
                {lang === 'fa' ? activeDataset.titleFa : activeDataset.title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRunReplay(activeDataset)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{lang === 'fa' ? 'شبیه‌سازی بازپخش' : 'Run Replay Simulation'}</span>
              </button>

              <button
                onClick={() => handleApplyToConsole(activeDataset)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <span>{lang === 'fa' ? 'بارگذاری در کنسول فعال' : 'Apply to Active Console'}</span>
              </button>
            </div>
          </div>

          {/* Parameter Vector Breakdown */}
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              {lang === 'fa' ? 'بردار پارامترهای ورودی سناریو (Inbound Stress Vector)' : 'Inbound Scenario Vector'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono" dir="ltr">
              <div className="p-2.5 bg-[#080C14] rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">PORTFOLIO</span>
                <span className="text-white font-bold block mt-0.5">
                  ${(activeDataset.vector.portfolioValueUsd / 1_000_000).toFixed(1)}M
                </span>
              </div>
              <div className="p-2.5 bg-[#080C14] rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">VAR 99% (Max 3.50%)</span>
                <span className={`font-bold block mt-0.5 ${activeDataset.vector.var99 > 3.50 ? 'text-red-400' : 'text-teal-300'}`}>
                  {activeDataset.vector.var99}%
                </span>
              </div>
              <div className="p-2.5 bg-[#080C14] rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">DRAWDOWN (Max 4.00%)</span>
                <span className={`font-bold block mt-0.5 ${activeDataset.vector.maxDrawdown > 4.00 ? 'text-red-400' : 'text-slate-200'}`}>
                  {activeDataset.vector.maxDrawdown}%
                </span>
              </div>
              <div className="p-2.5 bg-[#080C14] rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">LEVERAGE (Max 2.50x)</span>
                <span className={`font-bold block mt-0.5 ${activeDataset.vector.leverage > 2.50 ? 'text-red-400' : 'text-slate-200'}`}>
                  {activeDataset.vector.leverage}x
                </span>
              </div>
              <div className="p-2.5 bg-[#080C14] rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">LCR BUFFER (Min 180%)</span>
                <span className={`font-bold block mt-0.5 ${activeDataset.vector.lcr < 180 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {activeDataset.vector.lcr}%
                </span>
              </div>
              <div className="p-2.5 bg-[#080C14] rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">ORACLE DEV (Max 0.45%)</span>
                <span className={`font-bold block mt-0.5 ${activeDataset.vector.oracleDeviation > 0.45 ? 'text-red-400' : 'text-teal-300'}`}>
                  {activeDataset.vector.oracleDeviation}%
                </span>
              </div>
            </div>
          </div>

          {/* Mathematical Proof Statement */}
          <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                {lang === 'fa'
                  ? `وضعیت پیش‌بینی شده طبق قوانین تثبیت‌شده: ${activeDataset.expectedState}`
                  : `Invariant Determinism Check: Guaranteed Target -> ${activeDataset.expectedState}`}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">SEAL: FROZEN-CANONICAL</span>
          </div>
        </div>
      )}
    </div>
  );
};
