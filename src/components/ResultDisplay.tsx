import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ResultDisplayProps {
  results: any[] | null;
  loading: boolean;
}

export default function ResultDisplay({ results, loading }: ResultDisplayProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
        <div className="text-gray-500">No results to display</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Results</h2>
      </div>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-md"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{result.label}</span>
              <span className="text-sm text-gray-500">
                {(result.confidence * 100).toFixed(2)}% confidence
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}