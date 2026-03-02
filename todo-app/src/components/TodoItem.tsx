import { useState } from 'react';
import { Check, Trash2, Pencil } from 'lucide-react';
import { Todo } from '../types';
import { clsx } from 'clsx';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={clsx(
        'group flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-slate-200',
        'hover:shadow-md hover:border-slate-300 transition-all duration-200',
        todo.completed && 'bg-slate-50'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center',
          'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          todo.completed
            ? 'bg-blue-600 border-blue-600'
            : 'border-slate-300 hover:border-blue-500'
        )}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
      </button>

      {/* Text / Edit Input */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 px-3 py-2 text-slate-700 bg-white border border-blue-500 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={clsx(
            'flex-1 text-base cursor-pointer transition-all duration-200',
            'hover:text-blue-600',
            todo.completed
              ? 'text-slate-400 line-through'
              : 'text-slate-700'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
