'use client';
import React from 'react';
import { useUser } from '../contexts/AuthContext';
import LandingPage from '../components/LandingPage';


export default function Home(): React.JSX.Element {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If user is not authenticated, show landing page
  if (!user) {
    return <LandingPage />;
  }

  // If user is authenticated, redirect to dashboard
  if (typeof window !== 'undefined') {
    window.location.href = '/dashboard';
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
    </div>
  );
}
