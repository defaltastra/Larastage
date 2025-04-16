import React, { useState } from 'react';
import { User, Building2, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginSelection() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    setSelectedType(type);
    setTimeout(() => {
      if (type === 'stagiaire') {
        navigate('/register-stagiaire');
      } else {
        navigate('/register/entreprise');
      }
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Bienvenue sur <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Stage OFPPT</span>
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez votre type de compte pour commencer votre parcours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stagiaire Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => handleSelect('stagiaire')}
            className={`relative group cursor-pointer ${
              selectedType === 'stagiaire' ? 'scale-105' : ''
            }`}
          >
            <motion.div
              className={`p-8 bg-white rounded-2xl shadow-xl transition-all duration-300 ${
                selectedType === 'stagiaire'
                  ? 'ring-4 ring-purple-500'
                  : 'hover:shadow-2xl'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 group-hover:from-purple-200 group-hover:to-indigo-200 transition-all duration-300">
                    <User className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Stagiaire</h3>
                <p className="text-gray-600 mb-6">Je suis un étudiant OFPPT</p>
                <AnimatePresence>
                  {selectedType === 'stagiaire' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center text-purple-600"
                    >
                      <span className="mr-2">Sélectionner</span>
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Entreprise Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => handleSelect('entreprise')}
            className={`relative group cursor-pointer ${
              selectedType === 'entreprise' ? 'scale-105' : ''
            }`}
          >
            <motion.div
              className={`p-8 bg-white rounded-2xl shadow-xl transition-all duration-300 ${
                selectedType === 'entreprise'
                  ? 'ring-4 ring-purple-500'
                  : 'hover:shadow-2xl'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 group-hover:from-purple-200 group-hover:to-indigo-200 transition-all duration-300">
                    <Building2 className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Entreprise</h3>
                <p className="text-gray-600 mb-6">Je suis une entreprise</p>
                <AnimatePresence>
                  {selectedType === 'entreprise' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center text-purple-600"
                    >
                      <span className="mr-2">Sélectionner</span>
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600">
            Déjà un compte ?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-300"
            >
              Connectez-vous
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
} 