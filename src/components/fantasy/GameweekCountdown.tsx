import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface GameweekCountdownProps {
  deadline: string;
  gameweekName: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const GameweekCountdown = ({ deadline, gameweekName }: GameweekCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(deadline).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-card border border-border flex items-center justify-center shadow-card">
        <span className="font-heading font-black text-xl md:text-2xl">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-6 md:p-8 text-primary-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 pitch-lines opacity-10" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium text-primary-foreground/80">Deadline</span>
        </div>

        <h3 className="font-heading font-bold text-xl md:text-2xl mb-6">
          {gameweekName}
        </h3>

        <div className="flex justify-center gap-3 md:gap-4">
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <TimeBlock value={timeLeft.minutes} label="Mins" />
          <TimeBlock value={timeLeft.seconds} label="Secs" />
        </div>

        <p className="text-center text-sm text-primary-foreground/60 mt-4">
          Make your transfers before the deadline!
        </p>
      </div>
    </div>
  );
};

export default GameweekCountdown;
