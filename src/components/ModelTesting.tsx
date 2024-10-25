import React, { useState } from 'react';
import { Upload, BarChart2, Loader2, AlertCircle, Settings } from 'lucide-react';
import { processImage } from '../services/api';

interface TestResult {
  label: string;
  confidence: number;
  bbox?: [number, number, number, number];
}

export default function ModelTesting() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleTest = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const predictions = await processImage(selectedFile, {
        task: 'detection',
        confidence: confidenceThreshold
      });
      setResults(predictions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-blue-500" />
          Model Testing
        </h2>

        {/* Confidence Threshold Control */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Confidence Threshold: {(confidenceThreshold * 100).toFixed(0)}%
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="mt-1 text-xs text-gray-500">
            Adjust this threshold to filter predictions based on confidence level
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] relative
            ${previewUrl ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}
            transition-colors duration-200`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          {previewUrl ? (
            <div className="relative w-full h-full min-h-[300px]">
              <img
                src={previewUrl}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <button
                onClick={() => {
                  setPreviewUrl(null);
                  setSelectedFile(null);
                  setResults([]);
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <label className="cursor-pointer">
                <span className="mt-2 text-sm font-semibold text-gray-700">Drop image here or click to upload</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
              </label>
            </>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Results</h3>
            <button
              onClick={handleTest}
              disabled={!selectedFile || loading}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                !selectedFile || loading
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <BarChart2 className="h-4 w-4" />
              )}
              {loading ? 'Processing...' : 'Test Model'}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{result.label}</span>
                    <span className="text-sm text-gray-500">
                      {(result.confidence * 100).toFixed(1)}% confidence
                    </span>
                  </div>
                  {result.bbox && (
                    <div className="mt-2 text-sm text-gray-500">
                      Bounding Box: [{result.bbox.map(n => n.toFixed(2)).join(', ')}]
                    </div>
                  )}
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && results.length === 0 && selectedFile && (
            <div className="text-center py-8 text-gray-500">
              Click "Test Model" to analyze the image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}