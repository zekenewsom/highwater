'use client';

import React, { useState, useCallback } from 'react';
import { 
  CryptoOnboardingState, 
  INITIAL_CRYPTO_ONBOARDING_STATE, 
  CryptoService 
} from '../types/crypto-onboarding';

interface CryptoOnboardingWizardProps {
  onComplete?: (state: CryptoOnboardingState) => void;
  onCancel?: () => void;
  initialState?: CryptoOnboardingState | null;
}

export const CryptoOnboardingWizard: React.FC<CryptoOnboardingWizardProps> = ({ 
  onComplete, 
  onCancel,
  initialState
}) => {
  const [wizardState, setWizardState] = useState<CryptoOnboardingState>(
    initialState || INITIAL_CRYPTO_ONBOARDING_STATE
  );

  const updateServiceSelection = useCallback((serviceId: string, selected: boolean) => {
    setWizardState(prev => ({
      ...prev,
      step1Data: {
        ...prev.step1Data,
        services: prev.step1Data.services.map(service =>
          service.id === serviceId ? { ...service, selected } : service
        ),
      },
    }));
  }, []);

  const updateDefiAcknowledgement = useCallback((field: 'auditRequirement' | 'dueDiligenceProcess', value: boolean) => {
    setWizardState(prev => ({
      ...prev,
      step1Data: {
        ...prev.step1Data,
        defiAcknowledgement: {
          ...prev.step1Data.defiAcknowledgement,
          [field]: value,
        },
      },
    }));
  }, []);

  const updateAssetDiligence = useCallback((field: keyof typeof wizardState.step2Data.assetDiligence, value: boolean) => {
    setWizardState(prev => ({
      ...prev,
      step2Data: {
        ...prev.step2Data,
        assetDiligence: {
          ...prev.step2Data.assetDiligence,
          [field]: value,
        },
      },
    }));
  }, []);

  const updatePlatformDiligence = useCallback((field: keyof typeof wizardState.step2Data.platformDiligence, value: boolean) => {
    setWizardState(prev => ({
      ...prev,
      step2Data: {
        ...prev.step2Data,
        platformDiligence: {
          ...prev.step2Data.platformDiligence,
          [field]: value,
        },
      },
    }));
  }, []);

  const updateStep3Data = useCallback((field: keyof typeof wizardState.step3Data, value: string | number) => {
    setWizardState(prev => ({
      ...prev,
      step3Data: {
        ...prev.step3Data,
        [field]: value,
      },
    }));
  }, []);

  const updateStep4Data = useCallback((field: keyof typeof wizardState.step4Data, value: string) => {
    setWizardState(prev => ({
      ...prev,
      step4Data: {
        ...prev.step4Data,
        [field]: value,
      },
    }));
  }, []);

  const updateStep5Data = useCallback((field: keyof typeof wizardState.step5Data, value: boolean) => {
    setWizardState(prev => ({
      ...prev,
      step5Data: {
        ...prev.step5Data,
        [field]: value,
      },
    }));
  }, []);

  const updateStep6Data = useCallback((field: keyof typeof wizardState.step6Data, value: boolean) => {
    setWizardState(prev => ({
      ...prev,
      step6Data: {
        ...prev.step6Data,
        [field]: value,
      },
    }));
  }, []);

  const updateStage2Data = useCallback((field: string, value: any) => {
    setWizardState(prev => ({
      ...prev,
      stage2Data: {
        ...prev.stage2Data,
        [field]: value,
      },
    }));
  }, []);

  const updateStage3Data = useCallback((field: keyof typeof wizardState.stage3Data, value: boolean) => {
    setWizardState(prev => ({
      ...prev,
      stage3Data: {
        ...prev.stage3Data,
        [field]: value,
      },
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (wizardState.currentStep === '1.1') {
      // Move to step 1.2
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.2',
      }));
    } else if (wizardState.currentStep === '1.2') {
      // Move to step 1.3
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.3',
      }));
    } else if (wizardState.currentStep === '1.3') {
      // Move to step 1.4
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.4',
      }));
    } else if (wizardState.currentStep === '1.4') {
      // Move to step 1.5
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.5',
      }));
    } else if (wizardState.currentStep === '1.5') {
      // Move to step 1.6
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.6',
      }));
    } else if (wizardState.currentStep === '1.6') {
      // Move to Stage 1 summary
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.summary',
      }));
    } else if (wizardState.currentStep === '1.summary') {
      // Move to Stage 1 complete
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.complete',
      }));
    } else if (wizardState.currentStep === '1.complete') {
      // Complete Stage 1, advance to Stage 2
      setWizardState(prev => ({
        ...prev,
        currentStage: 2,
        currentStep: '2.1',
      }));
    } else if (wizardState.currentStep === '2.1') {
      // Move to Stage 2 summary
      setWizardState(prev => ({
        ...prev,
        currentStep: '2.summary',
      }));
    } else if (wizardState.currentStep === '2.summary') {
      // Move to Stage 2 complete
      setWizardState(prev => ({
        ...prev,
        currentStep: '2.complete',
      }));
    } else if (wizardState.currentStep === '2.complete') {
      // Complete Stage 2, advance to Stage 3
      setWizardState(prev => ({
        ...prev,
        currentStage: 3,
        currentStep: '3.1',
      }));
    } else if (wizardState.currentStep === '3.1') {
      // Move to step 3.2
      setWizardState(prev => ({
        ...prev,
        currentStep: '3.2',
      }));
    } else if (wizardState.currentStep === '3.2') {
      // Move to step 3.3
      setWizardState(prev => ({
        ...prev,
        currentStep: '3.3',
      }));
    } else if (wizardState.currentStep === '3.3') {
      // Move to Stage 3 summary
      setWizardState(prev => ({
        ...prev,
        currentStep: '3.summary',
      }));
    } else if (wizardState.currentStep === '3.summary') {
      // Move to Stage 3 complete
      setWizardState(prev => ({
        ...prev,
        currentStep: '3.complete',
      }));
    } else if (wizardState.currentStep === '3.complete') {
      // Complete entire onboarding
      const updatedState = { ...wizardState, completed: true };
      setWizardState(updatedState);
      onComplete?.(updatedState);
    }
  }, [wizardState, onComplete]);

  const handlePrevious = useCallback(() => {
    if (wizardState.currentStep === '1.2') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.1',
      }));
    } else if (wizardState.currentStep === '1.3') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.2',
      }));
    } else if (wizardState.currentStep === '1.4') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.3',
      }));
    } else if (wizardState.currentStep === '1.5') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.4',
      }));
    } else if (wizardState.currentStep === '1.6') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.5',
      }));
    } else if (wizardState.currentStep === '1.summary') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.6',
      }));
    } else if (wizardState.currentStep === '1.complete') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '1.summary',
      }));
    } else if (wizardState.currentStep === '2.1') {
      setWizardState(prev => ({
        ...prev,
        currentStage: 1,
        currentStep: '1.complete',
      }));
    } else if (wizardState.currentStep === '2.summary') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '2.1',
      }));
    } else if (wizardState.currentStep === '2.complete') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '2.summary',
      }));
    } else if (wizardState.currentStep === '3.1') {
      setWizardState(prev => ({
        ...prev,
        currentStage: 2,
        currentStep: '2.complete',
      }));
    } else if (wizardState.currentStep === '3.2') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '3.1',
      }));
    } else if (wizardState.currentStep === '3.3') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '3.2',
      }));
    } else if (wizardState.currentStep === '3.summary') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '3.3',
      }));
    } else if (wizardState.currentStep === '3.complete') {
      setWizardState(prev => ({
        ...prev,
        currentStep: '3.summary',
      }));
    }
  }, []);

  const hasDefiSelected = wizardState.step1Data.services.some(
    service => service.id === 'defi-advisory' && service.selected
  );

  const canProceed = (() => {
    if (wizardState.currentStep === '1.1') {
      return wizardState.step1Data.services.some(service => service.selected) &&
        (!hasDefiSelected || (
          wizardState.step1Data.defiAcknowledgement.auditRequirement &&
          wizardState.step1Data.defiAcknowledgement.dueDiligenceProcess
        ));
    } else if (wizardState.currentStep === '1.2') {
      const allAssetDiligence = Object.values(wizardState.step2Data.assetDiligence).every(v => v);
      const allPlatformDiligence = Object.values(wizardState.step2Data.platformDiligence).every(v => v);
      return allAssetDiligence && allPlatformDiligence;
    } else if (wizardState.currentStep === '1.3') {
      const hasValidSuitabilityApproach = wizardState.step3Data.suitabilityApproach !== '';
      const hasValidOtherDescription = wizardState.step3Data.suitabilityApproach !== 'other' || 
        wizardState.step3Data.otherSuitabilityDescription.trim().length > 0;
      const hasValidAllocation = wizardState.step3Data.maxAllocationPercentage > 0 && 
        wizardState.step3Data.maxAllocationPercentage <= 100;
      return hasValidSuitabilityApproach && hasValidOtherDescription && hasValidAllocation;
    } else if (wizardState.currentStep === '1.4') {
      // All risk management selections have defaults, so they're always valid
      return true;
    } else if (wizardState.currentStep === '1.5') {
      // All cybersecurity policy commitments must be acknowledged
      return Object.values(wizardState.step5Data).every(v => v);
    } else if (wizardState.currentStep === '1.6') {
      // All recordkeeping policy commitments must be acknowledged
      return Object.values(wizardState.step6Data).every(v => v);
    } else if (wizardState.currentStep === '1.summary') {
      // Summary step - always allow proceeding to complete
      return true;
    } else if (wizardState.currentStep === '1.complete') {
      // Complete step - always allow proceeding to Stage 2
      return true;
    } else if (wizardState.currentStep === '2.1') {
      // Stage 2: Custody model must be selected and all required policies acknowledged
      if (!wizardState.stage2Data.custodyModel) return false;
      
      if (wizardState.stage2Data.custodyModel === 'advisor-monitored') {
        return wizardState.stage2Data.noCustomyPolicies ? 
          Object.values(wizardState.stage2Data.noCustomyPolicies).every(v => v) : false;
      } else if (wizardState.stage2Data.custodyModel === 'third-party-custodian') {
        return wizardState.stage2Data.thirdPartyCustodianPolicies ? 
          Object.values(wizardState.stage2Data.thirdPartyCustodianPolicies).every(v => v) : false;
      } else if (wizardState.stage2Data.custodyModel === 'advisor-managed-self-custody') {
        return wizardState.stage2Data.selfCustodyPolicies ? 
          Object.values(wizardState.stage2Data.selfCustodyPolicies).every(v => v) : false;
      }
    } else if (wizardState.currentStep === '2.summary') {
      // Stage 2 summary - always allow proceeding to complete
      return true;
    } else if (wizardState.currentStep === '2.complete') {
      // Stage 2 complete - always allow finishing
      return true;
    }
    return false;
  })();

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              HighWater Crypto Onboarding Wizard
            </h1>
            <p className="text-gray-600 mt-2">
              {wizardState.currentStage === 1 
                ? 'Stage 1: Firm-Level Crypto Policy & Fiduciary Framework'
                : 'Stage 2: Custody Model & Asset Safeguarding Framework'}
            </p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-blue-700">
              Stage {wizardState.currentStage} • Step {wizardState.currentStep}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: wizardState.currentStage === 2 ? '100%' :
                       wizardState.currentStep === '1.1' ? '14.29%' : 
                       wizardState.currentStep === '1.2' ? '28.57%' : 
                       wizardState.currentStep === '1.3' ? '42.86%' : 
                       wizardState.currentStep === '1.4' ? '57.14%' : 
                       wizardState.currentStep === '1.5' ? '71.43%' : 
                       wizardState.currentStep === '1.6' ? '85.71%' : '100%' 
              }}
            />
          </div>
          <span className="ml-4 text-sm font-medium text-gray-700">
            {wizardState.currentStage === 2 ? '100%' :
             wizardState.currentStep === '1.1' ? '14%' : 
             wizardState.currentStep === '1.2' ? '29%' : 
             wizardState.currentStep === '1.3' ? '43%' : 
             wizardState.currentStep === '1.4' ? '57%' : 
             wizardState.currentStep === '1.5' ? '71%' : 
             wizardState.currentStep === '1.6' ? '86%' : '100%'} Complete
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {wizardState.currentStep === '1.1' && (
          <>
            {/* Step 1.1 Title */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Step 1.1: Defining Your Firm's Scope of Crypto-Related Services
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Context & Rationale</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  The first step in building a compliant crypto practice is to clearly define the scope of services your firm will offer. 
                  Your fiduciary duty under the Investment Advisers Act of 1940 requires you to provide advice that is in the client's 
                  best interest and to ensure you are not misleading clients about your capabilities.
                </p>
              </div>
            </div>
          </>
        )}

        {wizardState.currentStep === '1.2' && (
          <>
            {/* Step 1.2 Title */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Step 1.2: Establishing Your Due Diligence Framework
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Context & Rationale</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  A robust, documented due diligence process is a cornerstone of an RIA's fiduciary duty. Given the unique 
                  technological and market risks of cryptoassets, a generic diligence process is insufficient. This step helps 
                  you formally adopt a comprehensive framework for vetting every aspect of a crypto investment.
                </p>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Guidance from Regulations/Best Practices</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• SEC examination priorities consistently focus on RIA due diligence processes, particularly for complex or alternative assets and third-party service providers.</li>
                  <li>• Thorough diligence should cover the asset itself, the platforms used for trading, and any custodians or vendors involved.</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {wizardState.currentStep === '1.3' && (
          <>
            {/* Step 1.3 Title */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Step 1.3: Establishing Your Client Suitability & Risk Profiling Policy
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Context & Rationale</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Your duty of care requires that any investment recommendation is suitable for a client's specific financial situation, 
                  objectives, and risk tolerance. Given the extreme volatility and unique risks of cryptoassets, a standard risk profile 
                  may not be sufficient.
                </p>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Guidance from Regulations/Best Practices</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Regulators like the Texas State Securities Board explicitly emphasize the need for rigorous suitability assessments tailored to each client when dealing with speculative assets like cryptocurrencies.</li>
                  <li>• Many advisors (62% in one survey) express concern that recommending speculative assets may not align with their fiduciary obligations, highlighting the importance of a clear and defensible suitability process.</li>
                </ul>
              </div>
            </div>

            {/* Suitability Approach */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                1. How will your firm ensure crypto-specific suitability for clients?
              </h3>
              <div className="space-y-4">
                <div className={`border rounded-lg p-4 transition-all duration-200 ${
                  wizardState.step3Data.suitabilityApproach === 'existing-questionnaire' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="suitabilityApproach"
                      value="existing-questionnaire"
                      checked={wizardState.step3Data.suitabilityApproach === 'existing-questionnaire'}
                      onChange={(e) => updateStep3Data('suitabilityApproach', e.target.value)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Use Existing Risk Tolerance Questionnaire</div>
                      <div className="text-sm text-gray-600 mt-1">
                        We will use our existing risk tolerance questionnaire and apply a higher risk category for crypto recommendations.
                      </div>
                    </div>
                  </label>
                </div>

                <div className={`border rounded-lg p-4 transition-all duration-200 ${
                  wizardState.step3Data.suitabilityApproach === 'crypto-addendum' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="suitabilityApproach"
                      value="crypto-addendum"
                      checked={wizardState.step3Data.suitabilityApproach === 'crypto-addendum'}
                      onChange={(e) => updateStep3Data('suitabilityApproach', e.target.value)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Supplemental Crypto Risk Tolerance Addendum</div>
                      <div className="text-sm text-gray-600 mt-1">
                        We will adopt a <strong>supplemental Crypto Risk Tolerance Addendum</strong> to our standard process. 
                        This addendum will specifically cover client understanding of key risks like high volatility, potential for total loss, 
                        private key management, and smart contract vulnerabilities.
                      </div>
                      <div className="text-xs text-blue-600 mt-2 italic">
                        *HighWater can provide a template for this addendum.
                      </div>
                    </div>
                  </label>
                </div>

                <div className={`border rounded-lg p-4 transition-all duration-200 ${
                  wizardState.step3Data.suitabilityApproach === 'other' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="suitabilityApproach"
                      value="other"
                      checked={wizardState.step3Data.suitabilityApproach === 'other'}
                      onChange={(e) => updateStep3Data('suitabilityApproach', e.target.value)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-900">Other (please describe):</div>
                      {wizardState.step3Data.suitabilityApproach === 'other' && (
                        <textarea
                          value={wizardState.step3Data.otherSuitabilityDescription}
                          onChange={(e) => updateStep3Data('otherSuitabilityDescription', e.target.value)}
                          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Please describe your approach to crypto-specific suitability assessment..."
                          rows={3}
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Maximum Allocation */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                2. Set a firm-wide guideline for maximum portfolio allocation to cryptoassets
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  This can be overridden on a per-client basis with documented rationale.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-900">
                    As a general guideline, our firm will consider a cryptoasset allocation of up to
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={wizardState.step3Data.maxAllocationPercentage}
                      onChange={(e) => updateStep3Data('maxAllocationPercentage', Number(e.target.value))}
                      className="w-20 border border-gray-300 rounded-md px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="100"
                      step="1"
                    />
                    <span className="text-sm font-medium text-gray-900">%</span>
                  </div>
                  <label className="text-sm font-medium text-gray-900">
                    of a client's total investable assets to be potentially suitable, pending individual client assessment.
                  </label>
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  Common ranges: Conservative (1-3%), Moderate (3-7%), Aggressive (5-15%)
                </div>
              </div>
            </div>
          </>
        )}

        {wizardState.currentStep === '1.4' && (
          <>
            {/* Step 1.4 Title */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Step 1.4: Establishing Your Risk Management Framework
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Context & Rationale</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Your fiduciary duty requires a systematic and proactive approach to managing the significant risks associated with cryptoassets. 
                  A documented risk management framework is essential for demonstrating a prudent process to regulators and clients. This involves 
                  not just identifying risks, but analyzing their potential impact and defining how your firm will treat them.
                </p>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Guidance from Regulations/Best Practices</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• A comprehensive framework involves four key stages: Risk Identification, Risk Analysis, Risk Assessment, and Risk Treatment.</li>
                  <li>• Common risk treatment options include: Avoiding the risk, Reducing the risk (e.g., through controls), Transferring the risk (e.g., via insurance or qualified custodians), or Accepting the risk (with full disclosure).</li>
                  <li>• Key crypto-specific risks an RIA must consider include: market volatility, liquidity, cybersecurity threats, regulatory changes, and smart contract vulnerabilities.</li>
                </ul>
              </div>
            </div>

            {/* Risk Management Framework */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Please define your firm's default risk treatment policy for the following crypto-specific risks
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  This framework will guide your firm's actions and can be adjusted on a per-client basis with documented rationale.
                </p>
              </div>

              {/* Market Volatility & Liquidity Risk */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">
                  1. For Market Volatility & Liquidity Risk, our firm will primarily:
                </h4>
                <div className="space-y-4">
                  <div className={`border rounded-lg p-4 transition-all duration-200 ${
                    wizardState.step4Data.marketVolatilityRisk === 'reduce' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="marketVolatilityRisk"
                        value="reduce"
                        checked={wizardState.step4Data.marketVolatilityRisk === 'reduce'}
                        onChange={(e) => updateStep4Data('marketVolatilityRisk', e.target.value as 'reduce' | 'accept')}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800 mr-2">
                            Reduce Risk
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          By generally recommending small allocations relative to a client's total portfolio and focusing on assets 
                          with higher trading volumes and liquidity.
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className={`border rounded-lg p-4 transition-all duration-200 ${
                    wizardState.step4Data.marketVolatilityRisk === 'accept' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="marketVolatilityRisk"
                        value="accept"
                        checked={wizardState.step4Data.marketVolatilityRisk === 'accept'}
                        onChange={(e) => updateStep4Data('marketVolatilityRisk', e.target.value as 'reduce' | 'accept')}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 mr-2">
                            Accept Risk
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          By ensuring clients receive and acknowledge explicit disclosures detailing the potential for extreme price 
                          fluctuations and the total loss of principal.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Technology & Cybersecurity Risk */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">
                  2. For Technology & Cybersecurity Risk (e.g., protocol bugs, hacks, private key loss), our firm will primarily:
                </h4>
                <div className="space-y-4">
                  <div className={`border rounded-lg p-4 transition-all duration-200 ${
                    wizardState.step4Data.technologyCybersecurityRisk === 'transfer' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="technologyCybersecurityRisk"
                        value="transfer"
                        checked={wizardState.step4Data.technologyCybersecurityRisk === 'transfer'}
                        onChange={(e) => updateStep4Data('technologyCybersecurityRisk', e.target.value as 'transfer' | 'reduce')}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                            Transfer Risk
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          By strongly preferring the use of qualified custodians with robust security protocols and sufficient insurance coverage.
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className={`border rounded-lg p-4 transition-all duration-200 ${
                    wizardState.step4Data.technologyCybersecurityRisk === 'reduce' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="technologyCybersecurityRisk"
                        value="reduce"
                        checked={wizardState.step4Data.technologyCybersecurityRisk === 'reduce'}
                        onChange={(e) => updateStep4Data('technologyCybersecurityRisk', e.target.value as 'transfer' | 'reduce')}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800 mr-2">
                            Reduce Risk
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          By implementing stringent internal cybersecurity policies and utilizing technologies like multi-signature wallets 
                          for any firm-managed assets.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Regulatory Risk */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">
                  3. For Regulatory Risk, our firm will primarily:
                </h4>
                <div className={`border rounded-lg p-4 border-blue-500 bg-blue-50`}>
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="regulatoryRisk"
                      value="reduce"
                      checked={true}
                      readOnly
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800 mr-2">
                          Reduce Risk
                        </span>
                        (Required)
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        By continuously monitoring the regulatory landscape and committing to adapting policies swiftly. 
                        HighWater will assist in this by providing updates on major regulatory events.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {wizardState.currentStep === '1.5' && (
          <>
            {/* Step 1.5 Title */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Step 1.5: Establishing Your Firm's Cybersecurity Policy
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Context & Rationale</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Cybersecurity is a top priority for the SEC Division of Examinations and is arguably the most critical operational risk 
                  in managing digital assets due to the irreversibility of blockchain transactions. A formal, adopted policy is essential 
                  for protecting your clients and your firm.
                </p>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Guidance from Regulations/Best Practices</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Best practices include secure private key management, stringent access controls, and thorough due diligence on all third-party vendors.</li>
                  <li>• Utilizing cold storage for the majority of assets is a critical security measure to protect them from online threats.</li>
                  <li>• Multi-signature (multisig) wallets and Multi-Party Computation (MPC) are technologies that enhance security by eliminating single points of failure.</li>
                </ul>
              </div>
            </div>

            {/* Cybersecurity Policy Commitments */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Please review and formally adopt the following cybersecurity commitments for your firm's compliance records:
              </h3>
              
              <div className="space-y-6">
                {/* Secure Wallet & Key Management */}
                <div className={`border rounded-lg p-6 transition-all duration-200 ${
                  wizardState.step5Data.secureWalletKeyManagement 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wizardState.step5Data.secureWalletKeyManagement}
                      onChange={(e) => updateStep5Data('secureWalletKeyManagement', e.target.checked)}
                      className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h4 className="font-semibold text-gray-900">Secure Wallet & Key Management</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Our firm's policy mandates that any client assets over which we have direct control or custody must be primarily 
                        stored in cold storage, utilizing multi-signature or MPC technology where feasible.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Access Controls */}
                <div className={`border rounded-lg p-6 transition-all duration-200 ${
                  wizardState.step5Data.accessControls 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wizardState.step5Data.accessControls}
                      onChange={(e) => updateStep5Data('accessControls', e.target.checked)}
                      className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <h4 className="font-semibold text-gray-900">Access Controls</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Our firm will enforce multi-factor authentication (MFA) and role-based access controls for all internal systems 
                        and third-party platforms that handle client cryptoasset data.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Vendor Diligence */}
                <div className={`border rounded-lg p-6 transition-all duration-200 ${
                  wizardState.step5Data.vendorDiligence 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wizardState.step5Data.vendorDiligence}
                      onChange={(e) => updateStep5Data('vendorDiligence', e.target.checked)}
                      className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <h4 className="font-semibold text-gray-900">Vendor Diligence</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Our firm will conduct and document cybersecurity due diligence on all third-party crypto service providers, 
                        including custodians and technology platforms like HighWater, before use.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Incident Response Plan */}
                <div className={`border rounded-lg p-6 transition-all duration-200 ${
                  wizardState.step5Data.incidentResponsePlan 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wizardState.step5Data.incidentResponsePlan}
                      onChange={(e) => updateStep5Data('incidentResponsePlan', e.target.checked)}
                      className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <h4 className="font-semibold text-gray-900">Incident Response Plan</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Our firm will maintain an incident response plan that specifically addresses potential crypto-related security breaches, 
                        such as a compromised private key or exchange account.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        {wizardState.currentStep === '1.6' && (
          <>
            {/* Step 1.6 Title */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Step 1.6: Establishing Your Recordkeeping Policy
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Context & Rationale</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  SEC Rule 204-2 (the "Books and Records Rule") requires RIAs to maintain true, accurate, and current records 
                  of all business activities, including client communications and transactions. This obligation fully applies to 
                  cryptoassets, which present unique challenges due to transaction complexity and events like forks and airdrops.
                </p>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Guidance from Regulations/Best Practices</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Records must generally be maintained for at least five years, with the first two years in an easily accessible place.</li>
                  <li>• These records must capture all necessary information accurately and efficiently, including communications, transactions, valuations, and unique crypto events.</li>
                </ul>
              </div>
            </div>

            {/* Recordkeeping Policy Commitments */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Please review and formally adopt the following recordkeeping commitments for your firm's compliance records:
              </h3>
              
              <div className="space-y-6">
                {/* Record Retention Compliance */}
                <div className={`border rounded-lg p-6 transition-all duration-200 ${
                  wizardState.step6Data.recordRetentionCompliance 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wizardState.step6Data.recordRetentionCompliance}
                      onChange={(e) => updateStep6Data('recordRetentionCompliance', e.target.checked)}
                      className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h4 className="font-semibold text-gray-900">Record Retention Compliance</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Our firm commits to retaining all crypto-related records, including client communications, transaction data, 
                        diligence reports, and risk assessments generated via the HighWater platform, in accordance with SEC Rule 204-2 requirements.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Crypto Events Documentation */}
                <div className={`border rounded-lg p-6 transition-all duration-200 ${
                  wizardState.step6Data.cryptoEventsDocumentation 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wizardState.step6Data.cryptoEventsDocumentation}
                      onChange={(e) => updateStep6Data('cryptoEventsDocumentation', e.target.checked)}
                      className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center mb-2">
                        <svg className="h-5 w-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                        </svg>
                        <h4 className="font-semibold text-gray-900">Crypto Events Documentation</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Our firm has a procedure for documenting the handling and tax implications of unique crypto events 
                        such as airdrops and hard forks that affect client portfolios.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        {wizardState.currentStep === '1.summary' && (
          <>
            {/* Stage 1 Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Stage 1 Summary: Digital Asset Advisory Services Framework
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">Review Your Selections</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Below is a summary of your Stage 1 selections. Review these choices before proceeding to Stage 2 - Custody Model & Asset Safeguarding Framework.
                </p>
              </div>
            </div>

            {/* Selected Services Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Selected Crypto Services
              </h3>
              <div className="space-y-3">
                {wizardState.step1Data.services.filter(service => service.selected).map((service) => (
                  <div key={service.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-900">{service.name}</h4>
                        <p className="text-sm text-green-800 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {wizardState.step1Data.services.filter(service => service.selected).length === 0 && (
                  <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">No services selected</p>
                  </div>
                )}
              </div>
            </div>

            {/* DeFi Acknowledgement Summary */}
            {wizardState.step1Data.services.some(service => service.id === 'defi-advisory' && service.selected) && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  DeFi Advisory Acknowledgements
                </h3>
                <div className="space-y-3">
                  <div className={`border rounded-lg p-4 ${
                    wizardState.step1Data.defiAcknowledgement.auditRequirement 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 mr-3 ${
                        wizardState.step1Data.defiAcknowledgement.auditRequirement 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className={`text-sm ${
                        wizardState.step1Data.defiAcknowledgement.auditRequirement 
                          ? 'text-green-800' 
                          : 'text-red-800'
                      }`}>
                        Audit requirement acknowledgement: {wizardState.step1Data.defiAcknowledgement.auditRequirement ? 'Acknowledged' : 'Not acknowledged'}
                      </p>
                    </div>
                  </div>
                  <div className={`border rounded-lg p-4 ${
                    wizardState.step1Data.defiAcknowledgement.dueDiligenceProcess 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 mr-3 ${
                        wizardState.step1Data.defiAcknowledgement.dueDiligenceProcess 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className={`text-sm ${
                        wizardState.step1Data.defiAcknowledgement.dueDiligenceProcess 
                          ? 'text-green-800' 
                          : 'text-red-800'
                      }`}>
                        Due diligence process acknowledgement: {wizardState.step1Data.defiAcknowledgement.dueDiligenceProcess ? 'Acknowledged' : 'Not acknowledged'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Policy Commitments Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Policy Commitments Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Asset Diligence</h4>
                  {Object.entries(wizardState.step2Data.assetDiligence).map(([key, value]) => (
                    <div key={key} className={`border rounded-lg p-3 ${
                      value ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 mr-2 ${
                          value ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className={`text-sm ${
                          value ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value ? 'Committed' : 'Not committed'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Platform Diligence</h4>
                  {Object.entries(wizardState.step2Data.platformDiligence).map(([key, value]) => (
                    <div key={key} className={`border rounded-lg p-3 ${
                      value ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 mr-2 ${
                          value ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className={`text-sm ${
                          value ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value ? 'Committed' : 'Not committed'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Suitability & Risk Management Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Suitability & Risk Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Suitability Approach</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Method:</span> {wizardState.step3Data.suitabilityApproach === 'existing-questionnaire' ? 'Existing Questionnaire' : wizardState.step3Data.suitabilityApproach === 'crypto-addendum' ? 'Crypto Addendum' : 'Other'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Max Allocation:</span> {wizardState.step3Data.maxAllocationPercentage}%
                  </p>
                  {wizardState.step3Data.suitabilityApproach === 'other' && wizardState.step3Data.otherSuitabilityDescription && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Description:</span> {wizardState.step3Data.otherSuitabilityDescription}
                    </p>
                  )}
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Risk Management</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Market Volatility:</span> {wizardState.step4Data.marketVolatilityRisk === 'reduce' ? 'Reduce' : 'Accept'}</p>
                    <p><span className="font-medium">Technology/Cybersecurity:</span> {wizardState.step4Data.technologyCybersecurityRisk === 'transfer' ? 'Transfer' : 'Reduce'}</p>
                    <p><span className="font-medium">Regulatory:</span> Reduce</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Security & Recordkeeping Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Operational Security & Recordkeeping
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Operational Security</h4>
                  {Object.entries(wizardState.step5Data).map(([key, value]) => (
                    <div key={key} className={`border rounded-lg p-3 ${
                      value ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 mr-2 ${
                          value ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className={`text-sm ${
                          value ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value ? 'Committed' : 'Not committed'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Recordkeeping</h4>
                  {Object.entries(wizardState.step6Data).map(([key, value]) => (
                    <div key={key} className={`border rounded-lg p-3 ${
                      value ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 mr-2 ${
                          value ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className={`text-sm ${
                          value ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value ? 'Committed' : 'Not committed'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {wizardState.currentStep === '1.complete' && (
          <>
            {/* Stage 1 Complete */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Stage 1 Complete!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Congratulations! You have successfully completed the Digital Asset Advisory Services Framework.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="font-semibold text-green-900 mb-3">What You've Accomplished:</h3>
                <ul className="text-sm text-green-800 space-y-2 text-left">
                  <li>• Defined your crypto advisory service offerings</li>
                  <li>• Established comprehensive due diligence frameworks</li>
                  <li>• Created suitability assessment procedures</li>
                  <li>• Implemented risk management protocols</li>
                  <li>• Set up operational security measures</li>
                  <li>• Established recordkeeping compliance policies</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3">Ready for Stage 2</h3>
              <p className="text-sm text-blue-800">
                Now that your advisory services framework is complete, you're ready to proceed to Stage 2: 
                Custody Model & Asset Safeguarding Framework. This stage will help you establish how crypto 
                assets will be held and protected within your advisory practice.
              </p>
            </div>
          </>
        )}

        {wizardState.currentStep === '2.1' && (
          <>
            {/* Stage 2 Title */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Step 2.1: Understanding the SEC Custody Rule
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Context & Rationale</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  The SEC's Custody Rule (Rule 206(4)-2) is a cornerstone of investor protection. It generally requires RIAs who have "custody" 
                  of client funds or securities to maintain those assets with a "qualified custodian". The primary challenge is that the 
                  availability of qualified custodians for a diverse range of cryptoassets has been limited, and the application of the rule 
                  to this new technology is complex.
                </p>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Guidance from Regulations/Best Practices</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• <strong>What is Custody?</strong> An RIA is deemed to have custody if it holds, directly or indirectly, client funds or securities, or has any authority to obtain possession of them.</li>
                  <li>• <strong>What is a Qualified Custodian?</strong> These are typically entities like banks and registered broker-dealers. The rescission of Staff Accounting Bulletin 121 (SAB 121) in January 2025 is expected to encourage more traditional financial institutions to offer crypto custody services.</li>
                  <li>• <strong>The Asset Classification Challenge:</strong> A key ambiguity is whether all cryptoassets are "funds or securities" under the rule. However, best practice suggests that advisors should aim to protect all client cryptoassets with the same high standard of care.</li>
                </ul>
              </div>
            </div>

            {/* Custody Model Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Please select the primary custody model your firm will adopt for managing client cryptoassets:
              </h3>
              <div className="space-y-4">
                <div className={`border rounded-lg p-4 transition-all duration-200 ${
                  wizardState.stage2Data.custodyModel === 'advisor-monitored' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="custodyModel"
                      value="advisor-monitored"
                      checked={wizardState.stage2Data.custodyModel === 'advisor-monitored'}
                      onChange={(e) => updateStage2Data('custodyModel', e.target.value)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Option A: Advisor-Monitored (No RIA Custody)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Our firm will <em>not</em> take custody of client cryptoassets. Clients will retain full control of their assets 
                        in their own self-custody wallets or in accounts at third-party platforms under their own name.
                      </div>
                    </div>
                  </label>
                </div>

                <div className={`border rounded-lg p-4 transition-all duration-200 ${
                  wizardState.stage2Data.custodyModel === 'third-party-custodian' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="custodyModel"
                      value="third-party-custodian"
                      checked={wizardState.stage2Data.custodyModel === 'third-party-custodian'}
                      onChange={(e) => updateStage2Data('custodyModel', e.target.value)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Option B: Third-Party Qualified Custodian Model</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Our firm will advise clients and may have discretion over assets that are held by a separate, third-party qualified custodian.
                      </div>
                    </div>
                  </label>
                </div>

                <div className={`border rounded-lg p-4 transition-all duration-200 ${
                  wizardState.stage2Data.custodyModel === 'advisor-managed-self-custody' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="custodyModel"
                      value="advisor-managed-self-custody"
                      checked={wizardState.stage2Data.custodyModel === 'advisor-managed-self-custody'}
                      onChange={(e) => updateStage2Data('custodyModel', e.target.value)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">Option C: Advisor-Managed Self-Custody Model</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Our firm intends to have direct custody of certain client cryptoassets using our own technological and operational 
                        controls (this path involves extensive compliance and security requirements).
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Dynamic Policy Sections Based on Selection */}
            {wizardState.stage2Data.custodyModel === 'advisor-monitored' && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Please review and formally adopt the following policies to maintain a "No Custody" status:
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      key: 'privateKeyProhibition',
                      title: 'Policy on Private Keys & Passwords',
                      description: 'Our firm and its personnel are strictly prohibited from possessing, storing, or having any knowledge of a client\'s private keys, wallet seed phrases, or passwords to their personal exchange accounts.'
                    },
                    {
                      key: 'clientOnboardingDisclosure',
                      title: 'Client Onboarding Disclosure',
                      description: 'Our client onboarding process will include a clear, written disclosure, acknowledged by the client, stating that the client retains sole custody and control of their cryptoassets.'
                    },
                    {
                      key: 'clientPlatformDueDiligence',
                      title: 'Due Diligence on Client-Used Platforms',
                      description: 'Our firm will conduct reasonable due diligence on the security and reputation of the primary exchanges or platforms our clients use, and will disclose any identified material risks to them.'
                    }
                  ].map((policy) => (
                    <div key={policy.key} className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={wizardState.stage2Data.noCustomyPolicies?.[policy.key as keyof typeof wizardState.stage2Data.noCustomyPolicies] || false}
                          onChange={(e) => updateStage2Data('noCustomyPolicies', {
                            ...wizardState.stage2Data.noCustomyPolicies,
                            [policy.key]: e.target.checked
                          })}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{policy.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{policy.description}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {wizardState.stage2Data.custodyModel === 'third-party-custodian' && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Please acknowledge your firm's commitment to a robust due diligence process:
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      key: 'qualifiedCustodianCommitment',
                      title: 'Qualified Custodian Commitment',
                      description: 'Our firm will select and use only third-party custodians that we have reasonably determined meet the definition of a "qualified custodian" under SEC Rule 206(4)-2.'
                    },
                    {
                      key: 'dueDiligenceProcess',
                      title: 'Due Diligence Process',
                      description: 'Our firm will perform and document initial and ongoing due diligence on our chosen custodian(s), covering their security, insurance, regulatory compliance, and financial stability.'
                    },
                    {
                      key: 'clientDisclosure',
                      title: 'Client Disclosure',
                      description: 'We will fully disclose our custodial arrangements and any associated risks to clients in our Form ADV and other client agreements.'
                    },
                    {
                      key: 'viewIntegratedPartners',
                      title: 'HighWater Integrated Partners',
                      description: 'I would like to view HighWater\'s list of platforms that have completed preliminary diligence checklists.'
                    }
                  ].map((policy) => (
                    <div key={policy.key} className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={wizardState.stage2Data.thirdPartyCustodianPolicies?.[policy.key as keyof typeof wizardState.stage2Data.thirdPartyCustodianPolicies] || false}
                          onChange={(e) => updateStage2Data('thirdPartyCustodianPolicies', {
                            ...wizardState.stage2Data.thirdPartyCustodianPolicies,
                            [policy.key]: e.target.checked
                          })}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{policy.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{policy.description}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {wizardState.stage2Data.custodyModel === 'advisor-managed-self-custody' && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  To proceed with a self-custody model, your firm must formally adopt and attest to implementing the following advanced security and operational controls:
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-800">
                        <strong>Warning:</strong> This model carries the highest level of risk and compliance burden. It should only be considered by firms 
                        with deep technical expertise and for specific situations where a qualified custodian is unavailable or unsuitable.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      key: 'primaryColdStorage',
                      title: 'Primary Cold Storage',
                      description: 'Our firm will store at least 95% of client assets under our direct custody in institutional-grade, geographically distributed, offline cold storage.'
                    },
                    {
                      key: 'multiPartyControl',
                      title: 'Multi-Party Control',
                      description: 'All transactions from custody will require authorization via multi-signature (multisig) or Multi-Party Computation (MPC) protocols, with keys held by multiple trusted individuals in separate secure locations.'
                    },
                    {
                      key: 'privateKeyManagement',
                      title: 'Private Key Management',
                      description: 'Our firm has a comprehensive, documented policy for the generation, secure storage, and disaster recovery of all private keys and seed phrases.'
                    },
                    {
                      key: 'independentAudits',
                      title: 'Independent Audits',
                      description: 'Our firm will engage an independent public accountant for an annual surprise examination or other third-party security audits of our self-custody arrangements.'
                    },
                    {
                      key: 'comprehensiveInsurance',
                      title: 'Comprehensive Insurance',
                      description: 'Our firm will maintain the maximum feasible insurance coverage for assets held in self-custody, covering both internal and external theft.'
                    }
                  ].map((policy) => (
                    <div key={policy.key} className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={wizardState.stage2Data.selfCustodyPolicies?.[policy.key as keyof typeof wizardState.stage2Data.selfCustodyPolicies] || false}
                          onChange={(e) => updateStage2Data('selfCustodyPolicies', {
                            ...wizardState.stage2Data.selfCustodyPolicies,
                            [policy.key]: e.target.checked
                          })}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{policy.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{policy.description}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {wizardState.currentStep === '1.1' && (
          <>
            {/* Services Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Please select all crypto-related services your firm intends to provide:
              </h3>
              <div className="space-y-4">
                {wizardState.step1Data.services.map((service) => (
                  <div 
                    key={service.id}
                    className={`border rounded-lg p-4 transition-all duration-200 ${
                      service.selected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={service.selected}
                        onChange={(e) => updateServiceSelection(service.id, e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-gray-900">{service.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{service.description}</div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {wizardState.currentStep === '1.1' && (
          <>
            {/* DeFi Acknowledgement */}
            {hasDefiSelected && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Advanced DeFi Advisory - Risk Management Requirements
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-800">
                        <strong>Important:</strong> Advanced DeFi Advisory services require additional risk management protocols. 
                        Please acknowledge your firm's approach to protocol risk management below.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wizardState.step1Data.defiAcknowledgement.auditRequirement}
                        onChange={(e) => updateDefiAcknowledgement('auditRequirement', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Security Audit Requirement</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Our firm will only advise on DeFi protocols that have undergone one or more independent, 
                          third-party security audits.
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wizardState.step1Data.defiAcknowledgement.dueDiligenceProcess}
                        onChange={(e) => updateDefiAcknowledgement('dueDiligenceProcess', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Due Diligence Process</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Our firm will maintain a documented due diligence process for each DeFi protocol, 
                          assessing smart contract risk, governance, and economic vulnerabilities.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {wizardState.currentStep === '1.2' && (
          <>
            {/* Step 1.2 Content */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Please review and formally adopt the following due diligence commitments for your firm's compliance records:
              </h3>
              
              {/* Asset Diligence */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">Asset Diligence</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    Our firm commits to a documented review of each cryptoasset before it is recommended, covering:
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wizardState.step2Data.assetDiligence.technologySecurity}
                        onChange={(e) => updateAssetDiligence('technologySecurity', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Technology & Security</div>
                        <div className="text-sm text-gray-600 mt-1">
                          The nature of the underlying blockchain, smart contract code, and history of security audits.
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wizardState.step2Data.assetDiligence.useCaseUtility}
                        onChange={(e) => updateAssetDiligence('useCaseUtility', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Use Case & Utility</div>
                        <div className="text-sm text-gray-600 mt-1">
                          The asset's stated purpose, the problem it solves, and evidence of real-world adoption.
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wizardState.step2Data.assetDiligence.tokenomics}
                        onChange={(e) => updateAssetDiligence('tokenomics', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Tokenomics</div>
                        <div className="text-sm text-gray-600 mt-1">
                          The asset's supply schedule, distribution model, inflation mechanics, and insider allocations.
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wizardState.step2Data.assetDiligence.teamGovernance}
                        onChange={(e) => updateAssetDiligence('teamGovernance', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Team & Governance</div>
                        <div className="text-sm text-gray-600 mt-1">
                          The experience and reputation of the core development team and the structure of project governance.
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wizardState.step2Data.assetDiligence.regulatoryStatus}
                        onChange={(e) => updateAssetDiligence('regulatoryStatus', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Regulatory Status</div>
                        <div className="text-sm text-gray-600 mt-1">
                          A reasonable assessment of the asset's likely classification (e.g., security, commodity, etc.) and any associated regulatory risks.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Platform Diligence */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">Platform Diligence</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    Our firm commits to a documented review of any third-party platform (e.g., exchange, DeFi protocol) used for client transactions, covering:
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wizardState.step2Data.platformDiligence.securitySolvency}
                        onChange={(e) => updatePlatformDiligence('securitySolvency', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Security & Solvency</div>
                        <div className="text-sm text-gray-600 mt-1">
                          The platform's security architecture, insurance coverage, history of breaches, and financial health.
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wizardState.step2Data.platformDiligence.compliancePosture}
                        onChange={(e) => updatePlatformDiligence('compliancePosture', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Compliance Posture</div>
                        <div className="text-sm text-gray-600 mt-1">
                          The platform's regulatory licensing, AML/KYC procedures, and adherence to rules in relevant jurisdictions.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {wizardState.currentStep === '1.1' && (
          /* Platform Action Notice */
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Platform Action</h4>
                <p className="text-sm text-green-800 mt-1">
                  Your selections will tailor the subsequent checklist items. For example, selecting "Advanced DeFi Advisory" 
                  will add specific DeFi-related risk disclosure modules to your compliance framework.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '1.2' && (
          /* Platform Action Notice for Step 1.2 */
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Platform Action</h4>
                <p className="text-sm text-green-800 mt-1">
                  Acknowledging these commitments creates a formal record within HighWater. The platform will later allow you to create 
                  and manage a diligence file for each asset and platform you use, structured around these exact checklist items.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '1.3' && (
          /* Platform Action Notice for Step 1.3 */
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Platform Action</h4>
                <p className="text-sm text-green-800 mt-1">
                  The platform will use this allocation percentage to set a default alert threshold within the portfolio management tools, 
                  flagging clients whose crypto allocation exceeds the firm's general guideline.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '1.4' && (
          /* Platform Action Notice for Step 1.4 */
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Platform Action</h4>
                <p className="text-sm text-green-800 mt-1">
                  Your selections will pre-configure the platform's internal risk assessment templates and alerts. For example, 
                  selecting "Reduce Risk" for volatility could set a lower default threshold for portfolio volatility alerts.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '1.5' && (
          /* Platform Action Notice for Step 1.5 */
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Platform Action</h4>
                <p className="text-sm text-green-800 mt-1">
                  Acknowledging these policies provides another layer of documented diligence for the firm's compliance file. 
                  HighWater will provide a secure vendor diligence report on its own practices for your records.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '1.6' && (
          /* Platform Action Notice for Step 1.6 */
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Platform Action</h4>
                <p className="text-sm text-green-800 mt-1">
                  HighWater is designed to be the system of record for your crypto advisory practice, securely storing and 
                  archiving the data and reports you generate to help you meet these obligations.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '1.summary' && (
          /* Platform Action Notice for Stage 1 Summary */
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-blue-900">Stage 1 Summary</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Review your Stage 1 selections above. Once you're satisfied with your choices, 
                  proceed to complete Stage 1 and advance to the custody model configuration.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '1.complete' && (
          /* Platform Action Notice for Stage 1 Complete */
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Platform Configuration</h4>
                <p className="text-sm text-green-800 mt-1">
                  HighWater has configured your advisory services framework based on your Stage 1 selections. 
                  Your compliance policies and risk management procedures are now active in the platform.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '2.summary' && (
          /* Platform Action Notice for Stage 2 Summary */
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-blue-900">Stage 2 Summary</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Review your custody model selection and policy commitments above. Once confirmed, 
                  complete Stage 2 to finalize your crypto advisory onboarding.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '2.complete' && (
          /* Platform Action Notice for Stage 2 Complete */
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-purple-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-purple-900">Platform Ready</h4>
                <p className="text-sm text-purple-800 mt-1">
                  Your HighWater platform is fully configured and ready for crypto advisory operations. 
                  All compliance workflows, templates, and monitoring tools are now active based on your selections.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '2.1' && (
          /* Platform Action Notice for Stage 2 */
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-900">Platform Action</h4>
                <p className="text-sm text-green-800 mt-1">
                  Your custody model selection will trigger a specific compliance workflow tailored to the risks and requirements of that model. 
                  HighWater will provide relevant templates, checklists, and platform configurations based on your chosen approach.
                </p>
              </div>
            </div>
          </div>
        )}

        {wizardState.currentStep === '2.summary' && (
          <>
            {/* Stage 2 Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Stage 2 Summary: Custody Model & Asset Safeguarding Framework
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">Review Your Custody Model Selection</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Below is a summary of your Stage 2 selections. Review your custody model choice and policy commitments before completing the onboarding process.
                </p>
              </div>
            </div>

            {/* Selected Custody Model */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Selected Custody Model
              </h3>
              <div className="border border-green-200 bg-green-50 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 text-lg">
                      {wizardState.stage2Data.custodyModel === 'advisor-monitored' ? 'Option A: Advisor-Monitored (No RIA Custody)' :
                       wizardState.stage2Data.custodyModel === 'third-party-custodian' ? 'Option B: Third-Party Qualified Custodian Model' :
                       wizardState.stage2Data.custodyModel === 'advisor-managed-self-custody' ? 'Option C: Advisor-Managed Self-Custody Model' :
                       'No model selected'}
                    </h4>
                    <p className="text-sm text-green-800 mt-2">
                      {wizardState.stage2Data.custodyModel === 'advisor-monitored' ? 
                        'You monitor client crypto activities without taking custody. Clients maintain control of their private keys at third-party platforms.' :
                       wizardState.stage2Data.custodyModel === 'third-party-custodian' ? 
                        'You work with SEC-qualified custodians who hold crypto assets on behalf of your clients.' :
                       wizardState.stage2Data.custodyModel === 'advisor-managed-self-custody' ? 
                        'Your firm directly manages crypto private keys and storage on behalf of clients.' :
                       'Please select a custody model to continue.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Commitments */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Policy Commitments Status
              </h3>
              
              {wizardState.stage2Data.custodyModel === 'advisor-monitored' && wizardState.stage2Data.noCustomyPolicies && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">No Custody Policies</h4>
                  {Object.entries(wizardState.stage2Data.noCustomyPolicies).map(([key, value]) => (
                    <div key={key} className={`border rounded-lg p-4 ${
                      value ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 mr-3 ${
                          value ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className={`text-sm ${
                          value ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value ? 'Committed' : 'Not committed'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {wizardState.stage2Data.custodyModel === 'third-party-custodian' && wizardState.stage2Data.thirdPartyCustodianPolicies && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Third-Party Custodian Policies</h4>
                  {Object.entries(wizardState.stage2Data.thirdPartyCustodianPolicies).map(([key, value]) => (
                    <div key={key} className={`border rounded-lg p-4 ${
                      value ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 mr-3 ${
                          value ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className={`text-sm ${
                          value ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value ? 'Committed' : 'Not committed'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {wizardState.stage2Data.custodyModel === 'advisor-managed-self-custody' && wizardState.stage2Data.selfCustodyPolicies && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Self-Custody Policies</h4>
                  {Object.entries(wizardState.stage2Data.selfCustodyPolicies).map(([key, value]) => (
                    <div key={key} className={`border rounded-lg p-4 ${
                      value ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 mr-3 ${
                          value ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className={`text-sm ${
                          value ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: {value ? 'Committed' : 'Not committed'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {wizardState.currentStep === '2.complete' && (
          <>
            {/* Stage 2 Complete */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Crypto Onboarding Complete!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Congratulations! You have successfully completed the entire HighWater Crypto Advisory Onboarding process.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">Stage 1 - Advisory Services Framework</h3>
                  <ul className="text-sm text-green-800 space-y-1 text-left">
                    <li>✓ Service offerings defined</li>
                    <li>✓ Due diligence frameworks established</li>
                    <li>✓ Suitability procedures created</li>
                    <li>✓ Risk management protocols implemented</li>
                    <li>✓ Operational security measures set up</li>
                    <li>✓ Recordkeeping compliance policies established</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Stage 2 - Custody & Safeguarding Framework</h3>
                  <ul className="text-sm text-blue-800 space-y-1 text-left">
                    <li>✓ Custody model selected and configured</li>
                    <li>✓ Asset safeguarding policies committed</li>
                    <li>✓ Compliance workflows established</li>
                    <li>✓ Platform configurations applied</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="font-semibold text-purple-900 mb-3">Ready to Launch Your Crypto Advisory Practice</h3>
                <p className="text-sm text-purple-800">
                  Your HighWater platform is now fully configured for crypto advisory services. You can begin 
                  onboarding clients, managing portfolios, and leveraging our compliance tools and reporting 
                  capabilities to build a successful digital asset advisory practice.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between items-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <div className="flex items-center space-x-4">
            {(wizardState.currentStep === '1.2' || wizardState.currentStep === '1.3' || wizardState.currentStep === '1.4' || wizardState.currentStep === '1.5' || wizardState.currentStep === '1.6' || wizardState.currentStep === '1.summary' || wizardState.currentStep === '1.complete' || wizardState.currentStep === '2.summary' || wizardState.currentStep === '2.complete') && (
              <button
                onClick={handlePrevious}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            
            {!canProceed && (
              <p className="text-sm text-amber-600">
                {wizardState.currentStep === '1.1' ? (
                  <>
                    Please select at least one service to continue
                    {hasDefiSelected && ' and complete DeFi acknowledgements'}
                  </>
                ) : wizardState.currentStep === '1.2' ? (
                  'Please acknowledge all due diligence commitments to continue'
                ) : wizardState.currentStep === '1.3' ? (
                  'Please complete the suitability approach and allocation percentage to continue'
                ) : wizardState.currentStep === '1.4' ? (
                  'Please review and confirm your risk management selections to continue'
                ) : wizardState.currentStep === '1.5' ? (
                  'Please acknowledge all cybersecurity policy commitments to continue'
                ) : wizardState.currentStep === '1.6' ? (
                  'Please acknowledge all recordkeeping policy commitments to continue'
                ) : wizardState.currentStep === '1.summary' ? (
                  'Review your Stage 1 selections above before proceeding'
                ) : wizardState.currentStep === '1.complete' ? (
                  'Ready to proceed to Stage 2 - Custody Model & Asset Safeguarding'
                ) : wizardState.currentStep === '2.summary' ? (
                  'Review your custody model selection above before completing onboarding'
                ) : wizardState.currentStep === '2.complete' ? (
                  'Onboarding complete! Your crypto advisory practice is ready to launch.'
                ) : (
                  'Please select a custody model and complete all required policies to continue'
                )}
              </p>
            )}
            
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                canProceed
                  ? 'text-white bg-blue-600 hover:bg-blue-700'
                  : 'text-gray-400 bg-gray-200 cursor-not-allowed'
              }`}
            >
              {wizardState.currentStep === '1.1' ? 'Continue to Step 1.2' : 
               wizardState.currentStep === '1.2' ? 'Continue to Step 1.3' : 
               wizardState.currentStep === '1.3' ? 'Continue to Step 1.4' : 
               wizardState.currentStep === '1.4' ? 'Continue to Step 1.5' : 
               wizardState.currentStep === '1.5' ? 'Continue to Step 1.6' : 
               wizardState.currentStep === '1.6' ? 'Review Stage 1' : 
               wizardState.currentStep === '1.summary' ? 'Complete Stage 1' : 
               wizardState.currentStep === '1.complete' ? 'Proceed to Stage 2' : 
               wizardState.currentStep === '2.1' ? 'Review Stage 2' : 
               wizardState.currentStep === '2.summary' ? 'Complete Stage 2' : 
               wizardState.currentStep === '2.complete' ? 'Finish Onboarding' : 
               'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};