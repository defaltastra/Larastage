import React, { useState, useEffect } from 'react';
import { FileCheck, GraduationCap } from 'lucide-react';

export default function InternSpace() {
  const [cv, setCv] = useState(null);
  const [candidatures, setCandidatures] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    fetchCv();
    fetchCandidatures();
  }, []);

  const fetchCv = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(`http://127.0.0.1:8000/api/stagiaire/cv?id=${user.id}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      const data = await response.json();
      console.log("Fetched CV:", data);

      if (!response.ok || !data.cv) throw new Error("No CV uploaded");
      setCv(data.cv);
    } catch (error) {
      console.error('Error fetching CV:', error);
      setError('Failed to load CV');
    }
  };

  const fetchCandidatures = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        throw new Error('User ID not found in localStorage');
      }
  
      const response = await fetch(`http://127.0.0.1:8000/api/stagiaire/candidatures?stagiaire_id=${user.id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Failed to fetch applications');
  
      const data = await response.json();
      console.log("Fetched Candidatures:", data);  // Log the data here
  
      setCandidatures(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications');
    }
  };
  
  
  const handleCvUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) throw new Error('User not found in local storage');

      const formData = new FormData();
      formData.append('id', user.id);
      formData.append('cv', file);

      const response = await fetch('http://127.0.0.1:8000/api/stagiaire/cv/upload', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': 'CSRF_TOKEN',
        },
        body: formData,
        credentials: 'include', 
      });

      if (!response.ok) throw new Error('Failed to upload CV');

      const data = await response.json();
      setCv(data.cv);
      setError(null);
    } catch (error) {
      console.error('Error uploading CV:', error);
      setError('Veuillez Telecharger Votre CV');
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Espace Stagiaire</h2>
          <p className="mt-4 text-gray-600">Gérez vos candidatures et votre profil</p>
        </div>
        
        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <FileCheck className="text-blue-600 mr-4" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">Mon CV</h3>
                <p className="text-sm text-gray-600">
                  {cv ? (
                    <a href={cv} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                      Voir le CV
                    </a>
                  ) : (
                    'Aucun CV téléchargé'
                  )}
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCvUpload}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
              >
                {cv ? 'Mettre à jour' : 'Télécharger'}
              </label>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <GraduationCap className="text-blue-600 mr-4" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">Mes Candidatures</h3>
                <p className="text-sm text-gray-600">
                  {candidatures.length} candidature(s) en cours
                </p>
              </div>
              <button
                className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={openModal}
              >
                Voir tout
              </button>
            </div>
          </div>
        </div>
{/* Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full overflow-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Mes Candidatures</h2>
      
      <ul>
        {candidatures.length > 0 ? (
          candidatures.map((candidature, index) => (
            <li key={index} className="py-4 border-b flex items-center space-x-4 hover:bg-gray-100 transition-all">
              <div className="flex items-center space-x-4 w-full">
                {/* Icon and status */}
                <div className={`w-8 h-8 flex justify-center items-center rounded-full ${candidature.statut === 'Accepté' ? 'bg-green-500' : candidature.statut === 'Refusé' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                  {/* Dynamic icon based on status */}
                  {candidature.statut === 'Accepté' && <span className="text-white text-xl">✔️</span>}
                  {candidature.statut === 'Refusé' && <span className="text-white text-xl">❌</span>}
                  {candidature.statut === 'En attente' && <span className="text-white text-xl">⏳</span>}
                </div>

                <div className="flex-1">
                  {/* Title and description */}
                  <p className="font-semibold text-gray-800">{candidature.titre || "No Title"}</p>
                  <p className="text-gray-600">{candidature.description || "No Description"}</p>
                </div>

                {/* Status */}
                <div className="text-sm font-semibold text-gray-600">
                  {candidature.statut || "No Status"}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600 py-4">Aucune candidature disponible.</p>
        )}
      </ul>

      <div className="mt-6 flex justify-end">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
          onClick={closeModal}
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
