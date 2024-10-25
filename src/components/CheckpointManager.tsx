import React from 'react';
import { Save, RotateCcw, Trash2 } from 'lucide-react';
import { saveCheckpoint, loadCheckpoint, clearCheckpoint, type Checkpoint } from '../services/checkpoint';

interface CheckpointManagerProps {
  onLoad: (checkpoint: Checkpoint) => void;
  getCurrentState: () => Checkpoint;
}

export default function CheckpointManager({ onLoad, getCurrentState }: CheckpointManagerProps) {
  const handleSave = () => {
    const currentState = getCurrentState();
    saveCheckpoint(currentState);
  };

  const handleLoad = () => {
    const checkpoint = loadCheckpoint();
    if (checkpoint) {
      onLoad(checkpoint);
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the saved checkpoint?')) {
      clearCheckpoint();
    }
  };

  const savedCheckpoint = loadCheckpoint();

  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        <Save className="h-4 w-4" />
        Save Progress
      </button>

      {savedCheckpoint && (
        <>
          <button
            onClick={handleLoad}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Restore
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        </>
      )}
    </div>
  );
}