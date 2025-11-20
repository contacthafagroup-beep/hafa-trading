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
                  <a href="mailto:contact@hafatrading.com" className="hover:text-white transition-colors block">contact.hafatrading.com</a>
                  <a href="mailto:contact@hafagroup.com" className="hover:text-white transition-colors block">contact.hafagroup.com</a>
                  <a href="mailto:info@hafatrading.com" className="hover:text-white transition-colors block">info.hafatrading.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Hafa General Trading PLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
