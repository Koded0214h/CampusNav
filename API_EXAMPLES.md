# CampusNav API - Request & Response Examples

## 🔌 API Base URL
```
http://localhost:8000/api
```

---

## 📝 Authentication Endpoints

### 1. Sign Up (Register)
**Endpoint:** `POST /auth/sign-up/`

**Request:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe",
  "university_email": "john@university.edu",
  "password": "SecurePassword123!",
  "student_id": "2024-JD-001",
  "phone_number": "+1 (555) 123-4567"
}
```

**Success Response (201):**
```json
{
  "message": "Account created successfully",
  "token": "550e8400-e29b-41d4-a716-446655440000",
  "expires_at": "2026-01-28T12:30:00Z",
  "user": {
    "id": 1,
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@university.edu",
      "first_name": "John",
      "last_name": "Doe"
    },
    "student_id": "2024-JD-001",
    "university_email": "john@university.edu",
    "phone_number": "+1 (555) 123-4567",
    "profile_picture": "",
    "department": "",
    "year_of_study": "",
    "bio": "",
    "created_at": "2026-01-21T12:30:00Z",
    "updated_at": "2026-01-21T12:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "username": ["Username already exists"],
  "university_email": ["Email already registered"],
  "password": ["Password must be at least 8 characters"]
}
```

---

### 2. Sign In (Login)
**Endpoint:** `POST /auth/sign-in/`

**Request:**
```json
{
  "username": "johndoe",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "550e8400-e29b-41d4-a716-446655440001",
  "expires_at": "2026-01-28T12:30:00Z",
  "user": {
    "id": 1,
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@university.edu",
      "first_name": "John",
      "last_name": "Doe"
    },
    "student_id": "2024-JD-001",
    "university_email": "john@university.edu",
    "phone_number": "+1 (555) 123-4567",
    "profile_picture": "",
    "department": "Computer Science",
    "year_of_study": "senior",
    "bio": "Computer science student interested in mapping",
    "created_at": "2026-01-21T12:30:00Z",
    "updated_at": "2026-01-21T12:30:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

### 3. Sign Out (Logout)
**Endpoint:** `POST /auth/sign-out/`

**Headers:**
```
Authorization: Bearer 550e8400-e29b-41d4-a716-446655440001
Content-Type: application/json
```

**Request:**
```json
{}
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### 4. Verify Token
**Endpoint:** `POST /auth/verify-token/`

**Request:**
```json
{
  "token": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Success Response (200):**
```json
{
  "valid": true,
  "expires_at": "2026-01-28T12:30:00Z",
  "user": {
    "id": 1,
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@university.edu",
      "first_name": "John",
      "last_name": "Doe"
    },
    "student_id": "2024-JD-001",
    "university_email": "john@university.edu",
    "phone_number": "+1 (555) 123-4567",
    "profile_picture": "",
    "department": "Computer Science",
    "year_of_study": "senior",
    "bio": "",
    "created_at": "2026-01-21T12:30:00Z",
    "updated_at": "2026-01-21T12:30:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid token"
}
```

**Or if expired (401):**
```json
{
  "error": "Token expired"
}
```

---

## 👤 User Endpoints

### 5. Get Current User
**Endpoint:** `GET /user/me/`

**Headers:**
```
Authorization: Bearer 550e8400-e29b-41d4-a716-446655440001
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@university.edu",
    "first_name": "John",
    "last_name": "Doe"
  },
  "student_id": "2024-JD-001",
  "university_email": "john@university.edu",
  "phone_number": "+1 (555) 123-4567",
  "profile_picture": "https://example.com/profile.jpg",
  "department": "Computer Science",
  "year_of_study": "senior",
  "bio": "CS student passionate about campus navigation",
  "created_at": "2026-01-21T12:30:00Z",
  "updated_at": "2026-01-21T12:30:00Z"
}
```

**Error Response (401):**
```json
{
  "detail": "Authentication credentials were not provided."
}
```

---

### 6. Update User Profile
**Endpoint:** `PUT /user/profile/update/`

**Headers:**
```
Authorization: Bearer 550e8400-e29b-41d4-a716-446655440001
Content-Type: application/json
```

**Request (Partial Update):**
```json
{
  "phone_number": "+1 (555) 987-6543",
  "department": "Computer Engineering",
  "year_of_study": "senior",
  "bio": "Updated bio - I love CS!",
  "profile_picture": "https://example.com/new-profile.jpg"
}
```

**Success Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@university.edu",
      "first_name": "John",
      "last_name": "Doe"
    },
    "student_id": "2024-JD-001",
    "university_email": "john@university.edu",
    "phone_number": "+1 (555) 987-6543",
    "profile_picture": "https://example.com/new-profile.jpg",
    "department": "Computer Engineering",
    "year_of_study": "senior",
    "bio": "Updated bio - I love CS!",
    "created_at": "2026-01-21T12:30:00Z",
    "updated_at": "2026-01-21T15:45:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Invalid year_of_study choice"
}
```

---

## 🔐 Password Management

### 7. Request Password Reset
**Endpoint:** `POST /auth/request-password-reset/`

**Request:**
```json
{
  "email": "john@university.edu"
}
```

**Success Response (200):**
```json
{
  "message": "Password reset link sent to your email",
  "reset_token": "550e8400-e29b-41d4-a716-446655440002"
}
```

**Note:** In production, the reset_token would be sent via email only.

---

## 🏥 System Endpoints

### 8. Health Check
**Endpoint:** `POST /health/`

**Request:**
```json
{}
```

**Success Response (200):**
```json
{
  "status": "ok",
  "message": "CampusNav API is running"
}
```

---

## 📤 Using cURL

### Example: Sign Up
```bash
curl -X POST http://localhost:8000/api/auth/sign-up/ \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "university_email": "john@university.edu",
    "password": "SecurePassword123!",
    "student_id": "2024-JD-001",
    "phone_number": "+1 (555) 123-4567"
  }'
```

### Example: Sign In
```bash
curl -X POST http://localhost:8000/api/auth/sign-in/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "SecurePassword123!"
  }'
```

### Example: Get Current User (with token)
```bash
curl -X GET http://localhost:8000/api/user/me/ \
  -H "Authorization: Bearer 550e8400-e29b-41d4-a716-446655440001" \
  -H "Content-Type: application/json"
```

### Example: Update Profile
```bash
curl -X PUT http://localhost:8000/api/user/profile/update/ \
  -H "Authorization: Bearer 550e8400-e29b-41d4-a716-446655440001" \
  -H "Content-Type: application/json" \
  -d '{
    "department": "Computer Science",
    "year_of_study": "senior",
    "bio": "Updated bio"
  }'
```

---

## 🌐 Using Fetch API (JavaScript)

### Example: Sign Up
```javascript
const response = await fetch('http://localhost:8000/api/auth/sign-up/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    university_email: 'john@university.edu',
    password: 'SecurePassword123!',
    student_id: '2024-JD-001',
    phone_number: '+1 (555) 123-4567'
  })
});

const data = await response.json();
if (response.ok) {
  localStorage.setItem('authToken', data.token);
  console.log('Signup successful!', data.user);
} else {
  console.error('Signup failed:', data);
}
```

### Example: Sign In
```javascript
const response = await fetch('http://localhost:8000/api/auth/sign-in/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'johndoe',
    password: 'SecurePassword123!'
  })
});

const data = await response.json();
if (response.ok) {
  localStorage.setItem('authToken', data.token);
  console.log('Login successful!', data.user);
} else {
  console.error('Login failed:', data.error);
}
```

### Example: Get Current User
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('http://localhost:8000/api/user/me/', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});

const user = await response.json();
if (response.ok) {
  console.log('User data:', user);
} else {
  console.error('Failed to fetch user:', user);
}
```

### Example: Update Profile
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('http://localhost:8000/api/user/profile/update/', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    department: 'Computer Science',
    year_of_study: 'senior',
    bio: 'Updated bio'
  })
});

const data = await response.json();
if (response.ok) {
  console.log('Profile updated:', data.user);
} else {
  console.error('Update failed:', data);
}
```

---

## 🎓 Using in Frontend

The frontend service already handles these requests:

```javascript
import { apiService, authService } from '@/services';

// Sign up
await authService.register({
  first_name: 'John',
  // ... other fields
});

// Sign in
await authService.login('johndoe', 'password');

// Get current user
const user = await apiService.getCurrentUser();

// Update profile
await apiService.updateUserProfile({
  department: 'Computer Science'
});

// Sign out
await authService.logout();
```

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Auth required or failed |
| 403 | Forbidden - Not allowed |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Backend error |

---

## 🔒 Authentication Header

All authenticated requests must include:
```
Authorization: Bearer {token}
```

Where `{token}` is the token received from sign-up or sign-in.

---

## 💾 Token Storage

Frontend stores token in localStorage:
```javascript
localStorage.getItem('authToken')      // Retrieve token
localStorage.setItem('authToken', token)  // Store token
localStorage.removeItem('authToken')   // Remove token
```

---

## ⏱️ Token Expiration

- Tokens expire after **7 days**
- Check `expires_at` in responses
- Re-login when token expires
- Token automatically refreshed on each login

---

## 🚀 Testing the API

### Using Postman
1. Create new POST request
2. URL: `http://localhost:8000/api/auth/sign-in/`
3. Body → Raw → JSON:
   ```json
   {
     "username": "johndoe",
     "password": "SecurePassword123!"
   }
   ```
4. Send and check response

### Using REST Client (VS Code)
Create `requests.rest` file:
```
### Sign In
POST http://localhost:8000/api/auth/sign-in/
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePassword123!"
}

### Get Current User
@token = 550e8400-e29b-41d4-a716-446655440001

GET http://localhost:8000/api/user/me/
Authorization: Bearer {{token}}
```

---

**All endpoints are fully functional and ready to use! 🚀**
