import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, Building2, Users, CheckCircle2, Star, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Constants
const DOMAINS = [
  "Développement Web",
  "Gestion des Entreprises",
  "Économie",
  "Marketing Digital",
  "Ressources Humaines",
  "Finance",
  "Design Graphique",
  "Communication"
];

const LOCATIONS = [
  "Casablanca",
  "Rabat",
  "Oujda",
  "Salé",
  "Skhirat",
  "Marrakech",
  "Tanger",
  "Agadir"
];

const RECENT_OFFERS = [
  {
    id: 1,
    company: "Tech Solutions",
    location: "Casablanca",
    domain: "Développement Web",
    duration: "3 mois",
    description: "Stage en développement front-end avec React"
  },
  {
    id: 2,
    company: "Finance Corp",
    location: "Rabat",
    domain: "Finance",
    duration: "6 mois",
    description: "Stage en analyse financière"
  },
  {
    id: 3,
    company: "Marketing Pro",
    location: "Marrakech",
    domain: "Marketing Digital",
    duration: "4 mois",
    description: "Stage en marketing digital et réseaux sociaux"
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ahmed Benali",
    role: "Stagiaire en Développement Web",
    content: "Grâce à StageOFPPT, j'ai trouvé un stage qui correspondait parfaitement à mes compétences. L'interface est intuitive et les offres sont de qualité.",
    rating: 5
  },
  {
    id: 2,
    name: "Fatima Zahra",
    role: "Stagiaire en Marketing",
    content: "Une plateforme exceptionnelle qui m'a permis de trouver un stage dans une entreprise leader. Le processus de candidature est simple et efficace.",
    rating: 5
  }
];

export default function Home() {
  const [domain, setDomain] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search logic
    console.log('Searching for:', { domain, location });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Trouvez le stage qui vous correspond
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Des milliers d'opportunités pour les étudiants de l'OFPPT
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domaine
                </label>
                <div className="relative">
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Tous les domaines</option>
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <Briefcase className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Toutes les localisations</option>
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
              >
                <Search className="inline-block mr-2" size={20} />
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Recent Offers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Offres récentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RECENT_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-2">{offer.company}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-1" />
                {offer.location}
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Briefcase size={16} className="mr-1" />
                {offer.domain}
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Clock size={16} className="mr-1" />
                {offer.duration}
              </div>
              <p className="text-gray-700 mb-4">{offer.description}</p>
              <div className="flex justify-between">
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Voir +
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                  Postuler
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Building2 className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">1,234</h3>
              <p className="text-lg">Offres de stage</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">567</h3>
              <p className="text-lg">Entreprises partenaires</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">8,901</h3>
              <p className="text-lg">Stagiaires actifs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Sécurité</h3>
            <p className="text-gray-600">Toutes les offres sont vérifiées pour garantir votre sécurité</p>
          </div>
          <div className="text-center p-6">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Entreprises vérifiées</h3>
            <p className="text-gray-600">Nous travaillons uniquement avec des entreprises de confiance</p>
          </div>
          <div className="text-center p-6">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Interface intuitive</h3>
            <p className="text-gray-600">Une plateforme simple et efficace pour trouver votre stage</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StageOFPPT</h3>
              <p className="text-gray-400">
                La plateforme de référence pour trouver votre stage idéal
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Accueil</Link></li>
                <li><Link to="/stages" className="text-gray-400 hover:text-white">Offres de stage</Link></li>
                <li><Link to="/guide" className="text-gray-400 hover:text-white">Guide & Conseils</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@stageofppt.ma</li>
                <li>Tél: +212 6XX-XXXXXX</li>
                <li>Adresse: Rabat, Maroc</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StageOFPPT. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}