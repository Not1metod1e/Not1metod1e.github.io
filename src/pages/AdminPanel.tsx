import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminPanel() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h2 className="text-lg font-medium text-gray-900">Admin Panel</h2>
        <div className="mt-4">
          {/* Admin features will be implemented here */}
          <p className="text-gray-500">Admin features coming soon...</p>
        </div>
      </div>
    </div>
  );
}