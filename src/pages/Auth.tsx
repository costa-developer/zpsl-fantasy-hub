import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User, Trophy, ArrowRight, Sparkles, Shield, Target, Users, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const features = [
  { icon: Trophy, title: 'Compete & Win', desc: 'Join leagues and climb the ranks' },
  { icon: Target, title: 'Real ZPSL Stats', desc: 'Live data from every match' },
  { icon: Users, title: 'Build Your Squad', desc: 'Pick from 300+ players' },
  { icon: Zap, title: 'Live Updates', desc: 'Real-time point scoring' },
];

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
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Branding & Features (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-primary">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          {/* Pitch lines pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[3px] border-white rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] border-[3px] border-white border-t-0" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] border-[3px] border-white border-b-0" />
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-20 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-32 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent/30 rounded-full blur-xl animate-pulse-soft" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <span className="text-3xl font-heading font-black text-white">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-white">ZPSL Fantasy</span>
              <span className="text-sm text-white/60">Zimbabwe Premier League</span>
            </div>
          </Link>

          {/* Main Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Season 2025/26 Now Live</span>
              </div>
              <h1 className="font-heading font-black text-4xl xl:text-5xl text-white leading-tight">
                Build Your Dream Team.<br />
                <span className="text-accent">Dominate the League.</span>
              </h1>
              <p className="text-lg text-white/70 max-w-md">
                Join thousands of managers competing in Zimbabwe's premier fantasy football experience.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div 
                  key={feature.title}
                  className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/30 transition-colors">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            <div>
              <p className="text-3xl font-heading font-bold text-white">50K+</p>
              <p className="text-sm text-white/60">Active Managers</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <p className="text-3xl font-heading font-bold text-white">18</p>
              <p className="text-sm text-white/60">ZPSL Teams</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <p className="text-3xl font-heading font-bold text-white">300+</p>
              <p className="text-sm text-white/60">Players</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-xl font-heading font-black text-primary-foreground">Z</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">ZPSL Fantasy</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-md animate-fade-in">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2 text-foreground">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin ? 'Sign in to continue to your dashboard' : 'Start your fantasy football journey'}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex p-1 mb-6 bg-muted rounded-xl">
              <button
                type="button"
                onClick={() => { setIsLogin(true); setErrors({}); }}
                className={cn(
                  "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
                  isLogin 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setErrors({}); }}
                className={cn(
                  "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
                  !isLogin 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="johndoe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 h-11 rounded-xl border-border bg-background focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamName" className="text-sm font-medium">Team Name</Label>
                    <div className="relative group">
                      <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="teamName"
                        type="text"
                        placeholder="FC Champions"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="pl-10 h-11 rounded-xl border-border bg-background focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: undefined });
                    }}
                    className={cn(
                      "pl-10 h-11 rounded-xl border-border bg-background focus:border-primary transition-colors",
                      errors.email && "border-destructive focus:border-destructive"
                    )}
                    required
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  {isLogin && (
                    <Link to="/forgot-password" className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: undefined });
                    }}
                    className={cn(
                      "pl-10 pr-10 h-11 rounded-xl border-border bg-background focus:border-primary transition-colors",
                      errors.password && "border-destructive focus:border-destructive"
                    )}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold rounded-xl mt-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Mobile Features */}
            <div className="lg:hidden mt-8 pt-6 border-t border-border">
              <div className="grid grid-cols-2 gap-3">
                {features.slice(0, 2).map((feature) => (
                  <div key={feature.title} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="underline hover:text-foreground transition-colors">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
