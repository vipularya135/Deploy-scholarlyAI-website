
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Professor } from '@/utils/professorData';
import { ProfessorModal } from './ProfessorModal';
import { Award, BookOpen, Users } from 'lucide-react';

interface ProfessorCardProps {
  professor: Professor;
  isShowAll?: boolean;
}

export const ProfessorCard = ({ professor, isShowAll = false }: ProfessorCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  if (isShowAll) {
    return (
      <div 
        className="professor-card card-hover h-80 rounded-xl bg-secondary/30 flex flex-col items-center justify-center cursor-pointer"
        onClick={() => navigate(`/department/${professor.departmentId}`)}
      >
        <div className="relative w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-primary">+</span>
        </div>
        <h3 className="text-lg font-semibold text-center">Show All</h3>
        <p className="text-sm text-gray-400 text-center mt-2">View all professors in this department</p>
      </div>
    );
  }
  
  return (
    <>
      <div 
        className="professor-card card-hover h-80 rounded-xl overflow-hidden relative"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="w-full h-full bg-secondary/40 p-6">
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-semibold truncate">{professor.name}</h3>
            <p className="text-sm text-gray-300 truncate mb-4">{professor.institution}</p>
            
            <div className="flex items-center gap-2 mt-2 mb-1">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm text-gray-300">Research Focus:</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-auto">
              {professor.researchInterests.slice(0, 3).map((interest, index) => (
                <span key={index} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                  {interest}
                </span>
              ))}
              {professor.researchInterests.length > 3 && (
                <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                  +{professor.researchInterests.length - 3} more
                </span>
              )}
            </div>
            
            <div className="mt-auto grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Citations</p>
                <p className="text-lg font-semibold">{professor.citations.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">H-Index</p>
                <p className="text-lg font-semibold">{professor.hIndex}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ProfessorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        professor={professor} 
      />
    </>
  );
};
