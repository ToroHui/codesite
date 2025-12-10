import React from 'react';
import { Project } from '../types';
import { ChevronRight, Lock, Coffee, Layers, LayoutGrid, Terminal, Globe, Smartphone, Monitor, AppWindow, FileCode, Server, Box } from 'lucide-react';

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

  // 根据技术栈返回彩色图标和背景色
  const getTechIcon = () => {
    const cat = project.short_category.toLowerCase();
    
    if (cat.includes('spring') || cat.includes('java')) {
      return { 
        icon: <Coffee size={24} />, 
        bg: 'bg-[#3B82F6]', // 蓝色 - Java/Spring
        text: 'text-white'
      };
    }
    if (cat.includes('ssm')) {
      return { 
        icon: <Layers size={24} />, 
        bg: 'bg-[#8B5CF6]', // 紫色 - SSM
        text: 'text-white'
      };
    }
    if (cat.includes('vue')) {
      return { 
        icon: <LayoutGrid size={24} />, 
        bg: 'bg-[#10B981]', // 绿色 - Vue
        text: 'text-white'
      };
    }
    if (cat.includes('python') || cat.includes('django') || cat.includes('flask')) {
      return { 
        icon: <Terminal size={24} />, 
        bg: 'bg-[#F59E0B]', // 橙色 - Python
        text: 'text-white'
      };
    }
    if (cat.includes('android') || cat.includes('安卓')) {
      return { 
        icon: <Smartphone size={24} />, 
        bg: 'bg-[#10B981]', // 绿色 - Android
        text: 'text-white'
      };
    }
    if (cat.includes('html')) {
      return { 
        icon: <Globe size={24} />, 
        bg: 'bg-[#EF4444]', // 红色 - HTML
        text: 'text-white'
      };
    }
    if (cat.includes('qt') || cat.includes('c#')) {
      return { 
        icon: <Monitor size={24} />, 
        bg: 'bg-[#6366F1]', // 靛蓝 - Qt/C#
        text: 'text-white'
      };
    }
    if (cat.includes('uniapp') || cat.includes('小程序') || cat.includes('微信')) {
      return { 
        icon: <AppWindow size={24} />, 
        bg: 'bg-[#06B6D4]', // 青色 - 小程序
        text: 'text-white'
      };
    }
    if (cat.includes('php')) {
      return { 
        icon: <FileCode size={24} />, 
        bg: 'bg-[#8B5CF6]', // 紫色 - PHP
        text: 'text-white'
      };
    }
    if (cat.includes('node')) {
      return { 
        icon: <Server size={24} />, 
        bg: 'bg-[#10B981]', // 绿色 - Node
        text: 'text-white'
      };
    }
    
    // 默认渐变色
    return { 
      icon: <Box size={24} />, 
      bg: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      text: 'text-white'
    };
  };

  const techIcon = getTechIcon();

  // 移除标题中的技术栈前缀（如 "springboot004-"）
  const cleanTitle = (title: string) => {
    return title.replace(/^(springboot|ssm|vue|python|django|flask|android|html|php|node|qt|c#|uniapp)\d*[-_\s]*/i, '');
  };

  return (
    <div 
      onClick={() => onClick(project)}
      className="group relative flex flex-col p-5 rounded-xl bg-[#151725] border border-[#1F2937] hover:border-[#3B82F6]/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20"
    >
      {/* Icon & Category Header - 优化后只保留一个高亮标签 */}
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-[10px] ${techIcon.bg} flex items-center justify-center ${techIcon.text} shadow-lg`}>
          {techIcon.icon}
        </div>
        
        {/* 只保留一个技术栈标签 */}
        <span className="px-2.5 py-1 text-[11px] font-semibold text-[#818CF8] bg-[#1E1B4B] rounded border border-[#6366F1]">
          {project.short_category}
        </span>
      </div>

      {/* Content - 移除了标题中的编号前缀 */}
      <h3 className="text-[#F8FAFC] font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors min-h-[44px]">
        {highlightText(cleanTitle(project.name), searchQuery)}
      </h3>
      
      <div className="mt-auto pt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
           <Lock size={12} />
           <span>加密资源</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 duration-300">
          获取 <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;