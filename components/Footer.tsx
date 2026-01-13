
import React from 'react';
import { Landmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <Landmark className="text-gold w-8 h-8" />
              <span className="text-2xl font-serif font-bold tracking-wider">LUXE<span className="text-gold">ESTATE</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Elevating the real estate experience through personalized service and a curated portfolio of the world's finest homes.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-serif text-gold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-gold transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif text-gold mb-6">Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-gold transition-colors cursor-pointer">Property Valuation</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Relocation Services</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Interior Design</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Real Estate Legal</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif text-gold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive listings and market insights.</p>
            <div className="flex bg-white/5 rounded-lg overflow-hidden border border-white/10 p-1">
              <input type="email" placeholder="Email address" className="bg-transparent px-4 py-2 w-full outline-none text-sm" />
              <button className="bg-gold text-navy p-2 rounded-md hover:bg-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© 2024 LuxeEstate by RashedDevX. All rights reserved.</p>
          <div className="flex space-x-8">
            <span className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
