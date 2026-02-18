
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 h-16 flex items-center sticky top-0 z-10">
        <button className="p-2 -ml-2">
          <span className="material-symbols-outlined text-3xl font-light text-slate-900">chevron_left</span>
        </button>
        <h1 className="text-2xl font-bold text-slate-900 ml-2">个人资料</h1>
      </header>

      <main className="flex-1 px-5 pt-8 pb-24">
        {/* User Info Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-[#E9E4FF] border-[6px] border-white shadow-sm flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">MC</span>
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-1 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="w-5 h-5 bg-[#22C55E] rounded-full"></div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Michael Chen</h2>
            <p className="text-slate-400 mt-2 text-[17px] font-medium">高级销售顾问 • 华东大区</p>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-slate-50/50 p-2">
          <button className="w-full flex items-center p-6 active:bg-slate-50 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-[#E0F2FE] flex items-center justify-center mr-5">
              <span className="material-icons-round text-[#3B82F6] text-3xl">desktop_windows</span>
            </div>
            <div className="flex-1 text-left">
              <div className="text-[19px] font-bold text-slate-900">工作台设置</div>
              <div className="text-[15px] text-slate-400 mt-0.5">日历同步设置</div>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-2xl font-light">chevron_right</span>
          </button>
          
          <div className="mx-6 h-px bg-slate-50"></div>
          
          <button className="w-full flex items-center p-6 active:bg-slate-50 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-[#FFE4E6] flex items-center justify-center mr-5">
              <span className="material-icons-round text-[#FB7185] text-3xl">badge</span>
            </div>
            <div className="flex-1 text-left">
              <div className="text-[19px] font-bold text-slate-900">个人档案</div>
              <div className="text-[15px] text-slate-400 mt-0.5">大悦城校区，广渠门校区</div>
            </div>
            <span className="material-symbols-outlined text-slate-300 text-2xl font-light">chevron_right</span>
          </button>
          
          <div className="mx-6 h-px bg-slate-50"></div>
          
          {/* Placeholder for the half-visible third row in screenshot */}
          <div className="p-6 h-20"></div>
        </div>

        {/* Logout Button */}
        <div className="mt-16 flex justify-center">
          <button className="text-[#FF3B30] font-bold text-xl active:opacity-60 transition-opacity">
            退出登录
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
