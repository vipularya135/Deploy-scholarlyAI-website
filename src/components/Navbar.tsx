
import React, { useState } from 'react';
import { ChevronDown, GraduationCap, Menu, X } from 'lucide-react';
import { SidePanel } from './SidePanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', link: '/', category: null },
  { name: 'Home', link: '/home', category: null },
  { name: 'Citations', link: '#', category: 'citations' },
  { name: 'i-10 Index', link: '#', category: 'i10-index' },
  { name: 'IITs', link: '#', category: 'iits' },
  { name: 'AI Chat', link: '/ai-chat', category: null },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleNavItemClick = (category: string | null, link: string) => {
    if (category) {
      setActiveCategory(category);
      setSidePanelOpen(true);
    }
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">
              <span className="text-white">Scholarly</span>
              <span className="text-primary">AI</span>
            </h1>
          </Link>
          
          {isMobile ? (
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          ) : (
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                item.category ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavItemClick(item.category, item.link)}
                    className="text-sm font-medium relative px-1 py-2 hover:text-primary transition-colors group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="text-sm font-medium relative px-1 py-2 hover:text-primary transition-colors group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )
              ))}
            </nav>
          )}
        </div>
        
        {/* Mobile Menu */}
        {isMobile && (
          <div 
            className={`absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 ${
              isOpen ? 'max-h-96 py-4' : 'max-h-0 py-0 overflow-hidden'
            }`}
          >
            <nav className="container mx-auto px-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                item.category ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavItemClick(item.category, item.link)}
                    className="text-sm font-medium p-2 hover:bg-white/10 rounded-md transition-colors flex justify-between items-center"
                  >
                    {item.name}
                    {item.category && <ChevronDown className="h-4 w-4" />}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="text-sm font-medium p-2 hover:bg-white/10 rounded-md transition-colors flex justify-between items-center"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </header>
      
      {/* Side Panel */}
      <SidePanel 
        isOpen={sidePanelOpen} 
        onClose={() => setSidePanelOpen(false)} 
        category={activeCategory || ''}
      />
    </>
  );
};
