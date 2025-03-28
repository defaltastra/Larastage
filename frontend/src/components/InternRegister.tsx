import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, FileText, AlertCircle, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterFormData {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  mot_de_passe_confirmation: string;
  domaine_etudes: string;
  cv: File | null;
}

interface FormErrors {
  nom?: string;
  prenom?: string;
  email?: string;
  mot_de_passe?: string;
  mot_de_passe_confirmation?: string;
  domaine_etudes?: string;
  cv?: string;
}

const InternRegister: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
    domaine_etudes: '',
    cv: null
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Calculate password strength
    if (name === 'mot_de_passe') {
      calculatePasswordStrength(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 2 * 1024 * 1024; // 2MB
      
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          cv: 'Please upload a PDF, DOC or DOCX file'
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          cv: 'File size must be less than 2MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        cv: file
      }));
      setErrors(prev => ({
        ...prev,
        cv: undefined
      }));
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Last name is required';
    if (!formData.prenom.trim()) newErrors.prenom = 'First name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.mot_de_passe) {
      newErrors.mot_de_passe = 'Password is required';
    } else if (formData.mot_de_passe.length < 8) {
      newErrors.mot_de_passe = 'Password must be at least 8 characters';
    }
    
    if (formData.mot_de_passe !== formData.mot_de_passe_confirmation) {
      newErrors.mot_de_passe_confirmation = 'Passwords do not match';
    }
    
    if (!formData.domaine_etudes) {
      newErrors.domaine_etudes = 'Field of study is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append('nom', formData.nom);
      formDataToSend.append('prenom', formData.prenom);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('mot_de_passe', formData.mot_de_passe);
      formDataToSend.append('mot_de_passe_confirmation', formData.mot_de_passe_confirmation);
      formDataToSend.append('domaine_etudes', formData.domaine_etudes);
      if (formData.cv) {
        formDataToSend.append('cv', formData.cv);
      }
  
      // 1. Get CSRF token
      let csrfToken = localStorage.getItem('csrfToken');
      if (!csrfToken) {
        const csrfResponse = await fetch('http://localhost:8000/csrf-token', {
          credentials: 'include'
        });
        
        if (!csrfResponse.ok) {
          throw new Error('Failed to fetch CSRF token');
        }
        
        const csrfData = await csrfResponse.json();
        csrfToken = csrfData.csrfToken;
        localStorage.setItem('csrfToken', csrfToken);
      }
  
      // 2. Make registration request
      const response = await fetch('http://localhost:8000/api/stagiaire/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        },
        credentials: 'include',
        body: formDataToSend
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Handle CSRF token mismatch
        if (response.status === 419) {
          // Refresh token and retry
          localStorage.removeItem('csrfToken');
          const newCsrfResponse = await fetch('http://localhost:8000/csrf-token', {
            credentials: 'include'
          });
          
          if (!newCsrfResponse.ok) {
            throw new Error('Failed to refresh CSRF token');
          }
          
          const newCsrfData = await newCsrfResponse.json();
          localStorage.setItem('csrfToken', newCsrfData.csrfToken);
          return handleSubmit(e); // Retry with new token
        }
        
        // Handle validation errors from server
        if (data.errors) {
          setErrors(data.errors);
          throw new Error('Please fix the form errors');
        }
        
        throw new Error(data.message || 'Registration failed');
      }
  
      // On success
      localStorage.setItem('stagiaire_token', data.token);
      localStorage.setItem('stagiaire', JSON.stringify(data.user));
      localStorage.removeItem('csrfToken'); // Cleanup
  
      toast.success('Registration successful! Redirecting...');
      setTimeout(() => navigate('/stagiaire/dashboard'), 2000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', validator: (p: string) => p.length >= 8 },
    { id: 2, text: 'At least 1 uppercase letter', validator: (p: string) => /[A-Z]/.test(p) },
    { id: 3, text: 'At least 1 number', validator: (p: string) => /[0-9]/.test(p) },
    { id: 4, text: 'At least 1 special character', validator: (p: string) => /[^A-Za-z0-9]/.test(p) }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Intern Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join OFPPT's internship platform to find the best opportunities
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={formData.nom}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.nom ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    required
                  />
                </div>
                {errors.nom && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {errors.nom}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    value={formData.prenom}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.prenom ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    required
                  />
                </div>
                {errors.prenom && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {errors.prenom}
                  </p>
                )}
              </div>
            </div>

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
                  required
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    autoComplete="new-password"
                    value={formData.mot_de_passe}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.mot_de_passe ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    required
                  />
                </div>
                
                <div className="mt-2">
                  <div className="flex gap-2 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level} 
                        className={`h-1 flex-1 rounded-full ${passwordStrength >= level ? 
                          (level <= 2 ? 'bg-red-500' : level === 3 ? 'bg-yellow-500' : 'bg-green-500') : 
                          'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    {passwordStrength === 0 ? 'Very weak' : 
                     passwordStrength === 1 ? 'Weak' : 
                     passwordStrength === 2 ? 'Moderate' : 
                     passwordStrength === 3 ? 'Strong' : 'Very strong'}
                  </p>
                </div>
                
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map(req => (
                    <div key={req.id} className="flex items-center text-xs">
                      {req.validator(formData.mot_de_passe) ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={req.validator(formData.mot_de_passe) ? 'text-green-600' : 'text-gray-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="mot_de_passe_confirmation" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mot_de_passe_confirmation"
                    name="mot_de_passe_confirmation"
                    type="password"
                    autoComplete="new-password"
                    value={formData.mot_de_passe_confirmation}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${errors.mot_de_passe_confirmation ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    required
                  />
                </div>
                {errors.mot_de_passe_confirmation && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {errors.mot_de_passe_confirmation}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="domaine_etudes" className="block text-sm font-medium text-gray-700">
                Field of Study
              </label>
              <select
                id="domaine_etudes"
                name="domaine_etudes"
                value={formData.domaine_etudes}
                onChange={handleChange}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${errors.domaine_etudes ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
                required
              >
                <option value="">Select your field</option>
                <option value="Informatique">Computer Science</option>
                <option value="Gestion">Management</option>
                <option value="Commerce">Business</option>
                <option value="Electronique">Electronics</option>
                <option value="Mecanique">Mechanical Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Communication">Communication</option>
              </select>
              {errors.domaine_etudes && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.domaine_etudes}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                CV (Optional)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="cv"
                  name="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {errors.cv && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  {errors.cv}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                PDF, DOC or DOCX (Max. 2MB)
              </p>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </>
                ) : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/stagiaire/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in to your account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternRegister;