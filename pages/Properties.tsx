
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { Bed, Bath, Square, Heart, Search, X, Eye, MapPin, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Property {
  id: number;
  title: string;
  location: string;
  category: 'Residential' | 'Commercial' | 'Vacation';
  type: 'Apartment' | 'Villa' | 'Office' | 'Studio' | 'Penthouse';
  price: number;
  beds: number;
  baths: number;
  area: string;
  image: string;
  featured: boolean;
  description: string;
}

const propertyData: Property[] = [
  { id: 1, title: 'Azure Oceanfront Villa', location: 'Malibu, CA', category: 'Vacation', type: 'Villa', price: 12500000, beds: 6, baths: 8, area: '8,400 sqft', featured: true, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200', description: 'A breathtaking coastal estate featuring panoramic ocean views, private beach access, and an infinity pool.' },
  { id: 2, title: 'Skyline Penthouse', location: 'Manhattan, NY', category: 'Residential', type: 'Penthouse', price: 8200000, beds: 4, baths: 4, area: '4,200 sqft', featured: true, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200', description: 'Experience the ultimate city lifestyle in this double-height penthouse with 360-degree views of the skyline.' },
  { id: 3, title: 'Alpine Chalet', location: 'Aspen, CO', category: 'Vacation', type: 'Villa', price: 5900000, beds: 5, baths: 5, area: '5,500 sqft', featured: false, image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200', description: 'A cozy yet expansive winter getaway nestled in the heart of the mountains.' },
  { id: 4, title: 'Modernist Desert Estate', location: 'Scottsdale, AZ', category: 'Residential', type: 'Villa', price: 15000000, beds: 7, baths: 9, area: '12,000 sqft', featured: true, image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=1200', description: 'An architectural marvel blending seamlessly with the desert landscape.' },
  { id: 5, title: 'Tuscan Countryside Manor', location: 'Florence, IT', category: 'Vacation', type: 'Villa', price: 4100000, beds: 4, baths: 3, area: '3,800 sqft', featured: false, image: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1200', description: 'A historic renovation surrounded by olive groves and vineyards.' },
  { id: 6, title: 'Regency Business Hub', location: 'London, UK', category: 'Commercial', type: 'Office', price: 22000000, beds: 0, baths: 12, area: '25,000 sqft', featured: true, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', description: 'Premium commercial space in the heart of the financial district.' },
  { id: 7, title: 'Minimalist Urban Studio', location: 'Tokyo, JP', category: 'Residential', type: 'Studio', price: 1200000, beds: 1, baths: 1, area: '650 sqft', featured: false, image: 'https://images.unsplash.com/photo-1536376073347-45739144ad37?auto=format&fit=crop&q=80&w=1200', description: 'Efficient luxury in the world\'s most vibrant city.' },
  { id: 8, title: 'The Platinum Suite', location: 'Dubai, UAE', category: 'Residential', type: 'Apartment', price: 11000000, beds: 3, baths: 3, area: '3,200 sqft', featured: true, image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200', description: 'Ultra-luxurious apartment in the Burj area with bespoke finishes.' },
  { id: 9, title: 'Silicon Valley HQ', location: 'Palo Alto, CA', category: 'Commercial', type: 'Office', price: 35000000, beds: 0, baths: 20, area: '45,000 sqft', featured: false, image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200', description: 'A sustainable corporate campus designed for tech giants.' },
  { id: 10, title: 'Santorini Sunset Retreat', location: 'Oia, GR', category: 'Vacation', type: 'Villa', price: 3200000, beds: 2, baths: 2, area: '1,500 sqft', featured: false, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1200', description: 'Cave-style luxury house with a private caldera-view plunge pool.' },
  { id: 11, title: 'Oslo Eco-Apartment', location: 'Aker Brygge, NO', category: 'Residential', type: 'Apartment', price: 2800000, beds: 2, baths: 2, area: '1,200 sqft', featured: false, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200', description: 'Modern sustainable living on the Oslo waterfront.' },
  { id: 12, title: 'Milanese Showroom', location: 'Quadrilatero, IT', category: 'Commercial', type: 'Office', price: 18500000, beds: 0, baths: 4, area: '8,000 sqft', featured: true, image: 'https://images.unsplash.com/photo-1517502884422-41eaace71e0a?auto=format&fit=crop&q=80&w=1200', description: 'Exquisite commercial venue in the world\'s fashion capital.' }
];

const Properties: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSavedOnly = searchParams.get('filter') === 'saved';

  const [activeCategory, setActiveCategory] = useState(initialSavedOnly ? 'Saved' : 'All');
  const [filterType, setFilterType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('luxe_estate_saved');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('luxe_estate_saved', JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    if (initialSavedOnly) {
      setActiveCategory('Saved');
    }
  }, [initialSavedOnly]);

  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(savedId => savedId !== id) : [...prev, id]);
  };

  const filteredProperties = useMemo(() => {
    return propertyData.filter(p => {
      const categoryMatch = activeCategory === 'All' 
        ? true 
        : activeCategory === 'Saved' 
          ? savedIds.includes(p.id) 
          : p.category === activeCategory;
      const typeMatch = filterType === 'All' || p.type === filterType;
      const priceMatch = p.price <= maxPrice;
      return categoryMatch && typeMatch && priceMatch;
    });
  }, [activeCategory, filterType, maxPrice, savedIds]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <PageWrapper>
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
              >
                {activeCategory === 'Saved' ? 'Your Exclusive Selection' : 'Exclusive Collections'}
              </motion.span>
              <h1 className="text-5xl md:text-6xl font-serif text-navy mb-4 leading-tight">
                {activeCategory === 'Saved' ? 'Saved' : 'Extraordinary'} <span className="italic">Lifestyles</span>
              </h1>
              <p className="text-gray-500 text-lg">
                {activeCategory === 'Saved' 
                  ? 'A private collection of properties that match your vision of perfection.' 
                  : 'Curated properties for those who demand the absolute best in architecture and comfort.'}
              </p>
            </div>
          </div>

          <div className="mb-12 space-y-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-4 border-b border-gray-200">
              {['All', 'Residential', 'Commercial', 'Vacation', 'Saved'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${activeCategory === cat ? 'text-navy' : 'text-gray-400 hover:text-navy'}`}
                >
                  {cat === 'Saved' && <Heart size={12} className={activeCategory === 'Saved' ? 'fill-gold text-gold' : ''} />}
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="catUnderline" className="absolute bottom-0 left-0 w-full h-1 bg-gold" />
                  )}
                </button>
              ))}
            </div>

            {/* Sub-Filters Bar */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block">Property Type</label>
                  <div className="relative">
                    <SlidersHorizontal className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                    <select 
                      className="w-full pl-8 pr-4 py-2 border-b border-gray-100 focus:outline-none focus:border-gold bg-transparent appearance-none text-sm font-medium"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="All">All Types</option>
                      <option value="Apartment">Apartments</option>
                      <option value="Villa">Villas</option>
                      <option value="Office">Offices</option>
                      <option value="Studio">Studios</option>
                      <option value="Penthouse">Penthouses</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block">Max Price: ${ (maxPrice / 1000000).toFixed(1) }M</label>
                  <input 
                    type="range" 
                    min="1000000" 
                    max="50000000" 
                    step="1000000"
                    className="w-full accent-gold cursor-pointer h-1.5 bg-gray-100 rounded-lg" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex-none flex items-center gap-4">
                <span className="text-xs text-gray-400 font-medium">{filteredProperties.length} results</span>
                <button 
                  onClick={() => {setActiveCategory('All'); setFilterType('All'); setMaxPrice(50000000);}}
                  className="text-xs font-bold text-navy hover:text-gold uppercase tracking-widest px-4 py-2 border border-gray-200 rounded-full transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            key={`${activeCategory}-${filterType}-${maxPrice}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProperties.map((prop) => (
                <motion.div 
                  key={prop.id}
                  variants={itemVariants}
                  layout
                  className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-50 group flex flex-col h-full hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500"
                >
                  <div className="relative h-80 overflow-hidden cursor-pointer" onClick={() => setSelectedProperty(prop)}>
                    <motion.img 
                      src={prop.image} 
                      alt={prop.title} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                    
                    <div className="absolute inset-0 bg-navy/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-3 backdrop-blur-[2px]">
                      <button 
                        onClick={() => setSelectedProperty(prop)}
                        className="w-12 h-12 bg-white text-navy rounded-full hover:bg-gold hover:text-white transition-all transform hover:scale-110 flex items-center justify-center shadow-xl"
                      >
                        <Eye size={20} />
                      </button>
                      <button 
                        onClick={(e) => toggleSave(e, prop.id)}
                        className={`w-12 h-12 bg-white rounded-full hover:bg-gold hover:text-white transition-all transform hover:scale-110 flex items-center justify-center shadow-xl ${savedIds.includes(prop.id) ? 'text-gold' : 'text-navy'}`}
                      >
                        <Heart size={20} className={savedIds.includes(prop.id) ? 'fill-gold' : ''} />
                      </button>
                    </div>

                    <div className="absolute top-6 right-6 z-10">
                       <button 
                        onClick={(e) => toggleSave(e, prop.id)}
                        className={`p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white transition-all ${savedIds.includes(prop.id) ? 'text-gold bg-white' : 'text-white'}`}
                      >
                        <Heart size={18} className={savedIds.includes(prop.id) ? 'fill-gold' : ''} />
                      </button>
                    </div>

                    {prop.featured && (
                      <div className="absolute top-6 left-6 bg-navy text-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl rounded-full backdrop-blur">
                        Collection
                      </div>
                    )}
                    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-1.5 text-navy text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                      {prop.type}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                      <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                        <MapPin size={10} className="mr-1.5 text-gold" />
                        {prop.location}
                      </div>
                      <h3 className="text-2xl font-serif text-navy group-hover:text-gold transition-colors duration-300 mb-2">{prop.title}</h3>
                      <p className="text-3xl font-serif text-gold font-light">
                        ${prop.price.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Beds</span>
                        <div className="flex items-center text-navy font-bold">
                          <Bed size={14} className="mr-2 text-gold" />
                          {prop.beds || '-'}
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Baths</span>
                        <div className="flex items-center text-navy font-bold">
                          <Bath size={14} className="mr-2 text-gold" />
                          {prop.baths || '-'}
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Area</span>
                        <div className="flex items-center text-navy font-bold">
                          <Square size={14} className="mr-2 text-gold" />
                          {prop.area.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProperties.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-3xl font-serif text-navy mb-4">
                {activeCategory === 'Saved' ? 'Your Saved Portfolio is Empty' : 'No Residences Found'}
              </h3>
              <p className="text-gray-500 mb-8">
                {activeCategory === 'Saved' 
                  ? 'Start exploring our exclusive residences and click the heart icon to save your favorites.' 
                  : 'Refine your criteria to discover hidden gems in our portfolio.'}
              </p>
              <button 
                onClick={() => {setActiveCategory('All'); setFilterType('All'); setMaxPrice(50000000);}}
                className="bg-navy text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold transition-colors"
              >
                {activeCategory === 'Saved' ? 'Explore Properties' : 'Reset Discoveries'}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProperty(null)}
              className="absolute inset-0 bg-navy/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative bg-white rounded-[3rem] overflow-hidden shadow-2xl max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProperty(null)}
                className="absolute top-8 right-8 z-10 w-12 h-12 bg-white text-navy rounded-full hover:bg-gold hover:text-white transition-all flex items-center justify-center shadow-2xl"
              >
                <X size={24} />
              </button>
              
              <div className="lg:col-span-7 h-72 lg:h-auto overflow-hidden">
                <img src={selectedProperty.image} className="w-full h-full object-cover" alt="" />
              </div>
              
              <div className="lg:col-span-5 p-10 lg:p-16 overflow-y-auto bg-white flex flex-col">
                <div className="mb-10">
                  <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-[10px] font-black rounded-full mb-6 uppercase tracking-[0.2em]">
                    {selectedProperty.category} • {selectedProperty.type}
                  </span>
                  <h2 className="text-5xl font-serif text-navy mb-4 leading-tight">{selectedProperty.title}</h2>
                  <div className="flex items-center text-gray-400 font-medium">
                    <MapPin size={18} className="mr-2 text-gold" />
                    {selectedProperty.location}
                  </div>
                </div>
                
                <div className="mb-10">
                  <p className="text-4xl font-serif text-gold font-light mb-8">${selectedProperty.price.toLocaleString()}</p>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-slate-50 rounded-[2rem]">
                      <Bed className="w-6 h-6 mx-auto text-gold mb-3" />
                      <p className="text-lg font-bold text-navy">{selectedProperty.beds || 'N/A'}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Beds</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-[2rem]">
                      <Bath className="w-6 h-6 mx-auto text-gold mb-3" />
                      <p className="text-lg font-bold text-navy">{selectedProperty.baths || 'N/A'}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Baths</p>
                    </div>
                    <div className="text-center p-6 bg-slate-50 rounded-[2rem]">
                      <Square className="w-6 h-6 mx-auto text-gold mb-3" />
                      <p className="text-lg font-bold text-navy">{selectedProperty.area.split(' ')[0]}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Sqft</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-12">
                  {selectedProperty.description} Our exclusive advisory team is available for a private digital tour or on-site walkthrough.
                </p>
                
                <div className="mt-auto flex gap-4">
                  <button className="flex-1 bg-navy text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
                    Arrange Viewing
                  </button>
                  <button 
                    onClick={(e) => toggleSave(e, selectedProperty.id)}
                    className={`w-20 h-20 border-2 rounded-2xl transition-all flex items-center justify-center group ${savedIds.includes(selectedProperty.id) ? 'border-gold text-gold' : 'border-slate-100 text-navy'}`}
                  >
                    <Heart size={24} className={savedIds.includes(selectedProperty.id) ? 'fill-gold' : 'group-hover:fill-gold transition-colors'} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Properties;
