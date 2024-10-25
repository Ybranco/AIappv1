import { TrainingStatus } from './api';

export interface Checkpoint {
  timestamp: number;
  datasets: {
    train: { fileCount: number; totalSize: number } | null;
    valid: { fileCount: number; totalSize: number } | null;
    test: { fileCount: number; totalSize: number } | null;
  };
  modelConfig: {
    architecture: 'yolov8' | 'fasterrcnn';
    epochs: number;
    batchSize: number;
    learningRate: number;
    optimizer: 'adam' | 'sgd';
  };
  trainingStatus: TrainingStatus | null;
}

export function saveCheckpoint(data: Checkpoint): void {
  try {
    localStorage.setItem('ai_vision_checkpoint', JSON.stringify({
      ...data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Failed to save checkpoint:', error);
  }
}

export function loadCheckpoint(): Checkpoint | null {
  try {
    const saved = localStorage.getItem('ai_vision_checkpoint');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load checkpoint:', error);
    return null;
  }
}

export function clearCheckpoint(): void {
  localStorage.removeItem('ai_vision_checkpoint');
}