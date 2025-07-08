'use client';
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useClient } from '../../contexts/ClientContext';
import { CryptoOnboardingState } from '../../types/crypto-onboarding';

function NoClientSelected() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Client Selected</h3>
          <p className="mt-1 text-gray-500 max-w-md">
            Please select a client first to view their compliance settings. You can do this from the Clients page or Dashboard.
          </p>
          <div className="mt-6">
            <a
              href="/clients"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Go to Clients
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function ComplianceStatusBadge({ status }: { status: boolean }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      status 
        ? 'bg-green-100 text-green-800' 
        : 'bg-yellow-100 text-yellow-800'
    }`}>
      {status ? '✓ Configured' : '⚠ Pending'}
    </span>
  );
}

function ServiceDefinitionCard({ complianceData }: { complianceData: CryptoOnboardingState }) {
  const selectedServices = complianceData.step1Data.services.filter(s => s.selected);
  const defiAcknowledgement = complianceData.step1Data.defiAcknowledgement;
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Service Definition</h3>
        <ComplianceStatusBadge status={selectedServices.length > 0} />
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Services</h4>
          {selectedServices.length > 0 ? (
            <ul className="space-y-2">
              {selectedServices.map(service => (
                <li key={service.id} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No services selected</p>
          )}
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">DeFi Acknowledgements</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${defiAcknowledgement.auditRequirement ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-900">Audit Requirement</span>
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${defiAcknowledgement.dueDiligenceProcess ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-900">Due Diligence Process</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustodyModelCard({ complianceData }: { complianceData: CryptoOnboardingState }) {
  const custodyModel = complianceData.stage2Data.custodyModel;
  const hasSelectedModel = custodyModel !== '';
  
  const modelNames = {
    'advisor-monitored': 'Advisor-Monitored (No RIA Custody)',
    'third-party-custodian': 'Third-Party Qualified Custodian Model',
    'advisor-managed-self-custody': 'Advisor-Managed Self-Custody Model'
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Custody Model</h3>
        <ComplianceStatusBadge status={hasSelectedModel} />
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Model</h4>
          {hasSelectedModel ? (
            <p className="text-sm text-gray-900">{modelNames[custodyModel as keyof typeof modelNames]}</p>
          ) : (
            <p className="text-sm text-gray-500">No custody model selected</p>
          )}
        </div>
        
        {custodyModel === 'advisor-monitored' && complianceData.stage2Data.noCustomyPolicies && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">No Custody Policies</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.noCustomyPolicies.privateKeyProhibition ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Private Key Prohibition</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.noCustomyPolicies.clientOnboardingDisclosure ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Client Onboarding Disclosure</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.noCustomyPolicies.clientPlatformDueDiligence ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Client Platform Due Diligence</span>
              </div>
            </div>
          </div>
        )}
        
        {custodyModel === 'third-party-custodian' && complianceData.stage2Data.thirdPartyCustodianPolicies && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Third-Party Custodian Policies</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.thirdPartyCustodianPolicies.qualifiedCustodianCommitment ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Qualified Custodian Commitment</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.thirdPartyCustodianPolicies.dueDiligenceProcess ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Due Diligence Process</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.thirdPartyCustodianPolicies.clientDisclosure ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Client Disclosure</span>
              </div>
            </div>
          </div>
        )}
        
        {custodyModel === 'advisor-managed-self-custody' && complianceData.stage2Data.selfCustodyPolicies && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Self-Custody Policies</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.selfCustodyPolicies.primaryColdStorage ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Primary Cold Storage</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.selfCustodyPolicies.multiPartyControl ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Multi-Party Control</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.selfCustodyPolicies.privateKeyManagement ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Private Key Management</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.selfCustodyPolicies.independentAudits ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Independent Audits</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${complianceData.stage2Data.selfCustodyPolicies.comprehensiveInsurance ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-900">Comprehensive Insurance</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RiskAssessmentCard({ complianceData }: { complianceData: CryptoOnboardingState }) {
  const suitabilityApproach = complianceData.step3Data.suitabilityApproach;
  const maxAllocation = complianceData.step3Data.maxAllocationPercentage;
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Risk Assessment</h3>
        <ComplianceStatusBadge status={suitabilityApproach !== ''} />
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Suitability Approach</h4>
          <p className="text-sm text-gray-900 capitalize">{suitabilityApproach.replace('-', ' ')}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Maximum Allocation</h4>
          <p className="text-sm text-gray-900">{maxAllocation}% of portfolio</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Management</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">Market Volatility Risk</span>
              <span className="text-sm text-gray-600 capitalize">{complianceData.step4Data.marketVolatilityRisk}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">Technology/Cybersecurity Risk</span>
              <span className="text-sm text-gray-600 capitalize">{complianceData.step4Data.technologyCybersecurityRisk}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900">Regulatory Risk</span>
              <span className="text-sm text-gray-600 capitalize">{complianceData.step4Data.regulatoryRisk}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceFrameworkCard({ complianceData }: { complianceData: CryptoOnboardingState }) {
  const stage3 = complianceData.stage3Data;
  const stage4 = complianceData.stage4Data;
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Compliance Framework</h3>
        <ComplianceStatusBadge status={stage3.suitabilityAddendumAdoption && stage4.assetDiligenceFrameworkAdoption} />
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Client Onboarding</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${stage3.suitabilityAddendumAdoption ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-900">Suitability Addendum Adoption</span>
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${stage3.disclosureDocumentReview ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-900">Disclosure Document Review</span>
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${stage3.onboardingWorkflowAdoption ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-900">Onboarding Workflow Adoption</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Due Diligence</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${stage4.assetDiligenceFrameworkAdoption ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-900">Asset Diligence Framework</span>
            </div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 ${stage4.platformVendorDiligenceFrameworkAdoption ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm text-gray-900">Platform & Vendor Diligence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceDashboard() {
  const { selectedClient } = useClient();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock compliance data - in real app, this would come from API
  const [complianceData, setComplianceData] = useState<CryptoOnboardingState>({
    currentStage: 5,
    currentStep: '5.complete',
    step1Data: {
      services: [
        { id: 'general-education', name: 'General Education', description: 'Educational materials about cryptoassets', selected: true },
        { id: 'regulated-products', name: 'Advisory Services on Regulated Crypto Products', description: 'Spot Bitcoin ETFs advice', selected: true },
      ],
      defiAcknowledgement: {
        auditRequirement: true,
        dueDiligenceProcess: true,
      },
    },
    step2Data: {
      assetDiligence: {
        technologySecurity: true,
        useCaseUtility: true,
        tokenomics: true,
        teamGovernance: true,
        regulatoryStatus: true,
      },
      platformDiligence: {
        securitySolvency: true,
        compliancePosture: true,
      },
    },
    step3Data: {
      suitabilityApproach: 'crypto-addendum',
      otherSuitabilityDescription: '',
      maxAllocationPercentage: 10,
    },
    step4Data: {
      marketVolatilityRisk: 'reduce',
      technologyCybersecurityRisk: 'transfer',
      regulatoryRisk: 'reduce',
    },
    step5Data: {
      secureWalletKeyManagement: true,
      accessControls: true,
      vendorDiligence: true,
      incidentResponsePlan: true,
    },
    step6Data: {
      recordRetentionCompliance: true,
      cryptoEventsDocumentation: true,
    },
    stage2Data: {
      custodyModel: 'third-party-custodian',
      thirdPartyCustodianPolicies: {
        qualifiedCustodianCommitment: true,
        dueDiligenceProcess: true,
        clientDisclosure: true,
        viewIntegratedPartners: true,
      },
    },
    stage3Data: {
      suitabilityAddendumAdoption: true,
      disclosureDocumentReview: true,
      onboardingWorkflowAdoption: true,
    },
    stage4Data: {
      assetDiligenceFrameworkAdoption: true,
      platformVendorDiligenceFrameworkAdoption: true,
    },
    stage5Data: {
      platformActivationAcknowledgment: true,
    },
    completed: true,
  });
  
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Compliance Dashboard
              </h1>
              <p className="mt-1 text-gray-600 text-sm">
                {selectedClient?.name}'s crypto compliance configuration and status
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Save Changes' : 'Edit Settings'}
              </button>
              <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                Export Report
              </button>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Onboarding</p>
                  <p className="text-xs text-gray-500">Complete</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Services</p>
                  <p className="text-xs text-gray-500">{complianceData.step1Data.services.filter(s => s.selected).length} Active</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Custody</p>
                  <p className="text-xs text-gray-500">Third-Party</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Max Allocation</p>
                  <p className="text-xs text-gray-500">{complianceData.step3Data.maxAllocationPercentage}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ServiceDefinitionCard complianceData={complianceData} />
            <CustodyModelCard complianceData={complianceData} />
            <RiskAssessmentCard complianceData={complianceData} />
            <ComplianceFrameworkCard complianceData={complianceData} />
          </div>

          {/* Action Items */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-900">Compliance framework activated</span>
                <span className="text-sm text-gray-500 ml-auto">2 days ago</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-900">Updated custody model settings</span>
                <span className="text-sm text-gray-500 ml-auto">1 week ago</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-900">Completed onboarding process</span>
                <span className="text-sm text-gray-500 ml-auto">2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CompliancePage() {
  const { selectedClient } = useClient();

  if (!selectedClient) {
    return <NoClientSelected />;
  }

  return <ComplianceDashboard />;
}