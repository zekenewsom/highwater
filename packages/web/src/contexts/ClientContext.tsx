'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '../types/api';

type ClientContextType = {
  selectedClient: Client | null;
  setSelectedClient: (client: Client | null) => void;
  isClientSelected: boolean;
};

const ClientContext = createContext<ClientContextType>({
  selectedClient: null,
  setSelectedClient: () => {},
  isClientSelected: false,
});

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [selectedClient, setSelectedClientState] = useState<Client | null>(null);

  // Persist selected client to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedClient = localStorage.getItem('selectedClient');
      if (savedClient) {
        try {
          setSelectedClientState(JSON.parse(savedClient));
        } catch (error) {
          localStorage.removeItem('selectedClient');
        }
      }
    }
  }, []);

  const setSelectedClient = (client: Client | null) => {
    setSelectedClientState(client);
    if (typeof window !== 'undefined') {
      if (client) {
        localStorage.setItem('selectedClient', JSON.stringify(client));
      } else {
        localStorage.removeItem('selectedClient');
      }
    }
  };

  return (
    <ClientContext.Provider 
      value={{ 
        selectedClient, 
        setSelectedClient, 
        isClientSelected: !!selectedClient 
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export const useClient = () => useContext(ClientContext);