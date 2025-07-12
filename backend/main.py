from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import numpy as np
from colorthief import ColorThief
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction import image as skimage
import logging
from typing import List, Tuple
import uvicorn
import os
from security_config import (
    get_cors_origins, MAX_FILE_SIZE, ALLOWED_IMAGE_EXTENSIONS, 
    ALLOWED_IMAGE_TYPES, LOG_LEVEL, SECURITY_HEADERS
)

# Configure logging
logging.basicConfig(level=getattr(logging, LOG_LEVEL))
logger = logging.getLogger(__name__)

app = FastAPI(
    title="FeedFit Backend",
    description="Instagram aesthetic analysis API",
    version="1.0.0"
)

# Add CORS middleware with environment-based origins
ALLOWED_ORIGINS = get_cors_origins()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # Only allow necessary methods
    allow_headers=["Content-Type"],  # Only allow necessary headers
)

def validate_image(file: UploadFile) -> bool:
    """Validate that the uploaded file is an image."""
    # Check content type
    if not file.content_type or file.content_type not in ALLOWED_IMAGE_TYPES:
        return False
    
    # Check file size
    if file.size and file.size > MAX_FILE_SIZE:
        return False
    
    # Check file extension
    file_extension = os.path.splitext(file.filename or '')[1].lower()
    if file_extension not in ALLOWED_IMAGE_EXTENSIONS:
        return False
    
    return True

def extract_color_palette(image_bytes: bytes, num_colors: int = 8) -> List[Tuple[int, int, int]]:
    """Extract dominant color palette from image bytes."""
    try:
        # Create a file-like object from bytes
        image_io = io.BytesIO(image_bytes)
        
        # Use ColorThief to extract dominant colors
        color_thief = ColorThief(image_io)
        palette = color_thief.get_palette(color_count=num_colors, quality=1)
        
        return palette
    except Exception as e:
        logger.error(f"Error extracting color palette: {e}")
        raise HTTPException(status_code=500, detail="Failed to extract color palette from image")

def create_color_histogram(palette: List[Tuple[int, int, int]], bins: int = 32) -> np.ndarray:
    """Create a color histogram from a palette."""
    # Convert RGB values to a single array
    colors = np.array(palette)
    
    # Create 3D histogram (R, G, B channels)
    hist_r = np.histogram(colors[:, 0], bins=bins, range=(0, 255))[0]
    hist_g = np.histogram(colors[:, 1], bins=bins, range=(0, 255))[0]
    hist_b = np.histogram(colors[:, 2], bins=bins, range=(0, 255))[0]
    
    # Concatenate and normalize
    histogram = np.concatenate([hist_r, hist_g, hist_b])
    histogram = histogram / np.sum(histogram) if np.sum(histogram) > 0 else histogram
    
    return histogram

def compute_similarity_score(hist1: np.ndarray, hist2: np.ndarray) -> float:
    """Compute cosine similarity between two color histograms."""
    # Reshape histograms for sklearn
    hist1_reshaped = hist1.reshape(1, -1)
    hist2_reshaped = hist2.reshape(1, -1)
    
    # Compute cosine similarity
    similarity = cosine_similarity(hist1_reshaped, hist2_reshaped)[0][0]
    
    # Convert to percentage (0-100)
    # Cosine similarity ranges from -1 to 1, we want 0 to 100
    percentage = ((similarity + 1) / 2) * 100
    
    return max(0, min(100, percentage))  # Clamp between 0 and 100

@app.get("/")
async def root():
    """Health check endpoint."""
    return {"message": "FeedFit Backend API is running!", "status": "healthy"}

@app.post("/compare")
async def compare_images(
    feed_image: UploadFile = File(..., description="Instagram feed screenshot"),
    image_a: UploadFile = File(..., description="First candidate image"),
    image_b: UploadFile = File(..., description="Second candidate image")
):
    """
    Compare two candidate images against an Instagram feed screenshot.
    
    Returns similarity scores as percentages indicating how well each candidate
    image matches the aesthetic of the feed screenshot.
    """
    try:
        # Validate all uploaded files are images
        if not all(validate_image(f) for f in [feed_image, image_a, image_b]):
            raise HTTPException(
                status_code=400, 
                detail="All files must be valid images (PNG, JPEG, etc.)"
            )
        
        # Read image bytes with size limits
        feed_bytes = await feed_image.read()
        if len(feed_bytes) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail=f"Feed image too large (max {MAX_FILE_SIZE // (1024*1024)}MB)")
            
        image_a_bytes = await image_a.read()
        if len(image_a_bytes) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail=f"Image A too large (max {MAX_FILE_SIZE // (1024*1024)}MB)")
            
        image_b_bytes = await image_b.read()
        if len(image_b_bytes) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail=f"Image B too large (max {MAX_FILE_SIZE // (1024*1024)}MB)")
        
        # Extract color palettes
        logger.info("Extracting color palettes...")
        feed_palette = extract_color_palette(feed_bytes)
        image_a_palette = extract_color_palette(image_a_bytes)
        image_b_palette = extract_color_palette(image_b_bytes)
        
        # Create color histograms
        logger.info("Creating color histograms...")
        feed_histogram = create_color_histogram(feed_palette)
        image_a_histogram = create_color_histogram(image_a_palette)
        image_b_histogram = create_color_histogram(image_b_palette)
        
        # Compute similarity scores
        logger.info("Computing similarity scores...")
        image_a_score = compute_similarity_score(feed_histogram, image_a_histogram)
        image_b_score = compute_similarity_score(feed_histogram, image_b_histogram)
        
        # Round scores to 2 decimal places
        image_a_score = round(image_a_score, 2)
        image_b_score = round(image_b_score, 2)
        
        logger.info(f"Analysis complete - Image A: {image_a_score}%, Image B: {image_b_score}%")
        
        return JSONResponse({
            "image_a_score": image_a_score,
            "image_b_score": image_b_score,
            "message": "Analysis completed successfully"
        })
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error during image comparison: {e}")
        raise HTTPException(
            status_code=500, 
            detail="An error occurred while processing the images"
        )

@app.get("/health")
async def health_check():
    """Detailed health check endpoint."""
    return {
        "status": "healthy",
        "service": "FeedFit Backend",
        "version": "1.0.0",
        "endpoints": {
            "compare": "/compare",
            "health": "/health",
            "docs": "/docs"
        }
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 