
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Award, ShieldCheck, Users, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  const agents = [
    { name: 'Alexander Luxe', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
    { name: 'Elena Vance', role: 'Senior Partner', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
    { name: 'Marcus Thorne', role: 'Director of Global Sales', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <PageWrapper>
      <div className="pt-32 pb-24">
        {/* Story Section */}
        <section className="container mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-bold uppercase tracking-widest text-sm mb-4 block">Our Heritage</span>
              <h1 className="text-4xl md:text-5xl font-serif text-navy mb-8 leading-tight">Defining Luxury Real Estate For Over <span className="text-gold">Two Decades</span></h1>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Founded on the principles of integrity, exclusivity, and unparalleled service, LuxeEstate has grown from a boutique agency to a global leader in high-end property transactions.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We don't just sell homes; we curate lifestyles. Our team of experts understands the unique needs of the world's most discerning clientele, ensuring every acquisition is a masterpiece.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-serif text-navy">2.5k+</h4>
                  <p className="text-gold font-bold text-sm uppercase">Properties Sold</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-navy">150+</h4>
                  <p className="text-gold font-bold text-sm uppercase">Expert Agents</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold rounded-full opacity-10"></div>
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" alt="Office" className="rounded-2xl shadow-2xl relative z-10" />
              <div className="absolute -bottom-10 -right-10 hidden md:block w-64 p-6 bg-navy text-white rounded-xl shadow-xl z-20">
                <p className="italic text-sm">"Excellence is not an act, but a habit. We weave it into every transaction."</p>
                <p className="text-gold mt-2 font-bold">— Alexander Luxe</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-navy py-24 text-white">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: <Award className="w-10 h-10 mx-auto text-gold mb-4" />, title: 'Premium Quality' },
              { icon: <ShieldCheck className="w-10 h-10 mx-auto text-gold mb-4" />, title: 'Total Security' },
              { icon: <Users className="w-10 h-10 mx-auto text-gold mb-4" />, title: 'Global Network' },
              { icon: <Briefcase className="w-10 h-10 mx-auto text-gold mb-4" />, title: 'Expert Advisory' },
            ].map((v, i) => (
              <div key={i}>
                {v.icon}
                <h3 className="text-xl font-serif">{v.title}</h3>
                <p className="text-gray-400 mt-2 text-sm">Unwavering commitment to the highest industry standards.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Agents */}
        <section className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-navy">The Elite Team</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {agents.map((agent, i) => (
              <div key={i} className="text-center group">
                <div className="relative overflow-hidden rounded-full w-48 h-48 mx-auto mb-6 border-4 border-gold p-1">
                  <img src={agent.img} alt={agent.name} className="w-full h-full object-cover rounded-full transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-2xl font-serif text-navy">{agent.name}</h3>
                <p className="text-gold font-medium">{agent.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default About;
