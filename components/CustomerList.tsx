import React, { useState, useEffect } from 'react';
import { ViewType, Student } from '../types';
import { studentService } from '../services/studentService';

interface CustomerListProps {
  onNavigate: (view: ViewType, student?: Student) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onNavigate }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await studentService.getStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background-light">
      <header className="bg-white px-4 py-3 flex items-center justify-center sticky top-0 z-50">
        <h1 className="text-lg font-bold">客户</h1>
      </header>

      <div className="bg-white px-4 pb-4 flex gap-3 items-center sticky top-[52px] z-40 border-b border-slate-50">
        <div className="relative flex-1">
          <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/50" placeholder="搜索客户姓名、手机号" type="text" />
        </div>
        <button className="flex items-center gap-1 text-primary font-medium px-4 py-2 border border-primary/20 bg-primary/5 rounded-full text-sm">
          <span className="material-icons-round text-lg">tune</span>
          <span>筛选</span>
        </button>
      </div>

      <div className="bg-white px-4 border-b border-slate-50 sticky top-[108px] z-40">
        <div className="flex gap-6 pb-2">
          <div className="relative text-primary font-bold text-sm border-b-2 border-primary pb-1">全部客户</div>
          <div className="text-slate-400 text-sm">重点跟进</div>
          <div className="text-slate-400 text-sm">待继续跟进</div>
          <div className="text-slate-400 text-sm">新分配</div>
        </div>
      </div>

      <main className="p-4 space-y-4">
        {students.map(student => (
          <div
            key={student.id}
            onClick={() => onNavigate(ViewType.CUSTOMER_DETAIL, student)}
            className={`bg-white rounded-xl p-4 shadow-sm border-l-4 flex flex-col gap-3 active:scale-[0.98] transition-all ${student.id === '1' ? 'border-rose-400' : student.id === '2' ? 'border-amber-400' : 'border-emerald-400'}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{student.name}</h3>
                {student.status && <span className={`text-white text-[10px] px-2 py-0.5 rounded-full ${student.status.includes('跟进') ? 'bg-rose-500' : 'bg-emerald-500'}`}>{student.status}</span>}
              </div>
              {student.timeout && (
                <div className="flex items-center gap-1 text-rose-500 bg-rose-50 px-2 py-1 rounded-full">
                  <span className="material-icons-round text-sm">schedule</span>
                  <span className="text-[11px] font-medium">{student.timeout}</span>
                </div>
              )}
            </div>
            <div className="bg-amber-50 text-amber-700 text-xs px-3 py-1.5 rounded-lg border border-amber-100">
              客户阶段任务：<span className="font-medium">{student.currentTask}</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-wrap gap-2 flex-1 mr-2">
                <span className="bg-slate-50 text-slate-500 text-[11px] px-2 py-1 rounded">{student.age}岁</span>
                {student.tags.map((tag, j) => (
                  <span key={j} className={`text-[11px] px-2 py-1 rounded ${tag.includes('重点') ? 'bg-rose-50 text-rose-500' : tag.includes('优惠') ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-500'}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                  <span className="material-icons-round text-xl">call</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                  <span className="material-icons-round text-xl">chat</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default CustomerList;
