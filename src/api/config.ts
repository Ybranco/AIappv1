export const API_BASE_URL = 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  HEALTH: '/health',
  DATASET: '/dataset',
  TRAIN: '/train',
  INFERENCE: '/inference',
  PREDICT: '/predict'
} as const;