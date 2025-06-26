import { 
  ClientsResponse, 
  ClientResponse, 
  PortfoliosResponse, 
  PortfolioResponse,
  Client,
  Portfolio,
  ClientAnalyticsResponse,
  ClientOnboardingRequest,
  ClientOnboardingResponse,
  PortfolioAnalyticsResponse,
  RebalancingRequest,
  RebalancingResponse,
  ClientFilters,
  PortfolioFilters
} from '../types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `HTTP error! status: ${response.status}`,
      response.status,
      errorData
    );
  }
  
  return response.json();
}

function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

export const apiService = {
  // Client endpoints
  async getClients(filters?: ClientFilters): Promise<ClientsResponse> {
    const queryString = filters ? `?${buildQueryString(filters)}` : '';
    const response = await fetch(`${API_BASE_URL}/api/v2/clients${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<ClientsResponse>(response);
  },

  async getClient(id: string): Promise<ClientResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v2/clients/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<ClientResponse>(response);
  },

  async getClientAnalytics(id: string, period: string = '1y'): Promise<ClientAnalyticsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v2/clients/${id}/analytics?period=${period}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<ClientAnalyticsResponse>(response);
  },

  async onboardClient(onboardingData: ClientOnboardingRequest): Promise<ClientOnboardingResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v2/clients/onboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(onboardingData),
    });
    return handleResponse<ClientOnboardingResponse>(response);
  },

  // Portfolio endpoints
  async getPortfolios(filters?: PortfolioFilters): Promise<PortfoliosResponse> {
    const queryString = filters ? `?${buildQueryString(filters)}` : '';
    const response = await fetch(`${API_BASE_URL}/api/v2/portfolios${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<PortfoliosResponse>(response);
  },

  async getPortfolio(id: string): Promise<PortfolioResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v2/portfolios/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<PortfolioResponse>(response);
  },

  async getPortfolioAnalytics(id: string, period: string = '1y'): Promise<PortfolioAnalyticsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v2/portfolios/${id}/analytics?period=${period}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<PortfolioAnalyticsResponse>(response);
  },

  async analyzeRebalancing(id: string, rebalancingData: RebalancingRequest): Promise<RebalancingResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v2/portfolios/${id}/rebalance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rebalancingData),
    });
    return handleResponse<RebalancingResponse>(response);
  },

  // Utility methods
  async checkApiHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return handleResponse<{ status: string; timestamp: string }>(response);
  },

  // Mobile app endpoints (for future mobile development)
  async getMobileDashboard(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/api/v2/mobile/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<any>(response);
  },

  // Legacy endpoint check (for deprecation monitoring)
  async checkLegacyEndpoints(): Promise<{
    clients: { deprecated: boolean; warning?: string };
    portfolios: { deprecated: boolean; warning?: string };
  }> {
    const [clientsResponse, portfoliosResponse] = await Promise.allSettled([
      fetch(`${API_BASE_URL}/api/v1/clients`),
      fetch(`${API_BASE_URL}/api/v1/portfolios`)
    ]);

    return {
      clients: {
        deprecated: clientsResponse.status === 'fulfilled',
        warning: clientsResponse.status === 'fulfilled' 
          ? clientsResponse.value.headers.get('X-API-Deprecation-Warning') || undefined
          : undefined
      },
      portfolios: {
        deprecated: portfoliosResponse.status === 'fulfilled',
        warning: portfoliosResponse.status === 'fulfilled'
          ? portfoliosResponse.value.headers.get('X-API-Deprecation-Warning') || undefined
          : undefined
      }
    };
  }
};

export { ApiError }; 