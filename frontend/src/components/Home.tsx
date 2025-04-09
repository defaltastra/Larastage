import React, { useState, useEffect } from 'react';
import { MapPin, BookOpen, Briefcase, Calendar } from 'lucide-react';

interface JobDetails {
  titre: string;
  localisation: string;
  image: string;
  date_publication: string;
  lien: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');
  
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobDetails[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExternalData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://morocco-job-scraper.onrender.com/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const jobsData = data.jobs || [];
        setJobs(jobsData);
        setFilteredJobs(jobsData);
        
        // Get the latest 3 jobs
        setRecentJobs(jobsData.slice(0, 3));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExternalData();
  }, []);

  useEffect(() => {
    // Filter jobs based on searchQuery and locationQuery
    const filtered = jobs.filter((job) =>
      job.titre.toLowerCase().includes(searchQuery.toLowerCase()) &&
      job.localisation.toLowerCase().includes(locationQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
    setRecentJobs(filtered.slice(0, 3));
  }, [searchQuery, locationQuery, jobs]);

  return (
    <>
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

          <div className="mt-10 max-w-3xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <BookOpen className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Domaine d'études"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Localisation"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Emplois Externes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="text-center col-span-full">Chargement des offres d'emploi...</div>
            ) : error ? (
              <div className="text-center col-span-full text-red-500">Erreur: {error}</div>
            ) : recentJobs.length > 0 ? (
              recentJobs.map((job, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Briefcase className="text-blue-600 mr-2" size={24} />
                      <h3 className="text-xl font-semibold text-gray-900">{job.titre}</h3>
                    </div>
                    <div className="text-gray-600 mb-4">
                      <p className="flex items-center mb-2">
                        <MapPin size={16} className="mr-1" /> {job.localisation}
                      </p>
                      <p className="flex items-center">
                        <Calendar size={16} className="mr-1" /> {job.date_publication}
                      </p>
                    </div>
                    <div className="flex justify-end items-center mt-4">
                      <a 
                        href={`https://www.marocannonces.com/${job.lien}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block"
                      >
                        Voir l'annonce
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full">Aucune offre d'emploi disponible</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}