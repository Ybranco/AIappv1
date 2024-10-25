import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface DatasetInfo {
  fileCount: number;
  totalSize: number;
}

export default function DatasetUpload() {
  const [datasets, setDatasets] = useState<{
    train: DatasetInfo | null;
    valid: DatasetInfo | null;
    test: DatasetInfo | null;
  }>({
    train: null,
    valid: null,
    test: null
  });

  const handleDrop = async (e: React.DragEvent, type: 'train' | 'valid' | 'test') => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    console.log(`Uploading ${files.length} files to ${type} dataset`);
    // Mock update for now
    setDatasets(prev => ({
      ...prev,
      [type]: {
        fileCount: files.length,
        totalSize: files.reduce((sum, file) => sum + file.size, 0)
      }
    }));
  };

  const renderDropZone = (type: 'train' | 'valid' | 'test', label: string) => (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, type)}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-semibold text-gray-700">{label}</h3>
      <p className="mt-1 text-sm text-gray-500">
        Drag and drop images here
      </p>
      {datasets[type] && (
        <div className="mt-2 text-sm text-gray-600">
          {datasets[type]?.fileCount} files
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {renderDropZone('train', 'Training Dataset')}
      {renderDropZone('valid', 'Validation Dataset')}
      {renderDropZone('test', 'Test Dataset')}
    </div>
  );
}