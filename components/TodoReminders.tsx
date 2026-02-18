
import React from 'react';
import { ViewType, Student } from '../types';

interface TodoRemindersProps {
  onBack: () => void;
  onNavigate: (view: ViewType, student?: Student) => void;
}

const TodoReminders: React.FC<TodoRemindersProps> = ({ onBack, onNavigate }) => {
  const todos = [
    { id: '1', date: '今天', name: '小丫', tags: ['3岁', '重点单', '价格优惠'], timeout: '30:00后超时' },
    { id: '2', date: '今天', name: '王小明', desc: '2月2日玛特英语demo', timeout: '30:00后超时' },
    { id: '3', date: '昨天', name: '果媛', tags: ['3岁', '重点单', '价格优惠'], timeout: '30:00后超时' }
  ];

  return (
    <div className="bg-background-light min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-100">
        <div className="relative flex items-center h-10">
          <button onClick={onBack} className="absolute left-0 p-1">
            <span className="material-symbols-outlined text-slate-900 text-2xl">chevron_left</span>
          </button>
          <h1 className="text-lg font-bold text-slate-900 text-center w-full">待办提醒</h1>
        </div>
      </header>

      <main className="px-5 py-4 space-y-8">
        {['今天', '昨天'].map(day => (
          <div key={day} className="space-y-4">
            <div className="flex justify-center">
              <span className="bg-slate-200/50 px-4 py-1 rounded-full text-slate-500 text-[10px] font-medium">{day}</span>
            </div>
            {todos.filter(t => t.date === day).map(todo => (
              <div key={todo.id} className="bg-white rounded-3xl p-5 ios-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-[15px] font-bold text-slate-900">{todo.name}</h3>
                  <span className="bg-[#ECFDF5] text-[#10B981] text-[10px] px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {todo.timeout}
                  </span>
                </div>
                {todo.tags ? (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {todo.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-50 rounded-md text-[11px] text-slate-600">{tag}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] text-slate-500 leading-relaxed mb-6">{todo.desc}</p>
                )}
                <button 
                  onClick={() => onNavigate(ViewType.CUSTOMER_DETAIL)}
                  className="w-full bg-slate-50 text-primary py-3 rounded-2xl font-bold text-[13px] active:scale-[0.98] transition-all"
                >
                  查看详情
                </button>
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  );
};

export default TodoReminders;
