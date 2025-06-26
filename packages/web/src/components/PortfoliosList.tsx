'use client';

import React, { useState, useEffect } from 'react';
import { apiService, ApiError } from '../data/api';
import { Portfolio } from '../types/api';
import { useApiCache } from '../hooks/useApiCache';

interface PortfoliosListProps {
  onPortfolioSelect?: (portfolio: Portfolio) => void;
}

export const PortfoliosList: React.FC<PortfoliosListProps> = ({ onPortfolioSelect }) => {
  const { data, loading, error, refresh } = useApiCache(
    'portfolios',
    () => apiService.getPortfolios(),
    2 * 60 * 1000 // 2 minutes cache
  );

  const portfolios = data?.data || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading portfolios...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading portfolios</h3>
            <div className="mt-2 text-sm text-red-700">
              {error instanceof ApiError ? error.message : 'An unexpected error occurred'}
            </div>
            <div className="mt-2">
              <button
                onClick={refresh}
                className="text-sm text-red-600 hover:text-red-500 font-medium"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Portfolios</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {portfolios.length} portfolio{portfolios.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button
          onClick={refresh}
          className="text-sm text-green-600 hover:text-green-500 font-medium"
          title="Refresh data"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{portfolio.name}</div>
                    <div className="text-sm text-gray-500">Client ID: {portfolio.clientId}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-gray-500">
                    {portfolio.assets} asset{portfolio.assets !== 1 ? 's' : ''}
                  </div>
                  {onPortfolioSelect && (
                    <button
                      onClick={() => onPortfolioSelect(portfolio)}
                      className="ml-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}; 