'use client';

import React, { useState } from 'react';
import { apiService, ApiError } from '../data/api';
import type { ClientOnboardingRequest, ClientOnboardingResult } from '../types/api';

interface ClientOnboardingProps {
  onComplete?: (result: ClientOnboardingResult) => void;
  onCancel?: () => void;
}

type OnboardingStep = 'basic' | 'risk' | 'investment' | 'documents' | 'review';

interface OnboardingFormData {
  name: string;
  email: string;
  advisorId: string;
  riskProfile: string;
  initialInvestment: number;
  phone?: string;
  address?: string;
  emergencyContact?: string;
  communicationPreference: string;
  reportingFrequency: string;
}

export const ClientOnboarding: React.FC<ClientOnboardingProps> = ({ 
  onComplete, 
  onCancel 
}) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<OnboardingFormData>({
    name: '',
    email: '',
    advisorId: '',
    riskProfile: 'Moderate',
    initialInvestment: 0,
    communicationPreference: 'Email',
    reportingFrequency: 'Monthly'
  });

  const steps: { key: OnboardingStep; title: string; description: string }[] = [
    { key: 'basic', title: 'Basic Information', description: 'Personal details and contact information' },
    { key: 'risk', title: 'Risk Assessment', description: 'Investment preferences and risk tolerance' },
    { key: 'investment', title: 'Investment Details', description: 'Initial investment amount and goals' },
    { key: 'documents', title: 'Documentation', description: 'Required documents and verification' },
    { key: 'review', title: 'Review & Submit', description: 'Review all information and submit application' }
  ];

  const updateFormData = (field: keyof OnboardingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: OnboardingStep): boolean => {
    switch (step) {
      case 'basic':
        return !!(formData.name && formData.email && formData.advisorId);
      case 'risk':
        return !!formData.riskProfile;
      case 'investment':
        return formData.initialInvestment > 0;
      case 'documents':
        return true; // Documents are informational
      case 'review':
        return true; // All validation done in previous steps
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const currentIndex = steps.findIndex(s => s.key === currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1].key);
        setError(null);
      }
    } else {
      setError('Please complete all required fields before proceeding.');
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].key);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const onboardingRequest: ClientOnboardingRequest = {
        name: formData.name,
        email: formData.email,
        advisorId: formData.advisorId,
        riskProfile: formData.riskProfile,
        initialInvestment: formData.initialInvestment
      };

      const result = await apiService.onboardClient(onboardingRequest);
      onComplete?.(result.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to submit onboarding application');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advisor ID *
              </label>
              <input
                type="text"
                value={formData.advisorId}
                onChange={(e) => updateFormData('advisorId', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter advisor ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        );

      case 'risk':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Profile *
              </label>
              <select
                value={formData.riskProfile}
                onChange={(e) => updateFormData('riskProfile', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Conservative">Conservative</option>
                <option value="Moderate">Moderate</option>
                <option value="Aggressive">Aggressive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Communication Preference
              </label>
              <select
                value={formData.communicationPreference}
                onChange={(e) => updateFormData('communicationPreference', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="SMS">SMS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reporting Frequency
              </label>
              <select
                value={formData.reportingFrequency}
                onChange={(e) => updateFormData('reportingFrequency', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>
          </div>
        );

      case 'investment':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Investment Amount *
              </label>
              <input
                type="number"
                value={formData.initialInvestment}
                onChange={(e) => updateFormData('initialInvestment', Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount in USD"
                min="0"
                step="1000"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Investment Guidelines</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Minimum investment: $10,000</li>
                <li>• Recommended for new clients: $25,000+</li>
                <li>• Diversification across multiple asset classes</li>
                <li>• Regular rebalancing and monitoring</li>
              </ul>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">Required Documents</h4>
              <p className="text-sm text-yellow-700 mb-3">
                Please prepare the following documents for account verification:
              </p>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Government-issued photo ID (passport, driver's license)</li>
                <li>• Proof of address (utility bill, bank statement)</li>
                <li>• Employment verification letter</li>
                <li>• Source of funds documentation</li>
                <li>• Tax identification number</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-900 mb-2">Next Steps</h4>
              <p className="text-sm text-green-700">
                After submitting your application, our team will contact you within 24 hours to guide you through the document submission process.
              </p>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Application Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name:</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email:</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Advisor ID:</p>
                  <p className="font-medium">{formData.advisorId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Risk Profile:</p>
                  <p className="font-medium">{formData.riskProfile}</p>
                </div>
                <div>
                  <p className="text-gray-600">Initial Investment:</p>
                  <p className="font-medium">${formData.initialInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Communication:</p>
                  <p className="font-medium">{formData.communicationPreference}</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                By submitting this application, you agree to our terms of service and privacy policy. 
                You will receive a confirmation email once your application is processed.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Client Onboarding</h2>
        <p className="text-sm text-gray-600 mt-1">Complete the form below to onboard a new client</p>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                steps.findIndex(s => s.key === currentStep) >= index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  steps.findIndex(s => s.key === currentStep) > index
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">
            {steps.find(s => s.key === currentStep)?.title}
          </h3>
          <p className="text-sm text-gray-600">
            {steps.find(s => s.key === currentStep)?.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {renderStepContent()}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <div className="flex space-x-3">
            {currentStep !== 'basic' && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            {currentStep !== 'review' ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 