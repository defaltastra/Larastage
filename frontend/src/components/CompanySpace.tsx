import React from 'react';
import { Building2, Users, FileCheck } from 'lucide-react';

export default function CompanySpace() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Espace Entreprise</h2>
          <p className="mt-4 text-gray-600">Gérez vos offres de stage et les candidatures reçues</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Building2 className="text-blue-600 mr-4" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">Mes Offres</h3>
                <p className="text-sm text-gray-600">Gérez vos offres de stage</p>
              </div>
              <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Publier une offre
              </button>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Users className="text-blue-600 mr-4" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">Candidatures Reçues</h3>
                <p className="text-sm text-gray-600">Consultez et gérez les candidatures</p>
              </div>
              <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Voir tout
              </button>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <FileCheck className="text-blue-600 mr-4" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">Vérification</h3>
                <p className="text-sm text-gray-600">Statut de vérification de l'entreprise</p>
              </div>
              <span className="ml-auto text-green-600 font-medium">Vérifié ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}