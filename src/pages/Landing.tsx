import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Trophy, Users, Calendar, TrendingUp, ChevronRight } from 'lucide-react';

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

export const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - Clean, solid green like FPL */}
        <section className="bg-primary">
          <div className="container py-12 md:py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Text Content */}
                <div className="text-center md:text-left">
                  <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl leading-tight text-white mb-4">
                    ZPSL Fantasy
                    <span className="block text-accent">Football</span>
                  </h1>

                  <p className="text-white/90 text-base md:text-lg mb-6 max-w-md">
                    Build your dream team from Zimbabwe Premier Soccer League players. 
                    Compete with fans across the nation.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Link to="/auth">
                      <Button 
                        size="lg" 
                        className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                      >
                        Play Now - It's Free
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="font-heading font-black text-3xl md:text-4xl text-accent">16</p>
                    <p className="text-white/80 text-sm">Teams</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="font-heading font-black text-3xl md:text-4xl text-accent">76+</p>
                    <p className="text-white/80 text-sm">Players</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="font-heading font-black text-3xl md:text-4xl text-accent">34</p>
                    <p className="text-white/80 text-sm">Gameweeks</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="font-heading font-black text-3xl md:text-4xl text-accent">$100m</p>
                    <p className="text-white/80 text-sm">Budget</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Simple white background */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-8 text-foreground">
              How It Works
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-5 rounded-lg border border-border bg-card text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-base mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-12 md:py-16 bg-muted">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-8 text-foreground">
                Get Started in 3 Steps
              </h2>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'Sign Up Free', desc: 'Create your account in seconds' },
                  { step: '2', title: 'Pick Your Squad', desc: 'Choose 15 players within your $100m budget' },
                  { step: '3', title: 'Compete', desc: 'Join leagues and climb the rankings' },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-4 bg-card p-4 rounded-lg border border-border">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-heading font-bold flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Clean green */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container px-4 text-center">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
              Ready to Start?
            </h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Join the ZPSL Fantasy community today.
            </p>
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
              >
                Create Free Account
                <ChevronRight className="w-4 h-4" />
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