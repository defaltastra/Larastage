import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
        {/* Colonne 1 - Logo + description */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            <span className="text-green-500">🎓 OFPPT</span> stage
          </h1>
          <p className="text-sm">
            La plateforme officielle qui connecte les stagiaires OFPPT avec des entreprises vérifiées pour trouver le stage parfait.
          </p>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h2 className="text-white font-semibold mb-3">Navigation</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Accueil</a></li>
            <li><a href="/stages" className="hover:underline">Offres de stage</a></li>
            <li><a href="/guide" className="hover:underline">Guide & Conseils</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Colonne 3 - Légal */}
        <div>
          <h2 className="text-white font-semibold mb-3">Légal</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/conditions" className="hover:underline">Conditions d'utilisation</a></li>
            <li><a href="/confidentialite" className="hover:underline">Politique de confidentialité</a></li>
            <li><a href="/mentions" className="hover:underline">Mentions légales</a></li>
          </ul>
        </div>

        {/* Colonne 4 - Contact */}
        <div>
          <h2 className="text-white font-semibold mb-3">Contact</h2>
          <ul className="text-sm space-y-1">
            <li>contact@ofppt-stage.ma</li>
            <li>+212 5 22 XX XX XX</li>
            <li>Casablanca, Maroc</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4 px-4 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto text-sm">
        <p className="mb-2 md:mb-0">&copy; 2025 OFPPT Stage. Tous droits réservés.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white"><Facebook size={18} /></a>
          <a href="#" className="hover:text-white"><Twitter size={18} /></a>
          <a href="#" className="hover:text-white"><Instagram size={18} /></a>
          <a href="#" className="hover:text-white"><Linkedin size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
