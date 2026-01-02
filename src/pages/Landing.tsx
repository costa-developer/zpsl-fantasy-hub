import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Trophy, Users, Calendar, TrendingUp, ChevronRight, Shield, Zap, Target } from 'lucide-react';

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
        <section className="relative bg-primary overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          
          <div className="container relative py-16 md:py-24 px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Left: Text Content */}
                <div className="text-center md:text-left animate-fade-in">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm text-white/90 font-medium">2025 Season Now Live</span>
                  </div>
                  
                  <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-white mb-6">
                    ZPSL Fantasy
                    <span className="block text-accent">Football</span>
                  </h1>

                  <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
                    Build your dream team from Zimbabwe Premier Soccer League players. 
                    Compete with fans across the nation.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link to="/auth">
                      <Button 
                        size="lg" 
                        className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base h-12 px-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                      >
                        Play Now - It's Free
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/rules">
                      <Button 
                        variant="ghost"
                        size="lg" 
                        className="w-full sm:w-auto text-white border border-white/30 hover:bg-white/10 font-medium text-base h-12 px-6"
                      >
                        How It Works
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Stats Grid */}
                <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  {stats.map((stat, index) => (
                    <div 
                      key={stat.label}
                      className="group bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
                      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                    >
                      <stat.icon className="w-6 h-6 text-accent/80 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-heading font-black text-3xl md:text-4xl text-accent">{stat.value}</p>
                      <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-foreground">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Simple to play, hard to master. Build your ultimate fantasy team in minutes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-foreground">
                  Get Started in 3 Steps
                </h2>
                <p className="text-muted-foreground text-lg">
                  Join thousands of ZPSL fans competing for glory
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'Sign Up Free', desc: 'Create your account in seconds - no payment required' },
                  { step: '2', title: 'Pick Your Squad', desc: 'Choose 15 players within your $100m budget wisely' },
                  { step: '3', title: 'Compete & Win', desc: 'Join leagues, climb the rankings, and prove your skills' },
                ].map((item, index) => (
                  <div 
                    key={item.step} 
                    className="flex items-center gap-5 bg-card p-5 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground hidden sm:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-24 bg-primary overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-3xl" />
          </div>
          
          <div className="container px-4 text-center relative">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-6 animate-bounce" style={{ animationDuration: '2s' }} />
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Ready to Dominate?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
              Join the ZPSL Fantasy community and prove you're the best manager in Zimbabwe.
            </p>
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base h-12 px-10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Create Free Account
                <ChevronRight className="w-5 h-5" />
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