import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginFormData {
  email: string;
  mot_de_passe: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const InternLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    mot_de_passe: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.mot_de_passe) {
      newErrors.mot_de_passe = 'Password is required';
    } else if (formData.mot_de_passe.length < 8) {
      newErrors.mot_de_passe = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fetch CSRF token directly without storing it
  const getCsrfToken = async (): Promise<string> => {
    try {
      const response = await fetch('http://127.0.0.1:8000/csrf-token', {
        credentials: 'include' // Important for sending cookies
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      console.error('CSRF Token Error:', error);
      toast.error('Failed to retrieve CSRF token');
      throw error;
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      // Fetch CSRF token directly before making the login request
      const csrfToken = await getCsrfToken();

      const response = await fetch('http://127.0.0.1:8000/api/stagiaire/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        // Store token and user info in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Dispatch custom event to trigger auth state update
        window.dispatchEvent(new Event('auth-change'));

        // Dispatch storage event for cross-tab synchronization
        window.localStorage.setItem('auth-event', JSON.stringify({
          type: 'login',
          timestamp: Date.now()
        }));

        toast.success('Login successful! Redirecting...');
        navigate('/espace-stagiaire');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await handleLogin();
  };

  // Optional: Add event listener for additional synchronization
  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === 'auth-event') {
        try {
          const authEvent = JSON.parse(e.newValue || '{}');
          if (authEvent.type === 'login') {
            // Additional sync logic if needed
            console.log('Login detected in another tab');
          }
        } catch (error) {
          console.error('Error parsing auth event', error);
        }
      }
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageEvent);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Intern Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Use your OFPPT credentials to access your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="mot_de_passe" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="mot_de_passe"
                  name="mot_de_passe"
                  type="password"
                  autoComplete="current-password"
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.mot_de_passe ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
              {errors.mot_de_passe && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.mot_de_passe}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InternLogin;