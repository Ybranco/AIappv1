import React, { useState } from 'react';
import { Upload, Settings } from 'lucide-react';
import DatasetUpload from '../components/DatasetUpload';
import ModelConfig from '../components/ModelConfig';
import TrainingPanel from '../components/TrainingPanel';

export default function TrainingPage() {
  const [datasets, setDatasets] = useState({
    train: null,
    valid: null,
    test: null
  });
  const [modelConfig, setModelConfig] = useState({
    architecture: 'yolov8',
    epochs: 100,
    batchSize: 16,
    learningRate: 0.001,
    optimizer: 'adam'
  });
  const [trainingStatus, setTrainingStatus] = useState(null);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Dataset Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Upload className="h-5 w-5 text-gray-500" />
          Dataset Upload
        </h2>
        <DatasetUpload datasets={datasets} onDatasetsChange={setDatasets} />
      </div>

      {/* Model Configuration Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5 text-gray-500" />
          Model Configuration
        </h2>
        <ModelConfig config={modelConfig} onConfigChange={setModelConfig} />
      </div>

      {/* Training Panel */}
      <TrainingPanel status={trainingStatus} onStatusChange={setTrainingStatus} />
    </main>
  );
}