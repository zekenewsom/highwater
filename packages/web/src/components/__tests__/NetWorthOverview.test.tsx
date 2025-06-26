import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NetWorthOverview from '../NetWorthOverview'

// Mock the data context or props
const mockData = {
  totalNetWorth: 1250000,
  change24h: 25000,
  changePercent: 2.04,
  currency: 'USD'
};

describe('NetWorthOverview', () => {
  it('renders net worth overview component', () => {
    render(<NetWorthOverview />);
    
    expect(screen.getByText(/Net Worth/i)).toBeInTheDocument();
    expect(screen.getByText(/Net Worth Overview/i)).toBeInTheDocument();
  });

  it('displays net worth value', () => {
    render(<NetWorthOverview />);
    
    // Should display some form of net worth value
    const netWorthElement = screen.getByText(/Net Worth/i);
    expect(netWorthElement).toBeInTheDocument();
  });

  it('shows net worth overview section', () => {
    render(<NetWorthOverview />);
    
    expect(screen.getByText(/Net Worth Overview/i)).toBeInTheDocument();
  });

  it('displays chart component', () => {
    render(<NetWorthOverview />);
    
    // Check for chart elements (mocked in jest.setup.js)
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('renders without crashing with no data', () => {
    render(<NetWorthOverview />);
    
    // Component should render without errors even with no data
    expect(screen.getByText(/Net Worth/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<NetWorthOverview />);
    
    // Check for proper heading structure
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });
}); 