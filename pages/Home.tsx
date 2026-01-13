
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Search, MapPin, Home as HomeIcon, DollarSign } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070" 
            alt="Luxury Home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Discover Your <span className="text-gold">Sanctuary</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 font-light tracking-wide max-w-2xl mx-auto">
            Experience the pinnacle of luxury living with our curated selection of exclusive properties across the globe.
          </p>

          {/* Search Box */}
          <div className="bg-white p-4 md:p-8 rounded-xl shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="text-left">
              <label className="text-xs uppercase text-gray-500 font-bold mb-2 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gold" />
                <input type="text" placeholder="Where to?" className="w-full pl-10 pr-4 py-2 border-b border-gray-200 focus:outline-none focus:border-gold" />
              </div>
            </div>
            <div className="text-left">
              <label className="text-xs uppercase text-gray-500 font-bold mb-2 block">Type</label>
              <div className="relative">
                <HomeIcon className="absolute left-3 top-3 w-4 h-4 text-gold" />
                <select className="w-full pl-10 pr-4 py-2 border-b border-gray-200 focus:outline-none focus:border-gold appearance-none bg-white">
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Mansion</option>
                </select>
              </div>
            </div>
            <div className="text-left">
              <label className="text-xs uppercase text-gray-500 font-bold mb-2 block">Budget</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gold" />
                <input type="text" placeholder="Max Price" className="w-full pl-10 pr-4 py-2 border-b border-gray-200 focus:outline-none focus:border-gold" />
              </div>
            </div>
            <button className="bg-gold hover:bg-gold-hover text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 active:scale-95 font-bold">
              <Search className="w-5 h-5" />
              <span>Find Home</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section Preview */}
      <section className="py-24 bg-white px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-navy mb-4">Elite Neighborhoods</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Beverly Hills', 'Manhattan', 'Dubai Marina'].map((place, i) => (
              <div key={place} className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer shadow-lg">
                <img 
                  src={`https://picsum.photos/seed/${i+10}/800/600`} 
                  alt={place} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-serif text-white">{place}</h3>
                  <p className="text-gold text-sm font-bold uppercase tracking-widest mt-2">View Properties</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
