
import React from 'react';
import { Fair } from '../types';

interface FairSelectorProps {
  fairs: Fair[];
  onSelect: (id: string) => void;
  onShowBackup: () => void;
}

const FairSelector: React.FC<FairSelectorProps> = ({ fairs, onSelect, onShowBackup }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">FairAgenda</h1>
          <p className="text-slate-500">Tu compañero para ferias profesionales</p>
        </div>
        <button 
          onClick={onShowBackup}
          className="bg-white p-3 rounded-full shadow-sm text-slate-600 hover:text-blue-600 border border-slate-200"
          title="Backup y Opciones"
        >
          <i className="fa-solid fa-cloud-arrow-up text-xl"></i>
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Selecciona tu feria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fairs.map(fair => (
            <button
              key={fair.id}
              onClick={() => onSelect(fair.id)}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{fair.name}</h3>
                  <div className="flex items-center text-slate-500 text-sm mt-1">
                    <i className="fa-solid fa-location-dot mr-2"></i>
                    {fair.location}
                  </div>
                  <div className="flex items-center text-slate-500 text-sm mt-1">
                    <i className="fa-solid fa-calendar mr-2"></i>
                    {fair.date}
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <i className="fa-solid fa-chevron-right text-slate-400 group-hover:text-blue-500"></i>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center space-x-4">
        <div className="bg-blue-600 text-white p-3 rounded-xl">
          <i className="fa-solid fa-bolt text-2xl"></i>
        </div>
        <div>
          <h3 className="font-bold text-blue-900 uppercase text-xs tracking-widest">Funcionamiento Offline</h3>
          <p className="text-blue-700 text-sm">Tus datos se guardan exclusivamente en este dispositivo. No necesitas conexión ni cuenta.</p>
        </div>
      </div>
    </div>
  );
};

export default FairSelector;
