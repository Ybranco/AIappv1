import React, { useState } from 'react';
import { Play, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { startTraining, getTrainingStatus, type TrainingStatus } from '../services/api';

export default function TrainingPanel() {
  const [training, setTraining] = useState(false);
  const [status, setStatus] = useState<TrainingStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartTraining = async () => {
    try {
      setTraining(true);
      setError(null);
      
      const { jobId } = await startTraining({
        modelType: 'yolov8',
        epochs: 100,
        batchSize: 16
      });

      // Poll for status
      const interval = setInterval(async () => {
        const status = await getTrainingStatus(jobId);
        setStatus(status);

        if (status.status === 'completed' || status.status === 'failed') {
          clearInterval(interval);
          setTraining(false);
        }
      }, 5000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start training');
      setTraining(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Model Training</h2>
        <button
          onClick={handleStartTraining}
          disabled={training}
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            training 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {training ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {training ? 'Training...' : 'Start Training'}
        </button>
      </div>

      {status && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {status.status === 'completed' && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {status.status === 'training' && (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            )}
            <span className="capitalize">{status.status}</span>
          </div>
          
          {status.progress !== undefined && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${status.progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Cloud Training Required</h3>
        <p className="text-sm text-blue-600">
          Model training requires significant GPU resources and will be processed on cloud infrastructure. 
          Training time may vary based on dataset size and complexity.
        </p>
      </div>
    </div>
  );
}