import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useToast } from '../contexts/ToastContext';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const { success, error } = useToast();

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, sortBy, sortOrder, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/users', {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          sortBy,
          sortOrder,
          search,
        },
      });
      setUsers(response.data.data.users);
      setPagination(response.data.data.pagination);
    } catch (err) {
      error(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key, order) => {
    setSortBy(key);
    setSortOrder(order);
  };

  const columns = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (user) => {
        const colors = {
          ADMIN: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
          MANAGER: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
          USER: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[user.role]}`}>
            {user.role}
          </span>
        );
      },
    },
    {
      key: 'createdAt',
      label: 'Joined',
      sortable: true,
      render: (user) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      sortable: true,
      render: (user) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(user.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage team members and permissions</p>
      </div>

      {/* Search */}
      <div className="card p-6">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Users
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="input"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <DataTable
          columns={columns}
          data={users}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          loading={loading}
          emptyMessage="No users found"
        />
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setPagination({ ...pagination, page })}
        />
      </div>
    </div>
  );
};

export default Users;
