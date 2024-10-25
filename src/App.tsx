import React from 'react';
import { Brain, TestTube } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import TrainingPage from './pages/TrainingPage';
import TestingPage from './pages/TestingPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">AI Vision Lab</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/test"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <TestTube className="h-4 w-4" />
                Test Model
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<TrainingPage />} />
        <Route path="/test" element={<TestingPage />} />
      </Routes>
    </div>
  );
}

export default App;