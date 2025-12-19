import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users, Star, TrendingUp, AlertTriangle, Trophy, Zap } from 'lucide-react';

const scoringRules = [
  { action: 'Minutes Played (1-59 mins)', points: 1 },
  { action: 'Minutes Played (60+ mins)', points: 2 },
  { action: 'Goal scored (Forward)', points: 4 },
  { action: 'Goal scored (Midfielder)', points: 5 },
  { action: 'Goal scored (Defender/GK)', points: 6 },
  { action: 'Assist', points: 3 },
  { action: 'Clean sheet (Defender/GK)', points: 4 },
  { action: 'Clean sheet (Midfielder)', points: 1 },
  { action: 'Penalty save', points: 5 },
  { action: 'Penalty miss', points: -2 },
  { action: 'Yellow card', points: -1 },
  { action: 'Red card', points: -3 },
  { action: 'Own goal', points: -2 },
  { action: 'Every 2 goals conceded (GK/DEF)', points: -1 },
  { action: 'Bonus points (top 3 in match)', points: '1-3' },
];

export const Rules = () => {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-hero text-primary-foreground py-12">
          <div className="container text-center">
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Rules & Scoring
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Everything you need to know about playing ZPSL Fantasy Football
            </p>
          </div>
        </section>

        <div className="container py-12">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Squad Rules */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-2xl">Squad Rules</h2>
              </div>
              
              <div className="bg-card rounded-xl border border-border shadow-card p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="font-heading font-bold text-lg">15 Players</p>
                    <p className="text-sm text-muted-foreground">Total squad size</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="font-heading font-bold text-lg">£100m</p>
                    <p className="text-sm text-muted-foreground">Starting budget</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="font-heading font-bold text-lg">3 Players</p>
                    <p className="text-sm text-muted-foreground">Max from same team</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="font-heading font-bold text-lg">11 Starting</p>
                    <p className="text-sm text-muted-foreground">Players per gameweek</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold mb-3">Position Requirements:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-8 h-6 rounded bg-amber-500 text-white text-xs font-bold flex items-center justify-center">GK</span>
                      <span>2 Goalkeepers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-8 h-6 rounded bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">DEF</span>
                      <span>5 Defenders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-8 h-6 rounded bg-sky-500 text-white text-xs font-bold flex items-center justify-center">MID</span>
                      <span>5 Midfielders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-8 h-6 rounded bg-rose-500 text-white text-xs font-bold flex items-center justify-center">FWD</span>
                      <span>3 Forwards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Scoring System */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-heading font-bold text-2xl">Scoring System</h2>
              </div>
              
              <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-heading font-bold">Action</th>
                      <th className="text-right p-4 font-heading font-bold">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoringRules.map((rule, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="p-4 text-sm">{rule.action}</td>
                        <td className={`p-4 text-right font-bold ${
                          typeof rule.points === 'number' && rule.points < 0 
                            ? 'text-destructive' 
                            : 'text-primary'
                        }`}>
                          {typeof rule.points === 'number' && rule.points > 0 ? '+' : ''}
                          {rule.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Transfers */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-2xl">Transfers</h2>
              </div>
              
              <div className="bg-card rounded-xl border border-border shadow-card p-6 space-y-4">
                <p className="text-muted-foreground">
                  Each gameweek, you receive <strong className="text-foreground">1 free transfer</strong>. 
                  Unused free transfers roll over to the next gameweek, up to a maximum of 2.
                </p>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-destructive">Point Deductions</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Any additional transfers beyond your free allocation will cost <strong>4 points each</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Captain */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-heading font-bold text-2xl">Captain & Vice-Captain</h2>
              </div>
              
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-gradient-gold text-accent-foreground">
                    <p className="font-heading font-bold text-lg mb-2">Captain (C)</p>
                    <p className="text-sm opacity-90">
                      Your captain's points are <strong>doubled</strong> each gameweek. Choose wisely!
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="font-heading font-bold text-lg mb-2">Vice-Captain (V)</p>
                    <p className="text-sm text-muted-foreground">
                      If your captain doesn't play, your vice-captain's points will be doubled instead.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-heading font-bold text-2xl">Frequently Asked Questions</h2>
              </div>
              
              <Accordion type="single" collapsible className="bg-card rounded-xl border border-border shadow-card">
                <AccordionItem value="item-1" className="border-b border-border">
                  <AccordionTrigger className="px-6">
                    When does the gameweek deadline pass?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    The deadline for each gameweek is typically 90 minutes before the first match kicks off. 
                    You can see the exact deadline in your dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-border">
                  <AccordionTrigger className="px-6">
                    How do bonus points work?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    In each match, the three best performing players receive bonus points (3, 2, and 1) 
                    based on the Bonus Points System (BPS), which takes into account various in-game actions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-border">
                  <AccordionTrigger className="px-6">
                    Can I join multiple leagues?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    Yes! You can join unlimited private leagues and you're automatically entered into the 
                    overall rankings league to compete against all managers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-6">
                    What happens if a player doesn't play?
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    If any of your starting 11 don't play, they will be automatically substituted with 
                    players from your bench, in order of priority and valid formation rules.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rules;
