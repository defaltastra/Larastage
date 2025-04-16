import React, { useState, useEffect } from 'react';
import { Search, BookOpen, MessageSquare, Video, HelpCircle, Send } from 'lucide-react';

// Types
type Article = {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
};

type Video = {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

// Mock data
const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Comment rédiger un CV percutant",
    category: "CV & Lettre de motivation",
    summary: "Découvrez les astuces pour créer un CV qui attire l'attention des recruteurs.",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 2,
    title: "Les clés d'un entretien réussi",
    category: "Entretien de stage",
    summary: "Préparez-vous efficacement pour vos entretiens de stage avec ces conseils pratiques.",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 3,
    title: "Communication professionnelle",
    category: "Communication en entreprise",
    summary: "Apprenez les bases de la communication en milieu professionnel.",
    content: "Contenu détaillé de l'article..."
  },
  {
    id: 4,
    title: "Guide de rédaction du rapport de stage",
    category: "Rédiger son rapport de stage",
    summary: "Structurez et rédigez votre rapport de stage de manière professionnelle.",
    content: "Contenu détaillé de l'article..."
  }
];

const VIDEOS: Video[] = [
  {
    id: 1,
    title: "Créer un CV efficace",
    url: "https://www.youtube.com/embed/example1",
    thumbnail: "https://img.youtube.com/vi/example1/maxresdefault.jpg"
  },
  {
    id: 2,
    title: "Préparation à l'entretien",
    url: "https://www.youtube.com/embed/example2",
    thumbnail: "https://img.youtube.com/vi/example2/maxresdefault.jpg"
  }
];

const FAQS: FAQ[] = [
  {
    id: 1,
    question: "Quelle est la durée idéale d'un stage ?",
    answer: "La durée idéale dépend de votre formation et des objectifs du stage. En général, un stage PFE dure entre 3 et 6 mois."
  },
  {
    id: 2,
    question: "Comment trouver un stage ?",
    answer: "Utilisez notre plateforme StageOFPPT pour découvrir des offres adaptées à votre profil. N'oubliez pas de personnaliser votre CV et lettre de motivation pour chaque candidature."
  }
];

export default function GuideAndTips() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [helpMessage, setHelpMessage] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [...new Set(ARTICLES.map(article => article.category))];

  const filteredArticles = ARTICLES.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement help form submission
    console.log('Help message:', helpMessage);
    setHelpMessage('');
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Parallax Effect */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollPosition * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen bg-gray-50/95 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 animate-fade-in">
            Guide & Conseils
          </h1>

          {/* Search Section */}
          <div className="bg-white/90 rounded-lg shadow-md p-6 mb-8 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02]">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tous
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredArticles.map((article, index) => (
              <div
                key={article.id}
                className="bg-white/90 rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center text-purple-600 mb-2">
                  <BookOpen size={16} className="mr-2" />
                  <span className="text-sm font-medium">{article.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300">
                  Lire plus →
                </button>
              </div>
            ))}
          </div>

          {/* Videos Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Video className="mr-2 text-purple-600" size={24} />
              Tutoriels Vidéo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VIDEOS.map(video => (
                <div 
                  key={video.id} 
                  className="bg-white/90 rounded-lg shadow-md overflow-hidden backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HelpCircle className="mr-2 text-purple-600" size={24} />
              Questions Fréquentes
            </h2>
            <div className="space-y-4">
              {FAQS.map(faq => (
                <div 
                  key={faq.id} 
                  className="bg-white/90 rounded-lg shadow-md p-6 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.01]"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Help Form */}
          <div className="bg-white/90 rounded-lg shadow-md p-6 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="mr-2 text-purple-600" size={24} />
              Besoin d'aide ?
            </h2>
            <form onSubmit={handleHelpSubmit} className="space-y-4">
              <div>
                <textarea
                  value={helpMessage}
                  onChange={(e) => setHelpMessage(e.target.value)}
                  placeholder="Posez votre question ici..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
              >
                <Send className="mr-2" size={20} />
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}