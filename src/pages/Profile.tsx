import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="mt-1 text-sm text-gray-900">{profile?.full_name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 text-sm text-gray-900">{profile?.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <div className="mt-1 text-sm text-gray-900 capitalize">{profile?.role}</div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Statistics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tasks Completed</label>
            <div className="mt-1 text-sm text-gray-900">{profile?.tasks_completed || 0}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reports Submitted</label>
            <div className="mt-1 text-sm text-gray-900">{profile?.reports_submitted || 0}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Achievements</label>
            <div className="mt-1 text-sm text-gray-900">{profile?.achievements_count || 0}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Active Warnings</label>
            <div className="mt-1 text-sm text-gray-900">{profile?.active_warnings || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}