import axios from 'axios';

const API_URL = '/api';

export interface PredictionResult {
  label: string;
  confidence: number;
  bbox?: [number, number, number, number];
}

export interface TrainingStatus {
  status: 'idle' | 'training' | 'completed' | 'error';
  progress?: number;
  error?: string;
  metrics?: {
    accuracy: number;
    loss: number;
    epoch: number;
  };
}

export async function processImage(
  file: File,
  config: { task: 'detection' | 'classification'; confidence: number }
): Promise<PredictionResult[]> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('task', config.task);
  formData.append('confidence', config.confidence.toString());

  try {
    const response = await axios.post(`${API_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.predictions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to process image');
    }
    throw error;
  }
}

export async function getTrainingStatus(): Promise<TrainingStatus> {
  try {
    const response = await axios.get(`${API_URL}/train/status`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch training status');
    }
    throw error;
  }
}

export async function startTraining(config: {
  epochs: number;
  batchSize: number;
  learningRate: number;
}): Promise<void> {
  try {
    await axios.post(`${API_URL}/train/start`, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to start training');
    }
    throw error;
  }
}