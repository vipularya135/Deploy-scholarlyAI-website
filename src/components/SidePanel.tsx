
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getProfessorsByCategory } from '@/utils/professorData';
import { ProfessorModal } from './ProfessorModal';
import type { Professor } from '@/utils/professorData';
import { staggeredEntrance } from '@/utils/animations';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

// Function to generate colors based on name
const getColorFromName = (name: string) => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-red-500', 'bg-purple-500', 'bg-pink-500', 
    'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
  ];
  
  // Use the first letter of the name (after removing titles) to determine the color
  const cleanName = name.replace(/^Dr\.\s+|^Prof\.\s+|^Professor\s+/i, '').trim();
  const index = cleanName.charCodeAt(0) % colors.length;
  return colors[index];
};

// Function to get the first letter of the first name (ignoring titles like Dr.)
const getInitials = (name: string) => {
  // Remove titles and trim
  const cleanName = name.replace(/^Dr\.\s+|^Prof\.\s+|^Professor\s+/i, '').trim();
  // Get first letter of the first name
  return cleanName.charAt(0);
};

export const SidePanel = ({ isOpen, onClose, category }: SidePanelProps) => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen && category) {
      const filteredProfessors = getProfessorsByCategory(category);
      setProfessors(filteredProfessors);
      
      // Apply staggered entrance animation after a short delay
      setTimeout(() => {
        staggeredEntrance('.professor-list-item', 50);
      }, 300);
    }
  }, [isOpen, category]);

  const handleProfessorClick = (professor: Professor) => {
    setSelectedProfessor(professor);
    setModalOpen(true);
  };

  const getCategoryTitle = (cat: string) => {
    switch(cat.toLowerCase()) {
      case 'citations': return 'Top Professors by Citations';
      case 'i10-index': return 'Top Professors by i10-Index';
      case 'publications': return 'Top Professors by Publications';
      case 'iits': return 'Professors from IITs';
      case 'non-iits': return 'Professors from Non-IITs';
      default: return 'Professors';
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
          style={{ 
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
        />
      )}
      
      {/* Side Panel */}
      <div 
        className={`fixed top-0 right-0 w-full md:w-96 h-full bg-background/95 backdrop-blur-xl border-l border-white/10 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{getCategoryTitle(category)}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {professors.length > 0 ? (
            <ul className="space-y-3">
              {professors.map((professor) => (
                <li 
                  key={professor.id}
                  className="professor-list-item bg-secondary/60 rounded-lg p-4 hover:bg-secondary/80 transition-colors cursor-pointer opacity-0"
                  onClick={() => handleProfessorClick(professor)}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className={`w-12 h-12 ${getColorFromName(professor.name)}`}>
                      <AvatarFallback className="text-white">
                        {getInitials(professor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium truncate">{professor.name}</h3>
                      <p className="text-sm text-gray-400 truncate">{professor.institution}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-primary font-semibold">{professor.citations.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Citations</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">No professors found for this category.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Professor Modal */}
      {selectedProfessor && (
        <ProfessorModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          professor={selectedProfessor} 
        />
      )}
    </>
  );
};
