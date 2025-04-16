import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="pt-24 px-4 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl font-bold text-indigo-600 mb-4 animate-text-gradient bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou suggestion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <div className={`bg-white rounded-xl p-8 shadow-lg transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Formulaire de contact</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Votre email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sujet</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Sujet de votre message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Votre message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-2">
                  <Send size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  Envoyer le message
                </span>
              </button>
            </form>
          </div>

          {/* Coordonnées */}
          <div className="space-y-6">
            <div className={`bg-white rounded-xl p-8 shadow-lg transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Coordonnées</h2>
              <p className="text-gray-600 mb-6">
                Vous pouvez également nous contacter directement via les coordonnées ci-dessous.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <div className="p-2 bg-indigo-100 rounded-full transform transition-all duration-300 group-hover:scale-110">
                    <Mail className="text-indigo-600" size={20} />
                  </div>
                  <span className="text-gray-700">contact@stageoffreprojet.ma</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <div className="p-2 bg-indigo-100 rounded-full transform transition-all duration-300 group-hover:scale-110">
                    <Phone className="text-indigo-600" size={20} />
                  </div>
                  <span className="text-gray-700">+212 5XX-XXXXXX</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <div className="p-2 bg-indigo-100 rounded-full transform transition-all duration-300 group-hover:scale-110">
                    <MapPin className="text-indigo-600" size={20} />
                  </div>
                  <span className="text-gray-700">123 Avenue Ain hayat, Skhirat, Maroc</span>
                </div>
              </div>
            </div>

            <div className={`bg-white rounded-xl p-8 shadow-lg transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                <Clock className="text-indigo-500" size={20} />
                Heures d'ouverture
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 hover:bg-indigo-50 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <span className="text-gray-700">Lundi - Vendredi</span>
                  <span className="text-indigo-600 font-medium">9h00 – 18h00</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-indigo-50 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <span className="text-gray-700">Samedi</span>
                  <span className="text-indigo-600 font-medium">9h00 – 13h00</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-indigo-50 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <span className="text-gray-700">Dimanche</span>
                  <span className="text-red-500 font-medium">Fermé</span>
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 shadow-lg transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="text-white" size={24} />
                <h4 className="text-xl font-semibold text-white">Besoin d'aide rapidement ?</h4>
              </div>
              <p className="text-indigo-100 mb-6">
                Notre équipe de support est disponible pour vous aider en temps réel.
              </p>
              <button className="w-full bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium transform transition-all duration-300 hover:scale-105 hover:bg-indigo-50 relative overflow-hidden group">
                <span className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Démarrer un chat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carte */}
        <div className={`mt-12 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">Notre emplacement</h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=https://maps.app.goo.gl/ttBou4xZTQ1dP2Cv5"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
