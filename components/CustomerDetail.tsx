
import React from 'react';
import { Student } from '../types';

interface CustomerDetailProps {
  student: Student;
  onBack: () => void;
  onEdit: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ student, onBack, onEdit }) => {
  return (
    <div className="min-h-screen bg-background-light">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <button onClick={onBack} className="p-1"><span className="material-icons-round">chevron_left</span></button>
        <h1 className="text-lg font-bold">客户详情</h1>
        <div className="flex gap-4">
          <button className="p-1"><span className="material-icons-round text-xl">ios_share</span></button>
          <button className="p-1"><span className="material-icons-round text-xl">more_horiz</span></button>
        </div>
      </nav>

      <main className="p-4 space-y-4">
        <div className="flex bg-slate-200/50 p-1 rounded-full w-fit mx-auto text-xs font-medium">
          <button className="px-6 py-1 bg-primary text-white rounded-full">孩子一</button>
          <button className="px-6 py-1 text-slate-500">孩子二</button>
        </div>

        <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="relative">
                <img 
                  alt="Avatar" 
                  className="w-16 h-16 rounded-full bg-teal-100 object-cover" 
                  src={student.avatar || "https://picsum.photos/200/200"} 
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{student.name}</h2>
                  <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full font-bold">重点单</span>
                </div>
                <p className="text-slate-500 text-sm mt-1">+86 138-1234-5678</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-secondary text-primary text-[10px] px-2 py-0.5 rounded">3.5 岁</span>
                  <span className="bg-secondary text-primary text-[10px] px-2 py-0.5 rounded">A类客户</span>
                  <span className="bg-secondary text-primary text-[10px] px-2 py-0.5 rounded">大悦城布局</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onEdit}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30"
            >
              <span className="material-icons-round text-sm">edit</span>
            </button>
          </div>

          <div className="space-y-3 mb-6">
             <div className="flex justify-between items-end px-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Lead</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Opportunity</span>
              </div>
              <div className="flex overflow-hidden rounded-full w-full h-8 items-center text-[10px] font-bold bg-slate-100">
                <div className="flex-1 h-full flex items-center justify-center bg-[#FDE68A] text-amber-800 border-r border-white/40">接触阶段</div>
                <div className="flex-1 h-full flex items-center justify-center bg-primary text-white border-r border-white/40 relative">
                  邀约DEMO
                  <div className="absolute -top-1 right-1/2 translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
                </div>
                <div className="flex-1 h-full flex items-center justify-center bg-primary/40 text-white/90 border-r border-white/40">已到访</div>
                <div className="flex-1 h-full flex items-center justify-center bg-primary/40 text-white/90">正式报名</div>
              </div>
          </div>

          <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white p-1 rounded-md">
                <span className="material-icons-round text-sm">check_box</span>
              </div>
              <span className="text-orange-700 text-sm font-bold">当前任务：识别痛点需求</span>
            </div>
            <span className="material-icons-round text-orange-400 text-sm">chevron_right</span>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            <h3 className="font-bold">行动指导</h3>
          </div>
          <div className="flex gap-3">
            <span className="material-icons-round text-primary text-xl">notifications_active</span>
            <div className="text-sm">
              <p className="text-slate-600">下次跟进在 <span className="text-primary font-bold">1月24日 10:00</span></p>
              <p className="text-slate-600 mt-1">该用户已 <span className="text-orange-500 font-bold">5天未激活</span>，建议今日联系</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-5">
            <button className="bg-secondary py-3 rounded-xl flex items-center justify-center gap-2 text-primary font-bold text-sm">
              <span className="material-icons-round text-sm">phone</span> 电话
            </button>
            <button className="bg-secondary py-3 rounded-xl flex items-center justify-center gap-2 text-primary font-bold text-sm">
              <span className="material-icons-round text-sm">chat_bubble</span> 单聊
            </button>
            <button className="bg-secondary py-3 rounded-xl flex items-center justify-center gap-2 text-primary font-bold text-sm">
              <span className="material-icons-round text-sm">groups</span> 群聊
            </button>
          </div>
        </section>

        <section className="relative bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="absolute left-8 top-12 bottom-12 w-[1px] bg-slate-100"></div>
          <div className="space-y-8 relative">
            <div className="relative pl-8">
              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/10"></div>
              <p className="text-xs text-slate-400 mb-2">2023-12-28 14:20</p>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-sm font-bold">流转至：</span>
                  <span className="text-sm text-primary font-bold">顾顾问 </span>
                </div>
                <p className="text-sm text-slate-600">主动添加用户</p>
              </div>
            </div>
            <div className="relative pl-8 opacity-60">
              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300"></div>
              <p className="text-xs text-slate-400 mb-2">2023-11-15 09:45</p>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-sm font-bold">流转至：</span>
                  <span className="text-sm text-primary font-bold">李顾问 </span>
                </div>
                <p className="text-sm text-slate-600">商机分配：用户承诺上门</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <button className="fixed right-6 bottom-24 bg-gradient-to-r from-pink-400 to-primary text-white px-5 py-3 rounded-full shadow-xl shadow-primary/30 flex items-center gap-2 font-bold text-sm z-50">
        <span className="material-icons-round text-sm">auto_fix_high</span>
        话术推荐
      </button>
    </div>
  );
};

export default CustomerDetail;
