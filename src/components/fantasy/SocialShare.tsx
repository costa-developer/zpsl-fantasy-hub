import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Share2, Check, Copy, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface SocialShareProps {
  teamName: string;
  rank: number;
  points: number;
  gameweekPoints?: number;
}

export const SocialShare = ({ teamName, rank, points, gameweekPoints }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  
  const shareText = `🏆 My team "${teamName}" is ranked #${rank.toLocaleString()} with ${points} points${gameweekPoints ? ` (${gameweekPoints} this GW)` : ''} on ZPSL Fantasy Football! Can you beat me? 🇿🇼⚽`;
  
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://zpsl-fantasy.lovable.app';
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Share text copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const handleShare = (platform: 'twitter' | 'facebook' | 'whatsapp') => {
    const urls = { twitter: twitterUrl, facebook: facebookUrl, whatsapp: whatsappUrl };
    window.open(urls[platform], '_blank', 'width=600,height=400,noopener,noreferrer');
  };

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
          className="flex-1 min-w-[100px] gap-2 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-colors"
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">Twitter</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('facebook')}
          className="flex-1 min-w-[100px] gap-2 hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/50 transition-colors"
        >
          <Facebook className="w-4 h-4" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('whatsapp')}
          className="flex-1 min-w-[100px] gap-2 hover:bg-[#25D366]/10 hover:text-[#25D366] hover:border-[#25D366]/50 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex-1 min-w-[100px] gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;