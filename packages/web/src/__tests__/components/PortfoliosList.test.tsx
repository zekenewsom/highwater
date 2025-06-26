import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { PortfoliosList } from '../../components/PortfoliosList';
import { apiService } from '../../data/api';

// Mock the API service
jest.mock('../../data/api', () => ({
  apiService: {
    getPortfolios: jest.fn(),
  },
  ApiError: class extends Error {
    constructor(message: string, public status: number) {
      super(message);
      this.name = 'ApiError';
    }
  },
}));

const mockApiService = apiService as jest.Mocked<typeof apiService>;

describe('PortfoliosList', () => {
  const mockPortfolios = [
    {
      id: '1',
      name: 'Growth Portfolio',
      clientId: '1',
      assets: 5,
    },
    {
      id: '2',
      name: 'Income Portfolio',
      clientId: '2',
      assets: 7,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockApiService.getPortfolios.mockImplementation(() => new Promise(() => {}));
    
    render(<PortfoliosList />);
    
    expect(screen.getByText('Loading portfolios...')).toBeInTheDocument();
  });

  it('should render portfolios list when data is loaded successfully', async () => {
    mockApiService.getPortfolios.mockResolvedValue({
      success: true,
      data: mockPortfolios,
      count: 2,
    });

    render(<PortfoliosList />);

    await waitFor(() => {
      expect(screen.getByText('Portfolios')).toBeInTheDocument();
      expect(screen.getByText('2 portfolios found')).toBeInTheDocument();
      expect(screen.getByText('Growth Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Client ID: 1')).toBeInTheDocument();
      expect(screen.getByText('Income Portfolio')).toBeInTheDocument();
      expect(screen.getByText('Client ID: 2')).toBeInTheDocument();
    });
  });

  it('should render error state when API call fails', async () => {
    const errorMessage = 'Failed to fetch portfolios';
    mockApiService.getPortfolios.mockRejectedValue(new Error(errorMessage));

    render(<PortfoliosList />);

    await waitFor(() => {
      expect(screen.getByText('Error loading portfolios')).toBeInTheDocument();
      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });
  });

  it('should call onPortfolioSelect when a portfolio is clicked', async () => {
    const mockOnPortfolioSelect = jest.fn();
    mockApiService.getPortfolios.mockResolvedValue({
      success: true,
      data: mockPortfolios,
      count: 2,
    });

    render(<PortfoliosList onPortfolioSelect={mockOnPortfolioSelect} />);

    await waitFor(() => {
      expect(screen.getByText('View Details')).toBeInTheDocument();
    });

    const viewDetailsButton = screen.getAllByText('View Details')[0];
    viewDetailsButton.click();

    expect(mockOnPortfolioSelect).toHaveBeenCalledWith(mockPortfolios[0]);
  });

  it('should display asset count for each portfolio', async () => {
    mockApiService.getPortfolios.mockResolvedValue({
      success: true,
      data: mockPortfolios,
      count: 2,
    });

    render(<PortfoliosList />);

    await waitFor(() => {
      expect(screen.getByText('5 assets')).toBeInTheDocument();
      expect(screen.getByText('7 assets')).toBeInTheDocument();
    });
  });

  it('should handle single asset correctly', async () => {
    const singleAssetPortfolio = [
      {
        id: '1',
        name: 'Single Asset Portfolio',
        clientId: '1',
        assets: 1,
      },
    ];
    mockApiService.getPortfolios.mockResolvedValue({
      success: true,
      data: singleAssetPortfolio,
      count: 1,
    });

    render(<PortfoliosList />);

    await waitFor(() => {
      expect(screen.getByText('1 asset')).toBeInTheDocument();
    });
  });

  it('should handle single portfolio correctly', async () => {
    const singlePortfolio = [mockPortfolios[0]];
    mockApiService.getPortfolios.mockResolvedValue({
      success: true,
      data: singlePortfolio,
      count: 1,
    });

    render(<PortfoliosList />);

    await waitFor(() => {
      expect(screen.getByText('1 portfolio found')).toBeInTheDocument();
    });
  });

  it('should display client ID for each portfolio', async () => {
    mockApiService.getPortfolios.mockResolvedValue({
      success: true,
      data: mockPortfolios,
      count: 2,
    });

    render(<PortfoliosList />);

    await waitFor(() => {
      expect(screen.getByText('Client ID: 1')).toBeInTheDocument();
      expect(screen.getByText('Client ID: 2')).toBeInTheDocument();
    });
  });
}); 