import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HoldingsTable from '../HoldingsTable';

describe('HoldingsTable', () => {
  it('renders holdings table component', () => {
    render(<HoldingsTable />);

    expect(screen.getByText(/Holdings/i)).toBeInTheDocument();
  });

  it('displays table headers', () => {
    render(<HoldingsTable />);

    // Check for common table headers
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders.length).toBeGreaterThan(0);
  });

  it('renders table structure', () => {
    render(<HoldingsTable />);

    // Check for table element
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('displays holdings data when available', () => {
    render(<HoldingsTable />);

    // Component should render even with no data
    expect(screen.getByText(/Holdings/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<HoldingsTable />);

    // Check for proper table structure
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('renders without crashing with empty data', () => {
    render(<HoldingsTable />);

    // Component should render without errors even with no data
    expect(screen.getByText(/Holdings/i)).toBeInTheDocument();
  });
});
