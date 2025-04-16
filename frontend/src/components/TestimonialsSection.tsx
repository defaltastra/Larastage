import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmed Benali",
      role: "Stagiaire en Développement Web",
      company: "Tech Solutions",
      content: "Grâce à StageOFPPT, j'ai trouvé un stage qui correspondait parfaitement à mes compétences. L'interface est intuitive et les offres sont de qualité.",
      rating: 5
    },
    {
      name: "Fatima Zahra",
      role: "Stagiaire en Marketing Digital",
      company: "Digital Agency",
      content: "Une plateforme exceptionnelle qui m'a permis de trouver un stage dans une entreprise leader. Le processus de candidature est simple et efficace.",
      rating: 5
    },
    {
      name: "Youssef El Amrani",
      role: "Stagiaire en Gestion",
      company: "Finance Corp",
      content: "StageOFPPT m'a aidé à trouver un stage qui a dépassé mes attentes. L'accompagnement et le suivi sont excellents.",
      rating: 5
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos stagiaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role} chez {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 