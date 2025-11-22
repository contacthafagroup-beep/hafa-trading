import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Hafa General Trading PLC</h3>
            <p className="text-sm mb-4">
              Trading Beyond Borders - Your trusted partner in international import and export.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/export-products" className="hover:text-white transition-colors">Our Products</Link></li>
              <li><Link href="/services/export" className="hover:text-white transition-colors">Export Services</Link></li>
              <li><Link href="/services/logistics" className="hover:text-white transition-colors">Logistics</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services/export" className="hover:text-white transition-colors">Export Services</Link></li>
              <li><Link href="/services/import" className="hover:text-white transition-colors">Import Services</Link></li>
              <li><Link href="/services/logistics" className="hover:text-white transition-colors">Logistics</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Track Shipment</Link></li>
              <li><Link href="/rfq" className="hover:text-white transition-colors">Request Quote</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Hossana, Ethiopia<br />Gofer Meda Subcity<br />Jelo Naremo District</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+251954742383" className="hover:text-white transition-colors block">+251 954 742 383</a>
                  <a href="tel:+251964839833" className="hover:text-white transition-colors block">+251 964 839 833</a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:contact.hafatrading@gmail.com" className="hover:text-white transition-colors block">contact.hafatrading@gmail.com</a>
                  <a href="mailto:contact@hafagroup.com" className="hover:text-white transition-colors block">contact@hafagroup.com</a>
                  <a href="mailto:info@hafatrading.com" className="hover:text-white transition-colors block">info@hafatrading.com</a>
                </div>
              </li>
            </ul>

            {/* Quick Contact Buttons */}
            <div className="mt-6 space-y-2">
              <h5 className="text-white font-semibold text-xs mb-3">Quick Connect</h5>
              
              {/* WhatsApp */}
              <a
                href="https://wa.me/251954742383"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
                  📱
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white">WhatsApp</p>
                  <p className="text-xs text-green-100 truncate">+251 954 742 383</p>
                </div>
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/hafatrading"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
                  ✈️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white">Telegram</p>
                  <p className="text-xs text-blue-100 truncate">@hafatrading</p>
                </div>
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>

              {/* Email */}
              <a
                href="mailto:contact.hafatrading@gmail.com"
                className="flex items-center gap-2 p-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
                  📧
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white">Email Us</p>
                  <p className="text-xs text-purple-100 truncate">contact.hafatrading@gmail.com</p>
                </div>
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Hafa General Trading PLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
