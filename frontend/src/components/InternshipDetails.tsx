import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Building2, CheckCircle } from 'lucide-react';

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

const InternshipDetails: React.FC = () => {
  const { id } = useParams();
  const [offre, setOffre] = useState<OffreDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [applied, setApplied] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [csrfToken, setCsrfToken] = useState<string>(''); // Store CSRF token

  useEffect(() => {
    // 🔹 Fetch CSRF token first
    fetch(`http://127.0.0.1:8000/csrf-token`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((error) => console.error('Error fetching CSRF token:', error));

    // 🔹 Fetch Internship Details
    fetch(`http://127.0.0.1:8000/api/offres/${id}`, {
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOffre(data.data);
      })
      .catch((error) => console.error('Error fetching offer details:', error))
      .finally(() => setLoading(false));
  }, [id]);

  // 🔹 Apply Function - Includes CSRF Token
  const handleApply = () => {
    fetch(`http://127.0.0.1:8000/api/offres/${id}/apply`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken, // 🔥 Include CSRF Token
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setApplied(true);
          setMessage(data.message);
        } else {
          setMessage('Échec de la candidature. Veuillez réessayer.');
        }
      })
      .catch(() => setMessage('Erreur lors de la candidature.'));
  };

  if (loading) return <p className="text-center text-gray-600">Loading internship details...</p>;
  if (!offre) return <p className="text-center text-red-600">Internship not found</p>;

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {offre.entreprise.logo && (
            <div className="flex justify-center mb-6">
              <img src={offre.entreprise.logo} alt={`${offre.entreprise.name} logo`} className="h-20 w-20 object-cover rounded-full shadow-md" />
            </div>
          )}
          <h2 className="text-3xl font-bold text-gray-900 text-center">{offre.titre}</h2>
          <div className="flex justify-center items-center text-gray-700 mt-2">
            <Building2 className="text-blue-600 mr-2" size={24} />
            <h3 className="text-lg font-semibold">{offre.entreprise.name}</h3>
          
          </div>

          <div className="mt-6">
            <p className="text-gray-700 text-lg">{offre.description}</p>
            <p className="text-gray-600"><strong>Localisation:</strong> {offre.localisation}</p>
            <p className="text-gray-600"><strong>Domaine:</strong> {offre.domaine}</p>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-900">À propos de l'entreprise</h4>
            <p className="text-gray-700 mt-2">{offre.entreprise.description}</p>
          </div>

          <div className="mt-6 flex justify-center">
            {applied ? (
              <p className="text-green-600 font-semibold">{message}</p>
            ) : (
              <button
                onClick={handleApply}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              >
                Postuler Maintenant
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
