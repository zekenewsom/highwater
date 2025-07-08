'use client';
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { AllocationBreakdown } from '../../components/AllocationBreakdown';
import AddButtonWithDropdown from '../../components/AddButtonWithDropdown';
import GainLossAnalysis from '../../components/GainLossAnalysis';
import TransactionSummaryTable from '../../components/TransactionSummaryTable';
import HoldingsTable from '../../components/HoldingsTable';
import RecentTrades from '../../components/RecentTrades';
import { PortfoliosList } from '../../components/PortfoliosList';
import { useClient } from '../../contexts/ClientContext';
import { useApiCache } from '../../hooks/useApiCache';
import { apiService } from '../../data/api';
import { Portfolio } from '../../types/api';

function NoClientSelected() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Client Selected</h3>
          <p className="mt-1 text-gray-500 max-w-md">
            Please select a client first to view their portfolios. You can do this from the Clients page or Dashboard.
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

function PortfolioSelector({ selectedPortfolio, onPortfolioSelect }: { 
  selectedPortfolio: Portfolio | null;
  onPortfolioSelect: (portfolio: Portfolio) => void;
}) {
  const { selectedClient } = useClient();
  
  const { data: portfoliosData, loading, error } = useApiCache(
    'client-portfolios',
    () => apiService.getPortfolios({ clientId: selectedClient?.id }),
    2 * 60 * 1000 // 2 minutes cache
  );

  const portfolios = portfoliosData?.data || [];
  
  // Create a default portfolio for the client
  const defaultPortfolio: Portfolio = {
    id: `default-${selectedClient?.id}`,
    name: `${selectedClient?.name}'s Default Portfolio`,
    description: 'Default portfolio with comprehensive analytics and tracking',
    value: 125000,
    assets: 8,
    performance: 5.2,
    strategy: 'balanced',
    riskLevel: 'moderate',
    currency: 'USD',
    tags: ['default', 'main'],
    clientId: selectedClient?.id || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Combine default portfolio with existing portfolios
  const allPortfolios = [defaultPortfolio, ...portfolios];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-600">Failed to load portfolios</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Select Portfolio</h3>
        <p className="text-sm text-gray-500">
          {allPortfolios.length} portfolio{allPortfolios.length !== 1 ? 's' : ''} available for {selectedClient?.name}
        </p>
      </div>
      <div className="divide-y divide-gray-200">
        {allPortfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedPortfolio?.id === portfolio.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
            onClick={() => onPortfolioSelect(portfolio)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-900">{portfolio.name}</h4>
                  {portfolio.id.startsWith('default-') && (
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{portfolio.assets} assets</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${portfolio.value?.toLocaleString() || 'N/A'}
                </p>
                <p className={`text-sm ${
                  (portfolio.performance || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {portfolio.performance ? `${portfolio.performance > 0 ? '+' : ''}${portfolio.performance}%` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioView({ portfolio, onBack }: { portfolio: Portfolio; onBack: () => void }) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={onBack}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Portfolio List
              </button>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{portfolio.name}</h1>
            <p className="mt-1 text-gray-600 text-sm">
              {portfolio.assets} assets • ${portfolio.value?.toLocaleString() || 'N/A'} total value
            </p>
            <p className="mt-1 text-gray-600 text-sm">
              Last updated: {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
            <div className="flex gap-2 mb-2">
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                Export
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                Refresh
              </button>
              <AddButtonWithDropdown />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AllocationBreakdown />
          <GainLossAnalysis />
        </div>
        
        <TransactionSummaryTable />
        <HoldingsTable />
        <RecentTrades />
      </main>
    </>
  );
}

export default function PortfolioPage() {
  const { selectedClient } = useClient();
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  // If no client is selected, show the no client view
  if (!selectedClient) {
    return <NoClientSelected />;
  }

  // If no portfolio is selected, show portfolio selector
  if (!selectedPortfolio) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
                  <p className="mt-2 text-sm text-gray-600">
                    Managing portfolios for {selectedClient.name}
                  </p>
                </div>
                <a
                  href={`/portfolio/manage?clientId=${selectedClient.id}`}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Add / Edit Portfolio
                </a>
              </div>
              
              <PortfolioSelector 
                selectedPortfolio={selectedPortfolio}
                onPortfolioSelect={setSelectedPortfolio}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show the selected portfolio
  return <PortfolioView portfolio={selectedPortfolio} onBack={() => setSelectedPortfolio(null)} />;
}
