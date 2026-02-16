
import React from 'react';

interface BackupManagerProps {
  onBack: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BackupManager: React.FC<BackupManagerProps> = ({ onBack, onExport, onImport }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 md:p-12 w-full">
      <button onClick={onBack} className="text-slate-500 hover:text-blue-600 mb-8 flex items-center space-x-2">
        <i className="fa-solid fa-arrow-left"></i>
        <span>Volver</span>
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-6">Gestión de Datos y Backup</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-4 mb-4 text-blue-600">
            <i className="fa-solid fa-download text-2xl"></i>
            <h2 className="text-xl font-bold text-slate-800">Exportar</h2>
          </div>
          <p className="text-slate-600 mb-4 text-sm leading-relaxed">
            Descarga una copia de seguridad de toda tu agenda (expositores, reuniones y tareas de todas las ferias). 
            Guarda este archivo .json en un lugar seguro o envíatelo por email.
          </p>
          <button 
            onClick={onExport}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
          >
            Descargar Backup (.json)
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-4 mb-4 text-orange-600">
            <i className="fa-solid fa-upload text-2xl"></i>
            <h2 className="text-xl font-bold text-slate-800">Importar</h2>
          </div>
          <p className="text-slate-600 mb-4 text-sm leading-relaxed">
            Restaura tus datos desde un archivo .json previamente exportado. 
            <span className="font-bold text-red-500"> ¡Atención! Esto borrará los datos actuales de este dispositivo.</span>
          </p>
          <label className="w-full bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors border-2 border-dashed border-slate-300 cursor-pointer block text-center">
            <span>Seleccionar archivo de backup</span>
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={onImport} 
            />
          </label>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-sm italic">
          <i className="fa-solid fa-circle-info mr-2"></i>
          FairAgenda no utiliza servidores. Si limpias el historial/caché de tu navegador "a fondo", podrías perder los datos si no has hecho backup.
        </div>
      </div>
    </div>
  );
};

export default BackupManager;
