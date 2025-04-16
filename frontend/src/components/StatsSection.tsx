import React from 'react';
import { Users, Building2, Briefcase } from 'lucide-react';

export default function StatsSection() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <Briefcase className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-2">1,234</h3>
            <p className="text-lg">Offres de stage</p>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <Building2 className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-2">567</h3>
            <p className="text-lg">Entreprises partenaires</p>
          </div>
          <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-2">8,901</h3>
            <p className="text-lg">Stagiaires actifs</p>
          </div>
        </div>
      </div>
    </div>
  );
} 