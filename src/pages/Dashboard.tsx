import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h2 className="text-lg font-medium text-gray-900">Welcome, {profile?.full_name}</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Tasks Completed</dt>
                      <dd className="text-lg font-medium text-gray-900">{profile?.tasks_completed || 0}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Reports Submitted</dt>
                      <dd className="text-lg font-medium text-gray-900">{profile?.reports_submitted || 0}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Achievements</dt>
                      <dd className="text-lg font-medium text-gray-900">{profile?.achievements_count || 0}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Warnings</dt>
                      <dd className="text-lg font-medium text-gray-900">{profile?.active_warnings || 0}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}