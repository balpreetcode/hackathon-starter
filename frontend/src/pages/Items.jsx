import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useToast } from '../contexts/ToastContext';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import FileUpload from '../components/FileUpload';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    fetchItems();
  }, [pagination.page, sortBy, sortOrder, search, statusFilter, categoryFilter]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/items', {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          sortBy,
          sortOrder,
          search,
          status: statusFilter,
          category: categoryFilter,
        },
      });
      setItems(response.data.data.items);
      setPagination(response.data.data.pagination);
    } catch (err) {
      error(err.response?.data?.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key, order) => {
    setSortBy(key);
    setSortOrder(order);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await api.delete(`/api/items/${id}`);
      success('Item deleted successfully');
      fetchItems();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (item) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
          {item.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-md">
              {item.description}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item) => {
        const colors = {
          active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
          pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
          completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
          archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[item.status] || colors.active}`}>
            {item.status}
          </span>
        );
      },
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (item) => (
        <span className="text-gray-700 dark:text-gray-300">{item.category || '-'}</span>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (item) => {
        const colors = {
          urgent: 'text-red-600 dark:text-red-400',
          high: 'text-orange-600 dark:text-orange-400',
          medium: 'text-yellow-600 dark:text-yellow-400',
          low: 'text-green-600 dark:text-green-400',
        };
        return (
          <span className={`font-medium ${colors[item.priority] || 'text-gray-600 dark:text-gray-400'}`}>
            {item.priority || '-'}
          </span>
        );
      },
    },
    {
      key: 'user',
      label: 'Owner',
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
            {item.user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-gray-700 dark:text-gray-300">{item.user?.name}</span>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (item) => (
        <span className="text-gray-600 dark:text-gray-400">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Items</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your items and tasks</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn btn-secondary"
          >
            📤 Upload
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            + New Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input"
            >
              <option value="">All categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('');
                setCategoryFilter('');
              }}
              className="btn btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <DataTable
          columns={columns}
          data={items}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          loading={loading}
          emptyMessage="No items found"
        />
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setPagination({ ...pagination, page })}
        />
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload File</h2>
            <FileUpload
              onUploadSuccess={(file) => {
                success('File uploaded successfully!');
                setShowUploadModal(false);
              }}
            />
            <button
              onClick={() => setShowUploadModal(false)}
              className="mt-6 btn btn-secondary w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Create Modal (simplified - just close for now) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Item</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Item creation form would go here. This is a UI demo.
            </p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="btn btn-secondary w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
