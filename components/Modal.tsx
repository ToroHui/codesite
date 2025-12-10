import React, { useState } from 'react';
import { Project } from '../types';
import { WECHAT_ID } from '../data';
import { Copy, X, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !project) return null;

  const handleCopy = async () => {
    const textToCopy = `你好，我需要这个资源的提取码：${project.name}`;
    
    try {
      // 尝试使用现代 Clipboard API
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // 降级方案：使用传统的 execCommand 方法
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err2) {
        console.error('复制失败:', err2);
        alert('复制失败，请手动复制项目名称');
      }
      
      document.body.removeChild(textArea);
    }
  };

  const handleOpenLink = () => {
    window.open(project.link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - 增强高斯模糊效果 */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-[20px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content - 增加亮色描边，使其"浮"起来 */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#151725] border border-[#3B82F6]/40 shadow-2xl shadow-blue-500/20 transform transition-all animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="relative p-6 pb-4 flex justify-between items-start border-b border-white/5">
          <div>
             <h3 className="text-xl font-bold text-white mb-1">🔒 资源已锁定</h3>
             <p className="text-sm text-[#94A3B8]">按照以下步骤解锁优质资源</p>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* 选定项目 */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-[#94A3B8] uppercase tracking-wider">选定项目</h4>
            <div className="p-3 rounded-lg bg-[#0B0C15] border border-[#1F2937]">
              <p className="text-cyan-400 font-medium text-sm line-clamp-2">{project.name}</p>
            </div>
          </div>

          {/* 步骤可视化 - 横向排列 */}
          <div className="space-y-4">
            {/* 步骤1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <MessageCircle className="text-white" size={20} />
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-semibold text-white mb-1">步骤 1：复制资源名称</p>
                <p className="text-xs text-[#64748B]">发送至微信号：<span className="text-cyan-400 font-mono font-semibold">{WECHAT_ID}</span></p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                copied 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/30' 
                  : 'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30'
              }`}
            >
              {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
              {copied ? '✓ 已复制到剪贴板' : '点击复制资源名称'}
            </button>

            {/* 分隔线 */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs text-[#64748B]">然后</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* 步骤2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ExternalLink className="text-white" size={20} />
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-semibold text-white mb-1">步骤 2：打开下载页面</p>
                <p className="text-xs text-[#64748B]">获取提取码后即可下载</p>
              </div>
            </div>

            <button
              onClick={handleOpenLink}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              前往下载页面
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* Footer Design Element - 渐变底边 */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500" />
      </div>
    </div>
  );
};

export default Modal;