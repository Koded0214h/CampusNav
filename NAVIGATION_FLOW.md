# CampusNav Navigation Flow Documentation

## Overview
This document outlines the navigation structure and flow between different pages in the CampusNav application.

## Page Structure

### 1. **SearchMap** (`/dashboard`) - Main Landing Page
- **Purpose**: Primary interface after user signin
- **Features**: 
  - Search functionality for campus locations
  - Category buttons for quick navigation
  - Recent destinations list
  - Interactive map view

### 2. **ActiveSearchState** (`/active-search`) - Navigation Mode
- **Purpose**: Active navigation with turn-by-turn directions
- **Features**:
  - Route planning interface
  - Step-by-step navigation instructions
  - Transportation mode selection (Walk/Bike/Shuttle)

### 3. **StudentProfile** (`/profile`) - User Profile
- **Purpose**: User account management and activity history
- **Features**:
  - Profile information display
  - Navigation activity statistics
  - Recent reviews and saved places

### 4. **LocationDetails** (`/location`) - Place Information
- **Purpose**: Detailed information about specific campus locations
- **Features**:
  - Location photos and descriptions
  - Student reviews and ratings
  - Accessibility information

## Navigation Flow

### Primary Navigation Paths

```
Sign In → SearchMap (Main Hub)
    ├── Profile Image Click → StudentProfile
    ├── Category Buttons → LocationDetails
    ├── Recent Destinations → LocationDetails
    └── Directions Button → LocationDetails
```

### Detailed Navigation Map

#### From SearchMap (`/dashboard`)
- **Profile Image** → `/profile` (StudentProfile)
- **Notification Button** → `/profile` (StudentProfile)
- **Cafeterias Button** → `/location?category=cafeterias` (LocationDetails)
- **Hostels Button** → `/location?category=hostels` (LocationDetails)
- **Libraries Button** → `/location?category=libraries` (LocationDetails)
- **Gyms Button** → `/location?category=gyms` (LocationDetails)
- **Recent Destination Items** → `/location?place={place-id}` (LocationDetails)
- **Main Directions Button** → `/location` (LocationDetails)

#### From StudentProfile (`/profile`)
- **Back Button** → `/dashboard` (SearchMap)
- **Open Map Button** → `/dashboard` (SearchMap)
- **Sign Out Button** → `/sign-in` (SignIn)

#### From LocationDetails (`/location`)
- **Back Button** → `/dashboard` (SearchMap)
- **Directions Button** → `/location` (LocationDetails - same page with navigation mode)

#### From ActiveSearchState (`/active-search`)
- **Profile Image** → `/profile` (StudentProfile)
- **Logout Button** → `/` (SplashScreen)

## Navigation Components

### Universal Navigation Elements
1. **Profile Image**: Always clickable, leads to StudentProfile
2. **Back Buttons**: Consistently navigate back to SearchMap (main hub)
3. **Logo/Brand**: Static, no navigation (maintains brand presence)

### Page-Specific Navigation
1. **SearchMap**: Category-based navigation, recent destinations
2. **StudentProfile**: Activity-based navigation, account management
3. **LocationDetails**: Action-based navigation (directions, sharing)
4. **ActiveSearchState**: Navigation controls, route management

## URL Parameters

### LocationDetails Page
- `?category={category}` - Filter by location category
- `?place={place-id}` - Show specific place details

### Examples
- `/location?category=cafeterias` - Show cafeteria locations
- `/location?place=engineering-hall-4` - Show Engineering Hall 4 details
- `/location?place=central-library` - Show Central Library details

## Navigation State Management

### Authentication-Based Routing
- **Unauthenticated users**: Redirected to `/sign-in`
- **Authenticated users**: Access to all protected routes
- **Auto-redirect**: After signin → `/dashboard` (SearchMap)

### Route Protection
All main application routes require authentication:
- `/dashboard` (SearchMap)
- `/active-search` (ActiveSearchState)
- `/profile` (StudentProfile)
- `/location` (LocationDetails)

## User Experience Flow

### Typical User Journey
1. **Sign In** → Lands on SearchMap
2. **Browse Categories** → Click category → View LocationDetails
3. **Check Profile** → Click profile image → View StudentProfile
4. **Navigate Back** → Use back buttons → Return to SearchMap
5. **Active Navigation** → Access ActiveSearchState for turn-by-turn directions

### Quick Actions
- **Profile Access**: Click profile image from any page
- **Return to Map**: Back buttons always return to main SearchMap
- **Location Details**: Multiple entry points (categories, recent destinations, search)

## Technical Implementation

### Router Configuration
- Uses React Router for client-side routing
- Protected routes with authentication checks
- Fallback redirects for unauthorized access

### Navigation Hooks
- `useNavigate()` for programmatic navigation
- Click handlers on interactive elements
- URL parameter parsing for dynamic content

## Accessibility Considerations
- Keyboard navigation support
- Screen reader compatible navigation elements
- Clear visual indicators for clickable elements
- Consistent navigation patterns across pages