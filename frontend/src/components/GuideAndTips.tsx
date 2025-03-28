import React from 'react';
import { BookOpen, FileText, Users, AlertCircle } from 'lucide-react';

export default function GuideAndTips() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Guide & Conseils</h2>
          <p className="mt-4 text-gray-600">Ressources pour réussir votre recherche de stage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CV Writing Guide */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <FileText className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-semibold">Rédiger un CV Professionnel</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>• Structure claire et professionnelle</li>
              <li>• Mise en valeur des compétences techniques</li>
              <li>• Importance des projets académiques</li>
              <li>• Conseils de mise en page</li>
            </ul>
            <button className="mt-4 text-blue-600 font-medium hover:text-blue-800">
              Lire le guide complet →
            </button>
          </div>

          {/* Cover Letter Guide */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <BookOpen className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-semibold">Lettre de Motivation</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>• Structure recommandée</li>
              <li>• Personnalisation par entreprise</li>
              <li>• Exemples et modèles</li>
              <li>• Erreurs à éviter</li>
            </ul>
            <button className="mt-4 text-blue-600 font-medium hover:text-blue-800">
              Voir les modèles →
            </button>
          </div>

          {/* Interview Preparation */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Users className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-semibold">Préparer l'Entretien</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>• Questions fréquentes</li>
              <li>• Comportement professionnel</li>
              <li>• Présentation de projets</li>
              <li>• Questions à poser</li>
            </ul>
            <button className="mt-4 text-blue-600 font-medium hover:text-blue-800">
              Se préparer →
            </button>
          </div>

          {/* Rights and Obligations */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-semibold">Droits et Obligations</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li>• Convention de stage</li>
              <li>• Durée légale</li>
              <li>• Assurance et sécurité</li>
              <li>• Gratification</li>
            </ul>
            <button className="mt-4 text-blue-600 font-medium hover:text-blue-800">
              En savoir plus →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}