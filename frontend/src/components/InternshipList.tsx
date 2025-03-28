import React from 'react';
import { Building2, CheckCircle, MapPin, ArrowRight } from 'lucide-react';

export default function InternshipList() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Offres de Stage Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">Stage en Développement Web</h3>
                </div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  <span className="text-sm text-green-600">Entreprise vérifiée</span>
                </div>
                <div className="text-gray-600 mb-4">
                  <p className="mb-2">Entreprise ABC</p>
                  <p className="flex items-center">
                    <MapPin size={16} className="mr-1" /> Casablanca
                  </p>
                </div>
                <p className="text-gray-600 mb-4">
                  Rejoignez notre équipe dynamique pour un stage enrichissant en développement web...
                </p>
                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    Voir les détails <ArrowRight size={16} className="ml-1" />
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Postuler
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}