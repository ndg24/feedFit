#!/usr/bin/env python3
"""
Test script for FeedFit Backend API
This script tests the /compare endpoint with sample images.
"""

import requests
import json
import os
from PIL import Image
import numpy as np

def create_test_image(filename, colors, size=(300, 300)):
    """Create a test image with specified colors."""
    img = Image.new('RGB', size, color=colors[0])
    
    # Create a simple pattern with the colors
    pixels = img.load()
    for i in range(size[0]):
        for j in range(size[1]):
            color_idx = (i + j) % len(colors)
            pixels[i, j] = colors[color_idx]
    
    img.save(filename)
    return filename

def test_api():
    """Test the FeedFit API endpoints."""
    base_url = "http://localhost:8000"
    
    # Test health endpoint
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/")
        print(f"Health check: {response.status_code} - {response.json()}")
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure it's running on localhost:8000")
        return
    
    # Create test images
    print("\nCreating test images...")
    
    # Feed image - warm colors
    feed_colors = [(255, 200, 150), (255, 180, 120), (255, 160, 100)]
    create_test_image("test_feed.jpg", feed_colors)
    
    # Image A - similar warm colors
    image_a_colors = [(255, 190, 140), (255, 170, 110), (255, 150, 90)]
    create_test_image("test_image_a.jpg", image_a_colors)
    
    # Image B - cool colors (should score lower)
    image_b_colors = [(150, 200, 255), (120, 180, 255), (100, 160, 255)]
    create_test_image("test_image_b.jpg", image_b_colors)
    
    # Test compare endpoint
    print("Testing compare endpoint...")
    try:
        with open("test_feed.jpg", "rb") as feed_file, \
             open("test_image_a.jpg", "rb") as image_a_file, \
             open("test_image_b.jpg", "rb") as image_b_file:
            
            files = {
                'feed_image': ('test_feed.jpg', feed_file, 'image/jpeg'),
                'image_a': ('test_image_a.jpg', image_a_file, 'image/jpeg'),
                'image_b': ('test_image_b.jpg', image_b_file, 'image/jpeg')
            }
            
            response = requests.post(f"{base_url}/compare", files=files)
            
            if response.status_code == 200:
                result = response.json()
                print("✅ API test successful!")
                print(f"Image A Score: {result['image_a_score']}%")
                print(f"Image B Score: {result['image_b_score']}%")
                print(f"Message: {result['message']}")
                
                # Verify that Image A (similar colors) scores higher than Image B (different colors)
                if result['image_a_score'] > result['image_b_score']:
                    print("✅ Color analysis working correctly - similar colors scored higher!")
                else:
                    print("⚠️  Unexpected result - similar colors didn't score higher")
                    
            else:
                print(f"❌ API test failed: {response.status_code}")
                print(f"Error: {response.text}")
                
    except Exception as e:
        print(f"❌ Error during API test: {e}")
    
    finally:
        # Clean up test files
        print("\nCleaning up test files...")
        for filename in ["test_feed.jpg", "test_image_a.jpg", "test_image_b.jpg"]:
            if os.path.exists(filename):
                os.remove(filename)
                print(f"Removed {filename}")

if __name__ == "__main__":
    print("🧪 FeedFit Backend API Test")
    print("=" * 40)
    test_api()
    print("\nTest completed!") 