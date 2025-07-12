# 📸 FeedFit Photo Match

A beautiful web application that helps Instagram users determine which photo better fits their feed's aesthetic. Upload your Instagram feed screenshot and two candidate photos, and let FeedFit analyze which one matches your visual style better.

## ✨ Features

- **🎨 Aesthetic Analysis**: Compare photos against your Instagram feed aesthetic
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🖼️ Drag & Drop Upload**: Easy image upload with drag and drop support
- **⚡ Real-time Processing**: Visual feedback during analysis
- **🎯 Smart Scoring**: Get percentage-based aesthetic fit scores
- **💫 Modern UI**: Soft, Instagram-inspired design with smooth animations

## 🚀 Live Demo

[Try FeedFit Now](https://your-deployment-url.com)

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

## 🎯 How It Works

### 1. Upload Your Feed
Take a screenshot of your Instagram profile grid and upload it to establish your aesthetic baseline.

### 2. Compare Photos
Upload two photos you're considering posting to see which one fits better.

### 3. Get Your Results
Receive detailed analysis with aesthetic fit scores and recommendations.

## 🎨 Design System

FeedFit features a custom "soft aesthetic" design system inspired by Instagram's visual language:

- **Color Palette**: Soft pinks, warm beiges, and gentle blues
- **Typography**: Clean, modern fonts with excellent readability
- **Animations**: Smooth transitions and micro-interactions
- **Components**: Rounded corners, soft shadows, and gradient effects

## 📁 Project Structure

```
feedFit/
├── src/                    # Frontend React application
│   ├── components/ui/      # shadcn/ui components
│   ├── pages/              # Main application pages
│   │   ├── Landing.tsx     # Homepage with hero section
│   │   ├── Upload.tsx      # Image upload interface
│   │   ├── Results.tsx     # Analysis results display
│   │   └── NotFound.tsx    # 404 page
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── assets/             # Static assets
│   └── App.tsx             # Main app component
├── backend/                # Python FastAPI backend
│   ├── main.py             # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── test_api.py         # API testing script
│   └── README.md           # Backend documentation
├── start_dev.py            # Development startup script
├── start_dev.bat           # Windows startup script
└── README.md               # This file
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_endpoint_here
VITE_APP_NAME=FeedFit
```

### Customization

The design system can be customized by modifying:
- `src/index.css` - CSS variables and custom styles
- `tailwind.config.ts` - Tailwind configuration
- `src/components/ui/` - Individual component styles

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the amazing icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation
- Reach out via email

---

Made with ❤️ for Instagram creators who care about their aesthetic
