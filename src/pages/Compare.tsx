import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PlayerComparison } from '@/components/fantasy/PlayerComparison';
import { Scale } from 'lucide-react';

export const Compare = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary py-6 sm:py-8">
          <div className="container px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-white">
                  Player Comparison
                </h1>
                <p className="text-white/70 text-sm sm:text-base">
                  Compare stats between any two players
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container px-4 py-6 sm:py-8">
          <PlayerComparison />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;