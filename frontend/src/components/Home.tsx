import React, { useState, useEffect } from 'react';
import { Search, MapPin, BookOpen, Building2, ArrowRight, CheckCircle } from 'lucide-react';

interface OffreDetails {
  id: number;
  titre: string;
  entreprise: {
    name: string;
    logo?: string;
  };
  localisation: string;
  description: string;
}

export default function Home() {
  const [offers, setOffers] = useState<OffreDetails[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<OffreDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');

  useEffect(() => {
    // Fetch offers from the backend
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/offres');
        const data = await response.json();
        if (data.success) {
          setOffers(data.data);
          setFilteredOffers(data.data); // Initialize filtered offers with all data
        } else {
          console.error('Failed to fetch offers');
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  useEffect(() => {
    // Filter offers based on searchQuery and locationQuery
    const filtered = offers.filter((offer) =>
      offer.titre.toLowerCase().includes(searchQuery.toLowerCase()) &&
      offer.localisation.toLowerCase().includes(locationQuery.toLowerCase())
    );
    setFilteredOffers(filtered);
  }, [searchQuery, locationQuery, offers]); // Re-filter when search query or location query changes

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query as you type
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Localisation"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)} // Update location query as you type
                />
              </div>
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
            {loading ? (
              <div className="text-center col-span-full">Chargement des offres...</div>
            ) : (
              filteredOffers.map((offer) => (
                <div key={offer.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Building2 className="text-blue-600 mr-2" size={24} />
                      <h3 className="text-xl font-semibold text-gray-900">{offer.titre}</h3>
                    </div>
                    <div className="text-gray-600 mb-4">
                      <p className="mb-2">{offer.entreprise.name}</p>
                      <p className="flex items-center">
                        <MapPin size={16} className="mr-1" /> {offer.localisation}
                      </p>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {offer.description.substring(0, 100)}...
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
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
