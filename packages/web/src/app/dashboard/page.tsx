'use client';

import React, { useState } from 'react';
import { ClientsList } from '../../components/ClientsList';
import { PortfoliosList } from '../../components/PortfoliosList';
import { Client, Portfolio } from '../../types/api';

export default function DashboardPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">HighWater Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your clients and portfolios with our modern API-driven interface
          </p>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Clients Section */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Clients</h2>
                <p className="text-sm text-gray-600">View and manage your client relationships</p>
              </div>
              <ClientsList
                onClientSelect={(client) => {
                  setSelectedClient(client);
                  setSelectedPortfolio(null);
                }}
              />
              {selectedClient && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="font-medium text-blue-900">Selected Client</h3>
                  <p className="text-sm text-blue-700">
                    {selectedClient.name} ({selectedClient.email})
                  </p>
                </div>
              )}
            </div>

            {/* Portfolios Section */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Portfolios</h2>
                <p className="text-sm text-gray-600">Monitor and manage investment portfolios</p>
              </div>
              <PortfoliosList
                onPortfolioSelect={(portfolio) => {
                  setSelectedPortfolio(portfolio);
                  setSelectedClient(null);
                }}
              />
              {selectedPortfolio && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="font-medium text-green-900">Selected Portfolio</h3>
                  <p className="text-sm text-green-700">
                    {selectedPortfolio.name} ({selectedPortfolio.assets} assets)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* API Status */}
          <div className="mt-8 p-4 bg-white border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">API Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-gray-600">JSON API v2 endpoints active</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-gray-600">Legacy HTML endpoints maintained</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                <span className="text-gray-600">Type-safe data consumption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
