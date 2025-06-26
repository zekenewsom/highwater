'use client';

import React, { useState } from 'react';
import { PortfoliosList } from '../../components/PortfoliosList';
import { Portfolio } from '../../types/api';
import NavBar from '../../components/NavBar';

export default function PortfoliosPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Monitor and manage investment portfolios with real-time data
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Grid View
                  </button>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                  Create Portfolio
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Portfolios List */}
              <div className="lg:col-span-2">
                <PortfoliosList 
                  onPortfolioSelect={(portfolio) => {
                    setSelectedPortfolio(portfolio);
                  }} 
                />
              </div>

              {/* Portfolio Details Sidebar */}
              <div className="lg:col-span-1">
                {selectedPortfolio ? (
                  <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center mr-4">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{selectedPortfolio.name}</h3>
                        <p className="text-sm text-gray-500">Portfolio ID: {selectedPortfolio.id}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Portfolio Information</h4>
                        <dl className="space-y-2">
                          <div>
                            <dt className="text-sm text-gray-500">Portfolio ID</dt>
                            <dd className="text-sm font-medium text-gray-900">{selectedPortfolio.id}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500">Client ID</dt>
                            <dd className="text-sm font-medium text-gray-900">{selectedPortfolio.clientId}</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500">Number of Assets</dt>
                            <dd className="text-sm font-medium text-gray-900">{selectedPortfolio.assets}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Performance Summary</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Total Value</span>
                            <span className="text-sm font-medium text-gray-900">$1,234,567</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Daily Change</span>
                            <span className="text-sm font-medium text-green-600">+2.34%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">YTD Return</span>
                            <span className="text-sm font-medium text-green-600">+12.45%</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h4>
                        <div className="space-y-2">
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                            View Holdings
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                            Rebalance Portfolio
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                            Generate Report
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                            Close Portfolio
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                    <div className="text-center">
                      <div className="mx-auto h-12 w-12 text-gray-400">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No portfolio selected</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select a portfolio from the list to view details and performance metrics.
                      </p>
                    </div>
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
                  <span className="text-gray-600">Real-time portfolio data</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <span className="text-gray-600">Performance analytics ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 