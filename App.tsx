
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PRELOADED_FAIRS, STORAGE_KEY } from './constants';
import { Fair, AppState, Exhibitor, Meeting, Task, FairData } from './types';
import Dashboard from './components/Dashboard';
import FairSelector from './components/FairSelector';
import BackupManager from './components/BackupManager';

const App: React.FC = () => {
  const [selectedFairId, setSelectedFairId] = useState<string | null>(null);
  const [appData, setAppData] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });
  const [showBackup, setShowBackup] = useState(false);

  // Persist data on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  }, [appData]);

  const selectedFair = useMemo(() => 
    PRELOADED_FAIRS.find(f => f.id === selectedFairId), 
    [selectedFairId]
  );

  const getFairData = useCallback((fairId: string): FairData => {
    return appData[fairId] || { exhibitors: [], meetings: [], tasks: [] };
  }, [appData]);

  const updateFairData = useCallback((fairId: string, newData: Partial<FairData>) => {
    setAppData(prev => ({
      ...prev,
      [fairId]: {
        ...getFairData(fairId),
        ...newData
      }
    }));
  }, [getFairData]);

  const handleExport = () => {
    const dataStr = JSON.stringify(appData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `FairAgenda_Backup_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (confirm("¿Estás seguro de importar estos datos? Sobrescribirán tu agenda actual.")) {
          setAppData(json);
        }
      } catch (err) {
        alert("Error al importar el archivo. Formato no válido.");
      }
    };
    reader.readAsText(file);
  };

  if (showBackup) {
    return (
      <BackupManager 
        onBack={() => setShowBackup(false)} 
        onExport={handleExport} 
        onImport={handleImport} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {selectedFairId && selectedFair ? (
        <Dashboard 
          fair={selectedFair} 
          data={getFairData(selectedFairId)}
          onUpdate={(newData) => updateFairData(selectedFairId, newData)}
          onExit={() => setSelectedFairId(null)}
          onShowBackup={() => setShowBackup(true)}
        />
      ) : (
        <FairSelector 
          fairs={PRELOADED_FAIRS} 
          onSelect={setSelectedFairId} 
          onShowBackup={() => setShowBackup(true)}
        />
      )}
    </div>
  );
};

export default App;
