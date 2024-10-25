import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Dataset info endpoint
app.get('/api/dataset/info', (req, res) => {
  res.json({
    train: { fileCount: 0, totalSize: 0 },
    valid: { fileCount: 0, totalSize: 0 },
    test: { fileCount: 0, totalSize: 0 }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});