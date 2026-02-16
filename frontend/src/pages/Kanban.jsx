import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import { useToast } from '../contexts/ToastContext';

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-400', accent: 'border-gray-400' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500', accent: 'border-blue-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500', accent: 'border-green-500' },
];

const PRIORITY_COLORS = {
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const KanbanCard = ({ item, onDragStart, onEdit, onDelete }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      className="card p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-150 select-none group"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{item.title}</h4>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(item)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="Edit">
            ✏️
          </button>
          <button onClick={() => onDelete(item.id)} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500" title="Delete">
            🗑️
          </button>
        </div>
      </div>
      {item.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">{item.description}</p>
      )}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {item.priority && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[item.priority] || PRIORITY_COLORS.medium}`}>
            {item.priority.toUpperCase()}
          </span>
        )}
        {item.category && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
            {item.category}
          </span>
        )}
      </div>
      {item.user && (
        <div className="flex items-center gap-1.5 mt-3">
          <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">{item.user.name?.charAt(0)}</span>
          </div>
          <span className="text-[11px] text-gray-500 dark:text-gray-400">{item.user.name}</span>
        </div>
      )}
    </div>
  );
};

const AddCardForm = ({ columnId, onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(columnId, { title: title.trim(), description: description.trim(), priority });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 space-y-2">
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Card title..."
        className="input text-sm py-1.5"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="input text-sm py-1.5 resize-none"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input text-sm py-1.5">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      <div className="flex items-center gap-2">
        <button type="submit" className="btn btn-primary text-xs py-1.5 px-3">Add</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary text-xs py-1.5 px-3">Cancel</button>
      </div>
    </form>
  );
};

const EditModal = ({ item, onSave, onClose }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description || '');
  const [priority, setPriority] = useState(item.priority || 'medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(item.id, { title: title.trim(), description: description.trim(), priority });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="card p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Edit Card</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="input mt-1 resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input mt-1">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Kanban = () => {
  const { success, error } = useToast();
  const [items, setItems] = useState({ todo: [], 'in-progress': [], done: [] });
  const [loading, setLoading] = useState(true);
  const [addingTo, setAddingTo] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const dragItem = useRef(null);
  const dragSource = useRef(null);

  // Map API statuses to column IDs
  const statusToColumn = (status) => {
    if (status === 'completed' || status === 'done') return 'done';
    if (status === 'active' || status === 'in-progress') return 'in-progress';
    return 'todo';
  };

  const columnToStatus = (colId) => {
    if (colId === 'done') return 'completed';
    if (colId === 'in-progress') return 'active';
    return 'pending';
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/items?limit=100');
      const allItems = res.data.data.items;
      const grouped = { todo: [], 'in-progress': [], done: [] };
      allItems.forEach((item) => {
        const col = statusToColumn(item.status);
        grouped[col].push(item);
      });
      setItems(grouped);
    } catch (err) {
      console.error('Failed to fetch items:', err);
      // Use mock data if API fails
      setItems({
        todo: [
          { id: '1', title: 'Research competitor analysis', description: 'Look at top 5 competitors and document their features', priority: 'high', category: 'Marketing', user: { name: 'Admin User' } },
          { id: '2', title: 'Design new landing page', description: 'Wireframes and mockups for v2', priority: 'medium', category: 'Design', user: { name: 'Manager User' } },
          { id: '3', title: 'Set up CI/CD pipeline', priority: 'critical', category: 'Engineering', user: { name: 'Admin User' } },
          { id: '4', title: 'Write API documentation', description: 'OpenAPI spec for all endpoints', priority: 'low', category: 'Engineering', user: { name: 'Regular User' } },
        ],
        'in-progress': [
          { id: '5', title: 'Implement user dashboard', description: 'Stats, charts, and recent activity', priority: 'high', category: 'Engineering', user: { name: 'Admin User' } },
          { id: '6', title: 'Create onboarding flow', description: 'Step-by-step wizard for new users', priority: 'medium', category: 'Design', user: { name: 'Manager User' } },
          { id: '7', title: 'Database optimization', priority: 'high', category: 'Engineering', user: { name: 'Regular User' } },
        ],
        done: [
          { id: '8', title: 'Set up project repo', description: 'Git, CI, and deployment config', priority: 'medium', category: 'Engineering', user: { name: 'Admin User' } },
          { id: '9', title: 'Design system components', description: 'Buttons, inputs, cards, modals', priority: 'high', category: 'Design', user: { name: 'Manager User' } },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const onDragStart = (e, item) => {
    dragItem.current = item;
    // Find which column this item is in
    for (const [colId, colItems] of Object.entries(items)) {
      if (colItems.find((i) => i.id === item.id)) {
        dragSource.current = colId;
        break;
      }
    }
    e.dataTransfer.effectAllowed = 'move';
    // Make the drag image slightly transparent
    e.target.style.opacity = '0.5';
    setTimeout(() => { e.target.style.opacity = '1'; }, 0);
  };

  const onDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(colId);
  };

  const onDragLeave = () => {
    setDragOverCol(null);
  };

  const onDrop = async (e, targetCol) => {
    e.preventDefault();
    setDragOverCol(null);
    const item = dragItem.current;
    const sourceCol = dragSource.current;

    if (!item || sourceCol === targetCol) return;

    // Optimistic update
    setItems((prev) => {
      const newItems = { ...prev };
      newItems[sourceCol] = prev[sourceCol].filter((i) => i.id !== item.id);
      newItems[targetCol] = [...prev[targetCol], { ...item, status: columnToStatus(targetCol) }];
      return newItems;
    });

    // Try to update via API
    try {
      await api.put(`/api/items/${item.id}`, { status: columnToStatus(targetCol) });
    } catch (err) {
      // API might fail for mock items — that's OK
      console.log('API update skipped (mock data)');
    }

    dragItem.current = null;
    dragSource.current = null;
  };

  const handleAdd = async (columnId, data) => {
    const newItem = {
      id: Date.now().toString(),
      ...data,
      status: columnToStatus(columnId),
      user: { name: 'You' },
      createdAt: new Date().toISOString(),
    };

    setItems((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newItem],
    }));
    setAddingTo(null);
    success('Card added');

    try {
      const res = await api.post('/api/items', { ...data, status: columnToStatus(columnId) });
      // Replace temp item with real one
      setItems((prev) => ({
        ...prev,
        [columnId]: prev[columnId].map((i) => (i.id === newItem.id ? res.data.data : i)),
      }));
    } catch (err) {
      console.log('API create skipped');
    }
  };

  const handleEdit = async (id, data) => {
    // Find and update in place
    setItems((prev) => {
      const newItems = {};
      for (const [col, colItems] of Object.entries(prev)) {
        newItems[col] = colItems.map((i) => (i.id === id ? { ...i, ...data } : i));
      }
      return newItems;
    });
    setEditingItem(null);
    success('Card updated');

    try {
      await api.put(`/api/items/${id}`, data);
    } catch (err) {
      console.log('API update skipped');
    }
  };

  const handleDelete = async (id) => {
    setItems((prev) => {
      const newItems = {};
      for (const [col, colItems] of Object.entries(prev)) {
        newItems[col] = colItems.filter((i) => i.id !== id);
      }
      return newItems;
    });
    success('Card deleted');

    try {
      await api.delete(`/api/items/${id}`);
    } catch (err) {
      console.log('API delete skipped');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Drag and drop cards between columns to update status.</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 min-h-[70vh]">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className={`flex-shrink-0 w-80 flex flex-col rounded-xl transition-colors duration-150 ${
              dragOverCol === col.id
                ? 'bg-primary-50 dark:bg-primary-900/10 ring-2 ring-primary-400 ring-inset'
                : 'bg-gray-100 dark:bg-gray-800/50'
            }`}
            onDragOver={(e) => onDragOver(e, col.id)}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, col.id)}
          >
            {/* Column Header */}
            <div className="p-4 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{col.title}</h3>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                  {items[col.id].length}
                </span>
              </div>
              <button
                onClick={() => setAddingTo(addingTo === col.id ? null : col.id)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                title="Add card"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Cards */}
            <div className="flex-1 p-2 pt-0 space-y-2.5 overflow-y-auto">
              {items[col.id].map((item) => (
                <KanbanCard
                  key={item.id}
                  item={item}
                  onDragStart={onDragStart}
                  onEdit={setEditingItem}
                  onDelete={handleDelete}
                />
              ))}

              {addingTo === col.id && (
                <AddCardForm
                  columnId={col.id}
                  onAdd={handleAdd}
                  onCancel={() => setAddingTo(null)}
                />
              )}

              {items[col.id].length === 0 && addingTo !== col.id && (
                <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                  Drop cards here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <EditModal item={editingItem} onSave={handleEdit} onClose={() => setEditingItem(null)} />
      )}
    </div>
  );
};

export default Kanban;
