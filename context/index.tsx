"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/constants/baseUrl';

interface User {
  id: number;
  username: string;
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch(BASE_URL + 'api/auth/current_loogged_user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            // localStorage.removeItem('authToken');
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          // localStorage.removeItem('authToken');
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
    
      const response = await fetch(BASE_URL +'api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
        
      console.log('====================================');
      console.log(data.token);
      console.log('====================================');
      
      if (data.success) {      
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        router.push('/'); // Redirect to dashboard or any other page after login
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
      
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const response = await fetch( BASE_URL +'api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          // localStorage.removeItem('authToken');
          setUser(null);
          router.push('/'); // Redirect to home or login page after logout
        } else {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Logout failed');
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
