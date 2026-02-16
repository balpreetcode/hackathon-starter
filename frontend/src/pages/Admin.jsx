import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
  const { user } = useAuth();

  const adminCards = [
    {
      title: 'System Settings',
      description: 'Configure application settings and preferences',
      icon: '⚙️',
      color: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: '👥',
      color: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics and reports',
      icon: '📊',
      color: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Security',
      description: 'Security settings and audit logs',
      icon: '🔒',
      color: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      title: 'Integrations',
      description: 'Manage third-party integrations',
      icon: '🔌',
      color: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      title: 'Backup & Restore',
      description: 'Database backup and restore options',
      icon: '💾',
      color: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
  ];

  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', positive: true },
    { label: 'Total Items', value: '5,678', change: '+8%', positive: true },
    { label: 'Active Sessions', value: '234', change: '-3%', positive: false },
    { label: 'Server Uptime', value: '99.9%', change: '+0.1%', positive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            System administration and management
          </p>
        </div>
        <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg font-medium">
          Admin Access
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <span
                className={`text-sm font-medium ${
                  stat.positive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card, index) => (
          <button
            key={index}
            className="card p-6 text-left hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center text-2xl mb-4`}>
              {card.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
          </button>
        ))}
      </div>

      {/* System Info */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Environment</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-700 dark:text-gray-300">Node Version:</dt>
                <dd className="font-medium text-gray-900 dark:text-white">v18.x</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-700 dark:text-gray-300">Database:</dt>
                <dd className="font-medium text-gray-900 dark:text-white">SQLite / PostgreSQL</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-700 dark:text-gray-300">API Version:</dt>
                <dd className="font-medium text-gray-900 dark:text-white">v1.0.0</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Status</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-700 dark:text-gray-300">API Status:</dt>
                <dd className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-medium text-green-600 dark:text-green-400">Operational</span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-700 dark:text-gray-300">Database:</dt>
                <dd className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-medium text-green-600 dark:text-green-400">Connected</span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-700 dark:text-gray-300">WebSocket:</dt>
                <dd className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-medium text-green-600 dark:text-green-400">Active</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
