'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import NavBar from '../../../components/NavBar';
import { useClient } from '../../../contexts/ClientContext';
import { useApiCache } from '../../../hooks/useApiCache';
import { apiService } from '../../../data/api';
import { Portfolio } from '../../../types/api';

interface PortfolioFormData {
  name: string;
  description: string;
  strategy: string;
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  currency: string;
  tags: string[];
}

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
            Please select a client first to manage their portfolios. You can do this from the Clients page or Dashboard.
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

function PortfolioForm({ 
  portfolio, 
  clientId, 
  onSave, 
  onCancel 
}: { 
  portfolio?: Portfolio; 
  clientId: string; 
  onSave: (data: PortfolioFormData) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState<PortfolioFormData>({
    name: portfolio?.name || '',
    description: portfolio?.description || '',
    strategy: portfolio?.strategy || 'balanced',
    riskLevel: portfolio?.riskLevel || 'moderate',
    currency: portfolio?.currency || 'USD',
    tags: portfolio?.tags || [],
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {portfolio ? 'Edit Portfolio' : 'Create New Portfolio'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {portfolio ? 'Update portfolio settings and configuration' : 'Set up a new portfolio for your client'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Portfolio Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Conservative Growth Portfolio"
              required
            />
          </div>
          
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              Base Currency
            </label>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the portfolio's investment objectives and strategy..."
          />
        </div>

        {/* Strategy and Risk Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="strategy" className="block text-sm font-medium text-gray-700 mb-2">
              Investment Strategy
            </label>
            <select
              id="strategy"
              value={formData.strategy}
              onChange={(e) => setFormData(prev => ({ ...prev, strategy: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="growth">Growth</option>
              <option value="value">Value</option>
              <option value="balanced">Balanced</option>
              <option value="income">Income</option>
              <option value="crypto-focused">Crypto-Focused</option>
              <option value="diversified">Diversified</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="riskLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Risk Level
            </label>
            <select
              id="riskLevel"
              value={formData.riskLevel}
              onChange={(e) => setFormData(prev => ({ ...prev, riskLevel: e.target.value as PortfolioFormData['riskLevel'] }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Add
            </button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {portfolio ? 'Update Portfolio' : 'Create Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
}

function ExistingPortfoliosList({ 
  clientId, 
  onEditPortfolio, 
  onDeletePortfolio 
}: { 
  clientId: string; 
  onEditPortfolio: (portfolio: Portfolio) => void; 
  onDeletePortfolio: (portfolioId: string) => void; 
}) {
  const { data: portfoliosData, loading, error } = useApiCache(
    'client-portfolios',
    () => apiService.getPortfolios({ clientId }),
    2 * 60 * 1000 // 2 minutes cache
  );

  const portfolios = portfoliosData?.data || [];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
        <h3 className="text-lg font-medium text-gray-900">Existing Portfolios</h3>
        <p className="text-sm text-gray-500">
          {portfolios.length} portfolio{portfolios.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      {portfolios.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">No portfolios found for this client.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{portfolio.name}</h4>
                  <p className="text-sm text-gray-500">{portfolio.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-600">
                      ${portfolio.value?.toLocaleString() || 'N/A'}
                    </span>
                    <span className="text-xs text-gray-600">
                      {portfolio.assets} assets
                    </span>
                    <span className={`text-xs ${
                      (portfolio.performance || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {portfolio.performance ? `${portfolio.performance > 0 ? '+' : ''}${portfolio.performance}%` : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditPortfolio(portfolio)}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeletePortfolio(portfolio.id)}
                    className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PortfolioManagePage() {
  const { selectedClient } = useClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientId = searchParams.get('clientId');
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);

  // If no client is selected and no clientId in params, show no client view
  if (!selectedClient && !clientId) {
    return <NoClientSelected />;
  }

  const currentClientId = selectedClient?.id || clientId;

  const handleSavePortfolio = async (data: PortfolioFormData) => {
    try {
      if (editingPortfolio) {
        // Update existing portfolio
        console.log('Updating portfolio:', editingPortfolio.id, data);
        // Here you would call your API to update the portfolio
        // await apiService.updatePortfolio(editingPortfolio.id, data);
      } else {
        // Create new portfolio
        console.log('Creating new portfolio for client:', currentClientId, data);
        // Here you would call your API to create the portfolio
        // await apiService.createPortfolio({ ...data, clientId: currentClientId });
      }
      
      // Reset form state
      setIsCreating(false);
      setEditingPortfolio(null);
      
      // Show success message or redirect
      alert('Portfolio saved successfully!');
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Error saving portfolio. Please try again.');
    }
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      try {
        console.log('Deleting portfolio:', portfolioId);
        // Here you would call your API to delete the portfolio
        // await apiService.deletePortfolio(portfolioId);
        alert('Portfolio deleted successfully!');
      } catch (error) {
        console.error('Error deleting portfolio:', error);
        alert('Error deleting portfolio. Please try again.');
      }
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <a
                  href="/portfolio"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Portfolio Management
                </a>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Portfolio Management
              </h1>
              <p className="mt-1 text-gray-600 text-sm">
                Add, edit, and manage portfolios for {selectedClient?.name || 'client'}
              </p>
            </div>
            
            {!isCreating && !editingPortfolio && (
              <button
                onClick={() => setIsCreating(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create New Portfolio
              </button>
            )}
          </div>

          <div className="space-y-8">
            {/* Portfolio Form */}
            {(isCreating || editingPortfolio) && (
              <PortfolioForm
                portfolio={editingPortfolio || undefined}
                clientId={currentClientId!}
                onSave={handleSavePortfolio}
                onCancel={() => {
                  setIsCreating(false);
                  setEditingPortfolio(null);
                }}
              />
            )}

            {/* Existing Portfolios List */}
            <ExistingPortfoliosList
              clientId={currentClientId!}
              onEditPortfolio={setEditingPortfolio}
              onDeletePortfolio={handleDeletePortfolio}
            />
          </div>
        </div>
      </main>
    </>
  );
}