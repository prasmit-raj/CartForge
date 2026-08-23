import { Link } from "react-router-dom";
import { ShoppingBag, Globe, Mail, Share2, MessageCircle, Heart } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 flex flex-col items-start pr-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Cart<span className="text-blue-500">Forge</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              CartForge is a modern eCommerce platform built for quality, speed, and seamless shopping. Discover curated collections delivered straight to your door.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://cartforge.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@cartforge.com"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#categories" className="text-slate-400 hover:text-white transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#categories" className="text-slate-400 hover:text-white transition-colors">
                  Fashion & Apparel
                </a>
              </li>
              <li>
                <a href="#categories" className="text-slate-400 hover:text-white transition-colors">
                  Home & Living
                </a>
              </li>
              <li>
                <a href="#categories" className="text-slate-400 hover:text-white transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#why-us" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-slate-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-slate-400 hover:text-white transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-slate-400 hover:text-white transition-colors">
                  Press & Media
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Legal */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Support & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#why-us" className="text-slate-400 hover:text-white transition-colors">
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium text-center sm:text-left flex items-center gap-1">
            <span>© {currentYear} CartForge Inc. All rights reserved. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">VISA</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">MasterCard</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">PayPal</span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">Apple Pay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;