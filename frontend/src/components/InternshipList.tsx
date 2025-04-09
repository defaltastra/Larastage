import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Calendar, Briefcase, Monitor } from 'lucide-react';

interface EntrepriseDetails {
  name: string;
  logo?: string;
}

interface InternshipDetails {
  titre: string;
  entreprise: EntrepriseDetails;
  localisation: string;
  type: string;
  mode_travail: string;
  date_publication: string;
  lien: string;
}

interface JobDetails {
  titre: string;
  localisation: string;
  image: string;
  date_publication: string;
  lien: string;
}

const LocalInternshipList: React.FC = () => {
  const [internships, setInternships] = useState<InternshipDetails[]>([]);
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the data from your API endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://morocco-job-scraper.onrender.com/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        
        setInternships(data.internships || []);
        setJobs(data.jobs || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;

  if (error) return <p className="text-center text-red-600">{error}</p>;

  if (internships.length === 0 && jobs.length === 0) return <p className="text-center text-red-600">No internships or jobs found.</p>;

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Internship Opportunities and Jobs in IT</h1>
        
        {/* Render Internships */}
        {internships.map((internship, index) => (
          <div key={index} className="bg-white rounded-lg shadow-xl p-8 mb-6 transition-all hover:shadow-2xl">
            <div className="flex items-center mb-6">
              {internship.entreprise.logo ? (
                <div className="mr-4">
                  <img
                    src={internship.entreprise.logo}
                    alt={`${internship.entreprise.name} logo`}
                    className="h-16 w-16 object-cover rounded-full shadow-md"
                  />
                </div>
              ) : (
                <div className="mr-4 h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <Building2 size={32} className="text-gray-500" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{internship.titre}</h2>
                <div className="flex items-center text-gray-700 mt-1">
                  <Building2 className="text-blue-600 mr-2" size={16} />
                  <h3 className="text-lg font-semibold">{internship.entreprise.name}</h3>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="text-blue-600 mr-2" size={18} />
                <span>{internship.localisation}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="text-blue-600 mr-2" size={18} />
                <span>{internship.type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Monitor className="text-blue-600 mr-2" size={18} />
                <span>{internship.mode_travail}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="text-blue-600 mr-2" size={18} />
                <span>{internship.date_publication}</span>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-6">
              <a 
                href={internship.lien} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-blue-700 transition inline-block"
              >
                Voir l'annonce originale
              </a>
            </div>
          </div>
        ))}

        {/* Render Jobs */}
        {jobs.map((job, index) => {
          const jobLink = `https://www.marocannonces.com/${job.lien}`;
          return (
            <div key={index} className="bg-white rounded-lg shadow-xl p-8 mb-6 transition-all hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <img
                    src={job.image}
                    alt={job.titre}
                    className="h-16 w-16 object-cover rounded-full shadow-md"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{job.titre}</h2>
                  <div className="flex items-center text-gray-700 mt-1">
                    <MapPin className="text-blue-600 mr-2" size={16} />
                    <span className="text-lg font-semibold">{job.localisation}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="text-blue-600 mr-2" size={18} />
                <span>{job.date_publication}</span>
              </div>

              {/* Action button */}
              <div className="mt-6">
                <a 
                  href={jobLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-blue-700 transition inline-block"
                >
                  Voir l'annonce originale
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocalInternshipList;
