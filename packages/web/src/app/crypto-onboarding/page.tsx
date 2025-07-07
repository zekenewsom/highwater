'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CryptoOnboardingWizard } from '../../components/CryptoOnboardingWizard';
import { CryptoOnboardingState } from '../../types/crypto-onboarding';

export default function CryptoOnboardingPage() {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);
  const [completedState, setCompletedState] = useState<CryptoOnboardingState | null>(null);

  const handleComplete = (state: CryptoOnboardingState) => {
    setCompletedState(state);
    setIsComplete(true);
    
    // In a real implementation, you would save this to your backend
    console.log('Crypto onboarding completed:', state);
  };

  const handleStageComplete = (state: CryptoOnboardingState) => {
    if (state.currentStage === 1) {
      // Move to Stage 2
      const updatedState = {
        ...state,
        currentStage: 2,
        currentStep: '2.1',
        completed: false
      };
      setCompletedState(updatedState);
    } else {
      // Final completion
      handleComplete(state);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  const handleContinue = () => {
    if (completedState?.currentStage === 1) {
      // Move to Stage 2
      const updatedState = {
        ...completedState,
        currentStage: 2,
        currentStep: '2.1',
        completed: false
      };
      setCompletedState(updatedState);
      setIsComplete(false);
    } else {
      // Navigate to dashboard
      router.push('/dashboard');
    }
  };

  if (isComplete && completedState) {
    const selectedServices = completedState.step1Data.services.filter(s => s.selected);
    
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Stage 1 Complete!
              </h2>
              <p className="text-gray-600">
                Your firm's crypto policy framework and due diligence commitments have been successfully established.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              {/* Services Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Selected Services Summary
                </h3>
                <div className="space-y-3">
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitability Policy */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Suitability Policy
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Approach</h4>
                    <div className="text-sm text-gray-600">
                      {completedState.step3Data.suitabilityApproach === 'existing-questionnaire' && 
                        'Existing Risk Questionnaire'}
                      {completedState.step3Data.suitabilityApproach === 'crypto-addendum' && 
                        'Crypto Risk Addendum'}
                      {completedState.step3Data.suitabilityApproach === 'other' && 
                        'Custom Approach'}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Max Allocation</h4>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {completedState.step3Data.maxAllocationPercentage}%
                      </span>
                      <span className="text-sm text-gray-600 ml-2">
                        of total assets
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Management */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Risk Management
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2 ${
                      completedState.step4Data.marketVolatilityRisk === 'reduce' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {completedState.step4Data.marketVolatilityRisk === 'reduce' ? 'Reduce' : 'Accept'}
                    </span>
                    <span className="text-sm text-gray-600">Market Volatility</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2 ${
                      completedState.step4Data.technologyCybersecurityRisk === 'transfer' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {completedState.step4Data.technologyCybersecurityRisk === 'transfer' ? 'Transfer' : 'Reduce'}
                    </span>
                    <span className="text-sm text-gray-600">Technology Risk</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800 mr-2">
                      Reduce
                    </span>
                    <span className="text-sm text-gray-600">Regulatory Risk</span>
                  </div>
                </div>
              </div>

              {/* Due Diligence Framework */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Due Diligence Framework
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Asset Diligence Commitments</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Technology & Security Assessment
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Use Case & Utility Analysis
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Tokenomics Review
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Team & Governance Evaluation
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Regulatory Status Assessment
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Platform Diligence Commitments</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Security & Solvency Review
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Compliance Posture Assessment
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cybersecurity Policy */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Cybersecurity Policy
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    {completedState.step5Data.secureWalletKeyManagement ? (
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-600">Secure Wallet & Key Management</span>
                  </div>
                  <div className="flex items-center">
                    {completedState.step5Data.accessControls ? (
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-600">Access Controls (MFA)</span>
                  </div>
                  <div className="flex items-center">
                    {completedState.step5Data.vendorDiligence ? (
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-600">Vendor Diligence</span>
                  </div>
                  <div className="flex items-center">
                    {completedState.step5Data.incidentResponsePlan ? (
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-600">Incident Response Plan</span>
                  </div>
                </div>
              </div>

              {/* Recordkeeping Policy */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Recordkeeping Policy
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    {completedState.step6Data.recordRetentionCompliance ? (
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-600">Record Retention Compliance</span>
                  </div>
                  <div className="flex items-center">
                    {completedState.step6Data.cryptoEventsDocumentation ? (
                      <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-600">Crypto Events Documentation</span>
                  </div>
                </div>
              </div>
            </div>


            {selectedServices.some(s => s.id === 'defi-advisory') && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
                <h4 className="font-medium text-amber-900 mb-2">DeFi Advisory Acknowledgements</h4>
                <div className="space-y-2 text-sm text-amber-800">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Security audit requirement acknowledged
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Due diligence process commitment confirmed
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
              <p className="text-sm text-blue-800">
                {completedState.currentStage === 1 ? (
                  <>
                    Your comprehensive crypto policy framework has been established. Your service selections, due diligence commitments, 
                    suitability policies, and risk management framework will be integrated into the HighWater platform to support compliant 
                    crypto advisory services. The next stage will focus on establishing your custody model and asset safeguarding framework.
                  </>
                ) : (
                  <>
                    Your crypto advisory compliance framework is now complete. The platform will configure alerts, templates, and workflows 
                    based on your established policies and custody model. You're ready to begin compliant crypto advisory services.
                  </>
                )}
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setIsComplete(false)}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Edit
              </button>
              <button
                onClick={handleContinue}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {completedState.currentStage === 1 ? 'Continue to Stage 2' : 'Continue to Dashboard'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <CryptoOnboardingWizard
          onComplete={handleStageComplete}
          onCancel={handleCancel}
          initialState={completedState}
        />
      </div>
    </div>
  );
}