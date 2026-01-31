# HealFusion - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on localhost:5000 (or configured endpoint)

---

## 📦 Installation

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🔧 Configuration

### Create Environment File (Optional)
Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000
```

---

## 📱 Pages & Features Overview

### Public Pages (No Login Required)
1. **Home** (`/`) - Project overview and features
2. **Login** (`/login`) - User authentication
3. **Register** (`/register`) - Create new account
4. **Articles** (`/articles`) - Health articles and awareness
5. **Contact** (`/contact`) - Contact & support form

### Protected Pages (Login Required)
1. **Symptoms** (`/symptoms`) - AI diagnosis with voice input
2. **Consultations/Doctors** (`/doctors`) - Find and book doctors
3. **Medical History** (`/medical-history`) - Track health records
4. **Dashboard/Panel** (`/panel`) - Role-based dashboards
   - **User Dashboard** - Profile, consultations, history
   - **Doctor Dashboard** - Profile, appointments
   - **Admin Dashboard** - Analytics, management

---

## 🎯 Key Features

### Symptom Analysis
- Text-based symptom input
- Voice input using Web Speech API
- Multilingual support (English, Hindi, Gujarati)
- AI-powered disease prediction
- Severity levels and confidence scores
- Home remedies and preventive measures

### Doctor Consultations
- Browse available doctors
- Filter by specialty
- Search by name/specialty
- View doctor profiles
- Book appointments

### Medical Management
- Add medical history entries
- Track past conditions and medicines
- View consultation history
- Manage personal profile

### Admin Features
- User management
- Doctor management
- Disease database management
- Platform statistics

---

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: #667eea (Blue)
- **Secondary**: #764ba2 (Purple)
- **Background**: White/Light Gray
- **Text**: Dark Gray (#333)
- **Success**: Green (#4caf50)
- **Warning**: Orange (#ff9800)
- **Error**: Red (#f44336)

### Responsive Breakpoints
- **Desktop**: > 1200px
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

---

## 🔐 Authentication

### Login Flow
1. User enters email and password
2. Frontend sends credentials to `/api/auth/login`
3. Backend returns JWT token
4. Token is stored in localStorage/context
5. Token is sent with all protected requests

### Token Management
- Tokens are stored in AuthContext
- Automatically included in fetch headers
- Removed on logout

---

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── pages/          # All page components
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts (Auth)
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── styles.css      # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

---

## 🔌 API Integration

### Making API Calls
```javascript
// Example: Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
const data = await response.json()
```

### Error Handling
```javascript
try {
  // API call
} catch (err) {
  setError(err.message)
  alert('Error: ' + err.message)
}
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms validate input properly
- [ ] Login/Register flow works
- [ ] Protected routes require authentication
- [ ] API calls return expected responses
- [ ] Error messages display correctly
- [ ] Responsive design works on all devices
- [ ] Voice input functions properly
- [ ] Language selection works

---

## 🐛 Troubleshooting

### Common Issues

#### "Cannot GET /"
- Make sure dev server is running (`npm run dev`)
- Check that port 5173 is not blocked

#### API calls failing
- Verify backend is running on correct port
- Check browser console for CORS errors
- Verify API endpoints match backend routes

#### Voice input not working
- Use Chrome or Edge browser (Safari/Firefox may have limited support)
- Check microphone permissions
- Ensure microphone is connected

#### Page not loading
- Check browser console for errors
- Verify all imports are correct
- Clear browser cache (Ctrl+Shift+Delete)

---

## 🚀 Building for Production

### Build the Application
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build
```bash
npm run start
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 💡 Best Practices

1. **Always validate user input** on the frontend
2. **Use try-catch blocks** for API calls
3. **Show loading states** during API requests
4. **Provide meaningful error messages**
5. **Protect sensitive routes** with ProtectedRoute
6. **Test on multiple devices/browsers**
7. **Keep components modular and reusable**
8. **Use semantic HTML** for accessibility

---

## 📝 Notes

- All medical disclaimers should be prominently displayed
- Ensure HIPAA compliance if handling real patient data
- Never store sensitive data in localStorage for production
- Implement proper token refresh mechanism for security
- Consider adding rate limiting on the backend

---

## 🤝 Support

For issues or questions:
1. Check the API_INTEGRATION_GUIDE.md for endpoint details
2. Review IMPLEMENTATION_SUMMARY.md for feature overview
3. Check browser console for error messages
4. Verify backend API is running and accessible

---

## ✅ Checklist Before Production

- [ ] All environment variables configured
- [ ] Backend API fully implemented
- [ ] SSL/HTTPS enabled
- [ ] Error handling complete
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Security measures implemented
- [ ] Unit tests passed
- [ ] User acceptance testing complete
- [ ] Backup and recovery plan in place

---

**Happy coding! 🎉**
