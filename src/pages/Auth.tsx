import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/layout/Navbar';
import { Eye, EyeOff, Mail, Lock, User, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [teamName, setTeamName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }

    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Login failed',
              description: 'Invalid email or password. Please try again.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Login failed',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully signed in.',
          });
        }
      } else {
        const { error } = await signUp(email, password, { 
          username: username || undefined, 
          team_name: teamName || 'My Fantasy Team' 
        });
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Account exists',
              description: 'This email is already registered. Please sign in instead.',
              variant: 'destructive',
            });
            setIsLogin(true);
          } else {
            toast({
              title: 'Sign up failed',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Account created!',
            description: 'Welcome to Fantasy Football! Start building your team.',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden">
        {/* Decorative background elements - reduced on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-48 sm:w-80 h-48 sm:h-80 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-56 sm:w-96 h-56 sm:h-96 bg-accent/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-radial opacity-50" />
        </div>

        <div className="w-full max-w-md animate-fade-in relative z-10">
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-border/50 p-5 sm:p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
              <Link to="/" className="inline-flex items-center gap-3 mb-4 sm:mb-5 group">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
                  <span className="text-2xl sm:text-3xl font-heading font-black text-primary-foreground">Z</span>
                </div>
              </Link>
              <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2 text-foreground">
                {isLogin ? 'Welcome Back' : 'Join the Game'}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                {isLogin ? 'Sign in to manage your fantasy team' : 'Create your account and start competing'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="username" className="text-xs sm:text-sm font-medium">Username (optional)</Label>
                    <div className="relative group">
                      <User className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-9 sm:pl-11 h-11 sm:h-12 rounded-lg sm:rounded-xl border-border/50 bg-background/50 focus:bg-background transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="teamName" className="text-xs sm:text-sm font-medium">Team Name</Label>
                    <div className="relative group">
                      <Trophy className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="teamName"
                        type="text"
                        placeholder="My Fantasy Team"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="pl-9 sm:pl-11 h-11 sm:h-12 rounded-lg sm:rounded-xl border-border/50 bg-background/50 focus:bg-background transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: undefined });
                    }}
                    className={`pl-9 sm:pl-11 h-11 sm:h-12 rounded-lg sm:rounded-xl border-border/50 bg-background/50 focus:bg-background transition-colors text-sm sm:text-base ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                    required
                  />
                </div>
                {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs sm:text-sm font-medium">Password</Label>
                  {isLogin && (
                    <Link to="/forgot-password" className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                      Forgot?
                    </Link>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: undefined });
                    }}
                    className={`pl-9 sm:pl-11 pr-10 sm:pr-11 h-11 sm:h-12 rounded-lg sm:rounded-xl border-border/50 bg-background/50 focus:bg-background transition-colors text-sm sm:text-base ${errors.password ? 'border-destructive focus:border-destructive' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs sm:text-sm text-destructive">{errors.password}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 sm:h-12 text-sm sm:text-base font-bold rounded-lg sm:rounded-xl mt-4 sm:mt-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span className="text-sm sm:text-base">{isLogin ? 'Signing in...' : 'Creating...'}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-4 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">or</span>
              </div>
            </div>

            {/* Toggle */}
            <p className="text-center text-muted-foreground text-sm sm:text-base">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-2">
            {['Free to play', 'Real ZPSL data', 'Win prizes'].map((feature) => (
              <div key={feature} className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-card/60 backdrop-blur border border-border/30 text-[10px] sm:text-xs font-medium text-muted-foreground">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent" />
                {feature}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-4 sm:mt-6 px-4">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-foreground transition-colors">Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className="underline hover:text-foreground transition-colors">Privacy</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Auth;