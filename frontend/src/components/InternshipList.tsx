import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, Bookmark, BookmarkCheck, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Types
type FilterType = {
  domain: string;
  city: string;
  duration: string;
  type: string;
};

type InternshipOffer = {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  duration: string;
  type: string;
  domain: string;
  isNew: boolean;
  isUrgent: boolean;
  isSaved: boolean;
};

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

const CITIES = [
  "Casablanca",
  "Rabat",
  "Oujda",
  "Salé",
  "Skhirat",
  "Marrakech",
  "Tanger",
  "Agadir"
];

const DURATIONS = [
  "1-3 mois",
  "3-6 mois",
  "6 mois et plus"
];

const TYPES = [
  "Stage d'observation",
  "Stage PFE",
  "Stage d'été",
  "Stage professionnel"
];

// Mock data
const MOCK_OFFERS: InternshipOffer[] = [
  {
    id: 1,
    title: "Développeur Front-end React",
    company: "Tech Solutions",
    description: "Recherche d'un stagiaire pour développer des interfaces utilisateur modernes avec React et TypeScript.",
    location: "Casablanca",
    duration: "3-6 mois",
    type: "Stage PFE",
    domain: "Développement Web",
    isNew: true,
    isUrgent: false,
    isSaved: false
  },
  {
    id: 2,
    title: "Assistant Marketing Digital",
    company: "Marketing Pro",
    description: "Stage en marketing digital avec focus sur la gestion des réseaux sociaux et le content marketing.",
    location: "Rabat",
    duration: "3-6 mois",
    type: "Stage d'été",
    domain: "Marketing Digital",
    isNew: false,
    isUrgent: true,
    isSaved: false
  },
  {
    id: 3,
    title: "Analyste Financier",
    company: "Finance Corp",
    description: "Stage en analyse financière et reporting pour les étudiants en finance.",
    location: "Casablanca",
    duration: "6 mois et plus",
    type: "Stage PFE",
    domain: "Finance",
    isNew: false,
    isUrgent: false,
    isSaved: false
  }
];

export default function InternshipList() {
  const [filters, setFilters] = useState<FilterType>({
    domain: '',
    city: '',
    duration: '',
    type: ''
  });
  const [offers, setOffers] = useState<InternshipOffer[]>(MOCK_OFFERS);
  const [currentPage, setCurrentPage] = useState(1);
  const offersPerPage = 6;

  const handleFilterChange = (key: keyof FilterType, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const toggleSaveOffer = (id: number) => {
    setOffers(prev => prev.map(offer => 
      offer.id === id ? { ...offer, isSaved: !offer.isSaved } : offer
    ));
  };

  const filteredOffers = offers.filter(offer => {
    return (
      (!filters.domain || offer.domain === filters.domain) &&
      (!filters.city || offer.location === filters.city) &&
      (!filters.duration || offer.duration === filters.duration) &&
      (!filters.type || offer.type === filters.type)
    );
  });

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = filteredOffers.slice(indexOfFirstOffer, indexOfLastOffer);
  const totalPages = Math.ceil(filteredOffers.length / offersPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Offres de stage</h1>
        
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domaine
              </label>
              <select
                value={filters.domain}
                onChange={(e) => handleFilterChange('domain', e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Tous les domaines</option>
                {DOMAINS.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Toutes les villes</option>
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée
              </label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Toutes les durées</option>
                {DURATIONS.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Tous les types</option>
                {TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentOffers.map(offer => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  {offer.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                      Nouveau
                    </span>
                  )}
                  {offer.isUrgent && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleSaveOffer(offer.id)}
                  className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
                >
                  {offer.isSaved ? (
                    <BookmarkCheck size={20} className="text-purple-600" />
                  ) : (
                    <Bookmark size={20} />
                  )}
                </button>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{offer.title}</h3>
              <p className="text-gray-600 font-medium mb-2">{offer.company}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{offer.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin size={16} className="mr-1" />
                  {offer.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock size={16} className="mr-1" />
                  {offer.duration}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Briefcase size={16} className="mr-1" />
                  {offer.type}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Détails
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                  Postuler
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === page
                    ? 'bg-purple-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
