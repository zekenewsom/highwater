import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddButtonWithDropdown from './AddButtonWithDropdown';

describe('AddButtonWithDropdown', () => {
  it('shows dropdown on button click', () => {
    render(<AddButtonWithDropdown />);
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText(/Add Wallet/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Exchange/i)).toBeInTheDocument();
  });

  it('shows modal when Add Wallet is clicked', () => {
    render(<AddButtonWithDropdown />);
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText(/Add Wallet/i));
    expect(screen.getByText(/Add Wallet/i)).toBeInTheDocument();
    expect(screen.getByText('Phantom')).toBeInTheDocument();
    expect(screen.getByText('MetaMask')).toBeInTheDocument();
    expect(screen.getByText('Trust')).toBeInTheDocument();
    expect(screen.getByText('Moonshot')).toBeInTheDocument();
  });

  it('shows modal when Add Exchange is clicked', () => {
    render(<AddButtonWithDropdown />);
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText(/Add Exchange/i));
    expect(screen.getByText(/Add Exchange/i)).toBeInTheDocument();
    expect(screen.getByText('Coinbase')).toBeInTheDocument();
    expect(screen.getByText('Gemini')).toBeInTheDocument();
    expect(screen.getByText('Kraken')).toBeInTheDocument();
    expect(screen.getByText('Binance')).toBeInTheDocument();
  });

  it('closes modal on × click', () => {
    render(<AddButtonWithDropdown />);
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText(/Add Wallet/i));
    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText(/Add Wallet/i)).not.toBeInTheDocument();
  });
});
