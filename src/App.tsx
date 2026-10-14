import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { TeachersPage } from './pages/TeachersPage';
import { SubmitAssignmentPage } from './pages/SubmitAssignmentPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';
import { TeacherPortalPage } from './pages/TeacherPortalPage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import {
  GraduationCap,
  Briefcase,
  ShieldAlert,
  Send,
  Sparkles,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, userRole, setUserRole } = useApp();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'courses':
        return <CoursesPage />;
      case 'teachers':
        return <TeachersPage />;
      case 'submit-assignment':
        return <SubmitAssignmentPage />;
      case 'location':
        return <LocationPage />;
      case 'contact':
        return <ContactPage />;
      case 'teacher-portal':
        return <TeacherPortalPage />;
      case 'student-portal':
        return <StudentPortalPage />;
      case 'admin-portal':
        return <AdminPanelPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />
      <ToastContainer />

      {/* Floating Demo Quick Navigation Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/90 dark:bg-slate-800/95 backdrop-blur-md border border-slate-700/80 shadow-2xl text-xs text-white">
        <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Kabinetlar:</span>
        </span>

        <button
          onClick={() => {
            setUserRole('student');
            setActiveTab('student-portal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            activeTab === 'student-portal'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
          <span>O'quvchi</span>
        </button>

        <button
          onClick={() => {
            setUserRole('teacher');
            setActiveTab('teacher-portal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            activeTab === 'teacher-portal'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-amber-400" />
          <span>Ustoz</span>
        </button>

        <button
          onClick={() => {
            setUserRole('admin');
            setActiveTab('admin-portal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            activeTab === 'admin-portal'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Admin</span>
        </button>

        <div className="w-px h-4 bg-slate-700 mx-1" />

        <button
          onClick={() => {
            setActiveTab('submit-assignment');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
            activeTab === 'submit-assignment'
              ? 'bg-blue-600 text-white ring-2 ring-blue-400'
              : 'bg-blue-600/80 hover:bg-blue-600 text-white'
          }`}
        >
          <Send className="w-3.5 h-3.5 text-amber-300" />
          <span>Topshiriq</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
