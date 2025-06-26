'use client';

import React, { useState, useEffect } from 'react';
import { apiCache } from '../hooks/useApiCache';

interface PerformanceMetrics {
  apiResponseTime: number;
  cacheHitRate: number;
  activeConnections: number;
  memoryUsage: number;
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    apiResponseTime: 0,
    cacheHitRate: 0,
    activeConnections: 0,
    memoryUsage: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      const cacheStats = apiCache.getStats();
      const cacheHitRate = cacheStats.size > 0 ? Math.random() * 100 : 0; // Mock for now

      setMetrics({
        apiResponseTime: Math.random() * 200 + 50, // Mock: 50-250ms
        cacheHitRate: Math.round(cacheHitRate),
        activeConnections: Math.floor(Math.random() * 10) + 1, // Mock: 1-10
        memoryUsage: Math.random() * 50 + 10, // Mock: 10-60MB
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Show Performance Monitor"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">Performance Monitor</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">API Response Time</span>
          <span
            className={`text-xs font-medium ${
              metrics.apiResponseTime < 100
                ? 'text-green-600'
                : metrics.apiResponseTime < 200
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}
          >
            {Math.round(metrics.apiResponseTime)}ms
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Cache Hit Rate</span>
          <span
            className={`text-xs font-medium ${
              metrics.cacheHitRate > 80
                ? 'text-green-600'
                : metrics.cacheHitRate > 50
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}
          >
            {metrics.cacheHitRate}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Active Connections</span>
          <span className="text-xs font-medium text-gray-900">{metrics.activeConnections}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Memory Usage</span>
          <span
            className={`text-xs font-medium ${
              metrics.memoryUsage < 30
                ? 'text-green-600'
                : metrics.memoryUsage < 50
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}
          >
            {Math.round(metrics.memoryUsage)}MB
          </span>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Cached Items</span>
            <span className="text-xs font-medium text-gray-900">{apiCache.getStats().size}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={() => apiCache.clear()}
          className="w-full text-xs bg-red-50 text-red-600 py-1 px-2 rounded hover:bg-red-100 transition-colors"
        >
          Clear Cache
        </button>
      </div>
    </div>
  );
};
