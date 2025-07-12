import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload as UploadIcon, Image, ArrowLeft, Sparkles } from "lucide-react";

interface UploadedFile {
  file: File;
  preview: string;
}

const Upload = () => {
  const [feedImage, setFeedImage] = useState<UploadedFile | null>(null);
  const [imageA, setImageA] = useState<UploadedFile | null>(null);
  const [imageB, setImageB] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = useCallback((file: File, type: 'feed' | 'imageA' | 'imageB') => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PNG or JPEG image.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    const preview = URL.createObjectURL(file);
    const uploadedFile = { file, preview };

    switch (type) {
      case 'feed':
        setFeedImage(uploadedFile);
        break;
      case 'imageA':
        setImageA(uploadedFile);
        break;
      case 'imageB':
        setImageB(uploadedFile);
        break;
    }
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent, type: 'feed' | 'imageA' | 'imageB') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file, type);
    }
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: 'feed' | 'imageA' | 'imageB') => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, type);
    }
  }, [handleFileUpload]);

  const handleSubmit = async () => {
    if (!feedImage || !imageA || !imageB) {
      toast({
        title: "Missing images",
        description: "Please upload all three images before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Create FormData for API request
      const formData = new FormData();
      formData.append('feed_image', feedImage.file);
      formData.append('image_a', imageA.file);
      formData.append('image_b', imageB.file);

      // Update progress to show API call starting
      setProgress(20);

      // Make API request to backend
      const response = await fetch('http://localhost:8000/compare', {
        method: 'POST',
        body: formData,
      });

      setProgress(60);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setProgress(100);

      // Navigate to results with real data
      setTimeout(() => {
        navigate('/results', {
          state: {
            feedImage: feedImage.preview,
            imageA: { preview: imageA.preview, score: result.image_a_score },
            imageB: { preview: imageB.preview, score: result.image_b_score },
          }
        });
      }, 500);

    } catch (error) {
      console.error('Error during image analysis:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const UploadZone = ({ type, image, title, description }: {
    type: 'feed' | 'imageA' | 'imageB';
    image: UploadedFile | null;
    title: string;
    description: string;
  }) => (
    <Card className="upload-zone relative overflow-hidden group">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e, type)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div
        onDrop={(e) => handleDrop(e, type)}
        onDragOver={(e) => e.preventDefault()}
        className="text-center"
      >
        {image ? (
          <div className="space-y-4">
            <img
              src={image.preview}
              alt="Uploaded preview"
              className="w-32 h-32 object-cover rounded-2xl mx-auto shadow-soft"
            />
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">Click to change</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary to-primary-glow p-4 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
              <UploadIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
              <p className="text-xs text-muted-foreground mt-2">PNG or JPEG • Max 5MB</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen py-8 px-4 blob-bg">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 btn-secondary-soft"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upload Your Images
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your Instagram feed screenshot and the two photos you're considering. 
            We'll analyze which one fits better with your aesthetic.
          </p>
        </div>

        {/* Upload Sections */}
        <div className="space-y-8">
          {/* Feed Screenshot */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Image className="h-5 w-5 mr-2" />
              Instagram Feed Screenshot
            </h2>
            <UploadZone
              type="feed"
              image={feedImage}
              title="Upload Your Feed"
              description="Screenshot your Instagram profile grid"
            />
          </div>

          {/* Candidate Photos */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Photos to Compare
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadZone
                type="imageA"
                image={imageA}
                title="Picture A"
                description="First photo option"
              />
              <UploadZone
                type="imageB"
                image={imageB}
                title="Picture B"
                description="Second photo option"
              />
            </div>
          </div>
        </div>

        {/* Processing State */}
        {isProcessing && (
          <Card className="card-soft mt-8 text-center">
            <div className="space-y-4">
              <div className="animate-spin mx-auto w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
              <h3 className="text-xl font-semibold">Analyzing Your Aesthetic...</h3>
              <p className="text-muted-foreground">This might take a moment</p>
              <Progress value={progress} className="max-w-md mx-auto" />
            </div>
          </Card>
        )}

        {/* Submit Button */}
        {!isProcessing && (
          <div className="text-center mt-12">
            <Button
              onClick={handleSubmit}
              disabled={!feedImage || !imageA || !imageB}
              className="btn-soft text-lg group"
            >
              <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
              See Which One Fits Better
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;