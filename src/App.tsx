/**
 * VARA MODEL v2.0 — RISK GOVERNANCE & SAFETY CONSOLE
 * 
 * Strict Frozen Semantics Preservation:
 * Invariants, financial risk logic, state machine, replay seal,
 * evidence bundle, and golden datasets are strictly preserved.
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { StateIndicator } from './components/StateIndicator';
import { RiskRulesGrid } from './components/RiskRulesGrid';
import { ReplaySealView } from './components/ReplaySealView';
import { GoldenDatasetRunner } from './components/GoldenDatasetRunner';
import { AuditConsole } from './components/AuditConsole';
import { OperatorControls } from './components/OperatorControls';
import { SystemSpecsModal } from './components/SystemSpecsModal';
import { MarketIntelligenceView } from './components/MarketIntelligenceView';
import { AccessibilityToolbar, AccessibilitySettings } from './components/AccessibilityToolbar';
import { VaraInnovationsSuite } from './components/VaraInnovationsSuite';
import {
  FROZEN_RULES,
  GOLDEN_DATASETS,
  INITIAL_REPLAY_SEAL,
  INITIAL_EVIDENCE_BUNDLE,
  INITIAL_AUDIT_LOGS,
  evaluateVector,
} from './data/frozenSemantics';
import {
  SystemOperationalState,
  RiskRule,
  ReplaySeal,
  EvidenceBundle,
  AuditLogItem,
  GoldenDataset,
} from './types/vara';

export default function App() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'replay' | 'datasets' | 'audit' | 'controls' | 'innovations' | 'masterclass'>('dashboard');
  const [operationalState, setOperationalState] = useState<SystemOperationalState>('NORMAL_OPERATIONAL');
  const [rules, setRules] = useState<RiskRule[]>(FROZEN_RULES);
  const [portfolioValue, setPortfolioValue] = useState<number>(148500000);
  const [seal, setSeal] = useState<ReplaySeal>(INITIAL_REPLAY_SEAL);
  const [bundle, setBundle] = useState<EvidenceBundle>(INITIAL_EVIDENCE_BUNDLE);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [activeDatasetId, setActiveDatasetId] = useState<string>('GOLDEN-01');
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [a11yAnnouncement, setA11yAnnouncement] = useState<string>('');

  const [a11ySettings, setA11ySettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('vara_a11y_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      adhdFocusMode: false,
      reduceMotion: false,
      textScale: 'normal',
      highContrast: false,
      colorBlindMode: 'none',
      soundFeedback: true,
    };
  });

  const updateA11ySettings = (newSettings: Partial<AccessibilitySettings>) => {
    setA11ySettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('vara_a11y_settings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Synthesized gentle Web Audio API chime for auditory accessibility feedback
  const playTactileChime = () => {
    if (!a11ySettings.soundFeedback) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext not available or blocked
    }
  };

  // Sync HTML dir attribute with language
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  // Handler for state change
  const handleStateChange = (newState: SystemOperationalState, reason: string) => {
    const prev = operationalState;
    setOperationalState(newState);
    playTactileChime();
    setA11yAnnouncement(`تغییر وضعیت سامانه: ${newState}. علت: ${reason}`);

    const newAuditLog: AuditLogItem = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: Date.now(),
      severity: newState === 'CIRCUIT_BREAKER_TRIGGERED' ? 'CRITICAL' : newState === 'ELEVATED_RISK_WATCH' ? 'WARN' : 'INFO',
      eventCategory: 'STATE_TRANSITION',
      title: `State Transition: ${prev} -> ${newState}`,
      titleFa: `تغییر وضعیت سامانه: ${prev} به ${newState}`,
      details: reason,
      detailsFa: reason,
      previousState: prev,
      newState,
      evidenceHash: seal.stateMachineHash,
      operatorId: 'OPERATOR_CONSOLE_SEC',
    };

    setAuditLogs((prevLogs) => [newAuditLog, ...prevLogs]);
  };

  // Handler for applying a golden dataset
  const handleApplyDataset = (dataset: GoldenDataset) => {
    setActiveDatasetId(dataset.id);
    setPortfolioValue(dataset.vector.portfolioValueUsd);
    playTactileChime();
    setA11yAnnouncement(`مجموعه داده طلایی ${dataset.id} با موفقیت اعمال گردید.`);

    const evaluated = evaluateVector(dataset.vector);
    const prev = operationalState;

    setRules(evaluated.rules);
    setBundle(evaluated.bundle);
    setSeal(evaluated.seal);
    setOperationalState(evaluated.state);

    const newAuditLog: AuditLogItem = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: Date.now(),
      severity: evaluated.state === 'CIRCUIT_BREAKER_TRIGGERED' ? 'CRITICAL' : evaluated.state === 'ELEVATED_RISK_WATCH' ? 'WARN' : 'INFO',
      eventCategory: 'DATASET_RUN',
      title: `Golden Dataset Applied: ${dataset.id} (${dataset.title})`,
      titleFa: `اعمال مجموعه داده طلایی: ${dataset.id} (${dataset.titleFa})`,
      details: `Inbound vector replayed through frozen invariants. Resolved state: ${evaluated.state}.`,
      detailsFa: `بردار ورودی با موفقیت روی ناورداهای صلب بازپخش شد. وضعیت استخراج‌شده: ${evaluated.state}.`,
      previousState: prev,
      newState: evaluated.state,
      evidenceHash: evaluated.seal.stateMachineHash,
      operatorId: 'GOLDEN_REPLAY_ENGINE',
    };

    setAuditLogs((prevLogs) => [newAuditLog, ...prevLogs]);
  };

  // Handler for applying custom vector
  const handleApplyVector = (vector: GoldenDataset['vector'], reason: string) => {
    setPortfolioValue(vector.portfolioValueUsd);
    const evaluated = evaluateVector(vector);
    const prev = operationalState;
    playTactileChime();

    setRules(evaluated.rules);
    setBundle(evaluated.bundle);
    setSeal(evaluated.seal);
    setOperationalState(evaluated.state);

    const newAuditLog: AuditLogItem = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: Date.now(),
      severity: evaluated.state === 'CIRCUIT_BREAKER_TRIGGERED' ? 'CRITICAL' : evaluated.state === 'ELEVATED_RISK_WATCH' ? 'WARN' : 'INFO',
      eventCategory: 'RULE_EVALUATION',
      title: 'Dynamic Parameter Vector Evaluated',
      titleFa: 'بردار پارامترهای جدید ارزیابی و اعمال شد',
      details: reason,
      detailsFa: reason,
      previousState: prev,
      newState: evaluated.state,
      evidenceHash: evaluated.seal.stateMachineHash,
      operatorId: 'RISK_OFFICER_SANDBOX',
    };

    setAuditLogs((prevLogs) => [newAuditLog, ...prevLogs]);
  };

  // Reset to Baseline
  const handleResetBaseline = () => {
    const baseline = GOLDEN_DATASETS[0];
    handleApplyDataset(baseline);
  };

  // Quick trip breaker
  const handleTripCircuitBreaker = () => {
    handleStateChange(
      'CIRCUIT_BREAKER_TRIGGERED',
      lang === 'fa'
        ? 'آزمون قطع اضطراری بریکر توسط کاربر جهت بررسی انجماد معاملات و فعال‌سازی پروتکل بازیابی'
        : 'Manual emergency circuit trip executed to test transaction freeze and recovery semantics'
    );
  };

  const handleInitiateRecovery = () => {
    setCurrentTab('controls');
  };

  return (
    <div
      className={`min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-200 transition-colors ${
        a11ySettings.reduceMotion ? 'a11y-reduce-motion' : ''
      } ${a11ySettings.highContrast ? 'a11y-high-contrast' : ''} ${
        a11ySettings.adhdFocusMode ? 'a11y-adhd-focus' : ''
      } ${
        a11ySettings.textScale === 'large'
          ? 'a11y-text-large'
          : a11ySettings.textScale === 'xlarge'
          ? 'a11y-text-xlarge'
          : ''
      }`}
    >
      {/* Polite Screen Reader Live Region for WCAG Announcements */}
      <div role="status" aria-live="polite" className="sr-only">
        {a11yAnnouncement}
      </div>

      {/* Top Bar Contract compliant navigation */}
      <TopNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        operationalState={operationalState}
        lang={lang}
        setLang={setLang}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onOpenA11y={() => setIsA11yOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Operational State Banner */}
        <StateIndicator
          state={operationalState}
          lang={lang}
          onTripBreaker={handleTripCircuitBreaker}
          onInitiateRecovery={handleInitiateRecovery}
        />

        {/* View Switching */}
        {currentTab === 'dashboard' && (
          <RiskRulesGrid
            rules={rules}
            state={operationalState}
            portfolioValue={portfolioValue}
            lang={lang}
          />
        )}

        {currentTab === 'replay' && (
          <ReplaySealView
            seal={seal}
            bundle={bundle}
            lang={lang}
          />
        )}

        {currentTab === 'datasets' && (
          <GoldenDatasetRunner
            datasets={GOLDEN_DATASETS}
            onApplyDataset={handleApplyDataset}
            activeDatasetId={activeDatasetId}
            lang={lang}
          />
        )}

        {currentTab === 'audit' && (
          <AuditConsole
            logs={auditLogs}
            lang={lang}
          />
        )}

        {currentTab === 'controls' && (
          <OperatorControls
            operationalState={operationalState}
            onStateChange={handleStateChange}
            onApplyVector={handleApplyVector}
            onResetBaseline={handleResetBaseline}
            lang={lang}
          />
        )}

        {currentTab === 'innovations' && (
          <VaraInnovationsSuite
            operationalState={operationalState}
            rules={rules}
            lang={lang}
            playTone={playTactileChime}
          />
        )}

        {currentTab === 'masterclass' && (
          <MarketIntelligenceView
            lang={lang}
          />
        )}
      </main>

      {/* Clean, quiet institutional footer */}
      <footer className="border-t border-slate-800/80 bg-[#080C14] py-4 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-semibold text-slate-300">VARA MODEL v2.0</span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'fa' ? 'نسخه تثبیت‌شده (Frozen Semantics)' : 'Frozen Semantics Engine'}</span>
            <span aria-hidden="true">·</span>
            <span>RFC-2026-FROZEN</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-teal-400">
              {lang === 'fa' ? 'حالت: قطعی و غیرقابل‌تغییر' : 'DETERMINISTIC · IMMUTABLE'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {lang === 'fa' ? 'استاندارد ایمنی نهادی' : 'Institutional Safety Baseline'}
            </span>
          </div>
        </div>
      </footer>

      {/* System Specifications Modal */}
      <SystemSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        lang={lang}
      />

      {/* Accessibility & ADHD Neurodiversity Modal */}
      <AccessibilityToolbar
        isOpen={isA11yOpen}
        onClose={() => setIsA11yOpen(false)}
        settings={a11ySettings}
        onUpdateSettings={updateA11ySettings}
        lang={lang}
        playTone={playTactileChime}
      />
    </div>
  );
}

