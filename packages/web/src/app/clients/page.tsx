'use client';

import React, { useState } from 'react';
import { ClientsList } from '../../components/ClientsList';
import { Client } from '../../types/api';
import NavBar from '../../components/NavBar';

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
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
                <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Manage your client relationships and view detailed information
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Grid View
                  </button>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Add New Client
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Clients List */}
              <div className="lg:col-span-2">
                <ClientsList
                  onClientSelect={(client) => {
                    setSelectedClient(client);
                  }}
                />
              </div>

              {/* Client Details Sidebar */}
              <div className="lg:col-span-1">
                {selectedClient ? (
                  <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                        <span className="text-white font-medium text-lg">
                          {selectedClient.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedClient.name}
                        </h3>
                        <p className="text-sm text-gray-500">{selectedClient.email}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Client Information
                        </h4>
                        <dl className="space-y-2">
                          <div>
                            <dt className="text-sm text-gray-500">Client ID</dt>
                            <dd className="text-sm font-medium text-gray-900">
                              {selectedClient.id}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500">Advisor ID</dt>
                            <dd className="text-sm font-medium text-gray-900">
                              {selectedClient.advisorId}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-gray-500">Email</dt>
                            <dd className="text-sm font-medium text-gray-900">
                              {selectedClient.email}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h4>
                        <div className="space-y-2">
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                            View Portfolios
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                            Send Message
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                            Schedule Meeting
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                            Archive Client
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
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No client selected</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select a client from the list to view details and manage their account.
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
                  <span className="text-gray-600">Real-time data updates</span>
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
    </>
  );
}
