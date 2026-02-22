import React, { useState, useEffect } from 'react';
import { ViewType, Student, Metric } from '../types';
import { studentService } from '../services/studentService';
import { metricService } from '../services/metricService';

interface WorktableProps {
  onNavigate: (view: ViewType, student?: Student) => void;
  refreshKey?: number;
}

type FilterType = 'new' | 'followup' | 'visit';

const Worktable: React.FC<WorktableProps> = ({ onNavigate, refreshKey = 0 }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('new');
  const [students, setStudents] = useState<Student[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [studentsData, metricsData] = await Promise.all([
          studentService.getStudents(),
          metricService.getMetrics()
        ]);
        setStudents(studentsData);
        setMetrics(metricsData.length > 0 ? metricsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const filteredStudents = students.filter(s => s.category === activeFilter);

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <span className="material-icons-round text-primary text-sm">location_on</span>
          <span className="text-[11px] font-bold">大悦城校区</span>
          <span className="material-icons-round text-slate-400 text-xs">expand_more</span>
        </div>
        <h1 className="text-base font-bold text-slate-900">工作台</h1>
        <button
          onClick={() => onNavigate(ViewType.MESSAGES)}
          className="relative p-1"
        >
          <span className="material-icons-round text-slate-600 text-xl">notifications</span>
          <span className="absolute top-0 right-0 bg-danger text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white font-bold">12</span>
        </button>
      </header>

      <div className="relative">
        <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
        <input
          className="w-full bg-white border-none rounded-xl py-2 pl-10 pr-4 text-[13px] ios-shadow placeholder:text-slate-400"
          placeholder="搜索客户"
          type="text"
        />
      </div>

      <section>
        <div className="flex items-center space-x-2 mb-3">
          <h2 className="text-sm font-bold text-slate-900">执行进度</h2>
          <span className="material-symbols-outlined text-primary text-lg">analytics</span>
        </div>
        <div className="bg-white rounded-3xl p-5 ios-shadow space-y-5">
          {metrics.map((metric, i) => (
            <div key={i} className="space-y-2.5">
              <div className="flex justify-between items-end">
                <span className="text-xs font-semibold text-slate-600">{metric.label}</span>
                <div className="text-right">
                  <span className={`text-base font-bold ${metric.label.includes('现金') ? 'text-revenue' : metric.label.includes('退费') ? 'text-danger' : 'text-slate-900'}`}>
                    {metric.current.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400">/{metric.total.toLocaleString()}{metric.unit ?? '人'}</span>
                </div>
              </div>
              <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(metric.current / metric.total) * 100}%`, backgroundColor: metric.color }}
                ></div>
              </div>
              {metric.warning && <p className="text-[10px] text-danger font-medium text-right">{metric.warning}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveFilter('new')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${activeFilter === 'new' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-slate-100 text-slate-500'}`}
          >
            新分配客户
          </button>
          <button
            onClick={() => setActiveFilter('followup')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${activeFilter === 'followup' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-slate-100 text-slate-500'}`}
          >
            待继续跟进
          </button>
          <button
            onClick={() => setActiveFilter('visit')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${activeFilter === 'visit' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-slate-100 text-slate-500'}`}
          >
            待上门试听
          </button>
        </div>

        <div className="space-y-4 animate-slide-up">
          {filteredStudents.length > 0 ? filteredStudents.map(student => (
            <div
              key={student.id}
              onClick={() => onNavigate(ViewType.CUSTOMER_DETAIL, student)}
              className={`bg-white rounded-2xl p-4 ios-shadow border-l-[4px] cursor-pointer active:scale-[0.98] transition-all ${student.category === 'new' ? 'border-danger' : student.category === 'followup' ? 'border-warning' : 'border-attendance'}`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-slate-900">{student.name}</h3>
                  <div className="flex gap-1.5">
                    <span className={`text-white text-[9px] px-2 py-0.5 rounded-md font-bold ${student.category === 'new' ? 'bg-danger' : student.category === 'followup' ? 'bg-warning' : 'bg-attendance'}`}>{student.status}</span>
                  </div>
                </div>
                <div className={`${student.category === 'new' ? 'bg-danger/5 text-danger' : 'bg-slate-50 text-slate-400'} px-2 py-0.5 rounded-lg flex items-center`}>
                  <span className="material-icons-round text-[11px] mr-1">access_time</span>
                  <span className="text-[10px] font-bold">{student.timeout}</span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg px-3 py-2 mb-3.5 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold">当前任务：</span>
                <span className="text-[10px] text-slate-600">{student.currentTask}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
                  {student.tags.map((tag, j) => (
                    <span key={j} className={`text-[9px] py-1 px-2 rounded-md ${tag === '重点单' ? 'bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-500'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <span className="material-icons-round text-lg">call</span>
                  </button>
                  <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <span className="material-icons-round text-lg">chat_bubble</span>
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="py-20 text-center text-slate-300">
              <span className="material-icons-round text-4xl mb-2">inbox</span>
              <p className="text-xs">暂无该分类下的客户</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Worktable;
