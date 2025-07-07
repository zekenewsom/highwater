'use client';
import React from 'react';
import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to HighWater!</h1>
          <p className="text-gray-600">
            Your account has been created successfully. This is where the onboarding wizard will be implemented.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-1 mr-3">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Account created</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-1 mr-3">
                <span className="text-blue-600 text-xs font-bold">2</span>
              </div>
              <span className="text-gray-700">Complete profile setup (Coming soon)</span>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-full p-1 mr-3">
                <span className="text-gray-600 text-xs font-bold">3</span>
              </div>
              <span className="text-gray-700">Risk assessment questionnaire (Coming soon)</span>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-full p-1 mr-3">
                <span className="text-gray-600 text-xs font-bold">4</span>
              </div>
              <span className="text-gray-700">Connect investment accounts (Coming soon)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Crypto Services Onboarding</h2>
          <p className="text-gray-600 mb-4">
            Set up your firm's crypto policy framework and define your scope of crypto-related services.
          </p>
          <Link
            href="/crypto-onboarding"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Start Crypto Onboarding
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            For now, you can explore the dashboard to see the platform's capabilities.
          </p>
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Continue to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}