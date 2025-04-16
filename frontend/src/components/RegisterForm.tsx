import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

interface RegisterFormProps {
  type: 'intern' | 'company';
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}

export default function RegisterForm({ type }: RegisterFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    authority: '',
    password: '',
    confirmPassword: '',
    companyDescription: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation de l'email
    if (type === 'intern') {
      if (!formData.email.endsWith('@ofppt-edu.ma')) {
        newErrors.email = 'Veuillez utiliser une adresse email OFPPT (@ofppt-edu.ma)';
      }
    } else {
      if (!formData.email.includes('@')) {
        newErrors.email = 'Veuillez entrer une adresse email valide';
      }
    }

    // Validation du mot de passe
    if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    // Validation de la confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Validation du numéro de téléphone (pour les stagiaires)
    if (type === 'intern') {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Veuillez entrer un numéro de téléphone valide (10 chiffres)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // TODO: Implement form submission logic
        console.log('Form submitted:', formData);
        
        // Simuler un délai pour l'envoi du formulaire
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSuccess(true);
        // Rediriger vers la page d'accueil après 2 secondes
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900">
            Inscription réussie !
          </h2>
          <p className="text-gray-600">
            Vous allez être redirigé vers la page d'accueil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <button
        onClick={() => navigate('/register')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-300"
      >
        <ArrowLeft className="mr-2" size={20} />
        Retour
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'intern' ? 'Inscription Stagiaire' : 'Inscription Entreprise'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'intern' ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="06XXXXXXXX"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="mr-1" size={16} />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email OFPPT
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@ofppt-edu.ma"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="mr-1" size={16} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Autorité de formation
              </label>
              <select
                name="authority"
                value={formData.authority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                required
              >
                <option value="">Sélectionnez votre autorité</option>
                <option value="OFPPT">OFPPT</option>
                <option value="Université">Université</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email de l'entreprise
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="mr-1" size={16} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                À propos de votre entreprise
              </label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                rows={4}
                placeholder="Décrivez brièvement votre entreprise..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
            }`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="mr-1" size={16} />
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
              errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
            }`}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="mr-1" size={16} />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
          }`}
        >
          {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
} 