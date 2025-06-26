// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  page?: number;
  totalPages?: number;
  filters?: Record<string, any>;
  error?: string;
  message?: string;
}

// Client Types
export interface Client {
  id: string;
  name: string;
  email: string;
  advisorId: string;
  status: 'Active' | 'Inactive' | 'Prospect';
  totalAssets: number;
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  contactInfo?: {
    phone: string;
    address: string;
    emergencyContact: string;
  };
  preferences?: {
    communication: string;
    reportingFrequency: string;
    riskTolerance: string;
  };
  portfolios?: Array<{
    id: string;
    name: string;
    value: number;
  }>;
}

export interface ClientsResponse extends ApiResponse<Client[]> {}

export interface ClientResponse extends ApiResponse<Client> {}

export interface ClientAnalytics {
  clientId: string;
  period: string;
  portfolioPerformance: {
    totalReturn: number;
    benchmarkReturn: number;
    excessReturn: number;
    riskAdjustedReturn: number;
  };
  assetAllocation: {
    stocks: number;
    bonds: number;
    alternatives: number;
    cash: number;
  };
  riskMetrics: {
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    var95: number;
  };
  clientBehavior: {
    loginFrequency: number;
    reportViews: number;
    tradeActivity: number;
    communicationRequests: number;
  };
}

export interface ClientAnalyticsResponse extends ApiResponse<ClientAnalytics> {}

export interface ClientOnboardingRequest {
  name: string;
  email: string;
  advisorId: string;
  riskProfile: string;
  initialInvestment: number;
}

export interface ClientOnboardingResult {
  clientId: string;
  status: string;
  nextSteps: string[];
  estimatedTimeline: string;
  requiredDocuments: string[];
}

export interface ClientOnboardingResponse extends ApiResponse<ClientOnboardingResult> {}

// Portfolio Types
export interface Portfolio {
  id: string;
  name: string;
  clientId: string;
  assets: number;
  value: number;
  performance: number;
  risk: 'Conservative' | 'Moderate' | 'High';
  allocation?: {
    stocks: number;
    bonds: number;
    alternatives: number;
    cash: number;
  };
  holdings?: Array<{
    symbol: string;
    name: string;
    weight: number;
    value: number;
  }>;
}

export interface PortfoliosResponse extends ApiResponse<Portfolio[]> {}

export interface PortfolioResponse extends ApiResponse<Portfolio> {}

export interface PortfolioAnalytics {
  portfolioId: string;
  period: string;
  returns: {
    total: number;
    annualized: number;
    monthly: number[];
  };
  risk: {
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    beta: number;
  };
  performance: {
    vsBenchmark: number;
    vsSector: number;
    percentile: number;
  };
}

export interface PortfolioAnalyticsResponse extends ApiResponse<PortfolioAnalytics> {}

export interface RebalancingRequest {
  targetAllocation: {
    stocks: number;
    bonds: number;
    alternatives: number;
    cash: number;
  };
}

export interface RebalancingTrade {
  symbol: string;
  action: 'BUY' | 'SELL';
  shares: number;
  value: number;
}

export interface RebalancingResult {
  portfolioId: string;
  currentAllocation: {
    stocks: number;
    bonds: number;
    alternatives: number;
    cash: number;
  };
  targetAllocation: {
    stocks: number;
    bonds: number;
    alternatives: number;
    cash: number;
  };
  trades: RebalancingTrade[];
  estimatedCost: number;
  estimatedTaxImpact: number;
}

export interface RebalancingResponse extends ApiResponse<RebalancingResult> {}

// Filter and Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ClientFilters extends PaginationParams {
  advisorId?: string;
  status?: string;
  riskProfile?: string;
}

export interface PortfolioFilters extends PaginationParams {
  clientId?: string;
  risk?: string;
}

// API Error Types
export interface ApiError {
  success: false;
  error: string;
  message: string;
  status?: number;
}

// Mobile App Types (for future mobile development)
export interface MobileClient {
  id: string;
  name: string;
  email: string;
  status: string;
  totalAssets: number;
  riskProfile: string;
  lastLogin?: string;
  notificationPreferences: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

export interface MobilePortfolio {
  id: string;
  name: string;
  value: number;
  performance: number;
  risk: string;
  lastUpdated: string;
  quickActions: string[];
}

export interface MobileDashboard {
  clients: MobileClient[];
  portfolios: MobilePortfolio[];
  notifications: Array<{
    id: string;
    type: 'alert' | 'info' | 'success';
    title: string;
    message: string;
    timestamp: string;
  }>;
  summary: {
    totalClients: number;
    totalAssets: number;
    averagePerformance: number;
    pendingActions: number;
  };
} 