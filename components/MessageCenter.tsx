
import React from 'react';
import { ViewType } from '../types';

interface MessageCenterProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
}

const MessageCenter: React.FC<MessageCenterProps> = ({ onBack, onNavigate }) => {
  const notifications = [
    { type: 'warning', title: '超时跟进提醒', content: '李明妈妈即将超时，请尽快完成今日跟...', time: '10:24', icon: 'error', color: 'text-red-500', bg: 'bg-red-50' },
    { type: 'todo', title: '待办提醒', content: '待办提醒：今日下午有 5 个预约试听，...', time: '09:15', icon: 'event_available', color: 'text-purple-500', bg: 'bg-purple-50' },
    { type: 'dynamic', title: '客户新动态', content: '张三的家长刚刚浏览了您的朋友圈课程...', time: '昨天', icon: 'description', color: 'text-blue-500', bg: 'bg-blue-50' }
  ];

  return (
    <div className="bg-white min-h-screen">
      <header className="flex items-center justify-between px-4 py-3 sticky top-0 bg-white z-10 border-b border-slate-50">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h1 className="text-xl font-bold">消息中心</h1>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      <main className="px-4">
        <div className="grid grid-cols-3 gap-4 py-6">
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-2 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-red-500">notifications_off</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">3</span>
            </div>
            <span className="text-xs text-slate-500">任务预警</span>
          </div>
          <div 
            onClick={() => onNavigate(ViewType.TODO)}
            className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
          >
            <div className="relative w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-purple-500">notifications</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">5</span>
            </div>
            <span className="text-xs text-slate-500">待办提醒</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-2 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-blue-500">person</span>
            </div>
            <span className="text-xs text-slate-500">客户动态</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">最近消息</h2>
          <button className="text-sm text-primary font-medium">全部已读</button>
        </div>

        <div className="space-y-4 pb-10">
          {notifications.map((n, i) => (
            <div 
              key={i} 
              onClick={() => n.type === 'todo' && onNavigate(ViewType.TODO)}
              className="bg-white border border-slate-100 p-4 rounded-[20px] ios-shadow flex items-start space-x-4 cursor-pointer active:bg-slate-50 transition-colors"
            >
              <div className={`w-12 h-12 flex-shrink-0 ${n.bg} rounded-full flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${n.color} text-xl`}>{n.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-800">{n.title}</h3>
                  <span className="text-[11px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-1">{n.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MessageCenter;
