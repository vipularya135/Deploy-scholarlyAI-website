
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HeroCarousel } from '@/components/HeroCarousel';
import { 
  ActivityIcon, 
  TrendingUpIcon, 
  BookIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  carouselItems: string[];
}

const FeatureCard = ({ title, description, icon, onClick, carouselItems }: FeatureCardProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Manual carousel autoplay implementation
    let currentIndex = 0;
    const itemCount = carouselItems.length;
    
    if (!carouselRef.current) return;
    
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      
      currentIndex = (currentIndex + 1) % itemCount;
      const container = carouselRef.current.querySelector('.embla__container') as HTMLElement;
      if (!container) return;
      
      const itemWidth = container.children[0]?.clientWidth || 0;
      const scrollPosition = currentIndex * itemWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [carouselItems.length]);
  
  return (
    <div className="bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-xl p-6 hover:bg-secondary/30 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="bg-primary/20 rounded-full p-4 w-16 h-16 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <Button onClick={onClick} className="mb-6">
            Explore
          </Button>
        </div>
      </div>
      
      <div ref={carouselRef}>
        <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 h-full border border-white/10">
                    <p className="text-sm">{item}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Add padding to body for fixed navbar
  useEffect(() => {
    document.body.style.paddingTop = '72px';
    
    // Reset scroll position to top
    window.scrollTo(0, 0);
    
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, []);
  
  const trackCitationsCarousel = [
    "Monitor the impact of your research over time",
    "Track citation growth across publications",
    "Compare citation metrics with peers",
    "Get alerts for new citations to your work",
    "Identify your most impactful publications"
  ];
  
  const analyzeTrendsCarousel = [
    "Discover emerging themes and hotspots in your field",
    "Identify rising researchers and institutions",
    "Visualize research networks and collaborations",
    "Track funding patterns in your discipline",
    "Detect shifting research priorities"
  ];
  
  const discoverPapersCarousel = [
    "Identify key publications that drive innovation",
    "Find seminal works in emerging fields",
    "Discover cross-disciplinary breakthrough papers",
    "Track papers gaining rapid attention",
    "Find underappreciated gems with growing impact"
  ];
  
  const handleAnalysisNavigation = (type: string) => {
    navigate(`/analysis/${type}`);
    // Reset scroll position when navigating
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Global Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0 opacity-15" 
        style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/006/817/039/small_2x/educational-equipment-boards-and-books-education-concept-with-copy-space-photo.jpg')` }}
      ></div>
      
      <Navbar />
      
      <main className="pb-20 relative z-10">
        <section className="hero-section py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <HeroCarousel />
          </div>
          
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background z-0 opacity-40"></div>
        </section>
        
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8">
            <FeatureCard
              title="Track Citations"
              description="Monitor and analyze citation metrics for your research and publications."
              icon={<ActivityIcon className="w-8 h-8 text-primary" />}
              onClick={() => handleAnalysisNavigation('citations')}
              carouselItems={trackCitationsCarousel}
            />
            
            <FeatureCard
              title="Analyze Trends"
              description="Identify emerging research themes and visualization patterns in academic publications."
              icon={<TrendingUpIcon className="w-8 h-8 text-primary" />}
              onClick={() => handleAnalysisNavigation('trends')}
              carouselItems={analyzeTrendsCarousel}
            />
            
            <FeatureCard
              title="Discover Influential Papers"
              description="Find and explore the most impactful publications in your field of interest."
              icon={<BookIcon className="w-8 h-8 text-primary" />}
              onClick={() => handleAnalysisNavigation('papers')}
              carouselItems={discoverPapersCarousel}
            />
          </div>
        </section>
      </main>
      
      <footer className="border-t border-white/10 py-8 bg-background/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} ScholarlyAI. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">About</a>
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
