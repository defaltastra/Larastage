import React from 'react';
import { FileCheck, GraduationCap } from 'lucide-react';

export default function InternSpace() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Espace Stagiaire</h2>
          <p className="mt-4 text-gray-600">Gérez vos candidatures et votre profil</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <FileCheck className="text-blue-600 mr-4" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">Mon CV</h3>
                <p className="text-sm text-gray-600">Téléchargez ou mettez à jour votre CV</p>
              </div>
              <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Mettre à jour
              </button>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <GraduationCap className="text-blue-600 mr-4" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">Mes Candidatures</h3>
                <p className="text-sm text-gray-600">Suivez l'état de vos candidatures</p>
              </div>
              <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Voir tout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}