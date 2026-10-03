import React from 'react';
import { 
  Accessibility, 
  Eye, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ZoomIn, 
  X, 
  Check, 
  Focus, 
  Minimize2, 
  Sliders, 
  Layers, 
  SunMedium
} from 'lucide-react';

export interface AccessibilitySettings {
  adhdFocusMode: boolean;
  reduceMotion: boolean;
  textScale: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'monochrome';
  soundFeedback: boolean;
}

interface AccessibilityToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  lang: 'fa' | 'en';
  playTone?: () => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  lang,
  playTone,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="a11y-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
    >
      <div className="bg-[#0E1526] border-2 border-teal-500/60 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#0A0F1D]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <h3 id="a11y-panel-title" className="text-base font-bold text-white font-mono">
                {lang === 'fa' ? 'تنظیمات دسترسی‌پذیری و تمرکز ADHD' : 'Universal Accessibility & ADHD Engine'}
              </h3>
              <span className="text-[11px] text-teal-400 font-mono">
                WCAG 2.2 AAA + Neurodiversity Guidelines
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={lang === 'fa' ? 'بستن پنجره دسترسی‌پذیری' : 'Close Accessibility Settings'}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-teal-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-200">
          {/* ADHD Focus Mode Section */}
          <div className="p-4 bg-[#080C14] rounded-xl border border-teal-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Focus className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-sm text-white">
                  {lang === 'fa' ? 'حالت تمرکز آرام و ضدحواس‌پرتی (ADHD Focus Mode)' : 'ADHD Focus & Sensory Calming'}
                </span>
              </div>
              <button
                role="switch"
                aria-checked={settings.adhdFocusMode}
                onClick={() => {
                  onUpdateSettings({ adhdFocusMode: !settings.adhdFocusMode });
                  playTone?.();
                }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.adhdFocusMode ? 'bg-teal-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.adhdFocusMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'fa'
                ? 'کاهش بار شناختی، افزایش فاصله‌گذاری خطوط، حذف المان‌های شلوغ ثانویه و متمرکزسازی توجه روی تک‌تک وظایف جهت تسهیل کاربری افراد دارای بیش‌فعالی و نقص توجه (ADHD).'
                : 'Reduces cognitive clutter, increases line spacing, dampens aggressive visual stimuli, and chunks data for neurodivergent focus.'}
            </p>
          </div>

          {/* Reduce Motion / Calm Sensory */}
          <div className="p-4 bg-[#080C14] rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Minimize2 className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-sm text-white">
                  {lang === 'fa' ? 'توقف پالس‌ها و تحرک (Reduce Motion)' : 'Stop Animations & Pulses'}
                </span>
              </div>
              <button
                role="switch"
                aria-checked={settings.reduceMotion}
                onClick={() => {
                  onUpdateSettings({ reduceMotion: !settings.reduceMotion });
                  playTone?.();
                }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.reduceMotion ? 'bg-teal-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.reduceMotion ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'fa'
                ? 'غیرفعال‌سازی چشمک‌زدن چراغ‌ها، انیمیشن‌های پالس و تحرکات ناگهانی که ممکن است باعث حواس‌پرتی، خستگی مفرط چشم یا اضافه بار حسی شود.'
                : 'Disables blinking beacons, pulse waves, and rapid transitions to avoid sensory overload.'}
            </p>
          </div>

          {/* Text Sizing Scale */}
          <div className="p-4 bg-[#080C14] rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-sm text-white">
                {lang === 'fa' ? 'اندازه قلم و وضوح خوانش (Text Scaling)' : 'Text Scaling & Legibility'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', labelFa: 'استاندارد (۱۰۰٪)', labelEn: 'Normal (100%)' },
                { id: 'large', labelFa: 'بزرگ (۱۱۵٪)', labelEn: 'Large (115%)' },
                { id: 'xlarge', labelFa: 'خیلی بزرگ (۱۳۰٪)', labelEn: 'Extra Large (130%)' },
              ].map((scale) => (
                <button
                  key={scale.id}
                  onClick={() => {
                    onUpdateSettings({ textScale: scale.id as AccessibilitySettings['textScale'] });
                    playTone?.();
                  }}
                  className={`py-2 px-2 rounded-lg font-mono text-center transition-all ${
                    settings.textScale === scale.id
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500 font-bold'
                      : 'bg-slate-850 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {lang === 'fa' ? scale.labelFa : scale.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Mode (WCAG AAA) */}
          <div className="p-4 bg-[#080C14] rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SunMedium className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-sm text-white">
                  {lang === 'fa' ? 'کنتراست فوق‌العاده بالا (High Contrast 7:1)' : 'Ultra-High Contrast Mode'}
                </span>
              </div>
              <button
                role="switch"
                aria-checked={settings.highContrast}
                onClick={() => {
                  onUpdateSettings({ highContrast: !settings.highContrast });
                  playTone?.();
                }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.highContrast ? 'bg-teal-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'fa'
                ? 'تقویت حاشیه‌ها، سفیدسازی متون کم‌رنگ و اطمینان از تفکیک کامل لایه‌ها برای افراد کم‌بینا یا نور شدید محیط.'
                : 'Enforces WCAG AAA compliance (7:1+ contrast) by amplifying borders and clarifying muted text.'}
            </p>
          </div>

          {/* Color Blindness Filter */}
          <div className="p-4 bg-[#080C14] rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-sm text-white">
                {lang === 'fa' ? 'حالت بهینه‌سازی کوررنگی (Color-Blind Assistance)' : 'Color-Blind Vision Mode'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {[
                { id: 'none', labelFa: 'حالت عادی', labelEn: 'Standard' },
                { id: 'protanopia', labelFa: 'پروتانوپیا (قرمز-کور)', labelEn: 'Protanopia Safe' },
                { id: 'deuteranopia', labelFa: 'دوترانوپیا (سبز-کور)', labelEn: 'Deuteranopia Safe' },
                { id: 'monochrome', labelFa: 'تأکید بر نماد و شکل', labelEn: 'Symbols & Shapes Only' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    onUpdateSettings({ colorBlindMode: mode.id as AccessibilitySettings['colorBlindMode'] });
                    playTone?.();
                  }}
                  className={`py-2 px-2.5 rounded-lg font-mono text-left rtl:text-right transition-all flex items-center justify-between ${
                    settings.colorBlindMode === mode.id
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500 font-bold'
                      : 'bg-slate-850 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{lang === 'fa' ? mode.labelFa : mode.labelEn}</span>
                  {settings.colorBlindMode === mode.id && <Check className="w-3.5 h-3.5 text-teal-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Calm Audio Confirmation */}
          <div className="p-4 bg-[#080C14] rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-sm text-white">
                  {lang === 'fa' ? 'بازخورد صوتی آرامش‌بخش (Tactile Chimes)' : 'Calming Auditory Cues'}
                </span>
              </div>
              <button
                role="switch"
                aria-checked={settings.soundFeedback}
                onClick={() => {
                  onUpdateSettings({ soundFeedback: !settings.soundFeedback });
                  playTone?.();
                }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  settings.soundFeedback ? 'bg-teal-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    settings.soundFeedback ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'fa'
                ? 'پخش یک صدای ملایم غیرتهاجمی با وب آدیو هنگام تغییر وضعیت یا ثبت موفق عملیات جهت تأیید حسی مضاعف بدون استرس.'
                : 'Gentle synthesized audio chime confirms state changes without alarming alert tones.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0A0F1D] flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            {lang === 'fa' ? 'سازگار با صفحه‌خوان NVDA و VoiceOver' : 'Screen-reader & Keyboard Optimized'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono font-medium rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors"
          >
            {lang === 'fa' ? 'اعمال و بازگشت' : 'Save & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
