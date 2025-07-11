import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden blob-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center mb-8 animate-float">
              <div className="bg-gradient-to-r from-primary to-primary-glow p-4 rounded-3xl shadow-glow">
                <Instagram className="h-12 w-12 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  FeedFit
                </h1>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Which photo fits your 
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {" "}feed better?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Upload your Instagram feed screenshot and two pictures you're considering posting. 
              We'll tell you which one matches your aesthetic best.
            </p>

            {/* CTA Button */}
            <Link to="/upload">
              <Button className="btn-soft text-lg group">
                <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
                Get Started
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* Features Preview */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="card-soft text-center hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-primary to-primary-glow p-3 rounded-2xl w-fit mx-auto mb-4">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Feed</h3>
                <p className="text-muted-foreground">Screenshot your Instagram feed to analyze your aesthetic</p>
              </div>

              <div className="card-soft text-center hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-accent to-secondary p-3 rounded-2xl w-fit mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compare Photos</h3>
                <p className="text-muted-foreground">Upload two candidate photos you're considering</p>
              </div>

              <div className="card-soft text-center hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-secondary to-primary-glow p-3 rounded-2xl w-fit mx-auto mb-4">
                  <ArrowRight className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Your Score</h3>
                <p className="text-muted-foreground">See which photo fits your aesthetic best</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-xl animate-float" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-xl animate-float" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-r from-secondary/30 to-transparent rounded-full blur-xl animate-float" 
             style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
};

export default Landing;