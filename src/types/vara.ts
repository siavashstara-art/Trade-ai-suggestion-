/**
 * VARA MODEL v2.0 — FROZEN SEMANTICS CONTRACT
 * DO NOT ALTER FINANCIAL LOGIC, RISK RULES, OR REPLAY SEMANTICS
 */

export type SystemOperationalState = 
  | 'NORMAL_OPERATIONAL'
  | 'ELEVATED_RISK_WATCH'
  | 'CIRCUIT_BREAKER_TRIGGERED'
  | 'RECOVERY_PROTOCOL';

export type RuleStatus = 'PASS' | 'WARN' | 'BREACH';

export interface RiskRule {
  id: string;
  name: string;
  nameFa: string;
  category: 'EXPOSURE' | 'LIQUIDITY' | 'VOLATILITY' | 'ORACLE' | 'DRAWDOWN' | 'COUNTERPARTY';
  categoryFa: string;
  invariantFormula: string;
  description: string;
  descriptionFa: string;
  threshold: number;
  thresholdDisplay: string;
  currentValue: number;
  currentDisplay: string;
  unit: string;
  comparator: '<=' | '>=' | '<' | '>';
  status: RuleStatus;
  lastEvaluatedTimestamp: number;
  sha256Proof: string;
}

export interface ReplaySeal {
  sealId: string;
  timestamp: number;
  stateMachineHash: string;
  inputVectorHash: string;
  executionReplayHash: string;
  isDeterministicVerified: boolean;
  blockNumber: number;
  epoch: number;
  algorithmVersion: 'VARA-v2.0-FROZEN';
}

export interface InvariantSnapshot {
  ruleId: string;
  measuredValue: number;
  limit: number;
  passed: boolean;
  deltaPercent: number;
}

export interface EvidenceBundle {
  bundleId: string;
  generatedAt: number;
  operationalState: SystemOperationalState;
  globalReplaySeal: string;
  inputParameters: {
    totalPortfolioValueUsd: number;
    var99Percent1D: number;
    maxDrawdown24h: number;
    netLeverageRatio: number;
    liquidityCoverageRatio: number;
    oracleDeviationPercent: number;
    counterpartyConcentration: number;
  };
  invariantSnapshots: InvariantSnapshot[];
  complianceHash: string;
  validatorSignature: string;
  isTamperProof: boolean;
}

export interface GoldenDataset {
  id: string;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
  expectedState: SystemOperationalState;
  vector: {
    portfolioValueUsd: number;
    var99: number;
    maxDrawdown: number;
    leverage: number;
    lcr: number;
    oracleDeviation: number;
    counterparty: number;
  };
  stressFactor: string;
  stressFactorFa: string;
  historicalReference: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: number;
  severity: 'INFO' | 'WARN' | 'CRITICAL';
  eventCategory: 'STATE_TRANSITION' | 'RULE_EVALUATION' | 'REPLAY_CHECK' | 'CIRCUIT_BREAKER' | 'OPERATOR_ACTION' | 'DATASET_RUN';
  title: string;
  titleFa: string;
  details: string;
  detailsFa: string;
  previousState?: SystemOperationalState;
  newState?: SystemOperationalState;
  evidenceHash: string;
  operatorId: string;
}
