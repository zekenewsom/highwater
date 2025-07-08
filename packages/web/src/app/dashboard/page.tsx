'use client';

import React from 'react';
import { ClientsList } from '../../components/ClientsList';
import { PortfoliosList } from '../../components/PortfoliosList';
import { Client } from '../../types/api';
import { useClient } from '../../contexts/ClientContext';
import NavBar from '../../components/NavBar';
import PortfolioActivityChart from '../../components/PortfolioActivityChart';
import NetWorthOverview from '../../components/NetWorthOverview';
import PerformanceComparisonChart from '../../components/PerformanceComparisonChart';
import RiskComplianceFlags from '../../components/RiskComplianceFlags';
import TransactionSummaryTable from '../../components/TransactionSummaryTable';
import GainLossAnalysis from '../../components/GainLossAnalysis';
import { AllocationBreakdown } from '../../components/AllocationBreakdown';

function ClientSelectionView() {
  const { setSelectedClient } = useClient();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Select a Client</h1>
          <p className="mt-2 text-sm text-gray-600">
            Choose a client to view their detailed dashboard and portfolio analytics
          </p>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Clients Section */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Clients</h2>
                <p className="text-sm text-gray-600">Click "View Details" to access their dashboard</p>
              </div>
              <ClientsList onClientSelect={setSelectedClient} />
            </div>

            {/* Portfolios Section */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">All Portfolios</h2>
                <p className="text-sm text-gray-600">Overview of all portfolios in the system</p>
              </div>
              <PortfoliosList />
            </div>
          </div>

          {/* API Status */}
          <div className="mt-8 p-4 bg-white border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">System Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-gray-600">JSON API v2 endpoints active</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-gray-600">Real-time data updates</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                <span className="text-gray-600">Advanced analytics ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientDashboardView({ client }: { client: Client }) {
  const { setSelectedClient } = useClient();
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {client.name}'s Dashboard
            </h1>
            <p className="mt-1 text-gray-600 text-sm">
              {client.email} • Advisor: {client.advisorId} • Risk Profile: {client.riskProfile}
            </p>
            <p className="mt-1 text-gray-600 text-sm">
              Last updated: {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Export
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Refresh
            </button>
          </div>
        </div>

        {/* Top Row: Activity Chart + Net Worth */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PortfolioActivityChart />
          </div>
          <NetWorthOverview />
        </div>

        {/* Performance Comparison + Risk Flags */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceComparisonChart />
          </div>
          <RiskComplianceFlags />
        </div>

        {/* Transaction Summary + Gain/Loss */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionSummaryTable />
          <GainLossAnalysis />
        </div>

        {/* Allocation Breakdown */}
        <AllocationBreakdown />
      </main>
    </>
  );
}

export default function DashboardPage() {
  const { selectedClient } = useClient();

  if (selectedClient) {
    return <ClientDashboardView client={selectedClient} />;
  }

  return <ClientSelectionView />;
}
