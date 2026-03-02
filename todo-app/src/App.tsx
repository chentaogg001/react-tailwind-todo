import { useState, useEffect, useMemo } from 'react';
import { TodoItem } from './components/TodoItem';
import { TodoInput } from './components/TodoInput';
import { Filter } from './components/Filter';
import { Todo, FilterType } from './types';

const STORAGE_KEY = 'todo-app-todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [filter, setFilter] = useState<FilterType>('all');

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Add todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Edit todo
  const editTodo = (id: string, text: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  // Filter todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Counts
  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }), [todos]);

  // Current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">My Tasks</h1>
          <p className="text-slate-500 text-sm">{currentDate}</p>
        </div>

        {/* Input */}
        <div className="mb-6">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filter */}
        <div className="mb-4">
          <Filter
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              {filter === 'all' ? (
                <p>No tasks yet. Add one above!</p>
              ) : filter === 'active' ? (
                <p>No active tasks. Great job!</p>
              ) : (
                <p>No completed tasks yet.</p>
              )}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-6 text-center text-sm text-slate-400">
            {counts.active} {counts.active === 1 ? 'task' : 'tasks'} remaining
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
