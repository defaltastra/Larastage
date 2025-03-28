import React from 'react';
import { Search, MapPin, BookOpen, Building2, ArrowRight, Shield, BookCheck, Users, FileCheck, GraduationCap, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Votre carrière commence ici avec
              <span className="text-blue-600"> OFPPT Stage</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              La plateforme officielle qui connecte les stagiaires OFPPT avec des entreprises vérifiées. 
              Trouvez le stage parfait pour votre formation.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <BookOpen className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Domaine d'études"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Localisation"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center">
                <Search size={20} className="mr-2" />
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Une plateforme sécurisée et fiable</h2>
            <p className="mt-4 text-gray-600">Nous garantissons la qualité des offres de stage</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Shield className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Entreprises Vérifiées</h3>
              </div>
              <p className="text-gray-600">Toutes les entreprises sont vérifiées pour garantir des offres authentiques</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Users className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Email OFPPT</h3>
              </div>
              <p className="text-gray-600">Connexion sécurisée avec votre email officiel OFPPT</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <FileCheck className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Candidature Simple</h3>
              </div>
              <p className="text-gray-600">Postulez en quelques clics et suivez vos candidatures</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Internships */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Offres de Stage Récentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
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

      {/* Guide Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Guide & Conseils
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <BookCheck className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Rédiger un CV parfait</h3>
              </div>
              <p className="text-gray-600">Apprenez à créer un CV qui se démarque et attire l'attention des recruteurs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <FileCheck className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Lettre de motivation</h3>
              </div>
              <p className="text-gray-600">Des conseils pour rédiger une lettre de motivation convaincante.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <GraduationCap className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Préparer l'entretien</h3>
              </div>
              <p className="text-gray-600">Les meilleures pratiques pour réussir vos entretiens de stage.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Témoignages de Stagiaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "Grâce à OFPPT Stage, j'ai trouvé mon stage en développement web en moins d'une semaine. Le processus était simple et sécurisé."
              </p>
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Ahmed B.</p>
                  <p className="text-sm text-gray-500">Développeur Web</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "La vérification des entreprises m'a donné confiance pour postuler. J'ai maintenant un stage enrichissant dans une entreprise sérieuse."
              </p>
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Fatima L.</p>
                  <p className="text-sm text-gray-500">Technicienne en Gestion</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "Les guides et conseils m'ont vraiment aidé à préparer mon CV et mon entretien. Je recommande cette plateforme!"
              </p>
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Karim M.</p>
                  <p className="text-sm text-gray-500">Technicien en Électronique</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}