import React, { useEffect, useState } from 'react';
import { Building2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OffreDetails {
  id: number;
  titre: string;
  description: string;
  localisation: string;
  domaine: string;
  entreprise: {
    name: string;
    description: string;
    logo?: string;
  };
}

const InternshipList: React.FC = () => {
  const [offres, setOffres] = useState<OffreDetails[]>([]); // State to store all offers
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch all internship offers
    fetch('http://127.0.0.1:8000/api/offres', {
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOffres(data.data); // Set the fetched offers data
        }
      })
      .catch((error) => console.error('Error fetching offers:', error))
      .finally(() => setLoading(false)); // Stop loading once the fetch is complete
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading internship offers...</p>;
  if (offres.length === 0) return <p className="text-center text-red-600">No internships found.</p>;

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {offres.map((offre) => (
          <div key={offre.id} className="bg-white rounded-lg shadow-xl p-8 mb-6">
            {offre.entreprise.logo && (
              <div className="flex justify-center mb-6">
                <img
                  src={offre.entreprise.logo}
                  alt={`${offre.entreprise.name} logo`}
                  className="h-20 w-20 object-cover rounded-full shadow-md"
                />
              </div>
            )}
            <h2 className="text-3xl font-bold text-gray-900 text-center">{offre.titre}</h2>
            <div className="flex justify-center items-center text-gray-700 mt-2">
              <Building2 className="text-blue-600 mr-2" size={24} />
              <h3 className="text-lg font-semibold">{offre.entreprise.name}</h3>
            
            </div>

            <div className="mt-6">
              <p className="text-gray-700 text-lg">{offre.description}</p>
              <p className="text-gray-600">
                <strong>Localisation:</strong> {offre.localisation}
              </p>
              <p className="text-gray-600">
                <strong>Domaine:</strong> {offre.domaine}
              </p>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900">À propos de l'entreprise</h4>
              <p className="text-gray-700 mt-2">{offre.entreprise.description}</p>
            </div>

            {/* "Voir plus de détails" button */}
            <div className="mt-6 text-center">
              <Link
                to={`/stages-details/${offre.id}`}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              >
                Voir plus de détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipList;
