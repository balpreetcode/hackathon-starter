import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899'];

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 42000, users: 1200, growth: 12 },
  { month: 'Feb', revenue: 48000, users: 1450, growth: 14 },
  { month: 'Mar', revenue: 55000, users: 1800, growth: 18 },
  { month: 'Apr', revenue: 51000, users: 2100, growth: 15 },
  { month: 'May', revenue: 64000, users: 2400, growth: 22 },
  { month: 'Jun', revenue: 72000, users: 2850, growth: 25 },
  { month: 'Jul', revenue: 68000, users: 3100, growth: 20 },
  { month: 'Aug', revenue: 81000, users: 3600, growth: 28 },
  { month: 'Sep', revenue: 93000, users: 4200, growth: 32 },
  { month: 'Oct', revenue: 89000, users: 4800, growth: 29 },
  { month: 'Nov', revenue: 102000, users: 5400, growth: 35 },
  { month: 'Dec', revenue: 118000, users: 6200, growth: 41 },
];

const trafficData = [
  { name: 'Direct', value: 35 },
  { name: 'Organic', value: 28 },
  { name: 'Social', value: 18 },
  { name: 'Referral', value: 12 },
  { name: 'Email', value: 7 },
];

const performanceData = [
  { day: 'Mon', latency: 120, uptime: 99.9, requests: 45000 },
  { day: 'Tue', latency: 115, uptime: 99.8, requests: 52000 },
  { day: 'Wed', latency: 130, uptime: 99.9, requests: 48000 },
  { day: 'Thu', latency: 105, uptime: 100, requests: 61000 },
  { day: 'Fri', latency: 125, uptime: 99.7, requests: 58000 },
  { day: 'Sat', latency: 95, uptime: 100, requests: 32000 },
  { day: 'Sun', latency: 90, uptime: 100, requests: 28000 },
];

const teamData = [
  { dept: 'Engineering', count: 42, productivity: 94 },
  { dept: 'Design', count: 18, productivity: 88 },
  { dept: 'Marketing', count: 24, productivity: 91 },
  { dept: 'Sales', count: 31, productivity: 86 },
  { dept: 'Support', count: 15, productivity: 92 },
];

const AnimatedCounter = ({ target, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const Landing = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">HackStack</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn btn-secondary text-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn btn-primary text-sm"
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live Analytics Dashboard
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Your data,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-pink-500">
              beautifully visualized
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
            Real-time analytics, team management, and performance monitoring — all in one place.
            Built for speed, designed for clarity.
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => navigate('/register')}
              className="btn btn-primary px-8 py-3 text-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => document.getElementById('metrics').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-secondary px-8 py-3 text-lg"
            >
              View Demo ↓
            </button>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section id="metrics" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Total Revenue', value: 118000, prefix: '$', color: 'from-primary-500 to-violet-600' },
              { label: 'Active Users', value: 6200, suffix: '+', color: 'from-emerald-500 to-teal-600' },
              { label: 'Growth Rate', value: 41, suffix: '%', color: 'from-amber-500 to-orange-600' },
              { label: 'Uptime', value: 99.9, suffix: '%', color: 'from-blue-500 to-cyan-600' },
            ].map((stat, i) => (
              <div key={i} className="card p-6 hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-bold mt-2">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    <AnimatedCounter target={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue & Growth Charts */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Revenue & Growth</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `$${v / 1000}k`} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Users" />
                  <Line type="monotone" dataKey="growth" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Growth %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Traffic & Performance */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Traffic & Performance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pie Chart */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {trafficData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {trafficData.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="card p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tickFormatter={(v) => `${v}ms`} tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="latency" fill="#ef4444" radius={[4, 4, 0, 0]} name="Latency (ms)" />
                  <Bar yAxisId="right" dataKey="requests" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Requests" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Team Productivity */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Team Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Department Size</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teamData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="dept" type="category" width={90} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 6, 6, 0]} name="Team Size" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Productivity Score</h3>
              <div className="space-y-5">
                {teamData.map((dept, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{dept.dept}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{dept.productivity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full transition-all duration-1000"
                        style={{
                          width: `${dept.productivity}%`,
                          backgroundColor: COLORS[i],
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Built for Modern Teams</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-3">Everything you need to manage, monitor, and scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔐', title: 'Auth & RBAC', desc: 'JWT authentication with role-based access control. Admin, Manager, and User roles out of the box.' },
              { icon: '📊', title: 'Real-time Analytics', desc: 'Live dashboards with charts, graphs, and KPI tracking. WebSocket-powered updates.' },
              { icon: '📁', title: 'File Management', desc: 'Drag-and-drop file uploads with type validation. Organized storage and retrieval.' },
              { icon: '🌓', title: 'Dark Mode', desc: 'Beautiful light and dark themes with smooth transitions. Respects user preference.' },
              { icon: '📱', title: 'Fully Responsive', desc: 'Works perfectly on desktop, tablet, and mobile. Collapsible sidebar navigation.' },
              { icon: '⚡', title: 'Zero Config DB', desc: 'JSON file-based database. No installation, no setup. Just clone and run.' },
            ].map((feature, i) => (
              <div key={i} className="card p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to get started?</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Sign up in seconds. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate('/register')}
              className="btn btn-primary px-10 py-3 text-lg shadow-lg shadow-primary-500/25"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate('/login')}
              className="btn btn-secondary px-10 py-3 text-lg"
            >
              Sign In
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">
            Demo accounts: admin@example.com / admin123
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">HackStack © 2026</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Built with React + Express + Tailwind
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
