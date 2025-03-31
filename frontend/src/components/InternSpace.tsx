import React, { useState, useEffect } from 'react';
import { FileCheck, GraduationCap } from 'lucide-react';

export default function InternSpace() {
  const [cv, setCv] = useState(null);
  const [candidatures, setCandidatures] = useState([]);
  const [error, setError] = useState(null);

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
      const response = await fetch('http://127.0.0.1:8000/api/stagiaire/candidatures', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch applications');
      
      const data = await response.json();
      setCandidatures(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications');
    }
  };
  const getCsrfToken = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/csrf-token', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent
      });
  
      if (!response.ok) throw new Error('Failed to fetch CSRF token');
  
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  };
  const getUserFromLocalStorage = () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  };
  
  const handleCvUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;
  
      const user = getUserFromLocalStorage();
      if (!user || !user.id) throw new Error('User not found in local storage');
  
      const csrfToken = await getCsrfToken();
      if (!csrfToken) throw new Error('CSRF token is missing');
  
      const formData = new FormData();
      formData.append('id', user.id);
      formData.append('cv', file);
  
      const response = await fetch('http://127.0.0.1:8000/api/stagiaire/cv/upload', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrfToken, 
        },
        body: formData,
        credentials: 'include', // Important for authentication!
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
                onClick={() => {/* Add navigation logic */}}
              >
                Voir tout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}