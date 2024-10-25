import React, { useCallback } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import type { DatasetStats } from '../api/dataset';

interface DropzoneProps {
  type: 'train' | 'valid' | 'test';
  label: string;
  description: string;
  onFolderSelect: (files: FileList) => void;
  stats: DatasetStats | null;
  isUploading: boolean;
  error: string | null;
}

export function Dropzone({
  type,
  label,
  description,
  onFolderSelect,
  stats,
  isUploading,
  error
}: DropzoneProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFolderSelect(files);
    }
  }, [onFolderSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFolderSelect(files);
    }
  }, [onFolderSelect]);

  return (
    <div className="relative">
      <div
        className={`
          min-h-[200px] flex flex-col justify-center
          border-2 border-dashed rounded-lg p-6 text-center
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'}
          ${isUploading ? 'opacity-50' : 'hover:border-blue-400 hover:bg-blue-50'}
          transition-all duration-200
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          id={`dropzone-${type}`}
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*"
        />
        
        <label
          htmlFor={`dropzone-${type}`}
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <div className="text-sm font-semibold text-gray-700 mb-1">{label}</div>
          <div className="text-xs text-gray-500 mb-4">{description}</div>
          
          {stats && (
            <div className="text-sm text-blue-600 font-medium mb-2">
              {stats.fileCount} images uploaded
            </div>
          )}
          
          {isUploading && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Uploading...</span>
            </div>
          )}
          
          {error && (
            <div className="text-sm text-red-600 mt-2">
              {error}
            </div>
          )}
          
          {!isUploading && !error && (
            <div className="text-sm text-gray-500">
              Drop files here or click to browse
            </div>
          )}
        </label>
      </div>
    </div>
  );
}