
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ProfessorCard } from '@/components/ProfessorCard';
import { getAllProfessorsByDepartment, departments } from '@/utils/professorData';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GridView = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [professors, setProfessors] = useState([]);
  
  useEffect(() => {
    // Add padding to body for fixed navbar
    document.body.style.paddingTop = '72px';
    
    if (departmentId) {
      const allProfessors = getAllProfessorsByDepartment(departmentId);
      setProfessors(allProfessors);
    }
    
    // Reset scroll position to top
    window.scrollTo(0, 0);
    
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, [departmentId]);
  
  const handleBackClick = () => {
    // If we have state with a previousPath, use that
    if (location.state?.from === 'home') {
      navigate('/home');
    } else {
      navigate('/');
    }
  };
  
  const department = departments.find(d => d.id === departmentId);
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Global Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0 opacity-15" 
        style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/006/817/039/small_2x/educational-equipment-boards-and-books-education-concept-with-copy-space-photo.jpg')` }}
      ></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-10 relative z-10">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="mr-3" 
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">{department?.name || 'All'} Professors</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {professors.map((professor) => (
            <div key={professor.id}>
              <ProfessorCard professor={professor} />
            </div>
          ))}
        </div>
      </main>
      
      <footer className="border-t border-white/10 py-8 bg-background/80 backdrop-blur-sm relative z-10 mt-10">
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

export default GridView;
