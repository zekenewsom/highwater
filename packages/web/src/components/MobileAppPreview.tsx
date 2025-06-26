'use client';

import React, { useState } from 'react';
import { apiService } from '../data/api';
import { useApiCache } from '../hooks/useApiCache';
import type { MobileDashboard } from '../types/api';

interface MobileAppPreviewProps {
  onNavigate?: (screen: string) => void;
}

export const MobileAppPreview: React.FC<MobileAppPreviewProps> = ({ 
  onNavigate 
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'portfolios' | 'notifications'>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Mock mobile dashboard data (in real app, this would come from mobile-specific API)
  const mobileData: MobileDashboard = {
    clients: [
      {
        id: '1',
        name: 'Alice Smith',
        email: 'alice@example.com',
        status: 'Active',
        totalAssets: 2500000,
        riskProfile: 'Moderate',
        lastLogin: '2024-01-15T10:30:00Z',
        notificationPreferences: { push: true, email: true, sms: false }
      },
      {
        id: '2',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        status: 'Active',
        totalAssets: 1800000,
        riskProfile: 'Conservative',
        lastLogin: '2024-01-14T15:45:00Z',
        notificationPreferences: { push: false, email: true, sms: true }
      }
    ],
    portfolios: [
      {
        id: '1',
        name: 'Growth Portfolio',
        value: 1250000,
        performance: 12.5,
        risk: 'Moderate',
        lastUpdated: '2024-01-15T09:00:00Z',
        quickActions: ['Rebalance', 'View Details', 'Generate Report']
      },
      {
        id: '2',
        name: 'Income Portfolio',
        value: 890000,
        performance: 8.2,
        risk: 'Conservative',
        lastUpdated: '2024-01-15T08:30:00Z',
        quickActions: ['Rebalance', 'View Details']
      }
    ],
    notifications: [
      {
        id: '1',
        type: 'alert',
        title: 'Market Alert',
        message: 'S&P 500 down 2.5% - consider rebalancing',
        timestamp: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        type: 'info',
        title: 'Client Update',
        message: 'Alice Smith completed risk assessment',
        timestamp: '2024-01-15T09:30:00Z'
      },
      {
        id: '3',
        type: 'success',
        title: 'Portfolio Rebalanced',
        message: 'Growth Portfolio successfully rebalanced',
        timestamp: '2024-01-15T08:15:00Z'
      }
    ],
    summary: {
      totalClients: 2,
      totalAssets: 4300000,
      averagePerformance: 10.35,
      pendingActions: 3
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderDashboard = () => (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-600 font-medium">Total Assets</p>
          <p className="text-lg font-bold text-blue-900">{formatCurrency(mobileData.summary.totalAssets)}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-xs text-green-600 font-medium">Avg Performance</p>
          <p className="text-lg font-bold text-green-900">{mobileData.summary.averagePerformance.toFixed(1)}%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowOnboarding(true)}
            className="bg-blue-600 text-white text-xs py-2 px-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Client
          </button>
          <button
            onClick={() => onNavigate?.('portfolios')}
            className="bg-green-600 text-white text-xs py-2 px-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Create Portfolio
          </button>
          <button
            onClick={() => onNavigate?.('analytics')}
            className="bg-purple-600 text-white text-xs py-2 px-3 rounded-md hover:bg-purple-700 transition-colors"
          >
            View Analytics
          </button>
          <button
            onClick={() => onNavigate?.('reports')}
            className="bg-orange-600 text-white text-xs py-2 px-3 rounded-md hover:bg-orange-700 transition-colors"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
        <div className="space-y-2">
          {mobileData.notifications.slice(0, 3).map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === 'alert' ? 'bg-red-500' :
                notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-900">{notification.title}</p>
                <p className="text-xs text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400">{formatDate(notification.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-3">
      {mobileData.clients.map((client) => (
        <div key={client.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">{client.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {client.status}
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-2">{client.email}</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-gray-500">Assets</p>
              <p className="font-medium">{formatCurrency(client.totalAssets)}</p>
            </div>
            <div>
              <p className="text-gray-500">Risk Profile</p>
              <p className="font-medium">{client.riskProfile}</p>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
              View Details
            </button>
            <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors">
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPortfolios = () => (
    <div className="space-y-3">
      {mobileData.portfolios.map((portfolio) => (
        <div key={portfolio.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">{portfolio.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              portfolio.risk === 'High' ? 'bg-red-100 text-red-800' :
              portfolio.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}>
              {portfolio.risk}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div>
              <p className="text-gray-500">Value</p>
              <p className="font-medium">{formatCurrency(portfolio.value)}</p>
            </div>
            <div>
              <p className="text-gray-500">Performance</p>
              <p className={`font-medium ${portfolio.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolio.performance > 0 ? '+' : ''}{portfolio.performance.toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {portfolio.quickActions.map((action, index) => (
              <button
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-3">
      {mobileData.notifications.map((notification) => (
        <div key={notification.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className={`w-3 h-3 rounded-full mt-1 ${
              notification.type === 'alert' ? 'bg-red-500' :
              notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
            }`} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-gray-900">{notification.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  notification.type === 'alert' ? 'bg-red-100 text-red-800' :
                  notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {notification.type}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
              <p className="text-xs text-gray-400">{formatDate(notification.timestamp)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-sm mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      {/* Mobile Header */}
      <div className="bg-blue-600 text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Highwater Mobile</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="h-96 overflow-y-auto p-4">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'portfolios' && renderPortfolios()}
        {activeTab === 'notifications' && renderNotifications()}
      </div>

      {/* Mobile Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'clients' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs">Clients</span>
          </button>
          <button
            onClick={() => setActiveTab('portfolios')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'portfolios' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-xs">Portfolios</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'notifications' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-xs">Alerts</span>
          </button>
        </div>
      </div>

      {/* Mobile App Info */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-2">Mobile App Preview</p>
          <div className="flex justify-center space-x-4 text-xs">
            <span className="text-blue-600">iOS</span>
            <span className="text-green-600">Android</span>
            <span className="text-purple-600">React Native</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 