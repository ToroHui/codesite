import React from 'react';
import { Project } from '../types';
import { Code2, ChevronRight, Lock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  searchQuery?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, searchQuery }) => {
  const highlightText = (text: string, query?: string) => {
    if (!query || !query.trim()) return text;
    
    try {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
      
      return parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="text-cyan-400 font-bold">{part}</span>
        ) : (
          part
        )
      );
    } catch (e) {
      return text;
    }
  };

  return (
    <div 
      onClick={() => onClick(project)}
      className="group relative flex flex-col p-5 rounded-2xl bg-[#1e2130]/60 border border-white/5 backdrop-blur-sm hover:bg-[#1e2130] hover:border-cyan-500/30 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-900/20"
    >
      {/* Icon & Category Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 group-hover:border-cyan-500/20 transition-colors">
          <Code2 className="text-indigo-400 group-hover:text-cyan-400 transition-colors" size={24} />
        </div>
        <div className="flex gap-2">
            <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-gray-400 bg-white/5 rounded-md border border-white/5">
                {project.short_category}
            </span>
             {project.tags.length > 0 && (
                 <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-purple-400 bg-purple-500/10 rounded-md border border-purple-500/10">
                    {project.tags[0]}
                </span>
             )}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-white font-medium text-lg leading-snug mb-2 line-clamp-2 group-hover:text-cyan-50 transition-colors">
        {highlightText(project.name, searchQuery)}
      </h3>
      
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
           <Lock size={12} />
           <span>加密资源</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
          获取权限 <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;