import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Trophy, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface ResultsState {
  feedImage: string;
  imageA: { preview: string; score: number };
  imageB: { preview: string; score: number };
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  
  const state = location.state as ResultsState;

  useEffect(() => {
    if (!state) {
      navigate('/upload');
      return;
    }
    
    // Trigger animations after component mounts
    setTimeout(() => setShowAnimation(true), 300);
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { feedImage, imageA, imageB } = state;
  const winner = imageA.score > imageB.score ? 'A' : 'B';
  const winnerImage = imageA.score > imageB.score ? imageA : imageB;
  const loserImage = imageA.score > imageB.score ? imageB : imageA;

  const getScoreColor = (score: number) => {
    if (score >= 85) return "from-emerald-500 to-green-400";
    if (score >= 70) return "from-primary to-primary-glow";
    return "from-orange-500 to-yellow-400";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 85) return "Perfect match for your vibe! ✨";
    if (score >= 70) return "A great match for your current aesthetic!";
    return "Not quite your style, but still workable.";
  };

  return (
    <div className="min-h-screen py-8 px-4 blob-bg">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/upload')}
            className="mb-8 btn-secondary-soft"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Try New Photos
          </Button>
          
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Here's how your photos stack up!
              </h1>
            </div>
            
            {showAnimation && (
              <div className="animate-bounce">
                <Sparkles className="h-6 w-6 text-primary mx-auto" />
              </div>
            )}
          </div>
        </div>

        {/* Feed Reference */}
        <Card className="card-soft mb-12 text-center">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Your Instagram Feed</h2>
          <div className="max-w-sm mx-auto">
            <img
              src={feedImage}
              alt="Instagram feed"
              className="w-full rounded-2xl shadow-soft"
            />
          </div>
        </Card>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Winner Card */}
          <Card className={`card-soft relative overflow-hidden ${showAnimation ? 'animate-glow' : ''}`}>
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-emerald-500 to-green-400 text-white">
                <Trophy className="h-3 w-3 mr-1" />
                Winner
              </Badge>
            </div>
            
            <div className="text-center space-y-6">
              <img
                src={winnerImage.preview}
                alt={`Picture ${winner}`}
                className="w-full h-64 object-cover rounded-2xl shadow-soft"
              />
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Picture {winner}
                </h3>
                
                <div className="relative">
                  <div className={`text-5xl font-bold bg-gradient-to-r ${getScoreColor(winnerImage.score)} bg-clip-text text-transparent`}>
                    {winnerImage.score}%
                  </div>
                  <div className="text-lg font-medium text-muted-foreground">
                    Aesthetic Fit
                  </div>
                </div>
                
                <p className="text-primary font-medium">
                  {getScoreMessage(winnerImage.score)}
                </p>
              </div>
            </div>
          </Card>

          {/* Runner-up Card */}
          <Card className="card-soft relative">
            <div className="text-center space-y-6">
              <img
                src={loserImage.preview}
                alt={`Picture ${winner === 'A' ? 'B' : 'A'}`}
                className="w-full h-64 object-cover rounded-2xl shadow-soft opacity-90"
              />
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Picture {winner === 'A' ? 'B' : 'A'}
                </h3>
                
                <div className="relative">
                  <div className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor(loserImage.score)} bg-clip-text text-transparent`}>
                    {loserImage.score}%
                  </div>
                  <div className="text-lg font-medium text-muted-foreground">
                    Aesthetic Fit
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  {getScoreMessage(loserImage.score)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommendation */}
        <Card className="card-soft text-center mb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold text-foreground">Our Recommendation</h2>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on your feed's aesthetic, <span className="font-semibold text-primary">Picture {winner}</span> would 
              be the better choice for maintaining your visual consistency and style.
            </p>
            
            {winnerImage.score >= 85 && (
              <div className="mt-4">
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-400 text-white text-sm px-4 py-2">
                  🎉 Exceptional match! This will look amazing on your feed.
                </Badge>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/upload')}
            className="btn-soft text-lg group"
          >
            <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            Try New Photos
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="btn-secondary-soft"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;