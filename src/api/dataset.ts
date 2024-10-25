import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export interface DatasetStats {
  fileCount: number;
  totalSize: number;
}

export async function fetchDatasetInfo() {
  try {
    const response = await axios.get(`${API_URL}/dataset/info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dataset info:', error);
    throw error;
  }
}

export async function uploadDataset(type: 'train' | 'valid' | 'test', files: File[]) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await axios.post(
    `${API_URL}/dataset/${type}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  
  return response.data;
}