import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Share2, Check, Copy, MessageCircle, Instagram } from 'lucide-react';
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface SocialShareProps {
  teamName: string;
  rank: number;
  points: number;
  gameweekPoints?: number;
}

export const SocialShare = ({ teamName, rank, points, gameweekPoints }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const shareText = `🏆 My team "${teamName}" is ranked #${rank.toLocaleString()} with ${points} points${gameweekPoints ? ` (${gameweekPoints} this GW)` : ''} on ZPSL Fantasy Football! Can you beat me? 🇿🇼⚽`;
  
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://zpsl-fantasy.lovable.app';
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Share text copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Failed to copy',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  }, [shareText, shareUrl]);

  const handleShare = useCallback((platform: 'twitter' | 'facebook' | 'whatsapp') => {
    const urls = { twitter: twitterUrl, facebook: facebookUrl, whatsapp: whatsappUrl };
    window.open(urls[platform], '_blank', 'width=600,height=400,noopener,noreferrer');
  }, [twitterUrl, facebookUrl, whatsappUrl]);

  const generateCanvasImage = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }

      // Instagram Story dimensions (9:16 aspect ratio)
      canvas.width = 1080;
      canvas.height = 1920;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f3460');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ZPSL FANTASY', canvas.width / 2, 200);

      // Trophy emoji circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 450, 80, 0, Math.PI * 2);
      const trophyGradient = ctx.createLinearGradient(
        canvas.width / 2 - 80, 370, 
        canvas.width / 2 + 80, 530
      );
      trophyGradient.addColorStop(0, '#fbbf24');
      trophyGradient.addColorStop(1, '#d97706');
      ctx.fillStyle = trophyGradient;
      ctx.fill();

      // Trophy text
      ctx.fillStyle = '#000';
      ctx.font = '64px Arial, sans-serif';
      ctx.fillText('🏆', canvas.width / 2, 475);

      // Team name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 56px Arial, sans-serif';
      ctx.fillText(teamName, canvas.width / 2, 620);

      // Stats card background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.roundRect(90, 700, 900, 600, 24);
      ctx.fill();

      // Rank box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(130, 750, 400, 200, 16);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '28px Arial, sans-serif';
      ctx.fillText('GLOBAL RANK', 330, 810);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px Arial, sans-serif';
      ctx.fillText(`#${rank.toLocaleString()}`, 330, 900);

      // Points box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(550, 750, 400, 200, 16);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '28px Arial, sans-serif';
      ctx.fillText('TOTAL POINTS', 750, 810);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px Arial, sans-serif';
      ctx.fillText(String(points), 750, 900);

      // Gameweek points (if available)
      if (gameweekPoints) {
        ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
        ctx.beginPath();
        ctx.roundRect(130, 980, 820, 140, 16);
        ctx.fill();

        ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(130, 980, 820, 140, 16);
        ctx.stroke();

        ctx.fillStyle = '#4ade80';
        ctx.font = '28px Arial, sans-serif';
        ctx.fillText('GAMEWEEK POINTS', canvas.width / 2, 1030);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 56px Arial, sans-serif';
        ctx.fillText(`+${gameweekPoints}`, canvas.width / 2, 1095);
      }

      // Footer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '32px Arial, sans-serif';
      ctx.fillText('Can you beat me? 🇿🇼⚽', canvas.width / 2, 1500);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '24px Arial, sans-serif';
      ctx.fillText('zpsl-fantasy.lovable.app', canvas.width / 2, 1560);

      resolve(canvas.toDataURL('image/png'));
    });
  }, [teamName, rank, points, gameweekPoints]);

  const handleInstagramShare = useCallback(async () => {
    setGenerating(true);
    try {
      const dataUrl = await generateCanvasImage();
      if (!dataUrl) {
        throw new Error('Failed to generate image');
      }
      
      const link = document.createElement('a');
      link.download = `zpsl-ranking-${teamName.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: 'Image Downloaded!',
        description: 'Share it on your Instagram story',
      });
    } catch {
      toast({
        title: 'Failed to generate image',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  }, [generateCanvasImage, teamName]);

  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-primary" />
        <h3 className="font-heading font-bold text-base sm:text-lg text-foreground">Share Your Rank</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Brag about your ranking and challenge your friends!
      </p>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="flex-1 min-w-[80px] gap-2 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-colors"
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">Twitter</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="flex-1 min-w-[80px] gap-2 hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/50 transition-colors"
        >
          <Facebook className="w-4 h-4" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('whatsapp')}
          className="flex-1 min-w-[80px] gap-2 hover:bg-[#25D366]/10 hover:text-[#25D366] hover:border-[#25D366]/50 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleInstagramShare}
          disabled={generating}
          className="flex-1 min-w-[80px] gap-2 hover:bg-[#E1306C]/10 hover:text-[#E1306C] hover:border-[#E1306C]/50 transition-colors"
        >
          {generating ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Instagram className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">{generating ? 'Saving...' : 'Instagram'}</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex-1 min-w-[80px] gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;
