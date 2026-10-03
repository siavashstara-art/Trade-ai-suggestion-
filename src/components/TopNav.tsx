import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, FileCode, CheckCircle2, Globe, SlidersHorizontal, Accessibility } from 'lucide-react';
import { SystemOperationalState } from '../types/vara';

interface TopNavProps {
  currentTab: 'dashboard' | 'replay' | 'datasets' | 'audit' | 'controls' | 'masterclass' | 'innovations';
  setCurrentTab: (tab: 'dashboard' | 'replay' | 'datasets' | 'audit' | 'controls' | 'masterclass' | 'innovations') => void;
  operationalState: SystemOperationalState;
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
  onOpenSpecs: () => void;
  onOpenA11y: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  setCurrentTab,
  operationalState,
  lang,
  setLang,
  onOpenSpecs,
  onOpenA11y,
}) => {
  const isRTL = lang === 'fa';

  const navItems = [
    {
      id: 'dashboard' as const,
      labelEn: 'Invariants & Safety',
      labelFa: 'قوانین و پایش ایمنی',
    },
    {
      id: 'replay' as const,
      labelEn: 'Replay Seal & Evidence',
      labelFa: 'مُهر بازپخش و شواهد',
    },
    {
      id: 'datasets' as const,
      labelEn: 'Golden Datasets',
      labelFa: 'دیتاست‌های طلایی',
    },
    {
      id: 'audit' as const,
      labelEn: 'Cryptographic Audit',
      labelFa: 'دفتر حسابرسی امن',
    },
    {
      id: 'controls' as const,
      labelEn: 'Operator Actions',
      labelFa: 'اقدامات کنترلی',
    },
    {
      id: 'innovations' as const,
      labelEn: 'Next-Gen Innovations',
      labelFa: 'نوآوری‌های بنیادین',
    },
    {
      id: 'masterclass' as const,
      labelEn: 'Intelligence & Android Build',
      labelFa: 'دانشنامه مالی و بیلد گریدل',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#080C14]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Brand title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white font-mono">VARA</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-teal-400 font-mono text-[11px] font-medium border border-slate-700/60">
                v2.0 FROZEN
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {lang === 'fa' ? 'کنسول حاکمیت ریسک و مهار ایمنی' : 'Risk Governance & Safety Console'}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation controls */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0E1526] p-1 rounded-lg border border-slate-800">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {lang === 'fa' ? item.labelFa : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Status Beacon + Specs + Language Switch */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Operational Beacon */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0E1526] border border-slate-800 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                operationalState === 'NORMAL_OPERATIONAL'
                  ? 'bg-emerald-400 animate-pulse'
                  : operationalState === 'ELEVATED_RISK_WATCH'
                  ? 'bg-amber-400 animate-pulse'
                  : operationalState === 'CIRCUIT_BREAKER_TRIGGERED'
                  ? 'bg-red-500 animate-ping'
                  : 'bg-teal-400'
              }`}
            />
            <span className="font-mono text-[11px] text-slate-300">
              {operationalState === 'NORMAL_OPERATIONAL' && (lang === 'fa' ? 'عادی / پایدار' : 'NORMAL')}
              {operationalState === 'ELEVATED_RISK_WATCH' && (lang === 'fa' ? 'پایش ریسک' : 'WATCH')}
              {operationalState === 'CIRCUIT_BREAKER_TRIGGERED' && (lang === 'fa' ? 'قطع بریکر' : 'HALTED')}
              {operationalState === 'RECOVERY_PROTOCOL' && (lang === 'fa' ? 'بازیابی' : 'RECOVERY')}
            </span>
          </div>

          {/* Accessibility & ADHD Toolbar Trigger */}
          <button
            onClick={onOpenA11y}
            aria-label={lang === 'fa' ? 'تنظیمات دسترسی‌پذیری و تمرکز ADHD' : 'Accessibility & ADHD Settings'}
            title={lang === 'fa' ? 'دسترسی‌پذیری و تمرکز ADHD (WCAG AAA)' : 'Accessibility & ADHD Focus (WCAG AAA)'}
            className="p-1.5 text-slate-300 hover:text-white bg-[#0E1526] border border-slate-700 hover:border-teal-500 rounded-md transition-colors focus:ring-2 focus:ring-teal-400"
          >
            <Accessibility className="w-4 h-4 text-teal-400" />
          </button>

          {/* System Specs Modal Trigger */}
          <button
            onClick={onOpenSpecs}
            title={lang === 'fa' ? 'مشخصات معماری Frozen' : 'System Semantics Spec'}
            className="p-1.5 text-slate-400 hover:text-slate-200 bg-[#0E1526] border border-slate-800 rounded-md transition-colors"
          >
            <FileCode className="w-4 h-4" />
          </button>

          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-[#0E1526] border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850 transition-colors"
            title={lang === 'fa' ? 'تغییر زبان به انگلیسی' : 'Switch to Persian'}
          >
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>{lang === 'fa' ? 'EN' : 'فا'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex md:hidden overflow-x-auto gap-1 mt-2.5 pt-2 border-t border-slate-800/60 no-scrollbar">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 bg-[#0E1526]'
              }`}
            >
              {lang === 'fa' ? item.labelFa : item.labelEn}
            </button>
          );
        })}
      </div>
    </header>
  );
};
