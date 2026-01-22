# 🚀 CampusNav - Quick Reference Card

## 📋 Start Here

### Step 1: Backend (Terminal 1)
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

### Step 2: Frontend (Terminal 2)
```bash
cd frontend
npm install
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
npm run dev
```

### Step 3: Visit App
Open: **http://localhost:5173**

---

## 🎨 Component Quick Access

### UI Components Location
```
frontend/src/components/UI/
```

| Component | Usage |
|-----------|-------|
| `<Button>` | `<Button variant="primary">Click</Button>` |
| `<InputField>` | `<InputField label="Email" type="email" />` |
| `<Card>` | `<Card>Content</Card>` |
| `<Header>` | `<Header title="Nav" />` |
| `<Alert>` | `<Alert message="Done!" type="success" />` |
| `<LoadingSpinner>` | `<LoadingSpinner size="md" />` |

---

## 🔐 Authentication Quick Guide

### Sign Up Flow
```javascript
import { authService } from '@/services';

const data = await authService.register({
  first_name: 'John',
  username: 'johndoe',
  university_email: 'john@uni.edu',
  password: 'Password123!',
  student_id: '2024-001'
});

// Token automatically stored
// User redirected to dashboard
```

### Sign In Flow
```javascript
const data = await authService.login('johndoe', 'Password123!');
// Token stored, dashboard loaded
```

### Check Auth Status
```javascript
if (authService.isLoggedIn()) {
  const user = authService.getCurrentUser();
  console.log(user);
}
```

### Sign Out
```javascript
await authService.logout();
// Token cleared, redirected to splash
```

---

## 🌐 API Endpoints Cheat Sheet

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/sign-up/` | Register |
| POST | `/auth/sign-in/` | Login |
| POST | `/auth/sign-out/` | Logout |
| POST | `/auth/verify-token/` | Verify token |
| GET | `/user/me/` | Get current user |
| PUT | `/user/profile/update/` | Update profile |
| POST | `/auth/request-password-reset/` | Reset password |
| POST | `/health/` | Health check |

---

## 📁 Important Directories

```
Backend
  backend/auth_api/           ← Authentication API
  backend/backend/            ← Django config
  
Frontend
  src/components/UI/          ← Reusable components
  src/screens/                ← Page components
  src/services/               ← API services
  src/App.jsx                 ← Router setup
```

---

## 🔧 Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| `settings.py` | Django config | `backend/backend/` |
| `urls.py` | API routes | `backend/backend/` |
| `App.jsx` | React routing | `frontend/src/` |
| `tailwind.config.js` | Styles | `frontend/` |
| `.env` | Environment vars | `frontend/` |
| `requirements.txt` | Python deps | `backend/` |
| `package.json` | Node deps | `frontend/` |

---

## 🎯 Common Tasks

### Add New API Endpoint
1. Create view in `backend/auth_api/views.py`
2. Add route in `backend/auth_api/urls.py`
3. Use in frontend via `apiService`

### Create New UI Component
1. Create file in `frontend/src/components/UI/`
2. Export from `index.js`
3. Import and use in screens

### Create New Screen
1. Create file in `frontend/src/screens/`
2. Add route in `frontend/src/App.jsx`
3. Link from other screens

### Update Styling
1. Modify `frontend/src/index.css` for global styles
2. Modify `frontend/tailwind.config.js` for theme
3. Use Tailwind classes in components

---

## 🔍 Debugging Tips

### Backend Issues
```bash
# Check migrations
python manage.py showmigrations

# See all routes
python manage.py show_urls

# Access admin panel
http://localhost:8000/admin
# (Create superuser first: python manage.py createsuperuser)

# Check logs
# Look at console output in terminal
```

### Frontend Issues
```javascript
// Check token
console.log(localStorage.getItem('authToken'));

// Check user data
console.log(localStorage.getItem('userData'));

// Check auth state
console.log(authService.isLoggedIn());

// Check API calls
// Open DevTools → Network tab
```

### CORS Issues
If you see CORS errors:
1. Make sure backend is running on port 8000
2. Check `.env` has correct API_URL
3. Verify backend CORS settings in `settings.py`

---

## 📱 Form Validation Example

```javascript
// Client-side validation
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Server validates too!
// Check backend/auth_api/serializers.py for validation rules
```

---

## 💾 Database Quick Ref

### Models Location
```
backend/auth_api/models.py
```

### Available Models
- `User` (Django built-in)
- `UserProfile` (Extended info)
- `AuthToken` (Session management)

### Access via Admin
```
http://localhost:8000/admin
```

---

## 🎨 Color Scheme

```css
Primary:     #137fec (Blue)
Background:  #101922 (Dark Navy)
Text:        #f6f7f8 (Off-white)
Border:      #2d3a4b (Dark Gray)
Muted:       #a0aab4 (Light Gray)
```

---

## 📚 Documentation Map

```
START HERE
    ↓
QUICKSTART.md (5 min setup)
    ↓
COMPLETION_SUMMARY.md (What you have)
    ↓
INTEGRATION_GUIDE.md (Full details)
    ↓
ARCHITECTURE.md (How it works)
    ↓
API_EXAMPLES.md (API usage)
    ↓
FILE_INDEX.md (File reference)
    ↓
This file! (Quick ref)
```

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check port 8000 is free |
| Frontend won't load | Check .env file exists |
| API 404 errors | Verify migrations ran |
| CORS errors | Check backend CORS settings |
| Token expired | Login again (7-day expiration) |
| Styling broken | Clear cache, restart npm |
| Database error | Run `python manage.py migrate` |
| Port already in use | Change port in server command |

---

## 🔐 Security Reminders

```
✅ Never commit .env files
✅ Never hardcode API URLs
✅ Keep SECRET_KEY secret
✅ Use HTTPS in production
✅ Set DEBUG = False in production
✅ Use environment variables
✅ Validate all user input
✅ Hash passwords (Django handles)
```

---

## 📞 File Structure Quick Map

```
Want to modify...          Look in...
─────────────────────────────────────────────────────
API endpoints       →  backend/auth_api/views.py
Database models     →  backend/auth_api/models.py
API routes          →  backend/auth_api/urls.py
UI components       →  frontend/src/components/UI/
Screen designs      →  frontend/src/screens/
API client          →  frontend/src/services/apiService.js
Auth logic          →  frontend/src/services/authService.js
Routing             →  frontend/src/App.jsx
Styling             →  frontend/src/index.css
Theme config        →  frontend/tailwind.config.js
```

---

## ✨ Pro Tips

1. **Use VS Code extensions:**
   - ES7+ React/Redux
   - Tailwind CSS IntelliSense
   - Python
   - Django

2. **Debug faster:**
   - Use browser DevTools Network tab
   - Check React DevTools (browser extension)
   - Look at Django console output

3. **Stay organized:**
   - Keep components small
   - One component per file
   - Use services for API calls

4. **Commit often:**
   - Small, meaningful commits
   - Use clear commit messages
   - Push to version control

5. **Document as you go:**
   - Add comments to complex logic
   - Update README when adding features
   - Keep docs in sync with code

---

## 🚀 Ready to Ship?

When production-ready, remember:
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set environment variables
- [ ] Configure ALLOWED_HOSTS
- [ ] Set DEBUG = False
- [ ] Use gunicorn/waitress
- [ ] Set up HTTPS
- [ ] Configure email for password resets
- [ ] Run security checks
- [ ] Add unit tests
- [ ] Monitor logs

---

## 📞 Command Cheat Sheet

```bash
# Backend
cd backend
pip install -r requirements.txt        # Install deps
python manage.py migrate               # Run migrations
python manage.py createsuperuser       # Create admin
python manage.py runserver 8000        # Start server
python manage.py shell                 # Django shell
python manage.py test                  # Run tests

# Frontend
cd frontend
npm install                            # Install deps
npm run dev                            # Start dev
npm run build                          # Build prod
npm run lint                           # Check code
npm run preview                        # Preview prod build

# Git
git add .                              # Stage changes
git commit -m "message"                # Commit
git push origin main                   # Push to remote
```

---

## 🎓 Learning Next

After mastering this:
1. Add unit tests (pytest, Jest)
2. Learn GraphQL (alternative to REST)
3. Study Docker & containers
4. Learn CI/CD pipelines
5. Explore microservices
6. Study security best practices
7. Learn real-time with WebSockets
8. Explore mobile with React Native

---

**You're all set! Happy coding! 🚀**

*For detailed info, check the other documentation files.*
