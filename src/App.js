import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all'); // all, completed, pending

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    const trimmed = task.trim();
    if (!trimmed) return alert('Task cannot be empty!');
    setTasks([
      ...tasks,
      { id: Date.now(), text: trimmed, completed: false, createdAt: new Date() },
    ]);
    setTask('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  const handleSort = () => {
    const sorted = [...filteredTasks].sort((a, b) => a.createdAt - b.createdAt);
    setTasks(sorted);
  };

  return (
    <div className="app">
      <h1>📝 React To-Do List</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={handleSort}>Sort by Date</button>
      </div>

      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          filteredTasks.map((t) => (
            <li key={t.id} className={t.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t.id)}
              />
              <span>{t.text}</span>
              <button onClick={() => handleDelete(t.id)}>🗑️</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
