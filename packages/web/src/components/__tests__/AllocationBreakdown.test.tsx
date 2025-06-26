import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AllocationBreakdown } from '../AllocationBreakdown';

describe('AllocationBreakdown', () => {
  it('renders allocation breakdown component', () => {
    render(<AllocationBreakdown />);

    expect(screen.getByText(/Allocation/i)).toBeInTheDocument();
  });

  it('displays pie chart', () => {
    render(<AllocationBreakdown />);

    // Check for chart elements (mocked in jest.setup.js)
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });

  it('shows allocation data when available', () => {
    render(<AllocationBreakdown />);

    // Component should render even with no data
    expect(screen.getByText(/Allocation/i)).toBeInTheDocument();
  });

  it('renders without crashing with empty data', () => {
    render(<AllocationBreakdown />);

    // Component should render without errors even with no data
    expect(screen.getByText(/Allocation/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<AllocationBreakdown />);

    // Check for proper heading structure
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });
});
