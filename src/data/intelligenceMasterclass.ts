/**
 * VARA MODEL v2.0 — FINANCIAL INTELLIGENCE, RISK MASTERCLASS & AUTOMATION ARCHITECTURE
 * Complete knowledge base, risk mechanics, whale traps, portfolio design & secure deployment.
 */

export interface MarketAsset {
  symbol: string;
  name: string;
  nameFa: string;
  tier: 'TIER-1 (SOVEREIGN RESERVE)' | 'TIER-1 (SETTLEMENT)' | 'TIER-1 (HIGH-THROUGHPUT)' | 'INFRASTRUCTURE' | 'STABLECOIN';
  tierFa: string;
  role: string;
  roleFa: string;
  riskScore: number; // 1-10
  historicDrawdown: string;
  keyStrengthFa: string;
  keyStrengthEn: string;
  riskFactorFa: string;
  riskFactorEn: string;
}

export interface TradeCaseStudy {
  id: string;
  titleFa: string;
  titleEn: string;
  type: 'MEGA_WINNER' | 'CATASTROPHIC_LOSS';
  period: '2024 - 2026';
  roi: string;
  summaryFa: string;
  summaryEn: string;
  coreLessonFa: string;
  coreLessonEn: string;
  emotionalTrigger: string;
  emotionalTriggerFa: string;
}

export interface WhaleTrapTactic {
  id: string;
  nameFa: string;
  nameEn: string;
  mechanismFa: string;
  mechanismEn: string;
  retailTrapFa: string;
  retailTrapEn: string;
  defenseProtocolFa: string;
  defenseProtocolEn: string;
}

export const TOP_MARKET_ASSETS: MarketAsset[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    nameFa: 'بیت‌کوین (طلای دیجیتال)',
    tier: 'TIER-1 (SOVEREIGN RESERVE)',
    tierFa: 'لایه ذخیره ارزش نهادی و حاکمیتی',
    role: 'Hard Monetary Asset & Benchmark',
    roleFa: 'سرمایه سخت پایه و لنگر سنجش کل اکوسیستم',
    riskScore: 3,
    historicDrawdown: '-77% (Cycle Max)',
    keyStrengthFa: 'سقف قطعی ۲۱ میلیون واحد، امنیت اثبات کار غیرقابل‌تغییر، پذیرش گسترده ETFهای وال‌استریت.',
    keyStrengthEn: '21M hard cap, immutable PoW security, institutional Wall Street ETF inflows.',
    riskFactorFa: 'نوسانات ناشی از چرخه نقدینگی جهانی و حساسیت به نرخ بهره فدرال رزرو.',
    riskFactorEn: 'Global liquidity cycle sensitivity and macroeconomic interest rate correlations.'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    nameFa: 'اتریوم (رایانه تسویه جهانی)',
    tier: 'TIER-1 (SETTLEMENT)',
    tierFa: 'لایه تسویه قراردادهای هوشمند و دیفای',
    role: 'Decentralized Application Layer',
    roleFa: 'بزرگ‌ترین اکوسیستم دیفای، استیکینگ و راهکارهای لایه دوم',
    riskScore: 4,
    historicDrawdown: '-82% (Cycle Max)',
    keyStrengthFa: 'بیشترین ارزش قفل‌شده (TVL)، مکانیزم کاهش تورم EIP-1559، پشتوانه بیش از ۹۰ درصد دارایی‌های دنیای واقعی (RWA).',
    keyStrengthEn: 'Dominant TVL, EIP-1559 fee burns, institutional collateral layer for RWA.',
    riskFactorFa: 'توزیع نقدینگی در لایه‌های دوم (Layer-2 Fragmentation) و کارمزدهای گس در زمان ترافیک بالا.',
    riskFactorEn: 'Layer-2 liquidity fragmentation and baseline gas variability.'
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    nameFa: 'سولانا (زیرساخت پرسرعت)',
    tier: 'TIER-1 (HIGH-THROUGHPUT)',
    tierFa: 'لایه یک یکپارچه با عملکرد فوق‌سریع',
    role: 'High-Frequency Consumer Web3',
    roleFa: 'پردازش همزمان تراکنش‌ها با کارمزد بسیار پایین و سرعت بالا',
    riskScore: 6,
    historicDrawdown: '-96% (FTX Collapse, followed by 25x recovery)',
    keyStrengthFa: 'توان پردازش بیش از ۲,۵۰۰ تراکنش در ثانیه، تجربه کاربری روان، جریان عظیم کاربران خرد و میم‌کوین‌ها.',
    keyStrengthEn: '2,500+ real TPS, sub-second finality, unparalleled retail DEX trading volume.',
    riskFactorFa: 'الزامات سخت‌افزاری سنگین برای اعتبارسنج‌ها و سابقه قطعی موضعی شبکه در گذشته.',
    riskFactorEn: 'Validator hardware demands and past historical network outages.'
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    nameFa: 'چین‌لینک (ستون فقرات اوراکل)',
    tier: 'INFRASTRUCTURE',
    tierFa: 'پل ارتباطی داده‌های مالی به بلاک‌چین',
    role: 'Cross-Chain & Institutional Oracle',
    roleFa: 'تأمین قیمت و پیام‌رسانی امن بین‌زنجیره‌ای (CCIP) برای سوئیفت و بانک‌ها',
    riskScore: 5,
    historicDrawdown: '-88%',
    keyStrengthFa: 'انحصار واقعی در داده‌های قیمت‌گذاری دیفای، شراکت‌های بین‌المللی با DTCC و سیستم بانکی سنتی.',
    keyStrengthEn: 'De facto oracle monopoly, institutional standard for tokenized RWA settlement.',
    riskFactorFa: 'وابستگی درآمدی به حجم معاملات کلی دیفای و سرعت استقرار برنامه‌ها.',
    riskFactorEn: 'Revenue correlation with aggregate on-chain transaction volumes.'
  },
  {
    symbol: 'USDC / USDT',
    name: 'Institutional Stablecoins',
    nameFa: 'استیبل‌کوین‌های دلاری تنظیم‌شده',
    tier: 'STABLECOIN',
    tierFa: 'ذخیره نقدینگی و بازده بدون جهت',
    role: 'Dry Powder & Risk Off Asset',
    roleFa: 'حفظ ارزش ریالی/دلاری و آماده‌باش برای خرید در ریزش‌های بزرگ',
    riskScore: 2,
    historicDrawdown: '0.00% (Occasional micro-depegs)',
    keyStrengthFa: 'تضمین نقدشوندگی آنی، امکان کسب سود بدون ریسک جهت‌دار (Cash and Carry Arbitrage).',
    keyStrengthEn: 'Instant liquidity, underlying US Treasury backing, risk-off capital preservation.',
    riskFactorFa: 'ریسک نظارتی، تحریم‌های احتمالی و الزام نگهداری در کیف‌پول‌های شخصی امن.',
    riskFactorEn: 'Jurisdictional compliance and centralized counterparty freeze risks.'
  }
];

export const HISTORIC_TRADE_CASES: TradeCaseStudy[] = [
  {
    id: 'CASE-01',
    titleFa: 'احیای فوق‌العاده سولانا (Solana 25x Resilience Trade)',
    titleEn: 'Solana Macro Recovery (2024-2025)',
    type: 'MEGA_WINNER',
    period: '2024 - 2026',
    roi: '+2,400% (از ۸ دلار تا ۲۱۰+ دلار)',
    summaryFa: 'پس از سقوط صرافی FTX، احساسات منفی افراطی قیمت SOL را به ۸ الی ۱۰ دلار رساند در حالی که توسعه‌دهندگان شبکه فعال باقی ماندند. سرمایه‌گذاران داده‌محور که به جای احساسات به معیارهای زنجیره‌ای (On-chain Active Addresses) نگاه کردند، بازدهی ۲۵ برابری کسب نمودند.',
    summaryEn: 'Extreme despair post-FTX drove SOL to $8-10 despite developer metrics remaining robust. Data-driven contrarians looking past sentiment captured a 25x asymmetric upside.',
    coreLessonFa: 'بزرگ‌ترین سودها زمانی ساخته می‌شوند که قیمت به خاطر ترس عمومی تخفیف افراطی می‌خورد اما زیرساخت و توسعه بنیادی زنده است.',
    coreLessonEn: 'Maximum asymmetrical reward emerges when general panic creates deep discounts on fundamentally active protocols.',
    emotionalTriggerFa: 'ترس افراطی (Extreme Fear) و وحشت عمومی از مرگ پروژه.',
    emotionalTrigger: 'Extreme Fear & Herd Capitulation'
  },
  {
    id: 'CASE-02',
    titleFa: 'موج توکن‌های زیرساخت هوش مصنوعی (AI & DePIN Rally)',
    titleEn: 'Decentralized AI & DePIN Compute Surge',
    type: 'MEGA_WINNER',
    period: '2024 - 2026',
    roi: '+800% تا +2,100% (پروژه‌هایی نظیر TAO, RNDR, FET)',
    summaryFa: 'همگرایی رونق هوش مصنوعی در سیلیکون ولی با پردازش ابری غیرمتمرکز رمزارزی، نقدینگی عظیمی را به سمت پردازنده‌های گرافیکی توکنیزه‌شده هدایت کرد. کسانی که رویکرد سبد مرکب در حوزه AI داشتند سودهای عظیمی ساختند.',
    summaryEn: 'Convergence of generative AI demand with decentralized GPU networks unlocked immense liquidity for tokens with real computational demand.',
    coreLessonFa: 'همسویی با ترندهای کلان فناوری جهانی (Macro Trends) شانس سودهای چند ده برابری را به شدت افزایش می‌دهد.',
    coreLessonEn: 'Positioning in structural macro waves outperforms micro-level technical chart patterns.',
    emotionalTriggerFa: 'درک زودهنگام نوآوری در مقابل بی‌تفاوتی اولیه بازار.',
    emotionalTrigger: 'Early Narrative Adoption'
  },
  {
    id: 'CASE-03',
    titleFa: 'تله لیکوئید شدن در اهرم‌های بالا در سقوط آگوست ۲۰۲۴',
    titleEn: 'Overleveraged Long Squeeze (August 2024 Yen Unwind)',
    type: 'CATASTROPHIC_LOSS',
    period: '2024 - 2026',
    roi: '-100% (بیش از ۱.۴ میلیارد دلار لیکوئیدی در ۲۴ ساعت)',
    summaryFa: 'با بسته شدن ترید ین ژاپن (Yen Carry Trade Unwind)، بیت‌کوین و اتریوم ظرف چند ساعت افتی ۱۵ الی ۲۵ درصدی تجربه کردند. معامله‌گرانی که از اهرم‌های 10x تا 50x استفاده می‌کردند بدون استاپ‌لاس صلب به کلی صفر شدند، در حالی که معامله‌گران اسپات ظرف چند هفته در سود قرار گرفتند.',
    summaryEn: 'The unwinding of the Japanese Yen carry trade triggered a flash liquidation cascade wiping over $1.4B in leveraged margin longs in hours.',
    coreLessonFa: 'اهرم بالا در بازارهای پرنوسان قاتل سرمایه است. سیستم‌های بدون مدارشکن (Circuit Breaker) در رویدادهای پیش‌بینی‌نشده نابود می‌شوند.',
    coreLessonEn: 'High leverage without hard programmatic risk bounds turns probabilistic volatility into permanent capital loss.',
    emotionalTriggerFa: 'طمع افراطی (Greed)، اعتماد به نفس کاذب و توهم کنترل بازار.',
    emotionalTrigger: 'Greed, Overconfidence & High Leverage'
  },
  {
    id: 'CASE-04',
    titleFa: 'کابوس توکن‌های Low-Float / High-FDV و راگ‌پول میم‌کوین‌ها',
    titleEn: 'Low Float Tokenomic Dilution & Meme Rug-Pulls',
    type: 'CATASTROPHIC_LOSS',
    period: '2024 - 2026',
    roi: '-75% تا -99.9% (توکن‌های عرضه محدود و هزاران میم‌کوین فریبنده)',
    summaryFa: 'توکن‌هایی که با ارزش بازار رقیق‌شده (FDV) چندین میلیارد دلاری عرضه شدند اما تنها ۵ تا ۱۰ درصد توکن‌ها در گردش بود، با بازگشایی توکن‌ها (Unlock) و فروش سرمایه‌گذاران اولیه، سقوط‌های ممتد تجربه کردند. همچنین در بستر پلتفرم‌های ساخت سریع میم‌کوین، بیش از ۹۹ درصد خریداران دارایی خود را از دست دادند.',
    summaryEn: 'Projects launched with predatory low initial floats and massive FDVs continuously bled as VC unlocks dumped on retail. 99% of meme speculation resulted in total capital wipeout.',
    coreLessonFa: 'هرگز بدون بررسی برنامه آزادسازی توکن‌ها (Tokenomics Unlock Schedule) و قرارداد هوشمند سرمایه‌گذاری نکنید.',
    coreLessonEn: 'Never purchase tokens without rigorous analysis of vesting schedules, lockups, and unencumbered float.',
    emotionalTriggerFa: 'فومو (FOMO) ناشی از تبلیغات اینفلوئنسرها و شبکه‌های اجتماعی.',
    emotionalTrigger: 'Influencer FOMO & Lottery Ticket Fallacy'
  }
];

export const WHALE_TRAP_TACTICS: WhaleTrapTactic[] = [
  {
    id: 'TRAP-01',
    nameFa: 'تله گاو و شکست صوری (Bull Trap & Fakeout)',
    nameEn: 'Bull Trap & Liquidity Sweep',
    mechanismFa: 'نهنگ‌ها با ثبت خریدهای حجیم در تایم‌فریم کوتاه، قیمت را از سقف مقاومت آشکار (Resistance) عبور می‌دهند. معامله‌گران خرد به گمان شروع روند صعودی وارد معامله لانگ شده یا اردرهای حدضرر شورت‌ها فعال می‌شود. بلافاصله نهنگ کل دارایی خود را به این نقدینگی خریداران می‌فروشد و قیمت با شتاب فرو می‌ریزد.',
    mechanismEn: 'Whales aggressively pump price slightly above key resistance, triggering retail breakout orders and short stop-losses, providing the exit liquidity needed to dump massive inventory.',
    retailTrapFa: 'ورود بر اساس فومو و قرار دادن استاپ‌لاس در نقطه ورود.',
    retailTrapEn: 'Entering breakouts without volume confirmation and moving stops prematurely.',
    defenseProtocolFa: 'منتظر بمانید تا کندل بالای سطح تثبیت شود (Retest) و شاخص دلتا حجم (Cumulative Volume Delta) تأیید خرید واقعی دهد، نه فقط پر شدن سفارشات فروش.',
    defenseProtocolEn: 'Require daily close retests and verify cumulative volume delta (CVD) absorption before entering breakout structures.'
  },
  {
    id: 'TRAP-02',
    nameFa: 'شکار حد ضرر در کف‌ها (Stop-Loss Hunt / Bear Trap)',
    nameEn: 'Stop Hunt & Absorption in Support Zones',
    mechanismFa: 'قیمت به زیر یک خط حمایت بسیار مشخص فشرده می‌شود تا معامله‌گران محافظه‌کار تسلیم شده و استاپ‌لاس‌های خود را فعال کنند (که اردرهای فروش در بازار آزاد هستند). نهنگ در این حراج مصنوعی، تمام این اردرها را با ارزان‌ترین قیمت ممکن می‌بلعد و بلافاصله کندل V شکل صعودی می‌سازد.',
    mechanismEn: 'Aggressive selling pushes price right beneath psychological support levels to trigger concentrated stop-loss sell orders, which institutions absorb at fire-sale discounts.',
    retailTrapFa: 'فروش در کف با وحشت ناشی از شکستن حمایت.',
    retailTrapEn: 'Panic selling at the precise moment of maximum liquidity capture.',
    defenseProtocolFa: 'استفاده از حدضرر مبتنی بر نوسان واقعی (ATR) به جای خطوط چشمی، و پرهیز از گذاشتن استاپ در رندترین اعداد.',
    defenseProtocolEn: 'Implement Average True Range (ATR) based trailing stops rather than predictable horizontal level stops.'
  },
  {
    id: 'TRAP-03',
    nameFa: 'دیوار خرید و فروش صوری (Spoofing & Fake Order Books)',
    nameEn: 'Spoofing & Ghost Liquidity Placement',
    mechanismFa: 'قرار دادن سفارش‌های عظیم خرید (Bid) یا فروش (Ask) در دفتر سفارشات صرافی بدون قصد اجرای آن‌ها، و سپس کنسل کردن آن‌ها درست قبل از رسیدن قیمت. این کار خطای شناختی برای ربات‌ها و معامله‌گران خرد ایجاد می‌کند که تقاضا یا عرضه شدیدی در راه است.',
    mechanismEn: 'Flash placement of massive non-intended limit orders in order books to manipulate depth charts and mislead retail algorithmic models before rapid cancellation.',
    retailTrapFa: 'قضاوت کردن روند بازار صرفاً با نگاه به دفتر سفارشات (Depth Chart).',
    retailTrapEn: 'Relying naively on raw exchange order book depth charts.',
    defenseProtocolFa: 'فقط به معاملات انجام‌شده قطعی (Time & Sales / Tape) اعتماد کنید نه سفارش‌های در صف انتظار.',
    defenseProtocolEn: 'Rely exclusively on executed trades (Time and Sales tape) rather than dynamic resting book depth.'
  }
];

export const EMOTIONAL_RISKS_SUMMARY = {
  fomoFa: 'فومو (FOMO): ترس از دست دادن فرصت که باعث می‌شود فرد در اوج هیجان بازار و در گران‌ترین قیمت خرید کند. درمان: پایبندی به برنامه از پیش نوشته شده و خرید پله‌ای در نقاط اصلاح.',
  revengeFa: 'معاملات انتقامی (Revenge Trading): تلاش برای پس گرفتن سریع زیان قبلی با افزایش حجم و اهرم. نتیجه آن در ۹۵٪ مواقع نابودی باقیمانده سرمایه است.',
  dispositionFa: 'اثر تمایل (Disposition Effect): تمایل روانی به بستن سریع سودهای کوچک (+۵٪) به خاطر ترس از دست رفتن آن، و باز نگه داشتن ضررهای بزرگ (-۵۰٪) به امید واهی بازگشت قیمت.',
  sunkCostFa: 'مغالطه هزینه از دست رفته (Sunk Cost Fallacy): ادامه سرمایه‌گذاری روی یک پروژه یا توکن مرده صرفاً به این دلیل که قبلاً پول زیادی برای آن پرداخت شده است.'
};

export const COMPOUND_PORTFOLIO_MODEL = {
  definitionFa: 'سبد مرکب (Composite Compound Portfolio): یک معماری سرمایه‌گذاری علمی است که دارایی‌ها را نه بر اساس حدس و گمان، بلکه بر مبنای بودجه‌بندی ریسک، همبستگی ناهمگن و بازتنظیم خودکار ترکیب می‌کند تا سود ناشی از اثر مرکب (Compound Effect) در گذر زمان به حداکثر و افت ارزش سرمایه (Drawdown) به حداقل برسد.',
  definitionEn: 'A risk-budgeted allocation model pairing non-correlated assets, automated rebalancing, and asymmetric yield generation to maximize multi-year compound geometric returns while bounding maximum drawdown.',
  allocationGrid: [
    { assetClassFa: 'لنگر امن ارزش و ثروت', assetClassEn: 'Sovereign Core Store of Value', percent: '50%', assets: 'BTC (35%) + ETH (15%)', roleFa: 'حفاظت در برابر تورم و ستون فقرات سبد' },
    { assetClassFa: 'پروتکل‌های پرسرعت و زیرساخت', assetClassEn: 'High-Throughput L1 & Oracles', percent: '20%', assets: 'SOL (12%) + LINK/DePIN (8%)', roleFa: 'رشد شتابان در دوره‌های رونق فناوری' },
    { assetClassFa: 'ذخیره نقدینگی و بازده ثابت', assetClassEn: 'Cash & Low-Risk Yield (Dry Powder)', percent: '20%', assets: 'USDC / Treasury Stablecoins', roleFa: 'سلاح خرید در ریزش‌های وحشتناک بازار' },
    { assetClassFa: 'فرصت‌های رشد نامتقارن (کنترل‌شده)', assetClassEn: 'Asymmetric High-Beta Plays', percent: '10%', assets: 'Emerging AI / Real World Assets', roleFa: 'پتانسیل بازدهی بالا با حدضرر قطعی' }
  ],
  rebalancingRulesFa: 'قانون بازتنظیم: اگر در پایان هر فصل وزن یک دارایی بیش از ۵ درصد جابجا شود (مثلاً بیت‌کوین به ۶۰٪ برسد)، سود اضافی فروخته شده و به بخش نقدینگی یا دارایی‌های جا مانده اضافه می‌شود تا سود به صورت مرکب ذخیره شود.'
};

export const WALLET_EXCHANGE_MASTERCLASS = {
  stepsFa: [
    {
      step: '۱. انتخاب صرافی و احراز هویت (KYC)',
      descFa: 'انتخاب صرافی‌های معتبر با اثبات ذخایر (Proof of Reserves). ثبت نام با ایمیل امن و اختصاصی، ارسال مدارک قانونی و تکمیل احراز هویت دو مرحله‌ای.'
    },
    {
      step: '۲. فعال‌سازی فوری لایه‌های امنیتی حساب',
      descFa: 'الف) نصب نرم‌افزار Google Authenticator یا Aegis و حذف کامل تأیید پیامکی (SMS) جهت پیشگیری از حمله تعویض سیم‌کارت (SIM Swap).\nب) فعال‌سازی کد ضد فیشینگ (Anti-Phishing Code) برای ایمیل‌ها.\nج) فعال‌سازی وایت‌لیست آدرس‌های برداشت (Address Whitelisting) با قفل زمانی ۲۴ تا ۴۸ ساعته.'
    },
    {
      step: '۳. انتقال به کیف‌پول شخصی و تمایز Cold vs Hot',
      descFa: 'صرافی محل معامله است نه نگهداری! مبالغ عمده را به کیف‌پول‌های سخت‌افزاری (Cold Wallet مانند Ledger یا Keystone) انتقال دهید. برای مبالغ معاملاتی روزمره از کیف‌پول‌های معتبر نرم‌افزاری (مانند Phantom یا Rabby) استفاده کنید.'
    },
    {
      step: '۴. حفاظت از عبارت بازیابی (Seed Phrase)',
      descFa: 'کلمات ۱۲ یا ۲۴ تایی بازیابی، قلب حساب شما هستند. هرگز از آن‌ها اسکرین‌شات نگیرید، در ایمیل یا پیام‌رسان‌ها ذخیره نکنید و آن‌ها را روی کاغذ یا پلاک‌های ضدحریق فلزی در محل امن نگه دارید.'
    },
    {
      step: '۵. اصول واریز و برداشت و انتخاب دقیق شبکه',
      descFa: 'هنگام واریز و برداشت رمزارز به شبکه‌ها (Network) دقت کنید:\n- برای دلار دیجیتال: تتر در شبکه ترون (TRC20) سریع و فراگیر است اما در اتریوم (ERC20) کارمزد بالاتری دارد. روی شبکه‌های آربیتروم یا سولانا ارزان و آنی است.\n- همیشه قبل از انتقال مبالغ بزرگ، یک تراکنش آزمایشی کوچک (Test Transaction) انجام دهید.'
    },
    {
      step: '۶. مقابله با خطرات مسمومیت آدرس و قراردادهای مخرب',
      descFa: 'هرگز آدرس مقصد را از سابقه تراکنش‌های گذشته کپی نکنید (Address Poisoning Attack). حداقل ۴ رقم اول و ۴ رقم آخر آدرس را کاراکتر به کاراکتر با کیف‌پول مقصد تطبیق دهید. به هیچ وجه به ایردراپ‌های ناشناس اجازه اتصال ندهید.'
    }
  ]
};

export const WHY_AI_RISK_GOVERNANCE = {
  reasonsFa: [
    {
      title: '۱. حذف قطعی احساسات و سوگیری‌های شناختی',
      desc: 'بزرگ‌ترین دشمن معامله‌گر، مغز بیولوژیکی اوست که در سود طمع می‌کند و در ضرر دچار فلج تحلیلی و معاملات انتقامی می‌شود. هوش مصنوعی VARA بدون خستگی، بدون ترس و بدون طمع تنها ناورداهای ریاضی را اجرا می‌کند.'
    },
    {
      title: '۲. سرعت واکنش زیر ۱۰۰ میلی‌ثانیه در مهار شوک‌ها',
      desc: 'در سقوط‌های ناگهانی بازار (مانند دپگ شدن استیبل‌کوین‌ها یا فلاش‌کرش‌ها)، یک انسان به ثانیه‌ها و دقیقه‌ها برای خواندن اخبار و باور واقعیت نیاز دارد. مدارشکن‌های خودکار هوش مصنوعی پیش از تخریب سرمایه مدار را قطع و مواضع خطرناک را هج می‌کنند.'
    },
    {
      title: '۳. اجرای قطعی و بدون ابهام قوانین صلب (Invariants)',
      desc: 'سیستم‌های سنتی به دلیل تصمیمات متناقض مدیران دچار شکست می‌شوند. معماری VARA با بهره‌گیری از مُهر بازپخش قطعی (Deterministic Replay Seal) تضمین می‌کند هیچ مدیری نتواند برای فرار از قوانین، پارامترهای ریسک را دستکاری کند.'
    },
    {
      title: '۴. مدیریت بهینه سبد مرکب در تمام شرایط بازار',
      desc: 'هوش مصنوعی به صورت ۲۴ ساعته انحراف وزن دارایی‌ها، همبستگی‌های پنهان میان توکن‌ها و ریسک طرف مقابل را ارزیابی و بازتنظیم می‌کند؛ کاری که فراتر از توان پردازش روزمره هر تیم معامله‌گری سنتی است.'
    }
  ]
};
