import { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 text-slate-700 bg-white border border-slate-300 rounded-lg
                   placeholder:text-slate-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-200"
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg
                   hover:bg-blue-700 active:bg-blue-800
                   disabled:bg-slate-300 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   transition-all duration-200 flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add
      </button>
    </div>
  );
}
