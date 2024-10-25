from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Create upload directories if they don't exist
UPLOAD_FOLDERS = {
    'train': 'datasets/train',
    'valid': 'datasets/valid',
    'test': 'datasets/test'
}

for folder in UPLOAD_FOLDERS.values():
    os.makedirs(folder, exist_ok=True)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

@app.route('/api/dataset/info', methods=['GET'])
def get_dataset_info():
    try:
        info = {}
        for dataset_type, folder in UPLOAD_FOLDERS.items():
            files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
            total_size = sum(os.path.getsize(os.path.join(folder, f)) for f in files)
            info[dataset_type] = {
                'fileCount': len(files),
                'totalSize': total_size
            } if files else None
        return jsonify(info)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dataset/<dataset_type>', methods=['POST'])
def upload_dataset(dataset_type):
    if dataset_type not in UPLOAD_FOLDERS:
        return jsonify({'error': 'Invalid dataset type'}), 400

    if 'files' not in request.files:
        return jsonify({'error': 'No files provided'}), 400

    files = request.files.getlist('files')
    upload_folder = UPLOAD_FOLDERS[dataset_type]
    
    saved_files = []
    for file in files:
        if file.filename and file.content_type.startswith('image/'):
            filename = os.path.basename(file.filename)
            file_path = os.path.join(upload_folder, filename)
            file.save(file_path)
            saved_files.append(filename)

    return jsonify({
        'success': True,
        'message': f'Successfully uploaded {len(saved_files)} files',
        'files': saved_files
    })

if __name__ == '__main__':
    # Explicitly bind to all interfaces
    app.run(host='0.0.0.0', port=3001, debug=True)