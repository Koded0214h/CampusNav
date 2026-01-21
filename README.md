# CampusNav
CampusNav is a campus-specific navigation platform that helps students, freshers, and visitors easily locate and navigate key places within a university environment. Built on top of Google Maps, CampusNav adds student context, localized naming, and community insights that traditional map services often miss.

## Setup Instructions

### Backend (Django)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```
4. Run the server:
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://localhost:8000/api/`.

### Frontend (React + Vite)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Set up environment variables:
   Create a `.env` file in `frontend/` and add your Google Maps API Key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
   *Note: Without a key, the map will show a placeholder visualization.*

4. Run the development server:
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173`.