
import React, { useState, useEffect, useMemo } from 'react';
import { WECHAT_ID } from './data';
import { Project } from './types';
import ProjectCard from './components/ProjectCard';
import Modal from './components/Modal';
import { 
  Search, 
  LayoutGrid, 
  Layers, 
  Globe, 
  Smartphone, 
  Terminal, 
  Monitor, 
  Server,
  Box,
  Coffee,
  AppWindow,
  FileCode,
  Loader2
} from 'lucide-react';

// Number of items to load per "page" (virtual pagination)
const ITEMS_PER_PAGE = 24;

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.statusText}`);
        }
        const data = await response.json();
        const loadedProjects = data as Project[];
        setProjects(loadedProjects);

        // Dynamically extract unique categories
        const categoriesSet = new Set<string>();
        loadedProjects.forEach(project => {
          if (project.short_category) {
            categoriesSet.add(project.short_category);
          } else if (project.category) {
            categoriesSet.add(project.category);
          }
        });
        setAllCategories(Array.from(categoriesSet).sort());
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("无法加载资源数据，请稍后重试。");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || project.short_category === selectedCategory || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, projects]);

  // Projects actually currently visible (for "Load More" functionality)
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategory]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  // Helper to render icons based on category
  const renderCategoryIcon = (category: string) => {
    const size = 16;
    const cat = category.toLowerCase();
    
    if (cat.includes('spring') || cat.includes('java')) return <Coffee size={size} />;
    if (cat.includes('ssm')) return <Layers size={size} />;
    if (cat.includes('vue')) return <LayoutGrid size={size} />;
    if (cat.includes('android') || cat.includes('安卓')) return <Smartphone size={size} />;
    if (cat.includes('html')) return <Globe size={size} />;
    if (cat.includes('python') || cat.includes('django') || cat.includes('flask')) return <Terminal size={size} />;
    if (cat.includes('qt') || cat.includes('c#')) return <Monitor size={size} />;
    if (cat.includes('uniapp') || cat.includes('小程序') || cat.includes('微信')) return <AppWindow size={size} />;
    if (cat.includes('php')) return <FileCode size={size} />;
    if (cat.includes('node')) return <Server size={size} />;
    
    return <Box size={size} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-cyan-400" size={48} />
          <p className="text-gray-400">正在加载资源库...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">出错了</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f111a] text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Mobile Header (Only visible on small screens) */}
        <header className="lg:hidden mb-8 text-center">
             <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            代码<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">宝库</span>
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar (Desktop Sticky) / Horizontal Scroll (Mobile) */}
          <aside className="lg:w-64 flex-shrink-0">
             <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* Desktop Logo */}
                <div className="hidden lg:block px-2 mb-8">
                   <h1 className="text-4xl font-bold text-white tracking-tight">
                    代码<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">宝库</span>
                  </h1>
                  <p className="text-xs text-gray-500 mt-2">3000+ 优质源码资源库</p>
                </div>

                {/* Category List */}
                <div className="
                  flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 
                  scrollbar-hide lg:scrollbar-default
                  bg-[#1e2130]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-2 lg:p-4
                ">
                   <button
                      onClick={() => setSelectedCategory('All')}
                      className={`
                        flex-shrink-0 w-auto lg:w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3
                        ${selectedCategory === 'All' 
                          ? 'bg-gradient-to-r from-blue-600/90 to-cyan-500/90 text-white shadow-lg shadow-cyan-500/20 border-white/10' 
                          : 'hover:bg-white/5 text-gray-400 border-transparent hover:text-white'
                        } border
                      `}
                   >
                      <LayoutGrid size={16} />
                      <span>全部</span>
                   </button>

                   {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`
                          flex-shrink-0 w-auto lg:w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3
                          ${selectedCategory === category 
                            ? 'bg-gradient-to-r from-blue-600/90 to-cyan-500/90 text-white shadow-lg shadow-cyan-500/20 border-white/10' 
                            : 'hover:bg-white/5 text-gray-400 border-transparent hover:text-white'
                          } border
                        `}
                      >
                         {renderCategoryIcon(category)}
                         <span className="whitespace-nowrap">{category}</span>
                      </button>
                   ))}
                </div>
             </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
             
             {/* Search Bar */}
            <div className="relative mb-8 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              </div>
              <input
                type="text"
                placeholder="搜索项目 (例如: 商城, 管理系统, 小程序)..."
                className="w-full bg-[#1e2130]/50 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder-gray-600 backdrop-blur-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Statistics */}
            <div className="flex items-center justify-between mb-6 px-2">
               <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {selectedCategory === 'All' ? '所有项目' : selectedCategory}
                  <span className="text-sm font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                    {filteredProjects.length}
                  </span>
               </h2>
               <div className="text-xs text-gray-500">
                  {searchQuery && `搜索: "${searchQuery}"`}
               </div>
            </div>

            {/* Projects Grid */}
            {visibleProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={handleProjectClick}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <Search size={48} className="mb-4 opacity-20" />
                <p>未找到匹配的项目</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  清除筛选
                </button>
              </div>
            )}

            {/* Load More Trigger */}
            {visibleProjects.length < filteredProjects.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 active:scale-95"
                >
                  加载更多
                </button>
                <p className="text-xs text-gray-600 mt-4">
                  显示 {visibleProjects.length} / {filteredProjects.length} 个项目
                </p>
              </div>
            )}

             {/* Footer */}
            <footer className="mt-20 border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
              <p>© 2023 代码宝库. 保留所有权利.</p>
              <p className="mt-2 text-xs text-gray-700">仅供学习交流使用，请勿用于商业用途</p>
            </footer>
          </main>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={selectedProject} 
      />
    </div>
  );
};

export default App;
