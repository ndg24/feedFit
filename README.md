# 📸 FeedFit

A web app that helps users determine which photo better fits their feed's aesthetic. Upload your Instagram feed screenshot and two candidate photos, and let FeedFit analyze which one matches your visual style better.

![FeedFit Demo](https://img.shields.io/badge/Status-Demo%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38B2AC)

## ✨ Features

- **🎨 Aesthetic Analysis**: Compare photos against your Instagram feed aesthetic
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🖼️ Drag & Drop Upload**: Easy image upload with drag and drop support
- **⚡ Real-time Processing**: Visual feedback during analysis
- **🎯 Smart Scoring**: Get percentage-based aesthetic fit scores
- **💫 Modern UI**: Soft, Instagram-inspired design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** + Custom Design System
- **shadcn/ui** (Radix UI primitives)
- **React Router DOM** - Routing
- **TanStack Query** - State management
- **React Hook Form** + Zod - Forms
- **Lucide React** - Icons

### Backend
- **FastAPI** - Python web framework
- **Pillow** - Image processing
- **ColorThief** - Color palette extraction
- **scikit-learn** - Machine learning for similarity analysis
- **NumPy** - Numerical computing
- **Uvicorn** - ASGI server

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
# Windows
start_dev.bat

# macOS/Linux
python start_dev.py
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```

#### Frontend Setup
```bash
npm install
npm run dev
```

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/feedfit-photo-match.git
   cd feedfit-photo-match
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`