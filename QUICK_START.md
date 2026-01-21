# CampusNav - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

---

## 📋 Backend Setup

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Run Database Migrations
```bash
python manage.py makemigrations auth_api
python manage.py migrate
```

### 3. Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 4. Start Backend Server
```bash
python manage.py runserver
```

Backend will run at: `http://localhost:8000`
Admin panel: `http://localhost:8000/admin`

---

## 🎨 Frontend Setup

### 1. Install Node Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
The `.env` file is already created with:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🧪 Testing

### Run ESLint
```bash
npm run lint
```

### Build Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📱 Testing on Different Devices

### Mobile Testing
- Use browser DevTools (F12 → Toggle Device Toolbar)
- Or scan QR code in terminal output
- Tested at: 375px, 768px, 1024px+

### Real Devices
- Replace localhost with machine IP in .env
- E.g., `REACT_APP_API_URL=http://192.168.1.100:8000/api`

---

## 🔍 API Endpoints

### Authentication
- `POST /api/auth/sign-up/` - Register new user
- `POST /api/auth/sign-in/` - Login
- `POST /api/auth/sign-out/` - Logout
- `POST /api/auth/verify-token/` - Verify session
- `POST /api/auth/request-password-reset/` - Password reset

### User
- `GET /api/user/me/` - Get current user
- `PUT /api/user/profile/update/` - Update profile

### Health
- `POST /api/health/` - Check API status

---

## 🛠️ Troubleshooting

### CORS Errors
- Ensure backend is running at `http://localhost:8000`
- Check `.env` file has correct API URL
- Clear browser cache and localStorage

### Port Already in Use
```bash
# Backend (port 8000)
python manage.py runserver 8001

# Frontend (port 5173)
npm run dev -- --port 3000
```

### Database Errors
```bash
# Reset database (WARNING: deletes all data)
rm db.sqlite3
python manage.py migrate
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Project Structure

```
CampusNav/
├── backend/
│   ├── auth_api/           # Authentication app
│   ├── backend/            # Django config
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── services/       # API services
│   │   ├── views/          # Screen components
│   │   ├── App.jsx         # Router
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── .env                # Environment config
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

## 🔐 Security Notes

- Never commit `.env` with real API keys
- Use `django-decouple` in production
- Set `DEBUG = False` in production
- Use environment variables for secrets
- Implement HTTPS in production

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
# Add to requirements.txt:
gunicorn==20.1.0
python-decouple==3.8

# Procfile:
web: gunicorn backend.wsgi
```

---

## 💬 Support

For issues or questions:
1. Check VERIFICATION_REPORT.md
2. Review error messages in console
3. Check backend logs: `python manage.py runserver`
4. Check frontend logs: Browser DevTools

---

## ✅ Verification Checklist

- [ ] Backend running at localhost:8000
- [ ] Frontend running at localhost:5173
- [ ] Can sign up new account
- [ ] Can sign in with created account
- [ ] Can navigate to dashboard
- [ ] Images load properly
- [ ] Responsive on mobile
- [ ] ESLint passes
- [ ] No console errors

---

**Last Updated**: 2026-01-21
**Version**: 1.0.0
