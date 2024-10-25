import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface DatasetStatsProps {
  fileCount: number;
  totalSize: number;
}

export function DatasetStats({ fileCount, totalSize }: DatasetStatsProps) {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <ImageIcon className="w-4 h-4" />
        <span>{fileCount} images</span>
      </div>
      <div className="text-sm text-gray-600">
        Total size: {(totalSize / (1024 * 1024)).toFixed(2)} MB
      </div>
    </div>
  );
}