import { EventEmitter } from 'events';

interface DatasetInfo {
  fileCount: number;
  totalSize: number;
}

class MockServer extends EventEmitter {
  private datasets: {
    train: { files: File[]; info: DatasetInfo };
    valid: { files: File[]; info: DatasetInfo };
    test: { files: File[]; info: DatasetInfo };
  };

  constructor() {
    super();
    this.datasets = {
      train: { files: [], info: { fileCount: 0, totalSize: 0 } },
      valid: { files: [], info: { fileCount: 0, totalSize: 0 } },
      test: { files: [], info: { fileCount: 0, totalSize: 0 } }
    };
  }

  async healthCheck() {
    return { status: 'ok' };
  }

  async getDatasetInfo() {
    return {
      train: this.datasets.train.info,
      valid: this.datasets.valid.info,
      test: this.datasets.test.info
    };
  }

  async uploadDataset(type: 'train' | 'valid' | 'test', files: File[]) {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    
    this.datasets[type] = {
      files,
      info: {
        fileCount: files.length,
        totalSize
      }
    };

    this.emit('datasetUpdated', type);
    
    return {
      success: true,
      message: `Successfully uploaded ${files.length} files`,
      files: files.map(f => f.name)
    };
  }

  async predict(image: File, config: { task: string; confidence: number }) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock predictions
    const mockPredictions = [
      { label: 'Person', confidence: 0.95 },
      { label: 'Car', confidence: 0.87 },
      { label: 'Dog', confidence: 0.76 }
    ].filter(pred => pred.confidence >= config.confidence);

    return mockPredictions;
  }
}

export const mockServer = new MockServer();