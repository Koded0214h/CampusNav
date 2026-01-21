# CampusNav - Frontend & Backend Integration Guide

A complete end-to-end handshake implementation between the React frontend and Django backend with comprehensive UI components and authentication system.

## Project Structure

```
CampusNav/
├── backend/                    # Django Backend
│   ├── auth_api/              # Authentication App
│   │   ├── models.py          # User & Auth Token Models
│   │   ├── views.py           # API Endpoints
│   │   ├── serializers.py     # DRF Serializers
│   │   ├── urls.py            # API Routes
│   │   ├── admin.py           # Django Admin
│   │   └── apps.py            # App Config
│   ├── backend/               # Project Config
│   │   ├── settings.py        # Django Settings (Updated with CORS, DRF)
│   │   ├── urls.py            # Main URL Router
│   │   ├── wsgi.py            # WSGI Config
│   │   └── asgi.py            # ASGI Config
│   ├── manage.py              # Django Management
│   └── requirements.txt        # Python Dependencies
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── UI/             # Reusable UI Components
    │   │   │   ├── Button.jsx
    │   │   │   ├── InputField.jsx
    │   │   │   ├── Card.jsx
    │   │   │   ├── Header.jsx
    │   │   │   ├── Alert.jsx
    │   │   │   ├── LoadingSpinner.jsx
    │   │   │   └── index.js
    │   │   └── (Major Components)
    │   │
    │   ├── screens/            # Page Components
    │   │   ├── SplashScreen.jsx      # Landing Page
    │   │   ├── SignUpScreen.jsx      # Registration
    │   │   ├── SignInScreen.jsx      # Login
    │   │   ├── ForgotPasswordScreen.jsx
    │   │   ├── DashboardScreen.jsx   # Protected Dashboard
    │   │   └── index.js
    │   │
    │   ├── services/           # API Services
    │   │   ├── apiService.js   # Base API Service
    │   │   ├── authService.js  # Auth Logic
    │   │   └── index.js
    │   │
    │   ├── App.jsx             # Main App with Routing
    │   ├── main.jsx
    │   └── index.css           # Tailwind CSS
    │
    ├── package.json
    ├── tailwind.config.js
    ├── .env.example
    └── vite.config.js
```

## Backend Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Django Settings

The backend includes:
- **CORS Configuration**: Enables frontend-backend communication
- **REST Framework**: DRF for API endpoints
- **Token Authentication**: Secure API access

**Key API Endpoints:**
- `POST /api/auth/sign-up/` - User Registration
- `POST /api/auth/sign-in/` - User Login
- `POST /api/auth/sign-out/` - User Logout
- `POST /api/auth/verify-token/` - Token Verification
- `GET /api/user/me/` - Get Current User
- `PUT /api/user/profile/update/` - Update Profile
- `POST /api/health/` - Health Check

### 3. Create Database & Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (Admin)

```bash
python manage.py createsuperuser
```

### 5. Run Backend Server

```bash
python manage.py runserver 8000
```

The backend will be available at `http://localhost:8000`

## Frontend Setup

### 1. Install Node Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Configure the API URL:
```
REACT_APP_API_URL=http://localhost:8000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## API Handshake Flow

### Registration Flow
```
1. User fills signup form
2. Frontend validates input
3. POST /api/auth/sign-up/ with user data
4. Backend creates User & UserProfile
5. Backend generates AuthToken
6. Frontend stores token in localStorage
7. Redirect to dashboard
```

### Login Flow
```
1. User enters credentials
2. POST /api/auth/sign-in/ with username/password
3. Backend authenticates & generates token
4. Frontend stores token
5. Authorization header: "Bearer {token}"
```

### Session Verification
```
1. On app load: verify stored token
2. POST /api/auth/verify-token/
3. If valid: restore user session
4. If invalid: redirect to login
```

### Logout Flow
```
1. POST /api/auth/sign-out/
2. Backend deactivates token
3. Frontend clears localStorage
4. Redirect to splash screen
```

## UI Components

### Reusable Components (`src/components/UI/`)

1. **Button.jsx**
   - Variants: primary, secondary, ghost, danger
   - Sizes: sm, md, lg, full
   - Customizable with props

2. **InputField.jsx**
   - Label support
   - Error messages
   - Icon support
   - Password visibility toggle
   - Full validation ready

3. **Card.jsx**
   - Container component
   - Consistent styling
   - Shadow & border

4. **Header.jsx**
   - Logo, title, subtitle
   - Navigation menu
   - Right content slot

5. **Alert.jsx**
   - Types: success, error, warning, info
   - Auto-close support
   - Dismissible

6. **LoadingSpinner.jsx**
   - Multiple sizes
   - Custom text

### Major Components (Screens)

1. **SplashScreen** - Landing page with CTA
2. **SignUpScreen** - Registration form with validation
3. **SignInScreen** - Login with email/password
4. **ForgotPasswordScreen** - Password reset request
5. **DashboardScreen** - Protected user dashboard

## Services

### apiService.js
Base API service with:
- Token management
- Request interceptors
- Error handling
- All CRUD endpoints

Usage:
```javascript
import { apiService } from '@/services';

// Sign up
const response = await apiService.signUp(userData);
apiService.setToken(response.token);

// Verify token
const user = await apiService.verifyToken(token);

// Get current user
const userData = await apiService.getCurrentUser();
```

### authService.js
Authentication business logic:
- Login/Register/Logout
- Session verification
- Token persistence
- User data caching

Usage:
```javascript
import { authService } from '@/services';

// Register
await authService.register(userData);

// Login
await authService.login(username, password);

// Logout
await authService.logout();

// Check auth status
if (authService.isLoggedIn()) { ... }

// Get current user
const user = authService.getCurrentUser();
```

## Database Models

### UserProfile
```python
- user (OneToOneField to User)
- student_id (unique)
- university_email (unique)
- phone_number
- profile_picture
- department
- year_of_study
- bio
- created_at
- updated_at
```

### AuthToken
```python
- user (OneToOneField)
- token (unique, UUID)
- created_at
- expires_at (7 days from creation)
- is_active (boolean)
```

## Styling & Design

All components use **Tailwind CSS** with custom color scheme:
- Primary: `#137fec` (Blue)
- Background: `#101922` (Dark Navy)
- Text: `#f6f7f8` (Off-white)
- Borders: `#2d3a4b` (Dark Gray)

## Form Validation

All forms include:
- Client-side validation
- Backend validation
- Error messages
- Required field indicators
- Real-time feedback

## Security Features

1. **Token-based Authentication**
   - 7-day expiration
   - Secure storage in localStorage
   - Verified on app load

2. **CORS Configuration**
   - Restricted to allowed origins
   - Credentials support

3. **Password Security**
   - Minimum 8 characters
   - Hidden display with toggle
   - Django's default hasher

4. **Protected Routes**
   - Automatic redirect to login if not authenticated
   - Session verification on app load

## Error Handling

- Try-catch in all async operations
- User-friendly error messages
- Network error handling
- Token expiration handling

## File Conversion Notes

All HTML designs from the screens folder have been:
- Converted to React JSX components
- Removed all default HTML tags (replaced with React)
- Integrated with Tailwind CSS
- Connected to the API services
- Added form validation
- Added authentication flow

## Testing the Application

### 1. Start Backend
```bash
cd backend
python manage.py runserver 8000
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
```

### 3. Test Flow
- Visit `http://localhost:5173`
- Click "Get Started" → Sign Up
- Create account with credentials
- Should redirect to dashboard
- Sign out to return to splash

### 4. Test API Directly
```bash
# Check health
curl http://localhost:8000/api/health/

# Sign up
curl -X POST http://localhost:8000/api/auth/sign-up/ \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "username": "johndoe",
    "university_email": "john@uni.edu",
    "password": "securepass123",
    "student_id": "2024-JD-001"
  }'
```

## Deployment

### Backend (Django)
- Configure `ALLOWED_HOSTS` for production domain
- Use environment variables for secrets
- Set `DEBUG = False`
- Use production database (PostgreSQL recommended)
- Configure static files serving

### Frontend (React)
- Build: `npm run build`
- Output: `dist/` folder
- Deploy to Vercel, Netlify, or static hosting
- Configure API_URL for production backend

## Next Steps

1. **Email Integration** - Send password reset emails
2. **Social Authentication** - Google/Apple OAuth
3. **User Profile Upload** - Profile picture handling
4. **Additional Endpoints** - Campus data, routes, etc.
5. **Real-time Features** - WebSocket support
6. **Testing** - Unit & integration tests

## Support & Issues

For issues or questions:
1. Check browser console for errors
2. Check backend logs
3. Verify CORS settings
4. Ensure both servers running on correct ports
5. Check `.env` configuration

---

**Built with React, Django, Tailwind CSS, and REST Framework**
