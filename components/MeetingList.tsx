
import React, { useState } from 'react';
import { Meeting, Exhibitor } from '../types';

interface MeetingListProps {
  meetings: Meeting[];
  exhibitors: Exhibitor[];
  onAdd: (meeting: Meeting) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: Meeting['status']) => void;
}

const MeetingList: React.FC<MeetingListProps> = ({ meetings, exhibitors, onAdd, onDelete, onUpdateStatus }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    exhibitorId: '', dateTime: '', location: '', notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.exhibitorId) return;

    const newMeeting: Meeting = {
      id: Date.now().toString(),
      fairId: '',
      exhibitorId: formData.exhibitorId,
      dateTime: formData.dateTime,
      location: formData.location,
      notes: formData.notes,
      status: 'pending'
    };
    onAdd(newMeeting);
    setFormData({ exhibitorId: '', dateTime: '', location: '', notes: '' });
    setIsAdding(false);
  };

  return (
    <div>
      {isAdding ? (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-slate-800">Nueva Reunión</h3>
            <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <select 
            required
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200"
            value={formData.exhibitorId}
            onChange={e => setFormData({...formData, exhibitorId: e.target.value})}
          >
            <option value="">Seleccionar Expositor</option>
            {exhibitors.map(e => (
              <option key={e.id} value={e.id}>{e.name} (H{e.hall}/{e.stand})</option>
            ))}
          </select>
          <input 
            type="datetime-local"
            required
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200"
            value={formData.dateTime}
            onChange={e => setFormData({...formData, dateTime: e.target.value})}
          />
          <input 
            placeholder="Ubicación (ej: Stand del expositor)" 
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200"
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
          />
          <textarea 
            placeholder="Objetivo / Notas iniciales" 
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 min-h-[100px]"
            value={formData.notes}
            onChange={e => setFormData({...formData, notes: e.target.value})}
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
            Programar Reunión
          </button>
        </form>
      ) : (
        <button 
          onClick={() => exhibitors.length > 0 ? setIsAdding(true) : alert("Añade primero un expositor")}
          className="w-full py-4 bg-white border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors mb-6 flex items-center justify-center space-x-2"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Programar reunión</span>
        </button>
      )}

      <div className="space-y-4">
        {meetings.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <i className="fa-solid fa-calendar-xmark text-4xl mb-3 block"></i>
            <p>Sin reuniones programadas.</p>
          </div>
        ) : (
          meetings.sort((a,b) => a.dateTime.localeCompare(b.dateTime)).map(meeting => {
            const exhibitor = exhibitors.find(e => e.id === meeting.exhibitorId);
            return (
              <div key={meeting.id} className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 ${meeting.status === 'completed' ? 'opacity-70' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${
                        meeting.status === 'pending' ? 'bg-orange-500' : 
                        meeting.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <h4 className="font-bold text-slate-900">{exhibitor?.name || 'Expositor desconocido'}</h4>
                    </div>
                    
                    <div className="flex items-center text-sm text-blue-600 font-medium mb-2">
                      <i className="fa-solid fa-clock mr-2"></i>
                      {new Date(meeting.dateTime).toLocaleString('es-ES', { 
                        weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </div>

                    <div className="text-sm text-slate-500 mb-3">
                      <i className="fa-solid fa-map-pin mr-2 text-slate-400"></i>
                      {meeting.location || `Stand ${exhibitor?.stand || '?'}`}
                    </div>

                    {meeting.notes && (
                      <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 italic border-l-4 border-slate-200">
                        {meeting.notes}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button 
                      onClick={() => confirm("¿Eliminar reunión?") && onDelete(meeting.id)}
                      className="text-slate-300 hover:text-red-500 p-2"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    {meeting.status === 'pending' && (
                      <button 
                        onClick={() => onUpdateStatus(meeting.id, 'completed')}
                        className="bg-green-50 text-green-600 p-2 rounded-lg border border-green-100"
                        title="Marcar como realizada"
                      >
                        <i className="fa-solid fa-check"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MeetingList;
