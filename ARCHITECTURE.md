# CampusNav Architecture & Flow Diagrams

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CAMPUSNAV                            │
├──────────────────────────┬──────────────────────────────────┤
│                          │                                  │
│      FRONTEND (React)    │       BACKEND (Django)          │
│                          │                                  │
│  ┌────────────────────┐  │  ┌─────────────────────────┐    │
│  │   UI Components    │  │  │   Authentication API    │    │
│  │  ┌──────────────┐  │  │  │  ┌────────────────────┐ │    │
│  │  │ Button       │  │  │  │  │ Views (Endpoints)  │ │    │
│  │  │ InputField   │  │  │  │  │ - sign-up          │ │    │
│  │  │ Card         │  │  │  │  │ - sign-in          │ │    │
│  │  │ Header       │  │  │  │  │ - verify-token     │ │    │
│  │  │ Alert        │  │  │  │  │ - get user         │ │    │
│  │  │ Spinner      │  │  │  │  │ - update profile   │ │    │
│  │  └──────────────┘  │  │  │  └────────────────────┘ │    │
│  └────────────────────┘  │  └─────────────────────────┘    │
│                          │                                  │
│  ┌────────────────────┐  │  ┌─────────────────────────┐    │
│  │   Screens          │  │  │      Database           │    │
│  │  ┌──────────────┐  │  │  │  ┌────────────────────┐ │    │
│  │  │ Splash       │  │  │  │  │ User                │ │    │
│  │  │ SignUp       │  │  │  │  │ UserProfile         │ │    │
│  │  │ SignIn       │  │  │  │  │ AuthToken           │ │    │
│  │  │ Dashboard    │  │  │  │  └────────────────────┘ │    │
│  │  │ ForgotPass   │  │  │  └─────────────────────────┘    │
│  │  └──────────────┘  │  │                                  │
│  └────────────────────┘  │                                  │
│                          │                                  │
│  ┌────────────────────┐  │  ┌─────────────────────────┐    │
│  │   Services         │  │  │  Models & Serializers   │    │
│  │  ┌──────────────┐  │  │  │  ┌────────────────────┐ │    │
│  │  │ apiService   │──┼──┼─→│  │ Serializers        │ │    │
│  │  │ authService  │  │  │  │  │ (Validation)       │ │    │
│  │  └──────────────┘  │  │  │  └────────────────────┘ │    │
│  └────────────────────┘  │  └─────────────────────────┘    │
│                          │                                  │
│  ┌────────────────────┐  │                                  │
│  │   Routing          │  │  ┌─────────────────────────┐    │
│  │  ├─ / (splash)     │  │  │    CORS Settings        │    │
│  │  ├─ /sign-up       │  │  │    Allowed Origins      │    │
│  │  ├─ /sign-in       │  │  │    Credentials Enabled  │    │
│  │  └─ /dashboard ✓   │  │  └─────────────────────────┘    │
│  └────────────────────┘  │                                  │
│                          │                                  │
└──────────────────────────┴──────────────────────────────────┘
                           │
                    HTTP/JSON API
                    (Port 8000)
```

## 🔄 Complete Authentication Flow

```
START
  │
  ├─→ User visits http://localhost:5173
  │
  ├─→ App.jsx checks localStorage for token
  │   ├─→ Token exists?
  │   │   ├─→ YES: Verify with backend
  │   │   │   ├─→ Valid? → Show Dashboard
  │   │   │   └─→ Expired? → Clear & Show Splash
  │   │   └─→ NO: Show Splash
  │
  ├─→ USER CLICKS "GET STARTED"
  │   │
  │   ├─→ Route to /sign-up
  │   │
  │   ├─→ SignUpScreen mounts
  │   │   ├─→ User fills form
  │   │   ├─→ Client validates form
  │   │   │   ├─→ All required fields?
  │   │   │   ├─→ Valid email format?
  │   │   │   └─→ Password >= 8 chars?
  │   │   │
  │   │   ├─→ User clicks "Create Account"
  │   │   │
  │   │   ├─→ POST /api/auth/sign-up/
  │   │   │   {
  │   │   │     first_name, last_name, username,
  │   │   │     university_email, password, student_id
  │   │   │   }
  │   │   │
  │   │   ├─→ Backend (views.py:sign_up)
  │   │   │   ├─→ Validate each field
  │   │   │   ├─→ Check username unique
  │   │   │   ├─→ Check email unique
  │   │   │   ├─→ Check student_id unique
  │   │   │   ├─→ Create User object
  │   │   │   ├─→ Create UserProfile (auto via signal)
  │   │   │   ├─→ Update profile fields
  │   │   │   ├─→ Generate UUID token
  │   │   │   ├─→ Create AuthToken (expires in 7 days)
  │   │   │   └─→ Return 201 + token + user_data
  │   │   │
  │   │   ├─→ Frontend receives response
  │   │   ├─→ authService.setToken(token)
  │   │   ├─→ localStorage['authToken'] = token
  │   │   ├─→ localStorage['userData'] = user
  │   │   ├─→ Navigate to /dashboard
  │   │   │
  │   │   └─→ DashboardScreen mounts
  │   │       ├─→ Verify session
  │   │       ├─→ GET /api/user/me/
  │   │       ├─→ Display user profile
  │   │       └─→ Show dashboard cards
  │
  │
  ├─→ USER LOGS OUT
  │   │
  │   ├─→ Click "Logout" button
  │   │
  │   ├─→ authService.logout()
  │   │   ├─→ POST /api/auth/sign-out/
  │   │   ├─→ Backend deactivates AuthToken
  │   │   ├─→ Frontend clears localStorage
  │   │   ├─→ Navigate to /
  │   │   └─→ Back to Splash Screen
  │
  └─→ END
```

## 🔐 Token Verification Flow

```
┌──────────────────┐
│  User Navigates  │
│  to /dashboard   │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│ Check localStorage   │
│ for authToken        │
└────────┬─────────────┘
         │
         ├─→ Token exists?
         │   │
         │   ├─→ NO: Redirect to /sign-in
         │   │
         │   └─→ YES:
         │       │
         │       ▼
         │   ┌──────────────────────┐
         │   │ POST /verify-token/  │
         │   │ {token: "xxx"}       │
         │   └────────┬─────────────┘
         │            │
         │            ▼
         │   ┌──────────────────────┐
         │   │  Backend checks:     │
         │   │  1. Token exists?    │
         │   │  2. is_active=True?  │
         │   │  3. expires_at > now?│
         │   └────────┬─────────────┘
         │            │
         │            ├─→ All valid?
         │            │   │
         │            │   ├─→ YES: Return user + expires_at
         │            │   │
         │            │   └─→ NO: Return 401 Unauthorized
         │            │
         │            ▼
         │   ┌──────────────────────┐
         │   │ Frontend receives    │
         │   │ 200 OK + user_data   │
         │   └────────┬─────────────┘
         │            │
         │            ├─→ Update localStorage
         │            │
         │            ├─→ Set state.isAuthenticated = true
         │            │
         │            └─→ Render Dashboard
         │
         │   ┌──────────────────────┐
         │   │ Or receives 401      │
         │   └────────┬─────────────┘
         │            │
         │            ├─→ Clear localStorage
         │            │
         │            ├─→ Set state.isAuthenticated = false
         │            │
         │            └─→ Redirect to /sign-in
         │
         └─ Render Component
```

## 📱 Component Hierarchy

```
┌─ App.jsx (Main App with Router)
│  │
│  ├─ Routes (React Router)
│  │
│  ├─ Public Routes:
│  │  ├─ / → SplashScreen
│  │  │      ├─ Header
│  │  │      ├─ Hero Section
│  │  │      └─ Buttons (Get Started, Sign In)
│  │  │
│  │  ├─ /sign-up → SignUpScreen
│  │  │            ├─ Header
│  │  │            └─ Card
│  │  │               ├─ InputField (name)
│  │  │               ├─ InputField (email)
│  │  │               ├─ InputField (password)
│  │  │               ├─ InputField (student_id)
│  │  │               ├─ Button (submit)
│  │  │               └─ Button (sign-in link)
│  │  │
│  │  ├─ /sign-in → SignInScreen
│  │  │            ├─ Logo Section
│  │  │            └─ Card
│  │  │               ├─ InputField (username)
│  │  │               ├─ InputField (password)
│  │  │               ├─ Button (sign-in)
│  │  │               ├─ Social Buttons
│  │  │               └─ Button (sign-up link)
│  │  │
│  │  └─ /forgot-password → ForgotPasswordScreen
│  │                        ├─ Header
│  │                        └─ Card
│  │                           ├─ InputField (email)
│  │                           ├─ Button (send link)
│  │                           └─ Button (back to login)
│  │
│  └─ Protected Routes (requires auth):
│     └─ /dashboard → DashboardScreen ✓
│                    ├─ Navigation Header
│                    ├─ Left Sidebar
│                    │  ├─ Profile Card
│                    │  └─ Menu Items
│                    └─ Main Content
│                       ├─ Welcome Card
│                       └─ Quick Action Cards
```

## 🗂️ Data Flow Diagram

```
                    API Service
                        │
                    ┌───┴───┐
                    │       │
              apiService  authService
                    │       │
        ┌───────────┼───────┴────────────┬────────┐
        │           │                    │        │
    localStorage  authState          userData   token
    (persistence)  (local state)    (caching)  (headers)
        │           │                    │        │
        └───────────┴────────────────────┴────────┘
                    │
            Frontend Components
            (Screens & UI)
                    │
        ┌───────────┼───────────┐
        │           │           │
    Splash      SignUp      SignIn     Dashboard
   Screen      Screen      Screen     Screen
```

## 🔄 User State Management

```
┌─────────────────┐
│  Initial State  │
│ - No Token      │
│ - No User Data  │
└────────┬────────┘
         │
         ├─→ Check localStorage
         │   │
         │   ├─→ Token? User?
         │   │
         │   ├─→ Verify with backend
         │   │
         │   └─→ Set authenticated = true/false
         │
         ├─→ Sign Up
         │   └─→ authenticated = true, isNewUser = true
         │
         ├─→ Sign In
         │   └─→ authenticated = true, isNewUser = false
         │
         ├─→ Navigate (protected route)
         │   ├─→ authenticated? → Allow
         │   └─→ Not authenticated? → Redirect to /sign-in
         │
         └─→ Sign Out
             └─→ authenticated = false, Clear all data
```

## 📊 Request/Response Cycle

### Sign Up Request
```
Frontend                        Network                    Backend
┌─────────────┐                                         ┌─────────────┐
│ POST Request│─────────────────────────────────────→  │ sign_up view│
│ /sign-up/   │  Headers:                              └──────┬──────┘
│ {            │  - Content-Type: application/json            │
│   data...    │                                              │ Validate
│ }            │  Body:                                       │ Create User
│              │  {                                           │ Create Token
│              │    first_name, last_name, username...       │
│              │  }                                           │
└──────────────┘                                       └──────┴──────────┐
                                                             │
                ┌─────────────────────────────────────────←──┘
                │
            ┌───┴────────────┐
            │ 201 Response   │
            │ {              │
            │   token: "...", │
            │   user: {...}  │
            │ }              │
            └───┬────────────┘
                │
         ┌──────▼──────┐
         │ Frontend    │
         │ Receives &  │
         │ Stores      │
         │ Token &     │
         │ Navigates   │
         └─────────────┘
```

## 🎯 Error Handling Flow

```
User Action
    │
    ▼
Validate (Frontend)
    │
    ├─→ Invalid? → Show Error Message → Stop
    │
    └─→ Valid → Send to Backend
         │
         ▼
    Backend Validation
    │
    ├─→ Invalid? → Return 400/401 → Show Error
    │
    ├─→ Unique Constraint Failed? → Return 400 → Show Error
    │
    ├─→ Auth Failed? → Return 401 → Redirect to Login
    │
    └─→ Valid? → Process & Return 200/201
         │
         ▼
    Frontend
    │
    ├─→ Success? → Update State → Navigate
    │
    └─→ Error? → Show Error Message
```

---

This architecture ensures:
✅ Clean separation of concerns
✅ Secure authentication flow
✅ Proper state management
✅ Error handling at all layers
✅ Smooth user experience
