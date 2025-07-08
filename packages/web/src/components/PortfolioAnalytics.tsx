'use client';

import React, { useState } from 'react';
import { apiService, ApiError } from '../data/api';
import { useApiCache } from '../hooks/useApiCache';
import type { RebalancingRequest, RebalancingResult } from '../types/api';

interface PortfolioAnalyticsProps {
  portfolioId: string;
  onRebalance?: (result: RebalancingResult) => void;
}

export const PortfolioAnalytics: React.FC<PortfolioAnalyticsProps> = ({
  portfolioId,
  onRebalance,
}) => {
  const [period, setPeriod] = useState('1y');
  const [showRebalancing, setShowRebalancing] = useState(false);
  const [targetAllocation, setTargetAllocation] = useState({
    stocks: 60,
    bonds: 25,
    alternatives: 10,
    cash: 5,
  });

  const {
    data: analytics,
    loading,
    error,
  } = useApiCache(
    `portfolio-analytics-${portfolioId}-${period}`,
    () => apiService.getPortfolioAnalytics(portfolioId, period),
    5 * 60 * 1000, // 5 minutes cache
  );

  const handleRebalancing = async () => {
    try {
      const rebalancingData: RebalancingRequest = { targetAllocation };
      const result = await apiService.analyzeRebalancing(portfolioId, rebalancingData);
      onRebalance?.(result.data);
      setShowRebalancing(false);
    } catch (error) {
      // Error handling is done through the UI state
      setShowRebalancing(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading analytics</h3>
            <div className="mt-2 text-sm text-red-700">
              {error instanceof ApiError ? error.message : 'An unexpected error occurred'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics?.data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  const data = analytics.data;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Portfolio Analytics</h3>
          <div className="flex items-center space-x-4">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="1m">1 Month</option>
              <option value="3m">3 Months</option>
              <option value="6m">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="3y">3 Years</option>
            </select>
            <button
              onClick={() => setShowRebalancing(!showRebalancing)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Rebalance
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Returns Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Total Return</h4>
            <p
              className={`text-2xl font-bold ${data.returns.total >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {data.returns.total > 0 ? '+' : ''}
              {data.returns.total.toFixed(1)}%
            </p>
            <p className="text-sm text-blue-700">
              Annualized: {data.returns.annualized.toFixed(1)}%
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-900 mb-2">vs Benchmark</h4>
            <p
              className={`text-2xl font-bold ${data.performance.vsBenchmark >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {data.performance.vsBenchmark > 0 ? '+' : ''}
              {data.performance.vsBenchmark.toFixed(1)}%
            </p>
            <p className="text-sm text-green-700">Percentile: {data.performance.percentile}%</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-purple-900 mb-2">Sharpe Ratio</h4>
            <p className="text-2xl font-bold text-purple-600">{data.risk.sharpeRatio.toFixed(2)}</p>
            <p className="text-sm text-purple-700">
              Volatility: {data.risk.volatility.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Risk Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Max Drawdown</p>
              <p className="text-lg font-semibold text-red-600">
                {data.risk.maxDrawdown.toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Beta</p>
              <p className="text-lg font-semibold text-gray-900">{data.risk.beta.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Volatility</p>
              <p className="text-lg font-semibold text-gray-900">
                {data.risk.volatility.toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Sharpe Ratio</p>
              <p className="text-lg font-semibold text-gray-900">
                {data.risk.sharpeRatio.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Returns Chart */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Monthly Returns</h4>
          <div className="flex items-end space-x-1 h-32">
            {data.returns.monthly.map((return_, index) => (
              <div
                key={index}
                className={`flex-1 rounded-t ${return_ >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ height: `${Math.abs(return_) * 3}%` }}
                title={`Month ${index + 1}: ${return_.toFixed(1)}%`}
              />
            ))}
          </div>
        </div>

        {/* Rebalancing Section */}
        {showRebalancing && (
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Portfolio Rebalancing</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {Object.entries(targetAllocation).map(([asset, value]) => (
                <div key={asset}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {asset}
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      setTargetAllocation((prev) => ({
                        ...prev,
                        [asset]: Number(e.target.value),
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900"
                    min="0"
                    max="100"
                  />
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleRebalancing}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
              >
                Analyze Rebalancing
              </button>
              <button
                onClick={() => setShowRebalancing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
