
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <PageWrapper>
      <div className="pt-32 pb-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Info Sidebar */}
            <div className="bg-navy p-12 text-white md:w-2/5 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-serif mb-6">Let's Connect</h2>
                <p className="text-gray-400 mb-12">Whether you're looking to acquire, sell, or simply explore the market, our advisors are here to guide you.</p>
                
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gold">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email Us</p>
                      <p className="text-lg">concierge@luxeestate.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gold">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Call Our Office</p>
                      <p className="text-lg">+1 (888) LUXE-GOLD</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gold">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Visit Us</p>
                      <p className="text-lg">777 Platinum Way, Beverly Hills, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold transition-colors flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold">IG</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold transition-colors flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold">IN</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold transition-colors flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold">TW</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-12 md:w-3/5">
              <h3 className="text-2xl font-serif text-navy mb-8">Send an Inquiry</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-gray-500 uppercase mb-2 block">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-gold focus:bg-white" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-500 uppercase mb-2 block">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-gold focus:bg-white" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase mb-2 block">Inquiry Type</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-gold focus:bg-white">
                    <option>Property Acquisition</option>
                    <option>Selling My Property</option>
                    <option>Leasing Inquiry</option>
                    <option>General Support</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-500 uppercase mb-2 block">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-gold focus:bg-white resize-none" placeholder="How can we assist you?"></textarea>
                </div>
                <button className="w-full bg-gold hover:bg-gold-hover text-white py-4 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-1 active:scale-95">
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-16 bg-gray-300 h-96 rounded-3xl overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 bg-white/90 backdrop-blur rounded-2xl shadow-xl">
                <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                <h4 className="text-xl font-serif text-navy">Interactive Map</h4>
                <p className="text-gray-500 text-sm">Find our offices and exclusive listings nearby</p>
                <button className="mt-4 px-6 py-2 bg-navy text-white rounded-lg text-sm hover:bg-gold transition-colors">Load Map</button>
              </div>
            </div>
            {/* Background image to simulate map texture */}
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" alt="Map Placeholder" className="w-full h-full object-cover opacity-40 grayscale" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
