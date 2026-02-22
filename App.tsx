
import React, { useState, useCallback } from 'react';
import Worktable from './components/Worktable';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import MessageCenter from './components/MessageCenter';
import Profile from './components/Profile';
import TodoReminders from './components/TodoReminders';
import EditInfo from './components/EditInfo';
import { ViewType, Student } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewType>(ViewType.WORKTABLE);
  const [viewStack, setViewStack] = useState<ViewType[]>([ViewType.WORKTABLE]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const currentView = viewStack[viewStack.length - 1];

  const navigateTo = useCallback((view: ViewType, student?: Student) => {
    if (student) setSelectedStudent(student);
    setViewStack(prev => [...prev, view]);
  }, []);

  const goBack = useCallback(() => {
    if (viewStack.length > 1) {
      setViewStack(prev => prev.slice(0, -1));
    }
  }, [viewStack.length]);

  const handleStudentSaved = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const switchTab = (tab: ViewType) => {
    setActiveTab(tab);
    setViewStack([tab]);
    // 切换回工作台时主动刷新
    if (tab === ViewType.WORKTABLE) {
      setRefreshKey(prev => prev + 1);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case ViewType.WORKTABLE:
        return <Worktable onNavigate={navigateTo} refreshKey={refreshKey} />;
      case ViewType.CUSTOMERS:
        return <CustomerList onNavigate={navigateTo} />;
      case ViewType.CUSTOMER_DETAIL:
        return selectedStudent ? (
          <CustomerDetail
            student={selectedStudent}
            onBack={goBack}
            onEdit={() => navigateTo(ViewType.EDIT_INFO)}
          />
        ) : null;
      case ViewType.MESSAGES:
        return <MessageCenter onBack={goBack} onNavigate={navigateTo} />;
      case ViewType.PROFILE:
        return <Profile />;
      case ViewType.TODO:
        return <TodoReminders onBack={goBack} onNavigate={navigateTo} />;
      case ViewType.EDIT_INFO:
        return selectedStudent ? (
          <EditInfo student={selectedStudent} onBack={goBack} onSaved={handleStudentSaved} />
        ) : null;
      default:
        return <Worktable onNavigate={navigateTo} refreshKey={refreshKey} />;
    }
  };

  const isMainTab = [ViewType.WORKTABLE, ViewType.CUSTOMERS, ViewType.PROFILE].includes(currentView);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background-light dark:bg-slate-950 relative">
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {renderView()}
      </div>

      {isMainTab && (
        <nav className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-10 py-3 pb-8 flex justify-between items-center z-50">
          <button
            onClick={() => switchTab(ViewType.WORKTABLE)}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === ViewType.WORKTABLE ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className="material-icons-round text-3xl">assignment</span>
            <span className="text-[12px] font-bold">工作台</span>
          </button>
          <button
            onClick={() => switchTab(ViewType.CUSTOMERS)}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === ViewType.CUSTOMERS ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className="material-icons-round text-3xl">group</span>
            <span className="text-[12px] font-bold">客户</span>
          </button>
          <button
            onClick={() => switchTab(ViewType.PROFILE)}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === ViewType.PROFILE ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className="material-icons-round text-3xl">person</span>
            <span className="text-[12px] font-bold">我的</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
