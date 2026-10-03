import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, RefreshCw, KeyRound, Lock, CheckCircle2 } from 'lucide-react';
import { SystemOperationalState } from '../types/vara';

interface StateIndicatorProps {
  state: SystemOperationalState;
  lang: 'fa' | 'en';
  onTripBreaker?: () => void;
  onInitiateRecovery?: () => void;
}

export const StateIndicator: React.FC<StateIndicatorProps> = ({
  state,
  lang,
  onTripBreaker,
  onInitiateRecovery,
}) => {
  const isNormal = state === 'NORMAL_OPERATIONAL';
  const isWatch = state === 'ELEVATED_RISK_WATCH';
  const isTripped = state === 'CIRCUIT_BREAKER_TRIGGERED';
  const isRecovery = state === 'RECOVERY_PROTOCOL';

  return (
    <div
      className={`rounded-xl border transition-all duration-300 p-4 sm:p-5 ${
        isNormal
          ? 'bg-[#0A1622]/90 border-teal-500/30'
          : isWatch
          ? 'bg-[#1A1608]/90 border-amber-500/40'
          : isTripped
          ? 'bg-[#220B0F]/95 border-red-500/60 ring-1 ring-red-500/30'
          : 'bg-[#0E1526]/90 border-blue-500/40'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* State Label & Icon */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border ${
              isNormal
                ? 'bg-teal-500/10 border-teal-500/30 text-teal-400'
                : isWatch
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : isTripped
                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
            }`}
          >
            {isNormal && <ShieldCheck className="w-6 h-6" />}
            {isWatch && <AlertTriangle className="w-6 h-6" />}
            {isTripped && <AlertOctagon className="w-6 h-6" />}
            {isRecovery && <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-mono font-medium text-slate-400">
                {lang === 'fa' ? 'وضعیت ماشین حالت (Frozen State)' : 'State Machine Target'}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-800 text-slate-300 border border-slate-700">
                SEC-L3
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5 font-mono">
              {isNormal && (lang === 'fa' ? 'NORMAL_OPERATIONAL · ایمن و پایدار' : 'NORMAL_OPERATIONAL')}
              {isWatch && (lang === 'fa' ? 'ELEVATED_RISK_WATCH · پایش ریسک بالا' : 'ELEVATED_RISK_WATCH')}
              {isTripped && (lang === 'fa' ? 'CIRCUIT_BREAKER_TRIGGERED · قطع اضطراری' : 'CIRCUIT_BREAKER_TRIGGERED')}
              {isRecovery && (lang === 'fa' ? 'RECOVERY_PROTOCOL · بازگردانی امن' : 'RECOVERY_PROTOCOL')}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {isNormal &&
                (lang === 'fa'
                  ? 'تمام ۶ ناوردای ریاضی ریسک در حاشیه ایمن قرار دارند. جریان سفارشات و عملیات سرمایه‌ای بدون محدودیت فعال است.'
                  : 'All 6 mathematical risk invariants strictly adhere to frozen tolerance bands. Automated flow active.')}
              {isWatch &&
                (lang === 'fa'
                  ? 'یک یا چند شاخص وارد راهروی هشدار (۸۰٪ الی ۱۰۰٪ آستانه) شده‌اند. ضریب ایمنی افزایش یافته و ثبت لاگ عمیق فعال است.'
                  : 'One or more invariants entered the 80%-100% warning corridor. Elevated sampling and heightened scrutiny enabled.')}
              {isTripped &&
                (lang === 'fa'
                  ? 'خط قرمز ناوردا شکسته شد! قطع خودکار مدار فعال شده و تمام تبادلات جهت جلوگیری از افت متوالی و سرایت بحران معلق است.'
                  : 'CRITICAL INVARIANT BREACH. Circuit breaker tripped: all trading execution and capital disbursements halted.')}
              {isRecovery &&
                (lang === 'fa'
                  ? 'پروتکل بازیابی کنترل‌شده تحت اعتبارسنجی مجدد پارامترها و امضای دوگانه سرپرستان سیستم در جریان است.'
                  : 'Controlled recovery protocol active. Dual-key multi-signature required to re-arm execution pipeline.')}
            </p>
          </div>
        </div>

        {/* Action Button for Emergency Simulation / Recovery */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {isTripped ? (
            <button
              onClick={onInitiateRecovery}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-sm focus:ring-2 focus:ring-teal-400"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{lang === 'fa' ? 'ورود به پروتکل بازیابی' : 'Initiate Recovery Protocol'}</span>
            </button>
          ) : (
            <button
              onClick={onTripBreaker}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-800/80 text-red-200 transition-all focus:ring-2 focus:ring-red-400"
              title={lang === 'fa' ? 'آزمون قطع اضطراری بریکر' : 'Test manual circuit breaker trip'}
            >
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>{lang === 'fa' ? 'آزمون قطع اضطراری (Trip)' : 'Emergency Circuit Trip'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
