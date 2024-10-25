import React, { useState } from 'react';
import { Settings, Wand2, HelpCircle } from 'lucide-react';

interface ModelParams {
  architecture: 'yolov8' | 'fasterrcnn';
  epochs: number;
  batchSize: number;
  learningRate: number;
  optimizer: 'adam' | 'sgd';
}

const defaultParams: ModelParams = {
  architecture: 'yolov8',
  epochs: 100,
  batchSize: 16,
  learningRate: 0.001,
  optimizer: 'adam'
};

const autoParams: ModelParams = {
  architecture: 'yolov8',
  epochs: 300,
  batchSize: 32,
  learningRate: 0.001,
  optimizer: 'adam'
};

export default function ModelConfig() {
  const [params, setParams] = useState<ModelParams>(defaultParams);

  const handleAutoConfig = () => {
    setParams(autoParams);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Configuration Mode</h3>
        <button
          onClick={handleAutoConfig}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
        >
          <Wand2 className="h-4 w-4" />
          Auto Configure
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Model Architecture
            </label>
            <div className="group relative">
              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="hidden group-hover:block absolute left-full ml-2 p-2 bg-gray-800 text-white text-xs rounded w-64 z-10">
                YOLOv8 is optimized for real-time detection with excellent accuracy-speed trade-off. 
                Faster R-CNN provides higher accuracy but slower inference.
              </div>
            </div>
          </div>
          <select
            value={params.architecture}
            onChange={(e) => setParams({ ...params, architecture: e.target.value as 'yolov8' | 'fasterrcnn' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="yolov8">YOLOv8 (Recommended)</option>
            <option value="fasterrcnn">Faster R-CNN</option>
          </select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Training Epochs
            </label>
            <div className="group relative">
              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="hidden group-hover:block absolute left-full ml-2 p-2 bg-gray-800 text-white text-xs rounded w-64 z-10">
                More epochs allow better learning but increase training time. 
                300 epochs is recommended for most datasets.
              </div>
            </div>
          </div>
          <input
            type="number"
            value={params.epochs}
            onChange={(e) => setParams({ ...params, epochs: parseInt(e.target.value) })}
            min={1}
            max={1000}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Batch Size
            </label>
            <div className="group relative">
              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="hidden group-hover:block absolute left-full ml-2 p-2 bg-gray-800 text-white text-xs rounded w-64 z-10">
                Larger batch sizes can speed up training but require more memory. 
                32 is optimal for most GPUs.
              </div>
            </div>
          </div>
          <input
            type="number"
            value={params.batchSize}
            onChange={(e) => setParams({ ...params, batchSize: parseInt(e.target.value) })}
            min={1}
            max={128}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Learning Rate
            </label>
            <div className="group relative">
              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="hidden group-hover:block absolute left-full ml-2 p-2 bg-gray-800 text-white text-xs rounded w-64 z-10">
                Controls how quickly the model learns. 0.001 is a good default. 
                Too high can cause unstable training, too low can make training slow.
              </div>
            </div>
          </div>
          <input
            type="number"
            value={params.learningRate}
            onChange={(e) => setParams({ ...params, learningRate: parseFloat(e.target.value) })}
            min={0.0001}
            max={0.1}
            step={0.0001}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Optimizer
            </label>
            <div className="group relative">
              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
              <div className="hidden group-hover:block absolute left-full ml-2 p-2 bg-gray-800 text-white text-xs rounded w-64 z-10">
                Adam is recommended for most cases, combining the benefits of RMSprop and momentum. 
                SGD can sometimes achieve better final accuracy but requires more tuning.
              </div>
            </div>
          </div>
          <select
            value={params.optimizer}
            onChange={(e) => setParams({ ...params, optimizer: e.target.value as 'adam' | 'sgd' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="adam">Adam (Recommended)</option>
            <option value="sgd">SGD</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Auto Configuration Details</h4>
        <p className="text-sm text-blue-600">
          The auto-configure option sets optimal hyperparameters based on extensive research:
          • YOLOv8 architecture for best speed/accuracy trade-off
          • 300 epochs for thorough training
          • Batch size 32 for optimal GPU utilization
          • Learning rate 0.001 with Adam optimizer for stable convergence
        </p>
      </div>
    </div>
  );
}