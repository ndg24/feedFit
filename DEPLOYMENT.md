# 🚀 FeedFit Deployment Guide

This guide will help you deploy FeedFit to the web using various platforms.

## 📋 Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Node.js**: For frontend deployment
3. **Python**: For backend deployment

## 🎯 Quick Deploy (Recommended)

### **Option 1: Vercel + Railway (Easiest)**

#### **Frontend (Vercel)**
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `dist`

#### **Backend (Railway)**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set source directory to `backend`
6. Add environment variables if needed

### **Option 2: Netlify + Railway**

#### **Frontend (Netlify)**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`

#### **Backend (Railway)**
Same as above

## 🔧 Environment Variables

### **Frontend (.env.production)**
```env
VITE_API_URL=https://your-backend-url.com
```

### **Backend Environment Variables**
- `PORT`: Port number (usually set automatically)
- `CORS_ORIGINS`: Your frontend URL

## 📦 Build Commands

### **Frontend**
```bash
npm run build
```

### **Backend**
```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## 🌐 Platform-Specific Instructions

### **Vercel (Frontend)**
- ✅ Automatic deployments from Git
- ✅ Built-in CDN
- ✅ Custom domains
- ✅ Environment variables support

### **Railway (Backend)**
- ✅ Automatic deployments
- ✅ Environment variables
- ✅ Custom domains
- ✅ SSL certificates

### **Netlify (Frontend)**
- ✅ Drag & drop deployment
- ✅ Git integration
- ✅ Form handling
- ✅ Custom domains

### **Render (Backend)**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### **Heroku (Backend)**
1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Deploy: `git push heroku main`
4. Set environment variables in Heroku dashboard

## 🔒 Security Considerations

### **CORS Configuration**
Update the CORS origins in `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-domain.com",
        "http://localhost:8080"  # Keep for development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### **Environment Variables**
- Never commit API keys to Git
- Use platform-specific environment variable systems
- Set different values for development and production

## 📊 Monitoring & Analytics

### **Frontend Analytics**
- Google Analytics
- Vercel Analytics
- Netlify Analytics

### **Backend Monitoring**
- Railway logs
- Render logs
- Heroku logs

## 🚀 Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Image upload works
- [ ] CORS is configured properly
- [ ] Environment variables are set
- [ ] Custom domain is configured (optional)
- [ ] SSL certificate is active
- [ ] Error monitoring is set up

## 🔧 Troubleshooting

### **Common Issues**

1. **CORS Errors**
   - Check CORS configuration in backend
   - Verify frontend URL is in allowed origins

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **API Connection Issues**
   - Verify backend URL in environment variables
   - Check if backend is running and accessible

4. **Image Upload Failures**
   - Check file size limits
   - Verify backend can handle multipart form data

### **Debug Commands**

```bash
# Test backend locally
cd backend
python main.py

# Test frontend build
npm run build

# Check environment variables
echo $VITE_API_URL
```

## 📞 Support

If you encounter issues:
1. Check platform-specific documentation
2. Review error logs
3. Test locally first
4. Contact platform support if needed

---

**Happy Deploying! 🎉** 