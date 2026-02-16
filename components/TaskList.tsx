
import React, { useState } from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onAdd: (task: Task) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onAdd, onToggle, onDelete }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      fairId: '',
      description: description.trim(),
      completed: false
    };
    onAdd(newTask);
    setDescription('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6 flex space-x-2">
        <input 
          placeholder="Añadir tarea de seguimiento..." 
          className="flex-1 p-3 bg-white rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-5 rounded-xl font-bold hover:bg-blue-700 shadow-sm">
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <i className="fa-solid fa-clipboard-list text-4xl mb-3 block"></i>
            <p>No hay tareas pendientes.</p>
          </div>
        ) : (
          tasks.sort((a,b) => Number(a.completed) - Number(b.completed)).map(task => (
            <div key={task.id} className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4 transition-all ${task.completed ? 'opacity-60 grayscale' : ''}`}>
              <button 
                onClick={() => onToggle(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-transparent'
                }`}
              >
                <i className="fa-solid fa-check text-xs"></i>
              </button>
              <span className={`flex-1 text-slate-800 ${task.completed ? 'line-through text-slate-400' : ''}`}>
                {task.description}
              </span>
              <button 
                onClick={() => onDelete(task.id)}
                className="text-slate-300 hover:text-red-500 p-2"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>

      {tasks.some(t => t.completed) && (
        <div className="mt-8 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center">Tareas completadas</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
