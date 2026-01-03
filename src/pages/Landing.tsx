import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Trophy, Users, Calendar, TrendingUp, ChevronRight, Shield, Zap, Target, Star, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Build Your Squad',
    description: 'Pick 15 players from ZPSL clubs within your $100m budget.',
  },
  {
    icon: Trophy,
    title: 'Create & Join Leagues',
    description: 'Compete with friends and climb the overall rankings.',
  },
  {
    icon: TrendingUp,
    title: 'Track Live Points',
    description: 'Watch your points update as matches unfold.',
  },
  {
    icon: Calendar,
    title: 'Weekly Transfers',
    description: 'Make strategic transfers each gameweek.',
  },
];

const stats = [
  { value: '16', label: 'Teams', icon: Shield },
  { value: '76+', label: 'Players', icon: Users },
  { value: '34', label: 'Gameweeks', icon: Calendar },
  { value: '$100m', label: 'Budget', icon: Target },
];

export const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4 animate-pulse-soft" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]" />
          </div>

          {/* Pattern overlay */}
          <div className="absolute inset-0 pattern-dots opacity-20" />
          
          <div className="container relative py-20 md:py-32 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left: Text Content */}
                <div className="text-center lg:text-left">
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in"
                    style={{ animationDelay: '0.1s' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm text-white/90 font-medium">2025 Season Now Live</span>
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  
                  <h1 
                    className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-6 animate-fade-in"
                    style={{ animationDelay: '0.2s' }}
                  >
                    ZPSL Fantasy
                    <span className="block text-accent drop-shadow-lg">Football</span>
                  </h1>

                  <p 
                    className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in"
                    style={{ animationDelay: '0.3s' }}
                  >
                    Build your dream team from Zimbabwe Premier Soccer League players. 
                    Compete with fans across the nation and prove you're the best manager.
                  </p>

                  <div 
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in"
                    style={{ animationDelay: '0.4s' }}
                  >
                    <Link to="/auth">
                      <Button 
                        size="lg" 
                        className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base h-14 px-8 rounded-2xl shadow-gold hover:shadow-xl transition-all hover:-translate-y-1"
                      >
                        Play Now — It's Free
                        <ArrowRight className="w-5 h-5 ml-1" />
                      </Button>
                    </Link>
                    <Link to="/rules">
                      <Button 
                        variant="ghost"
                        size="lg" 
                        className="w-full sm:w-auto text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 font-medium text-base h-14 px-8 rounded-2xl backdrop-blur-sm transition-all"
                      >
                        How It Works
                      </Button>
                    </Link>
                  </div>

                  {/* Trust badges */}
                  <div 
                    className="flex items-center gap-6 mt-10 justify-center lg:justify-start animate-fade-in"
                    style={{ animationDelay: '0.5s' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-[10px] font-bold text-white">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-white/70 text-sm ml-2">1,200+ managers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Stats Grid */}
                <div 
                  className="grid grid-cols-2 gap-4 lg:gap-5 animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  {stats.map((stat, index) => (
                    <div 
                      key={stat.label}
                      className="group relative bg-white/10 backdrop-blur-md rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <stat.icon className="w-7 h-7 lg:w-8 lg:h-8 text-accent/80 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <p className="font-heading font-black text-3xl lg:text-4xl xl:text-5xl text-accent mb-1">{stat.value}</p>
                      <p className="text-white/70 text-sm lg:text-base font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom curve */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
              <path d="M0 60L1440 60L1440 30C1440 30 1140 0 720 0C300 0 0 30 0 30L0 60Z" fill="hsl(var(--background))" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-background relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-radial opacity-30" />
          
          <div className="container px-4 relative">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                How It Works
              </div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
                Simple to Play, Hard to Master
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Build your ultimate fantasy team in minutes and compete against managers across Zimbabwe.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative p-6 lg:p-7 rounded-2xl lg:rounded-3xl border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden card-shine"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="container px-4 relative">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
                  Get Started in 3 Steps
                </h2>
                <p className="text-muted-foreground text-lg">
                  Join thousands of ZPSL fans competing for glory
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'Sign Up Free', desc: 'Create your account in seconds — no payment required', icon: Users },
                  { step: '2', title: 'Pick Your Squad', desc: 'Choose 15 players within your $100m budget wisely', icon: Trophy },
                  { step: '3', title: 'Compete & Win', desc: 'Join leagues, climb the rankings, and prove your skills', icon: TrendingUp },
                ].map((item, index) => (
                  <div 
                    key={item.step} 
                    className="group flex items-center gap-5 bg-card p-5 lg:p-6 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-heading font-bold text-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-lg text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                    <item.icon className="w-6 h-6 text-muted-foreground/50 hidden sm:block group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-28 bg-gradient-hero overflow-hidden">
          {/* Animated decoratives */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[100px] animate-pulse-soft" />
          </div>
          <div className="absolute inset-0 pattern-dots opacity-10" />
          
          <div className="container px-4 text-center relative">
            <div className="inline-flex p-4 rounded-full bg-accent/20 mb-8">
              <Trophy className="w-12 h-12 text-accent animate-float" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5">
              Ready to Dominate?
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-lg mx-auto">
              Join the ZPSL Fantasy community and prove you're the best manager in Zimbabwe.
            </p>
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base h-14 px-12 rounded-2xl shadow-gold hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Create Free Account
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;