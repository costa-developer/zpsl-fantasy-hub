import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Trophy, Users, Calendar, BarChart3, Settings, LogOut, User, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <Trophy className="w-4 h-4" /> },
  { label: 'Pick Team', href: '/pick-team', icon: <Users className="w-4 h-4" /> },
  { label: 'Transfers', href: '/transfers', icon: <ArrowRightLeft className="w-4 h-4" /> },
  { label: 'Fixtures', href: '/fixtures', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Statistics', href: '/statistics', icon: <BarChart3 className="w-4 h-4" /> },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const isAuthenticated = !!user;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/10 group-hover:shadow-primary/20 transition-shadow">
            <span className="text-lg sm:text-xl font-heading font-black text-primary-foreground">Z</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm sm:text-base text-foreground leading-tight">ZPSL Fantasy</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {isAuthenticated && (
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="gap-2 rounded-xl" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" className="rounded-xl font-medium">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md shadow-primary/20 font-semibold">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-card/95 backdrop-blur-xl animate-fade-in max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="container py-3 space-y-1 px-3 sm:px-4 pb-safe">
            {isAuthenticated ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-medium transition-all active:scale-[0.98]",
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted"
                    )}
                  >
                    {item.icon}
                    <span className="text-sm sm:text-base">{item.label}</span>
                  </Link>
                ))}
                <hr className="border-border/40 my-2 sm:my-3" />
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-medium text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted text-sm sm:text-base"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-medium text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted text-sm sm:text-base"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-medium text-destructive hover:bg-destructive/10 active:bg-destructive/10 w-full text-left text-sm sm:text-base"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center py-3 rounded-lg sm:rounded-xl font-medium text-foreground hover:bg-muted active:bg-muted text-sm sm:text-base"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full rounded-lg sm:rounded-xl bg-gradient-to-r from-primary to-primary/90 font-semibold h-11 sm:h-12 text-sm sm:text-base">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;