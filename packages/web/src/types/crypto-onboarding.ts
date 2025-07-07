export interface CryptoService {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

export interface CryptoOnboardingStep1Data {
  services: CryptoService[];
  defiAcknowledgement: {
    auditRequirement: boolean;
    dueDiligenceProcess: boolean;
  };
}

export interface CryptoOnboardingStep2Data {
  assetDiligence: {
    technologySecurity: boolean;
    useCaseUtility: boolean;
    tokenomics: boolean;
    teamGovernance: boolean;
    regulatoryStatus: boolean;
  };
  platformDiligence: {
    securitySolvency: boolean;
    compliancePosture: boolean;
  };
}

export interface CryptoOnboardingStep3Data {
  suitabilityApproach: 'existing-questionnaire' | 'crypto-addendum' | 'other';
  otherSuitabilityDescription: string;
  maxAllocationPercentage: number;
}

export interface CryptoOnboardingStep4Data {
  marketVolatilityRisk: 'reduce' | 'accept';
  technologyCybersecurityRisk: 'transfer' | 'reduce';
  regulatoryRisk: 'reduce';
}

export interface CryptoOnboardingStep5Data {
  secureWalletKeyManagement: boolean;
  accessControls: boolean;
  vendorDiligence: boolean;
  incidentResponsePlan: boolean;
}

export interface CryptoOnboardingStep6Data {
  recordRetentionCompliance: boolean;
  cryptoEventsDocumentation: boolean;
}

// Stage 2: Custody Model & Asset Safeguarding Framework
export interface CryptoOnboardingStage2Data {
  custodyModel: 'advisor-monitored' | 'third-party-custodian' | 'advisor-managed-self-custody' | '';
  // For Option A: Advisor-Monitored (No RIA Custody)
  noCustomyPolicies?: {
    privateKeyProhibition: boolean;
    clientOnboardingDisclosure: boolean;
    clientPlatformDueDiligence: boolean;
  };
  // For Option B: Third-Party Qualified Custodian Model
  thirdPartyCustodianPolicies?: {
    qualifiedCustodianCommitment: boolean;
    dueDiligenceProcess: boolean;
    clientDisclosure: boolean;
    viewIntegratedPartners: boolean;
  };
  // For Option C: Advisor-Managed Self-Custody Model
  selfCustodyPolicies?: {
    primaryColdStorage: boolean;
    multiPartyControl: boolean;
    privateKeyManagement: boolean;
    independentAudits: boolean;
    comprehensiveInsurance: boolean;
  };
}

// Stage 3: Client Onboarding Workflow & Disclosure Framework
export interface CryptoOnboardingStage3Data {
  // Step 3.1: Crypto Suitability & Risk Profile Addendum
  suitabilityAddendumAdoption: boolean;
  
  // Step 3.2: Client Disclosure Documents
  disclosureDocumentReview: boolean;
  
  // Step 3.3: Client Onboarding Checklist
  onboardingWorkflowAdoption: boolean;
}

export interface CryptoOnboardingState {
  currentStage: number;
  currentStep: string;
  step1Data: CryptoOnboardingStep1Data;
  step2Data: CryptoOnboardingStep2Data;
  step3Data: CryptoOnboardingStep3Data;
  step4Data: CryptoOnboardingStep4Data;
  step5Data: CryptoOnboardingStep5Data;
  step6Data: CryptoOnboardingStep6Data;
  stage2Data: CryptoOnboardingStage2Data;
  stage3Data: CryptoOnboardingStage3Data;
  completed: boolean;
}

export const DEFAULT_CRYPTO_SERVICES: CryptoService[] = [
  {
    id: 'general-education',
    name: 'General Education',
    description: 'Providing clients with general market commentary and educational materials about cryptoassets.',
    selected: false,
  },
  {
    id: 'monitoring-analysis',
    name: 'Monitoring & Analysis of Held-Away Assets',
    description: 'Aggregating and analyzing client cryptoassets that are self-custodied or held at third-party platforms, without providing direct recommendations on those assets.',
    selected: false,
  },
  {
    id: 'regulated-products',
    name: 'Advisory Services on Regulated Crypto Products',
    description: 'Providing advice and recommendations on publicly-traded products like Spot Bitcoin ETFs.',
    selected: false,
  },
  {
    id: 'direct-holdings',
    name: 'Advisory Services on Direct Cryptoasset Holdings',
    description: 'Providing analysis and specific recommendations (buy/sell/hold) on individual cryptoassets (e.g., Bitcoin, Ethereum) for client portfolios.',
    selected: false,
  },
  {
    id: 'discretionary-management',
    name: 'Discretionary Management (via SMAs)',
    description: 'Actively managing portfolios of direct cryptoassets on behalf of clients within a Separately Managed Account structure.',
    selected: false,
  },
  {
    id: 'defi-advisory',
    name: 'Advanced DeFi Advisory',
    description: 'Providing advice on engaging with Decentralized Finance (DeFi) protocols for activities like staking, lending, or liquidity provision.',
    selected: false,
  },
];

export const INITIAL_CRYPTO_ONBOARDING_STATE: CryptoOnboardingState = {
  currentStage: 1,
  currentStep: '1.1',
  step1Data: {
    services: DEFAULT_CRYPTO_SERVICES,
    defiAcknowledgement: {
      auditRequirement: false,
      dueDiligenceProcess: false,
    },
  },
  step2Data: {
    assetDiligence: {
      technologySecurity: false,
      useCaseUtility: false,
      tokenomics: false,
      teamGovernance: false,
      regulatoryStatus: false,
    },
    platformDiligence: {
      securitySolvency: false,
      compliancePosture: false,
    },
  },
  step3Data: {
    suitabilityApproach: 'crypto-addendum',
    otherSuitabilityDescription: '',
    maxAllocationPercentage: 5,
  },
  step4Data: {
    marketVolatilityRisk: 'reduce',
    technologyCybersecurityRisk: 'transfer',
    regulatoryRisk: 'reduce',
  },
  step5Data: {
    secureWalletKeyManagement: false,
    accessControls: false,
    vendorDiligence: false,
    incidentResponsePlan: false,
  },
  step6Data: {
    recordRetentionCompliance: false,
    cryptoEventsDocumentation: false,
  },
  stage2Data: {
    custodyModel: '',
  },
  stage3Data: {
    suitabilityAddendumAdoption: false,
    disclosureDocumentReview: false,
    onboardingWorkflowAdoption: false,
  },
  completed: false,
};