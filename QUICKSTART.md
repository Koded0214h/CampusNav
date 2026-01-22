# CampusNav - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Step 1: Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Create database tables
python manage.py migrate

# Create superuser (optional, for admin panel)
python manage.py createsuperuser

# Start server
python manage.py runserver 8000
```

✅ Backend running at: http://localhost:8000

### Step 2: Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env

# Start development server
npm run dev
```

✅ Frontend running at: http://localhost:5173

## 📱 Test the Application

### 1. Visit the App
Open: http://localhost:5173

### 2. Test Registration
- Click "Get Started" button
- Fill in the signup form:
  - First Name: John
  - Username: johndoe
  - Email: john@university.edu
  - Password: TestPassword123!
  - Student ID: 2024-JD-001
- Click "Create Account"
- Should be redirected to Dashboard

### 3. Test Login
- Click on the login link
- Enter credentials from signup
- Click "Sign In"
- Should be redirected to Dashboard

### 4. Test Dashboard
- View your profile information
- See quick action cards
- Click "Logout" button

## 📁 Project Structure

### Backend Files Created/Modified
```
backend/
├── auth_api/              ← NEW: Authentication app
│   ├── models.py          (UserProfile, AuthToken models)
│   ├── views.py           (API endpoints)
│   ├── serializers.py     (Data validation)
│   ├── urls.py            (Routes)
│   └── admin.py           (Admin interface)
├── backend/settings.py    ← MODIFIED: Added CORS, DRF, auth_api
├── backend/urls.py        ← MODIFIED: Added /api/ routes
└── requirements.txt       ← NEW: Dependencies
```

### Frontend Files Created/Modified
```
frontend/src/
├── components/UI/         ← NEW: Reusable components
│   ├── Button.jsx
│   ├── InputField.jsx
│   ├── Card.jsx
│   ├── Header.jsx
│   ├── Alert.jsx
│   ├── LoadingSpinner.jsx
│   └── index.js
├── screens/               ← NEW: Page components
│   ├── SplashScreen.jsx
│   ├── SignUpScreen.jsx
│   ├── SignInScreen.jsx
│   ├── ForgotPasswordScreen.jsx
│   ├── DashboardScreen.jsx
│   └── index.js
├── services/              ← NEW: API services
│   ├── apiService.js      (Base API client)
│   ├── authService.js     (Auth logic)
│   └── index.js
├── App.jsx                ← MODIFIED: Added routing
├── index.css              ← MODIFIED: Added Tailwind imports
├── package.json           ← MODIFIED: Added react-router-dom
└── tailwind.config.js     ← NEW: Tailwind configuration
```

## 🔐 Authentication Flow

### Signup Flow
```
User → Form → API /sign-up/ → Create User & Profile 
    → Generate Token → Save to localStorage → Dashboard
```

### Login Flow
```
User → Credentials → API /sign-in/ → Verify Password 
    → Generate Token → Save to localStorage → Dashboard
```

### Session Verification
```
App Load → Check localStorage for token 
    → API /verify-token/ → Valid? → Keep session : Redirect to Login
```

## 📊 Database Models

### UserProfile
Stores extended user information:
- Student ID, University Email
- Phone, Department, Year of Study
- Bio, Profile Picture URL

### AuthToken
Manages user sessions:
- Unique token per user
- 7-day expiration
- Active/Inactive status

## 🎨 UI Components

### Available Components

**Button**
```jsx
<Button variant="primary" size="lg">
  Click Me
</Button>
```
Variants: primary, secondary, ghost, danger
Sizes: sm, md, lg, full

**InputField**
```jsx
<InputField
  label="Email"
  type="email"
  icon="mail"
  showPasswordToggle={true}
/>
```

**Card**
```jsx
<Card>
  Content goes here
</Card>
```

**Alert**
```jsx
<Alert 
  message="Success!" 
  type="success" 
  autoClose={true}
/>
```

**LoadingSpinner**
```jsx
<LoadingSpinner size="md" text="Loading..." />
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/sign-up/` - Register new user
- `POST /api/auth/sign-in/` - Login user
- `POST /api/auth/sign-out/` - Logout user
- `POST /api/auth/verify-token/` - Verify token validity

### User
- `GET /api/user/me/` - Get current user profile
- `PUT /api/user/profile/update/` - Update profile

### Utilities
- `POST /api/auth/request-password-reset/` - Request password reset
- `POST /api/health/` - Health check

## 🎯 Key Features Implemented

✅ **Complete Auth Flow**
- Sign up with validation
- Sign in with credentials
- Automatic session restoration
- Logout functionality

✅ **Reusable Components**
- Generic Button with variants
- InputField with error handling
- Card containers
- Loading states
- Alert notifications

✅ **Proper File Structure**
- Separated UI components
- Service layer for API calls
- Screen components for pages
- Clean separation of concerns

✅ **Smart Routing**
- Protected routes (dashboard)
- Public routes (splash, signin, signup)
- Automatic redirects based on auth state
- 404 catch-all

✅ **Design Conversion**
- All HTML designs converted to React
- Tailwind CSS styling
- Responsive layout
- Dark theme throughout

## 🐛 Troubleshooting

### Frontend won't load
- Check if backend is running on port 8000
- Check `.env` file has correct API URL
- Clear browser cache (Ctrl+Shift+Del)

### "Token expired" errors
- Tokens expire after 7 days
- Need to login again

### CORS errors
- Backend CORS settings in `settings.py`
- Verify frontend URL is in `CORS_ALLOWED_ORIGINS`

### Form validation fails
- Check console for specific error messages
- All fields except last_name and phone are required

### 404 after login
- Database migrations might not be ran
- Run: `python manage.py migrate`

## 📦 Dependencies

### Backend
- Django 6.0
- djangorestframework
- django-cors-headers
- python-decouple

### Frontend
- React 19
- React Router DOM 7
- Tailwind CSS

## 🚀 Production Deployment

### Backend
```bash
# Generate production settings
python manage.py collectstatic
# Use gunicorn for production
gunicorn backend.wsgi
```

### Frontend
```bash
# Build optimized production bundle
npm run build
# Deploy 'dist/' folder to static hosting
```

## 📚 Documentation

Full integration guide: See `INTEGRATION_GUIDE.md`

---

**Happy Coding! 🎉**
