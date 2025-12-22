import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Trophy, Users, Calendar, TrendingUp, Star, Zap, Shield, Target } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Build Your Dream Team',
    description: 'Select 15 players from ZPSL clubs within your £100m budget. Make tactical decisions to maximize points.',
  },
  {
    icon: Trophy,
    title: 'Compete & Win',
    description: 'Join leagues, compete with friends, and climb the overall rankings to become the ultimate fantasy manager.',
  },
  {
    icon: TrendingUp,
    title: 'Live Points Tracking',
    description: 'Watch your points update in real-time as matches unfold. Track every goal, assist, and clean sheet.',
  },
  {
    icon: Calendar,
    title: 'Weekly Transfers',
    description: 'Analyze form, fixtures, and stats. Make strategic transfers each gameweek to stay ahead.',
  },
];

const stats = [
  { value: '12', label: 'ZPSL Teams' },
  { value: '250+', label: 'Players' },
  { value: '34', label: 'Gameweeks' },
  { value: '50K+', label: 'Managers' },
];

export const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero">
          {/* Background Pattern */}
          <div className="absolute inset-0 pitch-lines opacity-5" />
          <div className="absolute inset-0 bg-hero-pattern" />
          
          <div className="container relative z-10 py-16 px-4 sm:py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gold/20 text-gold mb-4 sm:mb-6 animate-fade-in">
                <Star className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-semibold">Season 2024/25 Now Live</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 sm:mb-6 animate-slide-up text-white">
                Zimbabwe Premier League
                <span className="block text-gradient-gold mt-1 sm:mt-2">Fantasy Football</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto animate-slide-up px-2" style={{ animationDelay: '0.1s' }}>
                Build your ultimate ZPSL dream team. Pick from Dynamos, Highlanders, CAPS United and more. 
                Compete with thousands of fans across Zimbabwe.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.2s' }}>
                <Link to="/auth" className="w-full sm:w-auto">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-10">
                    Start Playing Free
                    <Zap className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/rules" className="w-full sm:w-auto">
                  <Button variant="heroOutline" size="lg" className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-10">
                    How to Play
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto animate-fade-in px-2" style={{ animationDelay: '0.3s' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <p className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-gold">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-20 md:py-28 bg-background">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-foreground">
                Everything You Need to
                <span className="text-primary"> Dominate</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg px-2">
                Get the complete fantasy football experience with powerful tools and real-time updates.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-card card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 sm:py-20 md:py-28 bg-muted/50">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-foreground">
                How It Works
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Get started in minutes and join the fantasy football action.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                { step: '01', title: 'Create Your Team', desc: 'Pick 15 players within your £100m budget. Choose wisely!' },
                { step: '02', title: 'Set Your Captain', desc: 'Your captain earns double points. Pick your best player!' },
                { step: '03', title: 'Watch Points Roll In', desc: 'Earn points for goals, assists, clean sheets, and more.' },
              ].map((item, index) => (
                <div key={item.step} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-gold text-foreground font-heading font-black text-lg sm:text-xl mb-3 sm:mb-4 shadow-gold">
                    {item.step}
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground px-2">{item.desc}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 md:py-28 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 pitch-lines opacity-5" />
          
          <div className="container relative z-10 text-center px-4">
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-5xl mb-4 sm:mb-6 text-white">
              Ready to Become a
              <span className="text-gold"> Champion?</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto px-2">
              Join thousands of fantasy managers competing in the Zimbabwe Premier Soccer League.
            </p>
            <Link to="/auth">
              <Button variant="gold" size="lg" className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-10">
                Create Free Account
                <Trophy className="w-5 h-5" />
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
