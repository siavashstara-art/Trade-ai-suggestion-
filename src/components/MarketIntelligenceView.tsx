import React, { useState } from 'react';
import { 
  Compass, 
  Smartphone, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  BrainCircuit, 
  PieChart, 
  Wallet, 
  FileCode, 
  Lock, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { 
  TOP_MARKET_ASSETS, 
  HISTORIC_TRADE_CASES, 
  WHALE_TRAP_TACTICS, 
  COMPOUND_PORTFOLIO_MODEL, 
  WALLET_EXCHANGE_MASTERCLASS, 
  WHY_AI_RISK_GOVERNANCE, 
  EMOTIONAL_RISKS_SUMMARY 
} from '../data/intelligenceMasterclass';

interface MarketIntelligenceViewProps {
  lang: 'fa' | 'en';
}

export const MarketIntelligenceView: React.FC<MarketIntelligenceViewProps> = ({ lang }) => {
  const [activeSubTab, setActiveSubTab] = useState<'gradle' | 'assets' | 'traps' | 'portfolio' | 'wallet' | 'ai'>('gradle');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-teal-400">
                  {lang === 'fa' ? 'دانشنامه مالی، اتوماسیون اندروید و حاکمیت ریسک' : 'INTELLIGENCE & ANDROID AUTOMATION'}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  VARA MASTERCLASS
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-mono mt-0.5">
                {lang === 'fa' ? 'راهنمای جامع مالی، تله‌های بازار و مهندسی بیلد امن' : 'Financial Intelligence & Engineering Masterclass'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {lang === 'fa'
                  ? 'بررسی علمی فایل‌های گریدل AAB/APK، امن‌سازی APIها، رفتار نهنگ‌ها، سبد مرکب، پیشگیری از سوگیری‌های احساسی و الزامات اعتماد به هوش مصنوعی.'
                  : 'Complete architecture covering production Gradle files, API zero-trust security, top crypto evaluation, whale trap dynamics, compound portfolios, and AI governance.'}
              </p>
            </div>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 mt-1 text-xs">
          <button
            onClick={() => setActiveSubTab('gradle')}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'gradle'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-teal-400" />
            <span>{lang === 'fa' ? 'بیلد گریدل AAB/APK و امنیت API' : 'Gradle & Secure API'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('assets')}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'assets'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'fa' ? 'ارزهای برتر و بررسی ۲ سال اخیر' : 'Top Assets & 2Y Trades'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('traps')}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'traps'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'fa' ? 'کالبدشکافی تله نهنگ‌ها' : 'Whale Trap Anatomy'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('portfolio')}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'portfolio'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <PieChart className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'fa' ? 'معماری سبد مرکب و روانشناسی' : 'Compound Portfolio & Risk'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('wallet')}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'wallet'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <Wallet className="w-3.5 h-3.5 text-teal-400" />
            <span>{lang === 'fa' ? 'آموزش صرافی، کیف‌پول و واریز/برداشت' : 'Exchange & Wallets'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ai')}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'ai'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'fa' ? 'چرا هوش مصنوعی و حاکمیت VARA؟' : 'Why AI & VARA Governance'}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Gradle & Secure API Automation */}
      {activeSubTab === 'gradle' && (
        <div className="space-y-5">
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-teal-400" />
              <span>{lang === 'fa' ? 'پیکربندی گریدل برای AAB، APK و امضای ریلیز امن' : 'Android Gradle AAB & Release Signing Engine'}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {lang === 'fa'
                ? 'ساختار گریدل پروژه در مسیر android/app/build.gradle.kts و اسکریپت CI/CD در scripts/build_release_aab_apk.sh مستقر شده است.'
                : 'Automated release pipeline configured for dual output: Google Play App Bundle (.AAB) and Universal Signed (.APK).'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs font-mono">
              <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg">
                <span className="text-teal-400 font-bold block mb-1">Android App Bundle (.AAB)</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {lang === 'fa'
                    ? 'خروجی استاندارد گوگل‌پلی با قابلیت Dynamic Delivery، فشرده‌سازی خودکار منابع و کاهش ۳۵٪ حجم دانلود برای کاربر نهایی.'
                    : 'Target output for Play Store. Generates split APKs customized per device density and ABI.'}
                </p>
                <div className="mt-2 text-[10px] text-slate-500 bg-[#0A0F1D] p-1.5 rounded">
                  <code>./gradlew bundleRelease</code>
                </div>
              </div>

              <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg">
                <span className="text-teal-400 font-bold block mb-1">Universal Signed Release APK</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {lang === 'fa'
                    ? 'فایل مستقل APK با امضای ۴ لایه (V1, V2, V3, V4 Scheme)، کدهای مبهم‌سازی شده با ProGuard/R8 و عدم وابستگی به مارکت.'
                    : 'Standalone APK signed with cryptographic keystore (RSA 4096-bit), ready for direct enterprise distribution.'}
                </p>
                <div className="mt-2 text-[10px] text-slate-500 bg-[#0A0F1D] p-1.5 rounded">
                  <code>./gradlew assembleRelease</code>
                </div>
              </div>
            </div>
          </div>

          {/* Secure API Automation Guidelines */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-400" />
              <span>{lang === 'fa' ? 'اصول اتوماسیون کاملاً امن کلیدهای API (Zero-Trust API Architecture)' : 'Hardened API Automation Protocol'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#080C14] rounded-lg border border-slate-800">
                <span className="text-teal-300 font-bold block mb-1">۱. عدم درج مستقیم کلید (No Plaintext)</span>
                <p className="text-slate-400 text-[11px]">
                  کلیدهای خصوصی هرگز در کد کلاینت نوشته نمی‌شوند. ارتباط از طریق پروکسی امن سروری و توکن‌های موقت (Ephemeral) صورت می‌پذیرد.
                </p>
              </div>

              <div className="p-3 bg-[#080C14] rounded-lg border border-slate-800">
                <span className="text-teal-300 font-bold block mb-1">۲. امضای درخواست با HMAC-SHA256</span>
                <p className="text-slate-400 text-[11px]">
                  هر فراخوانی API همراه با Timestamp و Nonce یک‌بارمصرف هش می‌شود تا امکان حمله بازپخش (Replay Attack) کاملاً مسدود گردد.
                </p>
              </div>

              <div className="p-3 bg-[#080C14] rounded-lg border border-slate-800">
                <span className="text-teal-300 font-bold block mb-1">۳. پینینگ گواهی امنیتی (SSL Pinning)</span>
                <p className="text-slate-400 text-[11px]">
                  در فایل network_security_config.xml گواهی ریشه هش شده تا از شنود ترافیک به روش مرد میانی (Man-in-the-Middle) جلوگیری شود.
                </p>
              </div>

              <div className="p-3 bg-[#080C14] rounded-lg border border-slate-800">
                <span className="text-teal-300 font-bold block mb-1">۴. کلید سخت‌افزاری Android Keystore</span>
                <p className="text-slate-400 text-[11px]">
                  ذخیره‌سازی رمزنگاری‌شده در تراشه سخت‌افزاری دستگاه (StrongBox Keymaster) بدون امکان دسترسی حتی توسط روت سیستم‌عامل.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Top Assets & 2-Year Analysis */}
      {activeSubTab === 'assets' && (
        <div className="space-y-6">
          {/* Top Assets Matrix */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-teal-400" />
              <span>{lang === 'fa' ? 'ارزهای برتر بازار و ماتریس رتبه‌بندی ریسک' : 'Top Tier Market Assets Matrix'}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOP_MARKET_ASSETS.map((asset) => (
                <div key={asset.symbol} className="p-3.5 bg-[#080C14] border border-slate-800 rounded-lg text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-teal-300 font-mono">{asset.symbol}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {asset.tierFa}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white mt-1">{asset.nameFa}</h5>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{asset.keyStrengthFa}</p>
                  <div className="mt-2.5 pt-2 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>افت تاریخی: {asset.historicDrawdown}</span>
                    <span className="text-teal-400">نمره ریسک: {asset.riskScore}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historic Trades 2024-2026 */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'fa' ? 'بررسی معاملات فوق‌العاده سودآور و ورشکستگی‌های بزرگ ۲ سال اخیر' : 'Historic Trade Case Studies (2024 - 2026)'}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HISTORIC_TRADE_CASES.map((item) => {
                const isWin = item.type === 'MEGA_WINNER';
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border text-xs ${
                      isWin ? 'bg-[#091517] border-teal-500/40' : 'bg-[#180A0D] border-red-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-slate-300">{item.id}</span>
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isWin ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {item.roi}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-white mt-2">{item.titleFa}</h5>
                    <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">{item.summaryFa}</p>
                    <div className="mt-3 p-2 bg-[#080C14] rounded border border-slate-800 text-[11px]">
                      <span className="text-teal-400 font-bold block mb-0.5">درس بنیادین:</span>
                      <p className="text-slate-300">{item.coreLessonFa}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-2 font-mono">
                      محرک احساسی توده: {item.emotionalTriggerFa}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Whale Traps */}
      {activeSubTab === 'traps' && (
        <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>{lang === 'fa' ? 'کالبدشکافی تله نهنگ‌ها، شکار نقدینگی و دستکاری اردر بوک' : 'Anatomy of Whale Traps & Liquidity Sweeps'}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'fa'
                ? 'چگونه معامله‌گران نهادی با صدها میلیون دلار سرمایه، خطاهای شناختی و نقاط استاپ معامله‌گران خرد را شکار می‌کنند؟'
                : 'How high-capital market makers engineer artificial breakout traps and liquidations.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WHALE_TRAP_TACTICS.map((trap) => (
              <div key={trap.id} className="p-4 bg-[#080C14] border border-slate-800 rounded-xl text-xs space-y-2.5">
                <span className="font-mono text-[10px] text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  {trap.id}
                </span>
                <h5 className="font-bold text-white text-sm">{trap.nameFa}</h5>
                <p className="text-slate-300 text-xs leading-relaxed">{trap.mechanismFa}</p>

                <div className="p-2 bg-[#180A0D] rounded border border-red-500/30 text-[11px] text-red-300">
                  <span className="font-bold block mb-0.5">تله برای افراد کم‌تجربه:</span>
                  {trap.retailTrapFa}
                </div>

                <div className="p-2 bg-[#091517] rounded border border-teal-500/30 text-[11px] text-teal-300">
                  <span className="font-bold block mb-0.5">پروتکل دفاعی VARA:</span>
                  {trap.defenseProtocolFa}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: Compound Portfolio & Psychology */}
      {activeSubTab === 'portfolio' && (
        <div className="space-y-5">
          {/* Compound Portfolio */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" />
              <span>{lang === 'fa' ? 'معماری سبد مرکب (Composite Compound Portfolio)' : 'Compound Portfolio Allocation'}</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {COMPOUND_PORTFOLIO_MODEL.definitionFa}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              {COMPOUND_PORTFOLIO_MODEL.allocationGrid.map((row, idx) => (
                <div key={idx} className="p-3 bg-[#080C14] rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-400 font-mono font-bold text-base">{row.percent}</span>
                    <span className="text-[10px] text-slate-500 font-mono">وزن تخصیص</span>
                  </div>
                  <h6 className="font-bold text-white mt-1">{row.assetClassFa}</h6>
                  <span className="text-teal-300 font-mono text-[11px] block mt-0.5">{row.assets}</span>
                  <p className="text-slate-400 text-[10px] mt-1">{row.roleFa}</p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg text-xs text-slate-300">
              <span className="text-teal-400 font-bold block mb-1">مکانیزم بازتنظیم دوره‌ای (Rebalancing Rule):</span>
              <p className="text-slate-400 text-[11px]">{COMPOUND_PORTFOLIO_MODEL.rebalancingRulesFa}</p>
            </div>
          </div>

          {/* Emotional Biases */}
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{lang === 'fa' ? 'خطرات کشنده تصمیمات احساسی و سوگیری‌های شناختی' : 'Psychological Trading Pitfalls'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#080C14] rounded border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">فومو (FOMO - ترس از جا ماندن)</span>
                <p className="text-slate-400 text-[11px]">{EMOTIONAL_RISKS_SUMMARY.fomoFa}</p>
              </div>
              <div className="p-3 bg-[#080C14] rounded border border-slate-800">
                <span className="text-red-400 font-bold block mb-1">معاملات انتقامی (Revenge Trading)</span>
                <p className="text-slate-400 text-[11px]">{EMOTIONAL_RISKS_SUMMARY.revengeFa}</p>
              </div>
              <div className="p-3 bg-[#080C14] rounded border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">اثر تمایل (Disposition Effect)</span>
                <p className="text-slate-400 text-[11px]">{EMOTIONAL_RISKS_SUMMARY.dispositionFa}</p>
              </div>
              <div className="p-3 bg-[#080C14] rounded border border-slate-800">
                <span className="text-slate-300 font-bold block mb-1">مغالطه هزینه از دست رفته (Sunk Cost)</span>
                <p className="text-slate-400 text-[11px]">{EMOTIONAL_RISKS_SUMMARY.sunkCostFa}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: Wallet & Exchange Masterclass */}
      {activeSubTab === 'wallet' && (
        <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Wallet className="w-4 h-4 text-teal-400" />
              <span>{lang === 'fa' ? 'راهنمای گام‌به‌گام صرافی‌ها، کیف‌پول‌ها و پروتکل امن واریز/برداشت' : 'Exchange & Secure Custody Protocol'}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'fa'
                ? 'دستورالعمل‌های حیاتی برای پیشگیری از هک، فیشینگ، مسمومیت آدرس و از دست رفتن سرمایه.'
                : 'Operational steps for exchange onboarding, cold storage, and non-custodial transfer verification.'}
            </p>
          </div>

          <div className="space-y-3">
            {WALLET_EXCHANGE_MASTERCLASS.stepsFa.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-[#080C14] border border-slate-800 rounded-lg text-xs">
                <h6 className="font-bold text-teal-300 text-sm mb-1">{item.step}</h6>
                <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">{item.descFa}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: Why AI Governance */}
      {activeSubTab === 'ai' && (
        <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              <span>{lang === 'fa' ? 'چرا اتوماسیون و حاکمیت هوش مصنوعی (VARA) در بازارهای مدرن حیاتی است؟' : 'Why AI & Deterministic Governance are Essential'}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'fa'
                ? 'پاسخ علمی به ضرورت جایگزینی احساسات انسانی با ناورداهای ریاضی و تصمیم‌گیری فوق‌سریع هوش مصنوعی.'
                : 'Overcoming human cognitive biases with zero-latency programmatic invariants and mathematical replay guarantees.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHY_AI_RISK_GOVERNANCE.reasonsFa.map((reason, idx) => (
              <div key={idx} className="p-4 bg-[#080C14] border border-slate-800 rounded-xl text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <h5 className="font-bold text-white text-sm">{reason.title}</h5>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
