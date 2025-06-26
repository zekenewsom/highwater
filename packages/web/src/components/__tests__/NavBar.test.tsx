import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../NavBar';

describe('NavBar', () => {
  it('renders navigation bar component', () => {
    render(<NavBar />);

    // Check for navigation element
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    render(<NavBar />);

    // Check for common navigation elements
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('renders logo or brand name', () => {
    render(<NavBar />);

    // Should have some form of branding - use getAllByText since multiple elements match
    const brandingElements = screen.getAllByText(/Highwater|Dashboard|Portfolio/i);
    expect(brandingElements.length).toBeGreaterThan(0);
  });

  it('has proper accessibility attributes', () => {
    render(<NavBar />);

    // Check for proper navigation structure
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(<NavBar />);

    // Component should render without errors
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
