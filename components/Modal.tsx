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

  const handleCopy = () => {
    const textToCopy = `你好，我需要这个资源的提取码：${project.name}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    window.open(project.link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#1e2130] border border-white/10 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="relative p-6 pb-0 flex justify-between items-start">
          <div>
             <h3 className="text-xl font-bold text-white mb-1">资源已锁定</h3>
             <p className="text-sm text-gray-400">解锁此优质资源</p>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">选定项目</h4>
            <div className="p-3 rounded-lg bg-black/20 border border-white/5">
              <p className="text-cyan-400 font-medium text-sm line-clamp-2">{project.name}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <MessageCircle className="text-green-500" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">1. 复制资源名称</p>
                <p className="text-xs text-gray-500">发送至微信号：<span className="text-white font-mono">{WECHAT_ID}</span></p>
              </div>
            </div>

             <button
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 ${
                copied 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
              {copied ? '已复制到剪贴板！' : '复制名称以咨询'}
            </button>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <ExternalLink className="text-blue-500" size={20} />
              </div>
              <div className="flex-1">
                 <p className="text-sm text-white">2. 打开下载页面</p>
                 <p className="text-xs text-gray-500">需要提取码</p>
              </div>
            </div>

            <button
              onClick={handleOpenLink}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-cyan-900/20 transition-all duration-300"
            >
              前往下载页面
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* Footer Design Element */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      </div>
    </div>
  );
};

export default Modal;