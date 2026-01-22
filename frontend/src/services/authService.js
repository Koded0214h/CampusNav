import apiService from './apiService';

class AuthService {
  constructor() {
    this.isAuthenticated = !!apiService.getStoredToken();
  }

  async checkServerConnection() {
    try {
      await apiService.healthCheck();
      return true;
    } catch {
      return false;
    }
  }

  async login(username, password) {
    try {
      const isOnline = await this.checkServerConnection();
      
      if (isOnline) {
        // Online mode - authenticate with server
        const response = await apiService.signIn({ username, password });
        apiService.setToken(response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        this.isAuthenticated = true;
        return response;
      } else {
        // Offline mode - check local storage
        const storedUsers = JSON.parse(localStorage.getItem('offlineUsers') || '[]');
        const user = storedUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
          const mockToken = 'offline_' + Date.now();
          apiService.setToken(mockToken);
          localStorage.setItem('userData', JSON.stringify(user));
          this.isAuthenticated = true;
          return { token: mockToken, user };
        } else {
          throw new Error('Invalid credentials');
        }
      }
    } catch (error) {
      this.isAuthenticated = false;
      throw error;
    }
  }

  async register(userData) {
    try {
      const isOnline = await this.checkServerConnection();
      
      if (isOnline) {
        // Online mode - register with server
        const response = await apiService.signUp(userData);
        apiService.setToken(response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        this.isAuthenticated = true;
        return response;
      } else {
        // Offline mode - store locally
        const storedUsers = JSON.parse(localStorage.getItem('offlineUsers') || '[]');
        
        // Check for existing username/email
        if (storedUsers.some(u => u.username === userData.username)) {
          throw new Error('Username already exists');
        }
        if (storedUsers.some(u => u.university_email === userData.university_email)) {
          throw new Error('Email already registered');
        }
        
        // Create user profile with mock defaults
        const newUser = {
          id: Date.now(),
          first_name: userData.first_name || 'New',
          last_name: userData.last_name || 'Student',
          username: userData.username || 'newstudent' + Date.now(),
          university_email: userData.university_email || 'student@university.edu',
          student_id: '2024-NS-' + Math.floor(Math.random() * 9999), // Auto-generated
          phone_number: userData.phone_number || '+1 (555) 000-0000',
          password: userData.password,
          created_at: new Date().toISOString(),
          profile_picture: '/profile.png',
          department: 'Undeclared',
          year_of_study: 'Freshman',
          bio: 'Welcome to campus! Ready to explore and learn.'
        };
        
        storedUsers.push(newUser);
        localStorage.setItem('offlineUsers', JSON.stringify(storedUsers));
        
        const mockToken = 'offline_' + Date.now();
        apiService.setToken(mockToken);
        localStorage.setItem('userData', JSON.stringify(newUser));
        this.isAuthenticated = true;
        
        return { token: mockToken, user: newUser };
      }
    } catch (error) {
      this.isAuthenticated = false;
      throw error;
    }
  }

  async logout() {
    try {
      await apiService.signOut();
      this.isAuthenticated = false;
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async verifySession() {
    const token = apiService.getStoredToken();
    if (!token) {
      this.isAuthenticated = false;
      return false;
    }

    try {
      const response = await apiService.verifyToken(token);
      this.isAuthenticated = true;
      localStorage.setItem('userData', JSON.stringify(response.user));
      return true;
    } catch {
      this.isAuthenticated = false;
      apiService.clearToken();
      return false;
    }
  }

  getCurrentUser() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      // Provide mock defaults for missing data
      return {
        first_name: user.first_name || 'John',
        last_name: user.last_name || 'Doe',
        username: user.username || 'johndoe',
        university_email: user.university_email || 'john.doe@university.edu',
        student_id: user.student_id || '2024-JD-' + Math.floor(Math.random() * 9999),
        phone_number: user.phone_number || '+1 (555) 123-4567',
        department: user.department || 'Computer Science',
        year_of_study: user.year_of_study || 'Senior',
        bio: user.bio || 'Passionate student exploring campus life and academics.',
        profile_picture: user.profile_picture || '/profile.png',
        created_at: user.created_at || new Date().toISOString(),
        ...user
      };
    }
    // Return mock user if no data exists
    return {
      first_name: 'Demo',
      last_name: 'Student',
      username: 'demostudent',
      university_email: 'demo.student@university.edu',
      student_id: '2024-DS-' + Math.floor(Math.random() * 9999),
      phone_number: '+1 (555) 987-6543',
      department: 'General Studies',
      year_of_study: 'Sophomore',
      bio: 'New to campus navigation and excited to explore!',
      profile_picture: '/profile.png',
      created_at: new Date().toISOString()
    };
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  async resetPassword(email) {
    return apiService.requestPasswordReset(email);
  }
}

export default new AuthService();
