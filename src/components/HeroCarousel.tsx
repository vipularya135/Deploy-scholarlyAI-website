
import React, { useEffect, useState } from 'react';

const carouselItems = [
  {
    id: 1,
    title: "Dashboard: Visualize The Citation Impact",
    description: "Track, analyze, and discover the impact of academic research."
  },
  {
    id: 2,
    title: "Discover Top Professors Across India",
    description: "Find and connect with leading academic experts in various fields."
  },
  {
    id: 3,
    title: "Explore Research Excellence",
    description: "Access professors with the highest research impact and citations."
  },
  {
    id: 4,
    title: "Find Your Academic Mentor",
    description: "Connect with professors who align with your research interests."
  },
  {
    id: 5,
    title: "Stay Updated with Latest Research",
    description: "Discover the most cited and influential papers in your field."
  },
  {
    id: 6,
    title: "Compare Academic Metrics",
    description: "Analyze H-index, citations, and publications across professors."
  },
  {
    id: 7,
    title: "Interdisciplinary Collaboration",
    description: "Discover professors working across multiple academic disciplines."
  },
  {
    id: 8,
    title: "Academic Excellence Beyond STEM",
    description: "Explore top researchers in arts, humanities, business, and more."
  },
  {
    id: 9,
    title: "Find Global Academic Leaders",
    description: "Connect with researchers making worldwide impacts in their fields."
  }
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative overflow-hidden min-h-[300px]">
      {carouselItems.map((item, index) => (
        <div 
          key={item.id} 
          className={`transition-opacity duration-1000 absolute inset-0 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">{item.title}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
