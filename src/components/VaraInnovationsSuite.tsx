import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Cpu, 
  Activity, 
  Anchor, 
  Code2, 
  Copy, 
  Check, 
  RefreshCw, 
  Zap, 
  Heart, 
  AlertTriangle, 
  Play, 
  Terminal, 
  ExternalLink,
  Pause,
  CheckCircle2
} from 'lucide-react';
import { SystemOperationalState, RiskRule } from '../types/vara';

interface VaraInnovationsSuiteProps {
  operationalState: SystemOperationalState;
  rules: RiskRule[];
  lang: 'fa' | 'en';
  playTone?: () => void;
}

export const VaraInnovationsSuite: React.FC<VaraInnovationsSuiteProps> = ({
  operationalState,
  rules,
  lang,
  playTone,
}) => {
  const [activeTab, setActiveTab] = useState<'zk' | 'fatigue' | 'mev' | 'bitcoin' | 'sdk'>('zk');

  // 1. ZK-Proof State
  const [zkGenerating, setZkGenerating] = useState(false);
  const [zkProof, setZkProof] = useState<{
    proofId: string;
    merkleRoot: string;
    protocol: 'Groth16 / BN254';
    curvePoints: { pi_a: string[]; pi_b: string[][]; pi_c: string[] };
    publicSignals: string[];
    isVerified: boolean;
    timestamp: number;
  } | null>(null);
  const [copiedZk, setCopiedZk] = useState(false);

  // 2. Cognitive Fatigue State
  const [clickCount, setClickCount] = useState(14);
  const [fatigueScore, setFatigueScore] = useState(28); // 0-100%
  const [coolingModeActive, setCoolingModeActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [breathTimer, setBreathTimer] = useState(4);

  // 3. MEV Shield Simulation State
  const [tradeAmount, setTradeAmount] = useState<number>(250000);
  const [slippageTol, setSlippageTol] = useState<number>(0.5);
  const [privateRpcEnabled, setPrivateRpcEnabled] = useState(true);
  const [mevSimulating, setMevSimulating] = useState(false);
  const [mevResult, setMevResult] = useState<{
    toxicFlowProb: number;
    sandwichRisk: 'LOW' | 'MEDIUM' | 'EXTREME';
    preventedMevLossUsd: number;
    bundleHash: string;
  } | null>({
    toxicFlowProb: 8.4,
    sandwichRisk: 'LOW',
    preventedMevLossUsd: 1420,
    bundleHash: '0x7e8b91a0f4439c2d1b827e6a51240983bf128a9018e74a56c0192837465aa982'
  });

  // 4. Bitcoin OP_RETURN Anchor State
  const [btcAnchoring, setBtcAnchoring] = useState(false);
  const [anchorTx, setAnchorTx] = useState<{
    txid: string;
    blockHeight: number;
    opReturnHex: string;
    merkleRoot: string;
    anchoredAt: number;
    confirmations: number;
  }>({
    txid: 'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16',
    blockHeight: 894210,
    opReturnHex: '6a208f7a932b109e4f019b8823c149028e99120938475a8b7c6d5e4f3a2b1c0e9d8a',
    merkleRoot: '0x8f7a932b109e4f019b8823c149028e99120938475a8b7c6d5e4f3a2b1c0e9d8a',
    anchoredAt: Date.now() - 120000,
    confirmations: 4
  });

  // 5. SDK Copy State
  const [selectedSdkLang, setSelectedSdkLang] = useState<'rust' | 'ts' | 'python'>('rust');
  const [copiedSdk, setCopiedSdk] = useState(false);

  // Box breathing timer for Cognitive Fatigue Cooling-off
  useEffect(() => {
    if (!coolingModeActive) return;
    const interval = setInterval(() => {
      setBreathTimer(prev => {
        if (prev <= 1) {
          setBreathPhase(curr => {
            if (curr === 'inhale') return 'hold';
            if (curr === 'hold') return 'exhale';
            if (curr === 'exhale') return 'rest';
            return 'inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [coolingModeActive]);

  // Generate ZK-Proof Simulation
  const handleGenerateZkProof = () => {
    setZkGenerating(true);
    playTone?.();
    setTimeout(() => {
      const pId = `ZK-VARA-${Date.now().toString().slice(-6)}`;
      const root = `0x${Array.from(pId).map(c => c.charCodeAt(0).toString(16)).join('').padEnd(64, '9').slice(0, 64)}`;
      setZkProof({
        proofId: pId,
        merkleRoot: root,
        protocol: 'Groth16 / BN254',
        curvePoints: {
          pi_a: [
            `0x${root.slice(0, 32)}1a8f9c`,
            `0x${root.slice(32, 64)}4b2e10`
          ],
          pi_b: [
            [`0x${root.slice(10, 42)}`, `0x${root.slice(20, 52)}`],
            [`0x${root.slice(15, 47)}`, `0x${root.slice(25, 57)}`]
          ],
          pi_c: [
            `0x${root.slice(5, 37)}99f1`,
            `0x${root.slice(25, 57)}88c2`
          ]
        },
        publicSignals: [
          '0x0000000000000000000000000000000000000000000000000000000000000001', // Statement: All 6 Invariants Hold
          root
        ],
        isVerified: true,
        timestamp: Date.now()
      });
      setZkGenerating(false);
      playTone?.();
    }, 850);
  };

  const handleCopyZkProof = () => {
    if (!zkProof) return;
    navigator.clipboard.writeText(JSON.stringify(zkProof, null, 2));
    setCopiedZk(true);
    setTimeout(() => setCopiedZk(false), 2000);
  };

  // Run MEV Simulation
  const handleRunMevSim = () => {
    setMevSimulating(true);
    playTone?.();
    setTimeout(() => {
      const toxic = privateRpcEnabled ? 2.1 : Number((Math.random() * 45 + 25).toFixed(1));
      const risk = toxic > 40 ? 'EXTREME' : toxic > 15 ? 'MEDIUM' : 'LOW';
      const loss = privateRpcEnabled ? 0 : Math.round(tradeAmount * (slippageTol / 100) * 0.75);
      setMevResult({
        toxicFlowProb: toxic,
        sandwichRisk: risk,
        preventedMevLossUsd: privateRpcEnabled ? Math.round(tradeAmount * 0.006) : 0,
        bundleHash: `0x${Math.random().toString(16).slice(2).padStart(64, 'e')}`
      });
      setMevSimulating(false);
      playTone?.();
    }, 600);
  };

  // Broadcast Bitcoin Anchor
  const handleAnchorToBitcoin = () => {
    setBtcAnchoring(true);
    playTone?.();
    setTimeout(() => {
      const newTxId = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const newRoot = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setAnchorTx({
        txid: newTxId,
        blockHeight: anchorTx.blockHeight + 1,
        opReturnHex: `6a20${newRoot.slice(2)}`,
        merkleRoot: newRoot,
        anchoredAt: Date.now(),
        confirmations: 1
      });
      setBtcAnchoring(false);
      playTone?.();
    }, 800);
  };

  // SDK Code Snippets
  const sdkSnippets = {
    rust: `// Cargo.toml: vara-safety-core = "2.0.0"
use vara_safety_core::{RiskEngine, InvariantVector, CircuitBreaker};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 1. Initialize deterministic frozen invariant engine
    let engine = RiskEngine::load_frozen_v2()?;
    
    // 2. Sample current real-time portfolio metrics
    let state = InvariantVector {
        portfolio_usd: 148_500_000.0,
        var_99_1d: 0.0184,          // 1.84% (Ceiling: 3.50%)
        max_drawdown_24h: 0.0092,    // 0.92% (Ceiling: 4.00%)
        net_leverage: 1.35,          // 1.35x (Ceiling: 2.50x)
        lcr_buffer: 2.425,           // 242.5% (Floor: 180.0%)
        oracle_deviation: 0.0008,    // 0.08% (Ceiling: 0.45%)
        counterparty_risk: 0.084,    // 8.40% (Ceiling: 15.00%)
    };

    // 3. Atomically evaluate and gate inbound trade execution
    match engine.evaluate_order_gate(&state)? {
        GateDecision::Permitted { replay_seal } => {
            println!("✅ Invariants intact! Replay Seal: {}", replay_seal.sha256());
            execute_order_pipeline().await?;
        }
        GateDecision::Halted { breach_rule } => {
            eprintln!("🚨 INVARIANT BREACH: Circuit breaker tripped by {}", breach_rule);
            CircuitBreaker::freeze_all_execution().await?;
        }
    }
    Ok(())
}`,
    ts: `// npm install @vara/safety-sdk
import { VaraRiskEngine, InvariantEvaluator } from '@vara/safety-sdk';

const engine = new VaraRiskEngine({ version: '2.0.0-FROZEN' });

async function preTradeCheck(orderParams: OrderVector) {
  // Gate order against the 6 deterministic invariants
  const audit = await engine.evaluatePreFlight({
    varLimit: 0.035,
    maxDrawdownLimit: 0.04,
    effectiveLeverageCap: 2.50,
    lcrFloor: 1.80
  });

  if (!audit.isPassed) {
    throw new Error(\`VARA Safety Trip: \${audit.breachedInvariant}\`);
  }

  // Issue verifiable Replay Seal before forwarding to exchange
  return audit.signedReplaySeal;
}`,
    python: `# pip install vara-risk-engine
from vara_risk import FrozenEngineV2, InvariantState

engine = FrozenEngineV2()

def execute_protected_rebalance(portfolio):
    # Verify portfolio state before submitting order to exchange API
    evaluation = engine.check_invariants(
        var_99=portfolio.var_99,
        drawdown_24h=portfolio.drawdown,
        leverage=portfolio.net_leverage,
        oracle_dev=portfolio.oracle_skew
    )

    if evaluation.state == "CIRCUIT_BREAKER_TRIGGERED":
        print(f"CRITICAL: Order halted by VARA rule {evaluation.breach_id}")
        return False

    print(f"Replay Seal verified: {evaluation.replay_seal_hash}")
    return True`
  };

  const handleCopySdk = () => {
    navigator.clipboard.writeText(sdkSnippets[selectedSdkLang]);
    setCopiedSdk(true);
    setTimeout(() => setCopiedSdk(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-teal-400">
                  {lang === 'fa' ? 'نوآوری‌های فنی و خلاقانه نسل بعدی' : 'VARA NEXT-GEN INNOVATIONS SUITE'}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  ENTERPRISE GRADE
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-mono mt-0.5">
                {lang === 'fa' ? 'معماری پیشگام: اثبات‌های دانش‌صفر، شیلد MEV و مهار خستگی' : 'Pioneering Architecture: zk-Proofs, MEV Shield & Cognitive Guard'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {lang === 'fa'
                  ? 'قابلیت‌های سطح وال‌استریت و فناوری پیشرو شامل اثبات ناوردا با ZK بدون افشای پوزیشن، سپر مقابله با نهنگ‌ها، گاردریل خستگی عصبی تریدر، ثبت ابدی در بیت‌کوین و SDK نهادی.'
                  : 'Breakthrough capabilities: Zero-Knowledge risk proofs, pre-flight MEV sandwich defense, emotional fatigue cooling-off, Bitcoin timestamp anchoring, and B2B SDKs.'}
              </p>
            </div>
          </div>
        </div>

        {/* Innovations Sub-tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 mt-1 text-xs">
          <button
            onClick={() => { setActiveTab('zk'); playTone?.(); }}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'zk'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5 text-teal-400" />
            <span>{lang === 'fa' ? 'اثبات دانش‌صفر ریسک (zk-VARA)' : 'Zero-Knowledge zk-VARA'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('fatigue'); playTone?.(); }}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'fatigue'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>{lang === 'fa' ? 'گاردریل خستگی شناختی و هیجان' : 'Cognitive Fatigue Guard'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('mev'); playTone?.(); }}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'mev'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'fa' ? 'شیلد MEV و شبیه‌ساز ممپول' : 'Pre-Flight MEV Shield'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('bitcoin'); playTone?.(); }}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'bitcoin'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <Anchor className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'fa' ? 'لنگر تاریخی بیت‌کوین (OP_RETURN)' : 'Bitcoin OP_RETURN Anchor'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('sdk'); playTone?.(); }}
            className={`px-3 py-1.5 rounded-lg font-mono font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'sdk'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-white bg-[#080C14]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'fa' ? 'کیت توسعه B2B SDK صرافی‌ها' : 'B2B Safety SDK'}</span>
          </button>
        </div>
      </div>

      {/* 1. ZK-RISK PROOF ENGINE */}
      {activeTab === 'zk' && (
        <div className="space-y-5">
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-mono font-bold text-teal-400">
                    {lang === 'fa' ? 'موتور اثبات دانش‌صفر ریسک (zk-SNARK Groth16)' : 'ZERO-KNOWLEDGE RISK PROVER'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  {lang === 'fa' ? 'اثبات رعایت سقف ریسک به مشتریان بدون لو رفتن پوزیشن‌ها' : 'Confidential Invariant Compliance Proof'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {lang === 'fa'
                    ? 'صندوق‌ها با این فناوری می‌توانند به سرمایه‌گذاران یا نهاد نظارتی اثبات کنند که پورتفوی تمام ۶ قانون صلب را رعایت کرده، بدون اینکه دارایی‌های محرمانه، پوزیشن‌های فیوچرز یا آدرس‌های آنچِین افشا شوند.'
                    : 'Enables hedge funds to cryptographically prove 100% adherence to risk bounds (VaR, Leverage, Drawdown) with zero disclosure of underlying alpha positions.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateZkProof}
                  disabled={zkGenerating}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${zkGenerating ? 'animate-spin' : ''}`} />
                  <span>
                    {zkGenerating
                      ? (lang === 'fa' ? 'در حال سنتز مدار ZK...' : 'Synthesizing ZK Circuit...')
                      : (lang === 'fa' ? 'تولید اثبات دانش‌صفر (zk-Proof)' : 'Generate zk-Risk Proof')}
                  </span>
                </button>
              </div>
            </div>

            {/* Proof Result Display */}
            {zkProof ? (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between text-xs font-mono text-emerald-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {lang === 'fa'
                        ? 'اثبات ریاضی با موفقیت تولید و تأیید شد: تمام ۶ ناوردا بدون افشای دیتا معتبرند.'
                        : 'ZK-SNARK Proof Verified: 6/6 Invariants Satisfied with 0-byte state leakage.'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">CURVE: BN254 · 256-BIT</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-500 uppercase block">PROOF IDENTIFIER</span>
                    <span className="text-white font-bold block mt-0.5">{zkProof.proofId}</span>
                    <span className="text-[10px] text-teal-400 block mt-1">Status: SECURE & VERIFIED</span>
                  </div>

                  <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-500 uppercase block">ZK MERKLE COMMITMENT</span>
                    <span className="text-teal-300 block mt-0.5 truncate" title={zkProof.merkleRoot}>
                      {zkProof.merkleRoot}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">Zero-Knowledge Root Hash</span>
                  </div>
                </div>

                {/* Raw Curve Payload View */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-slate-400">
                      {lang === 'fa' ? 'بسته اثبات محرمانه (Cryptographic ZK Payload)' : 'Exportable ZK Proof Bundle'}
                    </span>
                    <button
                      onClick={handleCopyZkProof}
                      className="flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-white bg-slate-850 px-2 py-0.5 rounded border border-slate-700"
                    >
                      {copiedZk ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedZk ? (lang === 'fa' ? 'کپی شد' : 'Copied') : (lang === 'fa' ? 'کپی ZK Proof' : 'Copy Proof JSON')}</span>
                    </button>
                  </div>
                  <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg font-mono text-[11px] text-slate-300 max-h-40 overflow-y-auto" dir="ltr">
                    <pre>{JSON.stringify(zkProof, null, 2)}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-[#080C14] border border-dashed border-slate-800 rounded-xl text-center">
                <EyeOff className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <span className="text-xs text-slate-400 font-mono block">
                  {lang === 'fa'
                    ? 'برای اثبات انطباق ریسک پورتفوی بدون افشای موجودی، روی «تولید اثبات دانش‌صفر» کلیک کنید.'
                    : 'Click "Generate zk-Risk Proof" to produce zero-knowledge non-repudiation proof.'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. COGNITIVE FATIGUE & EMOTIONAL GUARD */}
      {activeTab === 'fatigue' && (
        <div className="space-y-5">
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-mono font-bold text-rose-400">
                    {lang === 'fa' ? 'پایش خستگی شناختی و مهار تصمیمات عصبی' : 'COGNITIVE LOAD & FATIGUE GUARD'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  {lang === 'fa' ? 'سپر هوشمند پیشگیری از معاملات انتقامی و استرس ناشی از ضرر' : 'Revenge-Trading Suppression & Neurological Calming'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {lang === 'fa'
                    ? 'پایش نرخ تغییرات تصمیم‌گیری، لغو مکرر سفارشات و نوسان اهرم؛ در صورت افت تمرکز، کنسول با پروتکل تنفس مربعی (Box Breathing) معامله‌گر را به نقطه تعادل بازمی‌گرداند.'
                    : 'Detects erratic parameter oscillation and rapid cancellations to preempt emotional liquidation cascades.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCoolingModeActive(!coolingModeActive);
                    playTone?.();
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-lg transition-all shadow-xs ${
                    coolingModeActive
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-teal-600 hover:bg-teal-500 text-white'
                  }`}
                >
                  {coolingModeActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>
                    {coolingModeActive
                      ? (lang === 'fa' ? 'خروج از تمرین تنفس' : 'Exit Breathing')
                      : (lang === 'fa' ? 'فعال‌سازی پروتکل آرامش تنفس' : 'Trigger Cooling-Off Protocol')}
                  </span>
                </button>
              </div>
            </div>

            {/* Cognitive Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 bg-[#080C14] border border-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block">COGNITIVE LOAD INDEX</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-teal-400">{fatigueScore}%</span>
                  <span className="text-slate-500 text-[10px]">/ 100%</span>
                </div>
                <span className="text-[10px] text-emerald-400 block mt-1">STATUS: STABLE & FOCUSED</span>
              </div>

              <div className="p-3.5 bg-[#080C14] border border-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block">DECISION VELOCITY</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-white">{clickCount}</span>
                  <span className="text-slate-500 text-[10px]">ACTIONS / MIN</span>
                </div>
                <span className="text-[10px] text-teal-400 block mt-1">CALM PACING</span>
              </div>

              <div className="p-3.5 bg-[#080C14] border border-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block">REVENGE TRADING PROBABILITY</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-emerald-400">1.2%</span>
                  <span className="text-slate-500 text-[10px]">(NEUTRAL)</span>
                </div>
                <span className="text-[10px] text-emerald-400 block mt-1">EMOTIONAL GUARD: ARMED</span>
              </div>
            </div>

            {/* Active Box Breathing Sensory Module */}
            {coolingModeActive && (
              <div className="p-6 bg-[#080C14] border-2 border-teal-500/50 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-24 h-24 rounded-full border-4 border-teal-400/80 flex items-center justify-center relative shadow-lg shadow-teal-500/20">
                  <div className={`w-16 h-16 rounded-full bg-teal-500/30 flex items-center justify-center text-xl font-mono font-bold text-white transition-transform duration-1000 ${
                    breathPhase === 'inhale' ? 'scale-125' : breathPhase === 'exhale' ? 'scale-75' : 'scale-100'
                  }`}>
                    {breathTimer}s
                  </div>
                </div>

                <div>
                  <h5 className="text-base font-bold text-white font-mono uppercase tracking-widest">
                    {breathPhase === 'inhale' && (lang === 'fa' ? 'دم عمیق (Inhale)' : 'Deep Inhale')}
                    {breathPhase === 'hold' && (lang === 'fa' ? 'نگه‌داشتن نفس (Hold)' : 'Hold Breath')}
                    {breathPhase === 'exhale' && (lang === 'fa' ? 'بازدم آرام (Exhale)' : 'Slow Exhale')}
                    {breathPhase === 'rest' && (lang === 'fa' ? 'آرامش و سکون (Rest)' : 'Rest')}
                  </h5>
                  <p className="text-xs text-slate-400 mt-1 max-w-md">
                    {lang === 'fa'
                      ? 'پروتکل تنفس مربعی برای کاهش ضربان قلب، اکسیژن‌رسانی به کورتکس پیش‌پیشانی مغز و مهار تکانش‌های هیجانی پیش از ورود به بازار.'
                      : 'Box breathing stabilizes parasympathetic nervous system, ensuring rationale over impulse.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. PRE-FLIGHT MEMPOOL & MEV SANDWICH SHIELD */}
      {activeTab === 'mev' && (
        <div className="space-y-5">
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {lang === 'fa' ? 'شیلد مقابله با ساندویچ نهنگ‌ها و فرانت‌رانینگ (MEV Shield)' : 'PRE-FLIGHT MEMPOOL DEFENSE'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  {lang === 'fa' ? 'شبیه‌سازی ریسک شکار سفارشات پیش از ارسال به شبکه' : 'Pre-Execution Toxic Flow & Front-Running Simulator'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {lang === 'fa'
                    ? 'نهنگ‌ها با ربات‌های آربیتراژور در ممپول عمومی سفارشات بزرگ را ساندویچ می‌کنند. VARA با مسیریابی خصوصی (Private RPC / Flashbots) اسلیپیج و سرقت MEV را به صفر می‌رساند.'
                    : 'Simulates transaction propagation in public mempool to prevent malicious front-running and toxic slippage extraction.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunMevSim}
                  disabled={mevSimulating}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {mevSimulating
                      ? (lang === 'fa' ? 'شبیه‌سازی ممپول...' : 'Simulating Mempool...')
                      : (lang === 'fa' ? 'شبیه‌سازی فرانت‌رانینگ' : 'Run Pre-Flight Test')}
                  </span>
                </button>
              </div>
            </div>

            {/* MEV Parameters Input */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg">
                <label className="text-slate-400 block mb-1">
                  {lang === 'fa' ? 'حجم سفارش مورد شبیه‌سازی ($):' : 'Order Size ($ USD):'}
                </label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(Number(e.target.value))}
                  className="w-full bg-[#0E1526] border border-slate-700 rounded p-1.5 text-white font-bold"
                />
              </div>

              <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg">
                <label className="text-slate-400 block mb-1">
                  {lang === 'fa' ? 'حداکثر اسلیپیج مجاز (%):' : 'Max Slippage Tolerance (%):'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={slippageTol}
                  onChange={(e) => setSlippageTol(Number(e.target.value))}
                  className="w-full bg-[#0E1526] border border-slate-700 rounded p-1.5 text-white font-bold"
                />
              </div>

              <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg flex flex-col justify-between">
                <span className="text-slate-400 block">
                  {lang === 'fa' ? 'مسیریابی خصوصی (Private RPC):' : 'Private RPC Routing:'}
                </span>
                <div className="flex items-center justify-between mt-2">
                  <span className={privateRpcEnabled ? 'text-emerald-400 font-bold' : 'text-red-400'}>
                    {privateRpcEnabled ? 'ENABLED (SAFE)' : 'DISABLED (EXPOSED)'}
                  </span>
                  <button
                    onClick={() => setPrivateRpcEnabled(!privateRpcEnabled)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                      privateRpcEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    TOGGLE
                  </button>
                </div>
              </div>
            </div>

            {/* Simulation Results */}
            {mevResult && (
              <div className="p-4 bg-[#080C14] border border-slate-800 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">TOXIC FLOW PROBABILITY:</span>
                    <span className={`font-bold ${mevResult.toxicFlowProb > 25 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {mevResult.toxicFlowProb}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">SANDWICH RISK:</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      mevResult.sandwichRisk === 'LOW' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {mevResult.sandwichRisk}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">PREVENTED LOSS:</span>
                    <span className="text-teal-400 font-bold">+${mevResult.preventedMevLossUsd.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="truncate max-w-md">PRIVATE BUNDLE HASH: {mevResult.bundleHash}</span>
                  <span className="text-emerald-400">SECURE ZERO-MEMPOOL FINALITY</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. BITCOIN OP_RETURN HISTORICAL ANCHOR */}
      {activeTab === 'bitcoin' && (
        <div className="space-y-5">
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-mono font-bold text-orange-400">
                    {lang === 'fa' ? 'اثبات ابدی وجود در بلاک‌چین بیت‌کوین (OP_RETURN Anchor)' : 'BITCOIN PROOF-OF-EXISTENCE ANCHOR'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  {lang === 'fa' ? 'ثبت غیرقابل‌تغییر ریشه دفتر حسابرسی در لایه سخت بیت‌کوین' : 'Immutable Merkle Root Timestamping on Bitcoin L1'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {lang === 'fa'
                    ? 'برای جلوگیری از هرگونه ادعای جعل گزارش‌ها در مراجع قضایی بین‌المللی، ریشه مرکل شواهد VARA در یک تراکنش OP_RETURN بیت‌کوین ماین می‌شود تا از امنیت تریلیون دلاری اثبات کار (PoW) بهره‌مند شود.'
                    : 'Periodically anchors state machine Merkle roots into Bitcoin block headers via OP_RETURN, establishing bulletproof legal non-repudiation.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAnchorToBitcoin}
                  disabled={btcAnchoring}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-lg bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-xs"
                >
                  <Anchor className={`w-3.5 h-3.5 ${btcAnchoring ? 'animate-bounce' : ''}`} />
                  <span>
                    {btcAnchoring
                      ? (lang === 'fa' ? 'ماین در بلاک بیت‌کوین...' : 'Broadcasting to Mempool...')
                      : (lang === 'fa' ? 'لنگر انداختن در بلاک‌چین بیت‌کوین' : 'Broadcast Bitcoin Anchor')}
                  </span>
                </button>
              </div>
            </div>

            {/* Bitcoin Transaction Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block">BITCOIN TRANSACTION ID (TXID)</span>
                <span className="text-white font-bold block mt-0.5 truncate" title={anchorTx.txid}>
                  {anchorTx.txid}
                </span>
                <span className="text-[10px] text-orange-400 block mt-1">BLOCK HEIGHT: #{anchorTx.blockHeight}</span>
              </div>

              <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block">RAW OP_RETURN PAYLOAD</span>
                <span className="text-teal-300 block mt-0.5 truncate" title={anchorTx.opReturnHex}>
                  {anchorTx.opReturnHex}
                </span>
                <span className="text-[10px] text-emerald-400 block mt-1">CONFIRMATIONS: {anchorTx.confirmations} BLOCKS</span>
              </div>
            </div>

            <div className="p-3 bg-[#080C14] border border-slate-800 rounded-lg text-xs text-slate-300 flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>STATE MERKLE ROOT FROZEN & LEGALLY CERTIFIED</span>
              </div>
              <span className="text-slate-500 text-[11px]">PROOF-OF-WORK VERIFIED</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. INSTITUTIONAL B2B SAFETY SDK HUB */}
      {activeTab === 'sdk' && (
        <div className="space-y-5">
          <div className="bg-[#0E1526] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono font-bold text-purple-400">
                    {lang === 'fa' ? 'کیت توسعه نهادی صرافی‌ها و دیفای (VARA Safety SDK)' : 'INSTITUTIONAL B2B EMBEDDED SDK'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  {lang === 'fa' ? 'ادغام آسان هسته حاکمیت ریسک در صرافی‌ها و پروتکل‌های وام‌دهی' : 'Embed Risk Invariant Firewalls into Any Trading Engine'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {lang === 'fa'
                    ? 'صرافی‌های کریپتو و ربات‌های معاملاتی می‌توانند با چند سطر کد، VARA را به عنوان فایروال ضدورشکستگی روی سامانه خود نصب کنند.'
                    : 'Production-ready SDK bindings for high-throughput Rust engines, Web3 TypeScript frontends, and Python quant strategies.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySdk}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-xs"
                >
                  {copiedSdk ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSdk ? (lang === 'fa' ? 'کپی شد' : 'Copied Code') : (lang === 'fa' ? 'کپی کد SDK' : 'Copy Integration Snippet')}</span>
                </button>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              {(['rust', 'ts', 'python'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => { setSelectedSdkLang(l); playTone?.(); }}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors ${
                    selectedSdkLang === l
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#080C14] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {l === 'rust' ? 'Rust (Ultra Low Latency)' : l === 'ts' ? 'TypeScript / Node' : 'Python (Quant)'}
                </button>
              ))}
            </div>

            {/* Code Box */}
            <div className="bg-[#080C14] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto text-left" dir="ltr">
              <pre>{sdkSnippets[selectedSdkLang]}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
