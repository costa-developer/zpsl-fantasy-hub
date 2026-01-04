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
          {/* Animated background elements - reduced on mobile */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/20 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/3 translate-x-1/4 animate-pulse-soft" />
            <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent/10 rounded-full blur-[50px] md:blur-[80px] translate-y-1/3 -translate-x-1/4" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-white/5 rounded-full blur-[80px] md:blur-[120px]" />
          </div>

          {/* Pattern overlay */}
          <div className="absolute inset-0 pattern-dots opacity-10 md:opacity-20" />
          
          <div className="container relative py-12 sm:py-16 md:py-24 lg:py-32 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                {/* Left: Text Content */}
                <div className="text-center lg:text-left">
                  <div 
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 sm:mb-8 animate-fade-in"
                    style={{ animationDelay: '0.1s' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs sm:text-sm text-white/90 font-medium">2025 Season Now Live</span>
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                  </div>
                  
                  <h1 
                    className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-white mb-4 sm:mb-6 animate-fade-in"
                    style={{ animationDelay: '0.2s' }}
                  >
                    ZPSL Fantasy
                    <span className="block text-accent drop-shadow-lg">Football</span>
                  </h1>

                  <p 
                    className="text-white/80 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0 animate-fade-in"
                    style={{ animationDelay: '0.3s' }}
                  >
                    Build your dream team from Zimbabwe Premier Soccer League players. 
                    Compete with fans across the nation.
                  </p>

                  <div 
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in px-4 sm:px-0"
                    style={{ animationDelay: '0.4s' }}
                  >
                    <Link to="/auth" className="w-full sm:w-auto">
                      <Button 
                        size="lg" 
                        className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-gold hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0"
                      >
                        Play Now — It's Free
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                      </Button>
                    </Link>
                    <Link to="/rules" className="w-full sm:w-auto">
                      <Button 
                        variant="ghost"
                        size="lg" 
                        className="w-full sm:w-auto text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 font-medium text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl backdrop-blur-sm transition-all"
                      >
                        How It Works
                      </Button>
                    </Link>
                  </div>

                  {/* Trust badges - stack on mobile */}
                  <div 
                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8 sm:mt-10 justify-center lg:justify-start animate-fade-in"
                    style={{ animationDelay: '0.5s' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-white/70 text-xs sm:text-sm ml-2">1,200+ managers</span>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Stats Grid */}
                <div 
                  className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 animate-fade-in mt-4 lg:mt-0"
                  style={{ animationDelay: '0.3s' }}
                >
                  {stats.map((stat, index) => (
                    <div 
                      key={stat.label}
                      className="group relative bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-center border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300 active:scale-[0.98] lg:hover:-translate-y-2 overflow-hidden"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden sm:block" />
                      
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-accent/80 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                      <p className="font-heading font-black text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-accent mb-0.5 sm:mb-1">{stat.value}</p>
                      <p className="text-white/70 text-xs sm:text-sm lg:text-base font-medium">{stat.label}</p>
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
        <section className="py-12 sm:py-16 md:py-24 lg:py-28 bg-background relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-radial opacity-30" />
          
          <div className="container px-4 relative">
            <div className="text-center mb-8 sm:mb-10 md:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                How It Works
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 text-foreground">
                Simple to Play, Hard to Master
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Build your ultimate fantasy team in minutes and compete against managers across Zimbabwe.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative p-4 sm:p-5 lg:p-6 xl:p-7 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-border bg-card hover:shadow-xl transition-all duration-300 active:scale-[0.98] lg:hover:-translate-y-2 overflow-hidden card-shine"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-3 sm:mb-4 lg:mb-5 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-12 sm:py-16 md:py-24 lg:py-28 bg-muted/30 relative overflow-hidden">
          {/* Decorative elements - reduced on mobile */}
          <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/5 rounded-full blur-2xl sm:blur-3xl" />
          
          <div className="container px-4 relative">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8 sm:mb-10 md:mb-12">
                <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 text-foreground">
                  Get Started in 3 Steps
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-4 sm:px-0">
                  Join thousands of ZPSL fans competing for glory
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { step: '1', title: 'Sign Up Free', desc: 'Create your account in seconds — no payment required', icon: Users },
                  { step: '2', title: 'Pick Your Squad', desc: 'Choose 15 players within your $100m budget wisely', icon: Trophy },
                  { step: '3', title: 'Compete & Win', desc: 'Join leagues, climb the rankings, and prove your skills', icon: TrendingUp },
                ].map((item, index) => (
                  <div 
                    key={item.step} 
                    className="group flex items-center gap-3 sm:gap-4 lg:gap-5 bg-card p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 active:scale-[0.99]"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-heading font-bold text-base sm:text-lg lg:text-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-sm sm:text-base lg:text-lg text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{item.desc}</p>
                    </div>
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/50 hidden sm:block group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-12 sm:py-16 md:py-24 lg:py-28 bg-gradient-hero overflow-hidden">
          {/* Animated decoratives - reduced on mobile */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-accent/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse-soft" />
          </div>
          <div className="absolute inset-0 pattern-dots opacity-5 sm:opacity-10" />
          
          <div className="container px-4 text-center relative">
            <div className="inline-flex p-3 sm:p-4 rounded-full bg-accent/20 mb-6 sm:mb-8">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-accent animate-float" />
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-5 px-4 sm:px-0">
              Ready to Dominate?
            </h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 max-w-lg mx-auto px-4 sm:px-0">
              Join the ZPSL Fantasy community and prove you're the best manager in Zimbabwe.
            </p>
            <Link to="/auth" className="inline-block">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-sm sm:text-base h-12 sm:h-14 px-8 sm:px-12 rounded-xl sm:rounded-2xl shadow-gold hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0"
              >
                Create Free Account
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
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