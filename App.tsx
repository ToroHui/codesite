
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
      <div className="min-h-screen bg-[#0B0C15] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-cyan-400" size={48} />
          <p className="text-[#94A3B8]">正在加载资源库...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0C15] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">出错了</h2>
          <p className="text-[#94A3B8]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0C15] text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Ambience - 优化后的深空灰背景 */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Mobile Header (Only visible on small screens) */}
        <header className="lg:hidden mb-8 text-center">
             <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">
            代码宝库
          </h1>
          <p className="text-xs text-[#64748B]">3000+ 优质源码</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - 优化后的现代化侧边栏 */}
          <aside className="lg:w-60 flex-shrink-0">
             <div className="lg:sticky lg:top-8 space-y-6">
                
                {/* Desktop Logo */}
                <div className="hidden lg:block px-3 mb-8">
                   <h1 className="text-[22px] font-bold text-white tracking-tight mb-1">
                    代码宝库
                  </h1>
                  <p className="text-xs text-[#64748B]">3000+ 优质源码</p>
                </div>

                {/* Category List - 圆角悬浮态设计 */}
                <div className="
                  flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 
                  scrollbar-hide lg:scrollbar-default
                  bg-[#11121D] backdrop-blur-xl border border-[#1F2133] rounded-2xl p-3
                ">
                   <button
                      onClick={() => setSelectedCategory('All')}
                      className={`
                        flex-shrink-0 w-auto lg:w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3
                        ${selectedCategory === 'All' 
                          ? 'bg-[#1E3A8A] text-white shadow-md border border-[#3B82F6]' 
                          : 'hover:bg-white/5 text-[#94A3B8] hover:text-white'
                        }
                      `}
                   >
                      <LayoutGrid size={16} className={selectedCategory === 'All' ? 'text-[#60A5FA]' : ''} />
                      <span>全部</span>
                   </button>

                   {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`
                          flex-shrink-0 w-auto lg:w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3
                          ${selectedCategory === category 
                            ? 'bg-[#1E3A8A] text-white shadow-md border border-[#3B82F6]' 
                            : 'hover:bg-white/5 text-[#94A3B8] hover:text-white'
                          }
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
             
             {/* Search Bar - 优化后带热门标签 */}
            <div className="mb-8 space-y-3">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-[#4A5568] group-focus-within:text-cyan-400 transition-colors" size={18} />
                </div>
                <input
                  type="text"
                  placeholder="搜索项目（例如：商城，管理系统...）"
                  className="w-full bg-[#151725] border border-[#2D3748] text-white pl-12 pr-4 py-[11px] rounded-[22px] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder-[#4A5568] text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* 热门搜索标签 */}
              {!searchQuery && (
                <div className="flex items-center gap-2 px-1">
                  <span className="text-xs text-gray-500">热门:</span>
                  {['商城', '管理系统', '毕业设计'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Statistics - 优化后的统计信息 */}
            <div className="flex items-center justify-between mb-6 px-1">
               <h2 className="text-xl font-semibold text-white flex items-center gap-2.5">
                  {selectedCategory === 'All' ? '所有项目' : selectedCategory}
                  <span className="text-xs font-medium text-[#A0AEC0] bg-[#2D3748] px-2.5 py-1 rounded">
                    {filteredProjects.length}
                  </span>
               </h2>
               {searchQuery && (
                 <div className="text-xs text-[#64748B]">
                    搜索: <span className="text-cyan-400 font-medium">"{searchQuery}"</span>
                 </div>
               )}
            </div>

            {/* Projects Grid - 优化间距 */}
            {visibleProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
              <div className="flex flex-col items-center justify-center py-20 text-[#64748B]">
                <Search size={48} className="mb-4 opacity-20" />
                <p className="text-base mb-1">未找到匹配的项目</p>
                <p className="text-sm text-[#475569] mb-4">尝试调整搜索关键词或筛选条件</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  className="px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 border border-white/10 transition-all"
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
            <footer className="mt-20 border-t border-white/5 pt-8 text-center text-[#64748B] text-sm">
              <p>© 2025 代码宝库. 保留所有权利.</p>
              <p className="mt-2 text-xs text-[#475569]">仅供学习交流使用，请勿用于商业用途</p>
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
