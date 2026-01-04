import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container py-8 sm:py-12 lg:py-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4 sm:space-y-5">
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                <span className="text-lg sm:text-xl font-heading font-black text-primary-foreground">Z</span>
              </div>
              <span className="font-heading font-bold text-foreground text-base sm:text-lg">ZPSL Fantasy</span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
              The official fantasy football game for the Zimbabwe Premier Soccer League. Build your dream team today.
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a 
                  key={label}
                  href="#" 
                  aria-label={label}
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground active:bg-primary/80 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/pick-team', label: 'Pick Team' },
                { to: '/fixtures', label: 'Fixtures' },
                { to: '/statistics', label: 'Statistics' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground active:text-foreground transition-colors inline-flex items-center gap-1 group py-1">
                    <span className="group-hover:translate-x-0.5 transition-transform">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { to: '/rules', label: 'Rules & Scoring' },
                { href: '#', label: 'FAQ' },
                { href: '#', label: 'Contact Us' },
                { href: '#', label: 'Help Center' },
              ].map((item) => (
                <li key={item.label}>
                  {'to' in item ? (
                    <Link to={item.to} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground active:text-foreground transition-colors py-1 inline-block">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-xs sm:text-sm text-muted-foreground hover:text-foreground active:text-foreground transition-colors py-1 inline-block">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground active:text-foreground transition-colors py-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="space-y-2 hidden sm:block">
              <a href="mailto:support@zpsl-fantasy.com" className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">support@zpsl-fantasy.com</span>
              </a>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                Harare, Zimbabwe
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} ZPSL Fantasy Football. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
              <span>Made with</span>
              <span className="text-destructive">❤️</span>
              <span>in Zimbabwe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;