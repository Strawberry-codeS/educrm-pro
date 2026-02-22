
import React, { useState } from 'react';
import { Student } from '../types';
import { studentService } from '../services/studentService';

interface EditInfoProps {
  student: Student;
  onBack: () => void;
  onSaved?: () => void;
}

const EditInfo: React.FC<EditInfoProps> = ({ student, onBack, onSaved }) => {
  const [saving, setSaving] = useState(false);
  const [activeChild, setActiveChild] = useState(0);
  const [selectedStage, setSelectedStage] = useState('已上门未缴费');
  const [selectedLevel, setSelectedLevel] = useState('A');
  const [isImportant, setIsImportant] = useState(true);
  const [concerns, setConcerns] = useState(['服务质量']);

  const handleSave = async () => {
    try {
      setSaving(true);
      await studentService.updateStudent(student.id, {
        status: selectedStage,
        tags: isImportant
          ? Array.from(new Set([...student.tags.filter(t => t !== '重点单'), '重点单']))
          : student.tags.filter(t => t !== '重点单'),
      });
      onSaved?.();
      onBack();
    } catch (err) {
      console.error('保存失败:', err);
      alert('保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const children = [
    { name: '陈杰森', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jason' },
    { name: '陈莉莉', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily', label: '二项' }
  ];

  const stages = [
    '已上门未缴费', '承诺上门', '承诺未上门', '未承诺',
    '已上门全款', '已上门订金', '无效', '退费', '禁拨'
  ];

  const toggleConcern = (item: string) => {
    setConcerns(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col relative">
      {/* Call Header Overlay */}
      <div className="bg-primary h-12 flex items-center justify-between px-6 text-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          <span className="text-[15px] font-medium">正在通话</span>
        </div>
        <div className="text-[17px] font-bold tracking-wider">02:45</div>
        <span className="material-icons-round text-xl">call</span>
      </div>

      {/* Navigation Header */}
      <header className="bg-white px-4 h-16 flex items-center sticky top-12 z-40 border-b border-slate-50">
        <button onClick={onBack} className="p-2 -ml-2">
          <span className="material-symbols-outlined text-3xl font-light text-slate-900">chevron_left</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold text-slate-900 pr-8">编辑信息</h1>
      </header>

      <main className="flex-1 px-4 py-6 space-y-4 pb-32">
        {/* Child Switcher */}
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
          {children.map((child, i) => (
            <button
              key={i}
              onClick={() => setActiveChild(i)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${activeChild === i
                ? 'bg-[#EEF2FF] border-primary text-primary shadow-sm'
                : 'bg-white border-slate-100 text-slate-500'
                }`}
            >
              <img src={child.avatar} alt={child.name} className="w-6 h-6 rounded-full bg-slate-100" />
              <span className="text-sm font-bold">{child.name}</span>
              {child.label && <span className="text-[10px] opacity-60 font-normal">{child.label}</span>}
            </button>
          ))}
          <button className="flex items-center gap-1 px-4 py-1.5 rounded-full border border-dashed border-slate-300 text-slate-400 whitespace-nowrap bg-white text-sm">
            <span className="material-icons-round text-base">add</span>
            新增学员 (孩子)
          </button>
        </div>

        {/* Basic Info Card */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-50">
              <img src={children[activeChild].avatar} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-bold text-slate-900">{children[activeChild].name}</h2>
                <span className="material-symbols-outlined text-slate-300 text-lg">edit_note</span>
              </div>
              <p className="text-slate-400 text-sm mt-0.5">166-036-1154</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-medium">产品线</label>
              <div className="flex items-center justify-between border-b border-slate-100 py-2">
                <span className="text-[15px] font-medium text-slate-800">瑞思英语</span>
                <span className="material-icons-round text-slate-300 text-lg">expand_more</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-medium">渠道来源</label>
              <div className="flex items-center justify-between border-b border-slate-100 py-2">
                <span className="text-[15px] font-medium text-slate-800 truncate">线上渠道-抖音-0.1活动</span>
              </div>
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-[11px] text-slate-400 font-medium">意向校区</label>
              <div className="flex items-center justify-between border-b border-slate-100 py-2">
                <span className="text-[15px] font-medium text-slate-800">大悦城校区</span>
                <span className="material-icons-round text-slate-300 text-lg">expand_more</span>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Info Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            <label className="text-xs text-slate-400 block mb-3">下次跟进</label>
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
              <span className="material-icons-round text-primary text-base">calendar_today</span>
              <span className="text-[13px] font-bold text-slate-800">10-24 10:00</span>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            <label className="text-xs text-slate-400 block mb-3">邀约demo时间</label>
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
              <span className="material-icons-round text-orange-400 text-base">event</span>
              <span className="text-[13px] font-bold text-slate-300">未设置</span>
            </div>
          </div>
        </div>

        {/* Detailed Info Card */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">孩子性别</label>
            <div className="flex items-center justify-between border-b border-slate-100 py-2">
              <span className="text-[15px] font-medium text-slate-800">男</span>
              <span className="material-icons-round text-slate-300 text-lg">expand_more</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">孩子年龄</label>
            <div className="flex items-center justify-between border-b border-slate-100 py-2">
              <span className="text-[15px] font-medium text-slate-800">3</span>
              <span className="material-icons-round text-slate-300 text-lg">expand_more</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">在读学校</label>
            <div className="flex items-center justify-between border-b border-slate-100 py-2">
              <span className="text-[15px] font-medium text-slate-800">朝阳小学</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">在读年级</label>
            <div className="flex items-center justify-between border-b border-slate-100 py-2">
              <span className="text-[15px] font-medium text-slate-800">一年级</span>
              <span className="material-icons-round text-slate-300 text-lg">expand_more</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">家长微信</label>
            <div className="flex items-center justify-between border-b border-slate-100 py-2">
              <span className="text-[15px] font-medium text-slate-300">未填</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">家长邮箱</label>
            <div className="flex items-center justify-between border-b border-slate-100 py-2">
              <span className="text-[15px] font-medium text-slate-300">未填</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">出生日期</label>
            <div className="flex items-center justify-between border-b border-slate-100 py-2">
              <span className="text-[15px] font-medium text-slate-300">请选择</span>
              <span className="material-icons-round text-slate-300 text-lg">calendar_today</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">学习背景</label>
            <div className="flex items-center justify-between border-b border-slate-100 py-2">
              <span className="text-[15px] font-medium text-slate-300">请选择</span>
              <span className="material-icons-round text-slate-300 text-lg">expand_more</span>
            </div>
          </div>
        </section>

        {/* Multi-Selection Groups */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-8">
          {/* Customer Stage */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-primary rounded-full"></div>
              <h3 className="font-bold text-slate-700 text-[15px]">客户阶段</h3>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {stages.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedStage(s)}
                  className={`py-2.5 px-1 text-[11px] font-bold rounded-xl border transition-all ${selectedStage === s
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Level */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-primary rounded-full"></div>
              <h3 className="font-bold text-slate-700 text-[15px]">客户等级</h3>
            </div>
            <div className="flex gap-3">
              {['A', 'B', 'C', 'D'].map(l => (
                <button
                  key={l}
                  onClick={() => setSelectedLevel(l)}
                  className={`flex-1 py-3.5 text-lg font-black rounded-2xl border transition-all ${selectedLevel === l
                    ? 'bg-[#EEF2FF] border-primary text-primary shadow-inner'
                    : 'bg-white border-slate-100 text-slate-300'
                    }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Important Lead */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-primary rounded-full"></div>
              <h3 className="font-bold text-slate-700 text-[15px]">重点单</h3>
            </div>
            <div className="flex gap-3">
              {[true, false].map(v => (
                <button
                  key={v.toString()}
                  onClick={() => setIsImportant(v)}
                  className={`flex-1 py-3.5 text-base font-bold rounded-2xl border transition-all ${isImportant === v
                    ? 'bg-[#EEF2FF] border-primary text-primary shadow-inner'
                    : 'bg-white border-slate-100 text-slate-400'
                    }`}
                >
                  {v ? '是' : '否'}
                </button>
              ))}
            </div>
          </div>

          {/* Concerns */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-primary rounded-full"></div>
              <h3 className="font-bold text-slate-700 text-[15px]">家长关注维度 (多选)</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {['服务质量', '接送距离', '优惠力度', '竞品对比', '课程内容', '师资力量'].map(c => (
                <button
                  key={c}
                  onClick={() => toggleConcern(c)}
                  className={`px-5 py-2.5 text-sm font-bold rounded-full border transition-all ${concerns.includes(c)
                    ? 'bg-[#EEF2FF] border-primary text-primary'
                    : 'bg-white border-slate-100 text-slate-500'
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Tags */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-primary rounded-full"></div>
              <h3 className="font-bold text-slate-700 text-[15px]">自定义标签</h3>
            </div>
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="px-5 py-2.5 text-sm font-bold rounded-full border border-blue-100 bg-blue-50 text-blue-500">对比友商中</span>
              <span className="px-5 py-2.5 text-sm font-bold rounded-full border border-purple-100 bg-purple-50 text-purple-500">注重师资</span>
              <button className="flex items-center gap-1 px-4 py-2.5 rounded-full border border-dashed border-slate-300 text-slate-400 bg-white text-sm">
                <span className="material-icons-round text-base">add</span>
                添加
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white flex items-center gap-4 border-t border-slate-100 z-50">
        <button onClick={onBack} disabled={saving} className="flex-1 py-4 text-slate-900 font-bold text-lg">取消</button>
        <button onClick={handleSave} disabled={saving} className="flex-[2] py-4 bg-gradient-to-r from-primary to-[#9778FF] text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/40 active:scale-95 transition-transform disabled:opacity-60">
          {saving ? '保存中...' : '保存并完成'}
        </button>
      </div>
    </div>
  );
};

export default EditInfo;
