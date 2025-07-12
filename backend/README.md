# FeedFit Backend API

A FastAPI backend server for Instagram aesthetic analysis that compares candidate images against a user's Instagram feed screenshot using color palette analysis.

## Features

- **Color Palette Extraction**: Uses ColorThief to extract dominant colors from images
- **Histogram Comparison**: Creates color histograms and computes similarity scores
- **Cosine Similarity**: Uses scikit-learn to calculate similarity between color distributions
- **CORS Support**: Configured for frontend integration
- **Error Handling**: Comprehensive error handling for invalid files and processing errors
- **Logging**: Detailed logging for debugging and monitoring

## Installation

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

### Development Mode
```bash
python main.py
```

### Production Mode
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The server will start on `http://localhost:8000`

## API Endpoints

### Health Check
- **GET** `/` - Basic health check
- **GET** `/health` - Detailed health information

### Image Comparison
- **POST** `/compare` - Compare two candidate images against a feed screenshot

## API Documentation

Once the server is running, you can access:
- **Interactive API Docs**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`

## Usage Example

### Using curl:
```bash
curl -X POST "http://localhost:8000/compare" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "feed_image=@feed_screenshot.jpg" \
  -F "image_a=@candidate_a.jpg" \
  -F "image_b=@candidate_b.jpg"
```

### Response Format:
```json
{
  "image_a_score": 85.67,
  "image_b_score": 72.34,
  "feed_palette": [[255, 128, 64], [128, 255, 128], ...],
  "image_a_palette": [[255, 128, 64], [128, 255, 128], ...],
  "image_b_palette": [[255, 128, 64], [128, 255, 128], ...],
  "message": "Analysis completed successfully"
}
```

## Technical Details

### Color Analysis Process:
1. **Palette Extraction**: Uses ColorThief to extract 8 dominant colors from each image
2. **Histogram Creation**: Creates 3D color histograms (R, G, B channels) with 32 bins each
3. **Similarity Calculation**: Computes cosine similarity between histograms
4. **Score Normalization**: Converts similarity scores to percentages (0-100%)

### Error Handling:
- Validates file types (must be images)
- Handles corrupted or invalid images
- Provides detailed error messages
- Graceful degradation for processing errors

### Performance:
- Optimized for typical image sizes (Instagram screenshots)
- Efficient color palette extraction
- Fast histogram comparison using scikit-learn

## Environment Variables

The server can be configured with these environment variables:
- `HOST` - Server host (default: 0.0.0.0)
- `PORT` - Server port (default: 8000)
- `LOG_LEVEL` - Logging level (default: info)

## CORS Configuration

The server is configured to allow requests from:
- `http://localhost:8080` (Vite dev server)
- `http://127.0.0.1:8080`

Update the CORS configuration in `main.py` if you need to add more origins.

## Development

### Project Structure:
```
backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

### Adding New Features:
1. Add new endpoints in `main.py`
2. Update requirements.txt if new dependencies are needed
3. Test with the interactive API docs
4. Update this README with new endpoint documentation

## Troubleshooting

### Common Issues:

1. **Import Errors**: Make sure all dependencies are installed
   ```bash
   pip install -r requirements.txt
   ```

2. **CORS Errors**: Check that the frontend URL is in the allowed origins list

3. **Image Processing Errors**: Ensure uploaded files are valid images (PNG, JPEG, etc.)

4. **Port Already in Use**: Change the port in the uvicorn command or kill the existing process

### Logs:
The server provides detailed logging. Check the console output for error messages and processing information. 