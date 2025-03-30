
import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { DepartmentSection } from '@/components/DepartmentSection';
import { HeroCarousel } from '@/components/HeroCarousel';
import { departments } from '@/utils/professorData';

const Index = () => {
  // Add padding to body for fixed navbar
  useEffect(() => {
    document.body.style.paddingTop = '72px';
    
    // Create background image directories
    const createBgImages = () => {
      console.log('Background images would be loaded here in a real application');
    };
    
    createBgImages();
    
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, []);
  
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
        
        {/* Department Sections */}
        {departments.map((department) => (
          <DepartmentSection key={department.id} department={department} />
        ))}
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

export default Index;
