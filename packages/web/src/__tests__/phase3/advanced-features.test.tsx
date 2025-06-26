import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PortfolioAnalytics } from '../../components/PortfolioAnalytics';
import { ClientOnboarding } from '../../components/ClientOnboarding';
import { MobileAppPreview } from '../../components/MobileAppPreview';
import { apiService } from '../../data/api';

// Mock the API service
jest.mock('../../data/api');
jest.mock('../../hooks/useApiCache');

const mockApiService = apiService as jest.Mocked<typeof apiService>;

describe('Phase 3 Advanced Features', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PortfolioAnalytics Component', () => {
    const mockAnalytics = {
      success: true,
      data: {
        portfolioId: '1',
        period: '1y',
        returns: {
          total: 12.5,
          annualized: 11.8,
          monthly: [2.1, -1.2, 3.4, 1.8, -0.5, 2.9, 1.2, -0.8, 2.1, 1.5, 0.9, 1.8]
        },
        risk: {
          volatility: 8.2,
          sharpeRatio: 1.45,
          maxDrawdown: -5.2,
          beta: 0.95
        },
        performance: {
          vsBenchmark: 2.1,
          vsSector: 1.8,
          percentile: 75
        }
      }
    };

    const mockRebalancingResult = {
      success: true,
      data: {
        portfolioId: '1',
        currentAllocation: { stocks: 60, bonds: 25, alternatives: 10, cash: 5 },
        targetAllocation: { stocks: 65, bonds: 20, alternatives: 10, cash: 5 },
        trades: [
          { symbol: 'AAPL', action: 'BUY' as const, shares: 50, value: 7500 },
          { symbol: 'BND', action: 'SELL' as const, shares: 100, value: 8500 }
        ],
        estimatedCost: 1500,
        estimatedTaxImpact: 250
      }
    };

    beforeEach(() => {
      // Mock the useApiCache hook
      const { useApiCache } = require('../../hooks/useApiCache');
      useApiCache.mockReturnValue({
        data: mockAnalytics,
        loading: false,
        error: null,
        refresh: jest.fn()
      });

      mockApiService.analyzeRebalancing.mockResolvedValue(mockRebalancingResult);
    });

    it('renders portfolio analytics with performance metrics', () => {
      render(<PortfolioAnalytics portfolioId="1" />);

      expect(screen.getByText('Portfolio Analytics')).toBeInTheDocument();
      expect(screen.getByText('12.5%')).toBeInTheDocument(); // Total Return
      expect(screen.getByText('+2.1%')).toBeInTheDocument(); // vs Benchmark
      expect(screen.getByText('1.45')).toBeInTheDocument(); // Sharpe Ratio
    });

    it('displays risk metrics correctly', () => {
      render(<PortfolioAnalytics portfolioId="1" />);

      expect(screen.getByText('-5.2%')).toBeInTheDocument(); // Max Drawdown
      expect(screen.getByText('0.95')).toBeInTheDocument(); // Beta
      expect(screen.getByText('8.2%')).toBeInTheDocument(); // Volatility
    });

    it('allows period selection', () => {
      render(<PortfolioAnalytics portfolioId="1" />);

      const periodSelect = screen.getByRole('combobox');
      fireEvent.change(periodSelect, { target: { value: '3m' } });

      expect(periodSelect).toHaveValue('3m');
    });

    it('shows rebalancing interface when rebalance button is clicked', () => {
      render(<PortfolioAnalytics portfolioId="1" />);

      const rebalanceButton = screen.getByText('Rebalance');
      fireEvent.click(rebalanceButton);

      expect(screen.getByText('Portfolio Rebalancing')).toBeInTheDocument();
      expect(screen.getByLabelText('Stocks')).toBeInTheDocument();
      expect(screen.getByLabelText('Bonds')).toBeInTheDocument();
    });

    it('handles rebalancing analysis', async () => {
      const onRebalance = jest.fn();
      render(<PortfolioAnalytics portfolioId="1" onRebalance={onRebalance} />);

      // Open rebalancing interface
      fireEvent.click(screen.getByText('Rebalance'));

      // Change allocation
      const stocksInput = screen.getByLabelText('Stocks');
      fireEvent.change(stocksInput, { target: { value: '65' } });

      // Submit rebalancing
      fireEvent.click(screen.getByText('Analyze Rebalancing'));

      await waitFor(() => {
        expect(mockApiService.analyzeRebalancing).toHaveBeenCalledWith('1', {
          targetAllocation: { stocks: 65, bonds: 25, alternatives: 10, cash: 5 }
        });
      });

      await waitFor(() => {
        expect(onRebalance).toHaveBeenCalledWith(mockRebalancingResult.data);
      });
    });

    it('displays monthly returns chart', () => {
      render(<PortfolioAnalytics portfolioId="1" />);

      expect(screen.getByText('Monthly Returns')).toBeInTheDocument();
      // Check for chart bars (simplified test)
      const chartContainer = screen.getByText('Monthly Returns').closest('div')?.parentElement;
      expect(chartContainer).toBeInTheDocument();
    });

    it('handles loading state', () => {
      const { useApiCache } = require('../../hooks/useApiCache');
      useApiCache.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        refresh: jest.fn()
      });

      render(<PortfolioAnalytics portfolioId="1" />);

      // Should show loading skeleton
      expect(screen.getByText('Portfolio Analytics')).toBeInTheDocument();
    });

    it('handles error state', () => {
      const { useApiCache } = require('../../hooks/useApiCache');
      useApiCache.mockReturnValue({
        data: null,
        loading: false,
        error: new Error('Failed to load analytics'),
        refresh: jest.fn()
      });

      render(<PortfolioAnalytics portfolioId="1" />);

      expect(screen.getByText('Error loading analytics')).toBeInTheDocument();
      expect(screen.getByText('Failed to load analytics')).toBeInTheDocument();
    });
  });

  describe('ClientOnboarding Component', () => {
    const mockOnboardingResult = {
      success: true,
      data: {
        clientId: 'new-client-id',
        status: 'Pending',
        nextSteps: [
          'Complete risk assessment questionnaire',
          'Provide identification documents',
          'Set up account funding',
          'Schedule initial consultation'
        ],
        estimatedTimeline: '5-7 business days',
        requiredDocuments: [
          'Government-issued ID',
          'Proof of address',
          'Employment verification',
          'Source of funds documentation'
        ]
      }
    };

    beforeEach(() => {
      mockApiService.onboardClient.mockResolvedValue(mockOnboardingResult);
    });

    it('renders onboarding form with first step', () => {
      render(<ClientOnboarding />);

      expect(screen.getByText('Client Onboarding')).toBeInTheDocument();
      expect(screen.getByText('Basic Information')).toBeInTheDocument();
      expect(screen.getByLabelText('Full Name *')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address *')).toBeInTheDocument();
    });

    it('validates required fields before proceeding', () => {
      render(<ClientOnboarding />);

      // Try to proceed without filling required fields
      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Please complete all required fields before proceeding.')).toBeInTheDocument();
    });

    it('allows navigation through steps', () => {
      render(<ClientOnboarding />);

      // Fill required fields
      fireEvent.change(screen.getByLabelText('Full Name *'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email Address *'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Advisor ID *'), { target: { value: 'A123' } });

      // Proceed to next step
      fireEvent.click(screen.getByText('Next'));

      expect(screen.getByText('Risk Assessment')).toBeInTheDocument();
      expect(screen.getByLabelText('Risk Profile *')).toBeInTheDocument();
    });

    it('allows going back to previous steps', () => {
      render(<ClientOnboarding />);

      // Fill and proceed to second step
      fireEvent.change(screen.getByLabelText('Full Name *'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email Address *'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Advisor ID *'), { target: { value: 'A123' } });
      fireEvent.click(screen.getByText('Next'));

      // Go back
      fireEvent.click(screen.getByText('Previous'));

      expect(screen.getByText('Basic Information')).toBeInTheDocument();
    });

    it('submits onboarding application successfully', async () => {
      const onComplete = jest.fn();
      render(<ClientOnboarding onComplete={onComplete} />);

      // Navigate through all steps
      // Step 1: Basic Information
      fireEvent.change(screen.getByLabelText('Full Name *'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email Address *'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Advisor ID *'), { target: { value: 'A123' } });
      fireEvent.click(screen.getByText('Next'));

      // Step 2: Risk Assessment
      fireEvent.click(screen.getByText('Next'));

      // Step 3: Investment Details
      fireEvent.change(screen.getByLabelText('Initial Investment Amount *'), { target: { value: '50000' } });
      fireEvent.click(screen.getByText('Next'));

      // Step 4: Documents (informational)
      fireEvent.click(screen.getByText('Next'));

      // Step 5: Review & Submit
      fireEvent.click(screen.getByText('Submit Application'));

      await waitFor(() => {
        expect(mockApiService.onboardClient).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          advisorId: 'A123',
          riskProfile: 'Moderate',
          initialInvestment: 50000
        });
      });

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith(mockOnboardingResult.data);
      });
    });

    it('handles submission errors', async () => {
      mockApiService.onboardClient.mockRejectedValue(new Error('Network error'));

      render(<ClientOnboarding />);

      // Navigate to review step
      fireEvent.change(screen.getByLabelText('Full Name *'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Email Address *'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText('Advisor ID *'), { target: { value: 'A123' } });
      fireEvent.click(screen.getByText('Next'));
      fireEvent.click(screen.getByText('Next'));
      fireEvent.change(screen.getByLabelText('Initial Investment Amount *'), { target: { value: '50000' } });
      fireEvent.click(screen.getByText('Next'));
      fireEvent.click(screen.getByText('Next'));

      // Submit
      fireEvent.click(screen.getByText('Submit Application'));

      await waitFor(() => {
        expect(screen.getByText('Failed to submit onboarding application')).toBeInTheDocument();
      });
    });

    it('shows progress indicator', () => {
      render(<ClientOnboarding />);

      // Check for step indicators
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  describe('MobileAppPreview Component', () => {
    it('renders mobile app interface', () => {
      render(<MobileAppPreview />);

      expect(screen.getByText('Highwater Mobile')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Clients')).toBeInTheDocument();
      expect(screen.getByText('Portfolios')).toBeInTheDocument();
      expect(screen.getByText('Alerts')).toBeInTheDocument();
    });

    it('displays dashboard by default', () => {
      render(<MobileAppPreview />);

      expect(screen.getByText('Total Assets')).toBeInTheDocument();
      expect(screen.getByText('Avg Performance')).toBeInTheDocument();
      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
      expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    });

    it('switches between tabs', () => {
      render(<MobileAppPreview />);

      // Switch to Clients tab
      fireEvent.click(screen.getByText('Clients'));
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();

      // Switch to Portfolios tab
      fireEvent.click(screen.getByText('Portfolios'));
      expect(screen.getByText('Growth Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Income Portfolio')).toBeInTheDocument();

      // Switch to Alerts tab
      fireEvent.click(screen.getByText('Alerts'));
      expect(screen.getByText('Market Alert')).toBeInTheDocument();
      expect(screen.getByText('Client Update')).toBeInTheDocument();
    });

    it('displays client information correctly', () => {
      render(<MobileAppPreview />);

      fireEvent.click(screen.getByText('Clients'));

      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('$2,500,000')).toBeInTheDocument(); // Formatted currency
    });

    it('displays portfolio information correctly', () => {
      render(<MobileAppPreview />);

      fireEvent.click(screen.getByText('Portfolios'));

      expect(screen.getByText('Growth Portfolio')).toBeInTheDocument();
      expect(screen.getByText('$1,250,000')).toBeInTheDocument();
      expect(screen.getByText('+12.5%')).toBeInTheDocument();
      expect(screen.getByText('Moderate')).toBeInTheDocument();
    });

    it('displays notifications correctly', () => {
      render(<MobileAppPreview />);

      fireEvent.click(screen.getByText('Alerts'));

      expect(screen.getByText('Market Alert')).toBeInTheDocument();
      expect(screen.getByText('S&P 500 down 2.5% - consider rebalancing')).toBeInTheDocument();
      expect(screen.getByText('alert')).toBeInTheDocument();
    });

    it('handles quick action buttons', () => {
      const onNavigate = jest.fn();
      render(<MobileAppPreview onNavigate={onNavigate} />);

      // Click quick action buttons
      fireEvent.click(screen.getByText('Create Portfolio'));
      expect(onNavigate).toHaveBeenCalledWith('portfolios');

      fireEvent.click(screen.getByText('View Analytics'));
      expect(onNavigate).toHaveBeenCalledWith('analytics');
    });

    it('shows mobile app platform info', () => {
      render(<MobileAppPreview />);

      expect(screen.getByText('Mobile App Preview')).toBeInTheDocument();
      expect(screen.getByText('iOS')).toBeInTheDocument();
      expect(screen.getByText('Android')).toBeInTheDocument();
      expect(screen.getByText('React Native')).toBeInTheDocument();
    });
  });
}); 