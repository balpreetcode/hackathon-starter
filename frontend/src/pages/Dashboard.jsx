import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { socketService } from '../utils/socket';
import { useToast } from '../contexts/ToastContext';
import api from '../utils/api';
import Skeleton from '../components/Skeleton';

const Dashboard = () => {
  const { user } = useAuth();
  const { info } = useToast();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();

    // Listen for real-time notifications
    const handleNotification = (notification) => {
      info(notification.message || 'New notification received');
    };

    socketService.on('notification', handleNotification);

    return () => {
      socketService.off('notification', handleNotification);
    };
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Simulate fetching stats
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setStats({
        totalItems: 156,
        activeItems: 89,
        completedItems: 45,
        users: 24,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for charts
  const activityData = [
    { name: 'Mon', items: 12, completed: 8 },
    { name: 'Tue', items: 19, completed: 14 },
    { name: 'Wed', items: 15, completed: 11 },
    { name: 'Thu', items: 22, completed: 18 },
    { name: 'Fri', items: 28, completed: 20 },
    { name: 'Sat', items: 18, completed: 15 },
    { name: 'Sun', items: 14, completed: 10 },
  ];

  const categoryData = [
    { name: 'Work', count: 45 },
    { name: 'Personal', count: 32 },
    { name: 'Shopping', count: 28 },
    { name: 'Health', count: 18 },
    { name: 'Finance', count: 15 },
  ];

  const recentActivity = [
    { id: 1, action: 'Created new item', item: 'Complete project proposal', time: '5 min ago', user: 'John Doe' },
    { id: 2, action: 'Updated status', item: 'Review Q4 budget', time: '12 min ago', user: 'Jane Smith' },
    { id: 3, action: 'Completed item', item: 'Team meeting scheduled', time: '1 hour ago', user: 'Mike Johnson' },
    { id: 4, action: 'Added comment', item: 'Database optimization', time: '2 hours ago', user: 'Sarah Williams' },
    { id: 5, action: 'Created new item', item: 'Security audit', time: '3 hours ago', user: 'Admin User' },
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton variant="title" />
          <Skeleton className="mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Items"
          value={stats.totalItems}
          icon="📦"
          color="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard
          title="Active Items"
          value={stats.activeItems}
          icon="⚡"
          color="bg-green-100 dark:bg-green-900/30"
        />
        <StatCard
          title="Completed"
          value={stats.completedItems}
          icon="✅"
          color="bg-purple-100 dark:bg-purple-900/30"
        />
        <StatCard
          title="Team Members"
          value={stats.users}
          icon="👥"
          color="bg-orange-100 dark:bg-orange-900/30"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="items" stroke="#8b5cf6" strokeWidth={2} name="Created" />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Items by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-gray-600 dark:text-gray-400">{activity.action}</span>
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white font-medium mt-1">
                    {activity.item}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
