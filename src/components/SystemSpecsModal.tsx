import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Lock, Cpu, Hash } from 'lucide-react';
import { FROZEN_RULES } from '../data/frozenSemantics';

interface SystemSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'fa' | 'en';
}

export const SystemSpecsModal: React.FC<SystemSpecsModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#0E1526] border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0A0F1D]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                VARA MODEL v2.0 — FROZEN ARCHITECTURE
              </h3>
              <span className="text-[11px] text-teal-400 font-mono">
                {lang === 'fa' ? 'سند رسمی قوانین صلب و ضمانت‌های ریاضی' : 'Official Frozen Semantics & Invariants Specification'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed font-sans">
          {/* Mission statement */}
          <div className="p-3.5 bg-[#080C14] rounded-xl border border-slate-800">
            <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider mb-1">
              {lang === 'fa' ? 'هدف بنیادین سامانه VARA' : 'VARA Core Mandate'}
            </h4>
            <p className="text-slate-400 text-xs">
              {lang === 'fa'
                ? 'سامانه VARA v2.0 به عنوان زیرساخت حاکمیت ریسک، پایش ناورداها و کنترل ایمنی فعالیت می‌کند. هیچ تراکنش یا تغییری نمی‌تواند قوانین صلب ریاضی را دور بزند یا بدون ثبت در دفتر کل حسابرسی بدون تغییر اجرا شود.'
                : 'VARA v2.0 functions strictly as a Safety Control System, Risk Governance Engine, and Cryptographic Audit Console. All state transitions are deterministic and cryptographically sealed.'}
            </p>
          </div>

          {/* Central AI Investment Decision Mechanism */}
          <div className="p-3.5 bg-[#0B1524] rounded-xl border border-teal-500/40">
            <h4 className="text-xs font-bold text-teal-300 font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-teal-400" />
              <span>
                {lang === 'fa'
                  ? 'ساز و کار تصمیم‌گیری سرمایه‌گذاری و خرید/فروش با هوش مصنوعی مرکزی'
                  : 'Central AI Investment & Trade Decision Pipeline'}
              </span>
            </h4>
            <div className="space-y-2 text-[11px] text-slate-300">
              <div className="p-2 bg-[#080C14] rounded border border-slate-800">
                <span className="text-teal-400 font-bold block mb-0.5">۱. پالایش فید داده و کشف واگرایی (Multi-Oracle Aggregation):</span>
                <p className="text-slate-400">
                  دریافت قیمت از چندین منبع غیرمتمرکز، سنجش عمق دفتر سفارشات و سنجش دلتای حجم تجمعی (CVD)؛ اگر واگرایی نرخ بیش از ۰.۴۵٪ باشد، هرگونه ترید متوقف می‌شود.
                </p>
              </div>

              <div className="p-2 bg-[#080C14] rounded border border-slate-800">
                <span className="text-teal-400 font-bold block mb-0.5">۲. ارزیابی ناورداهای صلب ۶ گانه (Deterministic Invariant Gating):</span>
                <p className="text-slate-400">
                  قبل از ارسال هر سفارش به صرافی، بردار وضعیت با ۶ قانون صلب (VaR, Drawdown, Leverage, LCR, Oracle, Counterparty) تطبیق می‌یابد. در صورت احتمال حتی ۱٪ شکستن ناوردا، معامله درجا مسدود می‌گردد.
                </p>
              </div>

              <div className="p-2 bg-[#080C14] rounded border border-slate-800">
                <span className="text-teal-400 font-bold block mb-0.5">۳. تعیین سایز معامله بر اساس فرمول تعدیل‌شده کلی (Kelly Sizing):</span>
                <p className="text-slate-400">
                  حجم خرید بر اساس احساسات یا طمع مشخص نمی‌شود؛ بلکه بر مبنای فاصله تا حدضرر صلب و ضریب نوسان تاریخی (ATR) به گونه‌ای محاسبه می‌شود که ریسک هر پوزیشن هرگز از ۱.۵٪ کل ارزش پورتفوی فراتر نرود.
                </p>
              </div>

              <div className="p-2 bg-[#080C14] rounded border border-slate-800">
                <span className="text-teal-400 font-bold block mb-0.5">۴. امضای رمزنگاری و صدور Replay Seal:</span>
                <p className="text-slate-400">
                  برای هر خرید یا فروش، یک مهر بازپخش قطعی با هش SHA-256 صادر شده و در دفتر کل ثبت می‌گردد تا صحت تصمیم به صورت مستقل و بدون انکار توسط حسابرسان تأیید شود.
                </p>
              </div>

              <div className="p-2 bg-[#080C14] rounded border border-slate-800">
                <span className="text-teal-400 font-bold block mb-0.5">۵. مدارشکن اضطراری خودکار (Circuit Breaker Tripping):</span>
                <p className="text-slate-400">
                  در صورت سقوط ناگهانی بازار، افت ۲۴ ساعته بیش از ۴ درصد یا توقف تسویه یک طرف معامله، کلیه تراکنش‌ها در کمتر از ۱۵ میلی‌ثانیه فریز شده و نقدینگی به استیبل‌کوین‌های با بازده امن هدایت می‌شود.
                </p>
              </div>
            </div>
          </div>

          {/* Frozen Invariants table */}
          <div>
            <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider mb-2">
              {lang === 'fa' ? 'ناورداهای صلب ریاضی ۶ گانه' : 'The 6 Frozen Mathematical Invariants'}
            </h4>
            <div className="space-y-2 font-mono">
              {FROZEN_RULES.map((rule) => (
                <div key={rule.id} className="p-2.5 bg-[#080C14] rounded-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-teal-300 font-bold mr-2">{rule.id}:</span>
                    <span className="text-white">{lang === 'fa' ? rule.nameFa : rule.name}</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-slate-800 text-teal-400 text-[11px] border border-slate-700 self-start sm:self-auto" dir="ltr">
                    {rule.invariantFormula}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
            <div className="p-3 bg-[#080C14] rounded-lg border border-slate-800">
              <span className="text-teal-400 font-bold block mb-1">DETERMINISTIC REPLAY SEAL</span>
              <p className="text-slate-400">
                {lang === 'fa'
                  ? 'اجرای بازپخش بردار ورودی، هش دقیقاً یکسان با وضعیت جاری تولید می‌کند.'
                  : 'Bit-for-bit reproducible state machine verified across synthetic benchmarks.'}
              </p>
            </div>
            <div className="p-3 bg-[#080C14] rounded-lg border border-slate-800">
              <span className="text-teal-400 font-bold block mb-1">EVIDENCE BUNDLE</span>
              <p className="text-slate-400">
                {lang === 'fa'
                  ? 'بسته امضا شده رمزنگاری‌شده شامل بردار پارامترها و ناورداها قابل استخراج و تطبیق است.'
                  : 'Cryptographically signed snapshots exported as portable JSON bundles for regulatory scrutiny.'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0A0F1D] flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">SPEC: RFC-VARA-2026-FROZEN</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-mono font-medium rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors"
          >
            {lang === 'fa' ? 'بستن مشخصات' : 'Close Specification'}
          </button>
        </div>
      </div>
    </div>
  );
};
