import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-8 sm:py-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
                <span className="text-xl font-heading font-black text-white">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-foreground">ZPSL Fantasy</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The official fantasy football game for the Zimbabwe Premier Soccer League.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#" className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pick-team" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pick Team
                </Link>
              </li>
              <li>
                <Link to="/fixtures" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Fixtures
                </Link>
              </li>
              <li>
                <Link to="/statistics" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Statistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/rules" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Rules & Scoring
                </Link>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} ZPSL Fantasy Football. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
