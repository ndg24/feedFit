#!/usr/bin/env python3
"""
Development startup script for FeedFit
Starts both the frontend (Vite) and backend (FastAPI) servers.
"""

import subprocess
import sys
import time
import os
import signal
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are installed."""
    print("🔍 Checking dependencies...")
    
    # Check if Node.js is installed
    try:
        subprocess.run(["node", "--version"], check=True, capture_output=True)
        print("✅ Node.js found")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Node.js not found. Please install Node.js first.")
        return False
    
    # Check if Python is installed
    try:
        subprocess.run([sys.executable, "--version"], check=True, capture_output=True)
        print("✅ Python found")
    except subprocess.CalledProcessError:
        print("❌ Python not found.")
        return False
    
    return True

def install_backend_dependencies():
    """Install backend Python dependencies."""
    print("📦 Installing backend dependencies...")
    backend_dir = Path("backend")
    
    if not backend_dir.exists():
        print("❌ Backend directory not found. Make sure you're in the project root.")
        return False
    
    try:
        # Check if requirements.txt exists
        requirements_file = backend_dir / "requirements.txt"
        if not requirements_file.exists():
            print("❌ requirements.txt not found in backend directory.")
            return False
        
        # Install dependencies
        subprocess.run([
            sys.executable, "-m", "pip", "install", "-r", str(requirements_file)
        ], check=True)
        print("✅ Backend dependencies installed")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install backend dependencies: {e}")
        return False

def start_servers():
    """Start both frontend and backend servers."""
    print("🚀 Starting development servers...")
    
    processes = []
    
    try:
        # Start backend server
        print("🔧 Starting backend server (FastAPI)...")
        backend_process = subprocess.Popen([
            sys.executable, "backend/main.py"
        ], cwd=".")
        processes.append(("Backend", backend_process))
        
        # Wait a moment for backend to start
        time.sleep(3)
        
        # Start frontend server
        print("🎨 Starting frontend server (Vite)...")
        frontend_process = subprocess.Popen([
            "npm", "run", "dev"
        ], cwd=".")
        processes.append(("Frontend", frontend_process))
        
        print("\n" + "="*50)
        print("🎉 Development servers started!")
        print("="*50)
        print("📱 Frontend: http://localhost:8080")
        print("🔧 Backend:  http://localhost:8000")
        print("📚 API Docs: http://localhost:8000/docs")
        print("="*50)
        print("Press Ctrl+C to stop all servers")
        print("="*50 + "\n")
        
        # Wait for user to stop
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n🛑 Stopping servers...")
            
    except Exception as e:
        print(f"❌ Error starting servers: {e}")
        
    finally:
        # Clean up processes
        for name, process in processes:
            try:
                print(f"🛑 Stopping {name} server...")
                process.terminate()
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                print(f"⚠️  Force killing {name} server...")
                process.kill()
            except Exception as e:
                print(f"⚠️  Error stopping {name} server: {e}")

def main():
    """Main function."""
    print("🎨 FeedFit Development Startup")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not Path("package.json").exists():
        print("❌ package.json not found. Make sure you're in the FeedFit project root.")
        return
    
    # Check dependencies
    if not check_dependencies():
        return
    
    # Install backend dependencies
    if not install_backend_dependencies():
        return
    
    # Start servers
    start_servers()

if __name__ == "__main__":
    main() 