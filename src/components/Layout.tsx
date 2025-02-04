import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, ClipboardList, CheckSquare, User, Settings, LogOut } from 'lucide-react';

export default function Layout() {
  const { signOut, isAdmin, profile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-800">ScooterStaff</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/dashboard" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link to="/reports" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Reports
                </Link>
                <Link to="/tasks" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Tasks
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/profile" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                <User className="w-4 h-4 mr-2" />
                {profile?.full_name}
              </Link>
              <button
                onClick={handleSignOut}
                className="ml-4 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}