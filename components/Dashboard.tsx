
import React, { useState, useMemo } from 'react';
import { Fair, FairData, Exhibitor, Meeting, Task } from '../types';
import ExhibitorList from './ExhibitorList';
import MeetingList from './MeetingList';
import TaskList from './TaskList';

interface DashboardProps {
  fair: Fair;
  data: FairData;
  onUpdate: (newData: Partial<FairData>) => void;
  onExit: () => void;
  onShowBackup: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ fair, data, onUpdate, onExit, onShowBackup }) => {
  const [activeTab, setActiveTab] = useState<'exhibitors' | 'meetings' | 'tasks'>('exhibitors');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExhibitors = useMemo(() => {
    return data.exhibitors.filter(e => 
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.hall.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.stand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data.exhibitors, searchTerm]);

  const filteredMeetings = useMemo(() => {
    return data.meetings.filter(m => {
      const exhibitor = data.exhibitors.find(e => e.id === m.exhibitorId);
      return (
        (exhibitor?.name.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        m.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data.meetings, data.exhibitors, searchTerm]);

  const filteredTasks = useMemo(() => {
    return data.tasks.filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data.tasks, searchTerm]);

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full pb-20 md:pb-8">
      {/* Header Sticky */}
      <header className="sticky top-0 bg-white border-b border-slate-200 shadow-sm z-30 p-4">
        <div className="flex justify-between items-center mb-3">
          <button onClick={onExit} className="text-slate-500 hover:text-blue-600 p-2">
            <i className="fa-solid fa-arrow-left text-lg"></i>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold truncate max-w-[200px] md:max-w-none">{fair.name}</h1>
          </div>
          <button onClick={onShowBackup} className="text-slate-500 hover:text-blue-600 p-2">
            <i className="fa-solid fa-gear text-lg"></i>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Buscar expositores, reuniones o notas..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-slate-200 flex overflow-x-auto">
        <button
          onClick={() => setActiveTab('exhibitors')}
          className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'exhibitors' ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-slate-500 border-transparent'
          }`}
        >
          <i className="fa-solid fa-shop mr-2"></i>
          Expositores ({data.exhibitors.length})
        </button>
        <button
          onClick={() => setActiveTab('meetings')}
          className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'meetings' ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-slate-500 border-transparent'
          }`}
        >
          <i className="fa-solid fa-calendar-check mr-2"></i>
          Reuniones ({data.meetings.length})
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'tasks' ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-slate-500 border-transparent'
          }`}
        >
          <i className="fa-solid fa-list-check mr-2"></i>
          Seguimiento ({data.tasks.filter(t => !t.completed).length})
        </button>
      </div>

      {/* Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'exhibitors' && (
          <ExhibitorList 
            exhibitors={filteredExhibitors} 
            onAdd={(exhibitor) => onUpdate({ exhibitors: [...data.exhibitors, exhibitor] })}
            onDelete={(id) => onUpdate({ 
              exhibitors: data.exhibitors.filter(e => e.id !== id),
              meetings: data.meetings.filter(m => m.exhibitorId !== id)
            })}
          />
        )}
        {activeTab === 'meetings' && (
          <MeetingList 
            meetings={filteredMeetings} 
            exhibitors={data.exhibitors}
            onAdd={(meeting) => onUpdate({ meetings: [...data.meetings, meeting] })}
            onDelete={(id) => onUpdate({ meetings: data.meetings.filter(m => m.id !== id) })}
            onUpdateStatus={(id, status) => onUpdate({
              meetings: data.meetings.map(m => m.id === id ? { ...m, status } : m)
            })}
          />
        )}
        {activeTab === 'tasks' && (
          <TaskList 
            tasks={filteredTasks} 
            onAdd={(task) => onUpdate({ tasks: [...data.tasks, task] })}
            onToggle={(id) => onUpdate({
              tasks: data.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
            })}
            onDelete={(id) => onUpdate({ tasks: data.tasks.filter(t => t.id !== id) })}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
