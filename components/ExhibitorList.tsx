
import React, { useState } from 'react';
import { Exhibitor } from '../types';

interface ExhibitorListProps {
  exhibitors: Exhibitor[];
  onAdd: (exhibitor: Exhibitor) => void;
  onDelete: (id: string) => void;
}

const ExhibitorList: React.FC<ExhibitorListProps> = ({ exhibitors, onAdd, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '', hall: '', stand: '', category: '', contact: '', email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExhibitor: Exhibitor = {
      id: Date.now().toString(),
      fairId: '', // Managed by parent
      name: formData.name,
      hall: formData.hall,
      stand: formData.stand,
      category: formData.category,
      contactName: formData.contact,
      email: formData.email
    };
    onAdd(newExhibitor);
    setFormData({ name: '', hall: '', stand: '', category: '', contact: '', email: '' });
    setIsAdding(false);
  };

  return (
    <div>
      {isAdding ? (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-slate-800">Nuevo Expositor</h3>
            <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <input 
            required 
            placeholder="Nombre de la empresa" 
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-3">
            <input 
              placeholder="Pabellón" 
              className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200"
              value={formData.hall}
              onChange={e => setFormData({...formData, hall: e.target.value})}
            />
            <input 
              placeholder="Stand" 
              className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200"
              value={formData.stand}
              onChange={e => setFormData({...formData, stand: e.target.value})}
            />
          </div>
          <input 
            placeholder="Categoría / Producto" 
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          />
          <input 
            placeholder="Nombre de contacto" 
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200"
            value={formData.contact}
            onChange={e => setFormData({...formData, contact: e.target.value})}
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
            Añadir Expositor
          </button>
        </form>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full py-4 bg-white border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors mb-6 flex items-center justify-center space-x-2"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Añadir nuevo expositor</span>
        </button>
      )}

      <div className="space-y-4">
        {exhibitors.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <i className="fa-solid fa-store-slash text-4xl mb-3 block"></i>
            <p>No hay expositores aún o no coinciden con la búsqueda.</p>
          </div>
        ) : (
          exhibitors.map(exhibitor => (
            <div key={exhibitor.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg text-slate-900">{exhibitor.name}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                      H{exhibitor.hall} / {exhibitor.stand}
                    </span>
                    {exhibitor.category && (
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                        {exhibitor.category}
                      </span>
                    )}
                  </div>
                  {exhibitor.contactName && (
                    <div className="mt-3 text-sm text-slate-600 flex items-center">
                      <i className="fa-solid fa-user-tie mr-2 text-slate-400"></i>
                      {exhibitor.contactName}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => confirm("¿Eliminar este expositor y sus reuniones?") && onDelete(exhibitor.id)}
                  className="text-slate-300 hover:text-red-500 p-2"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExhibitorList;
