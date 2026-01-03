import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container py-12 sm:py-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
                <span className="text-xl font-heading font-black text-primary-foreground">Z</span>
              </div>
              <span className="font-heading font-bold text-foreground text-lg">ZPSL Fantasy</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The official fantasy football game for the Zimbabwe Premier Soccer League. Build your dream team today.
            </p>
            <div className="flex items-center gap-2">
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
                  className="p-2.5 rounded-xl bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/pick-team', label: 'Pick Team' },
                { to: '/fixtures', label: 'Fixtures' },
                { to: '/statistics', label: 'Statistics' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group">
                    <span className="group-hover:translate-x-0.5 transition-transform">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-3">
              {[
                { to: '/rules', label: 'Rules & Scoring' },
                { href: '#', label: 'FAQ' },
                { href: '#', label: 'Contact Us' },
                { href: '#', label: 'Help Center' },
              ].map((item) => (
                <li key={item.label}>
                  {'to' in item ? (
                    <Link to={item.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3 mb-6">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="space-y-2">
              <a href="mailto:support@zpsl-fantasy.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                support@zpsl-fantasy.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Harare, Zimbabwe
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ZPSL Fantasy Football. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
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