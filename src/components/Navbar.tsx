import React, { useState } from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Send,
  UserCheck,
  Moon,
  Sun,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  ShieldAlert,
  ChevronDown,
  MapPin,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    userRole,
    setUserRole,
    isDarkMode,
    toggleDarkMode,
    settings,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'about', label: 'Biz haqimizda' },
    { id: 'courses', label: 'Kurslar' },
    { id: 'teachers', label: 'Ustozlar' },
    { id: 'location', label: 'Manzil' },
    { id: 'contact', label: 'Aloqa' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRoleBadge = () => {
    switch (userRole) {
      case 'admin':
        return { label: 'Admin', color: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800' };
      case 'teacher':
        return { label: 'Ustoz', color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800' };
      case 'student':
        return { label: "O'quvchi", color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' };
      default:
        return { label: 'Mehmon', color: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700' };
    }
  };

  const badge = getRoleBadge();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      {/* Top micro bar for quick info */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white text-xs py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-blue-100">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {settings.address}
            </span>
            <span className="text-blue-300/60">•</span>
            <span className="flex items-center gap-1.5 text-blue-100">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              {settings.phone1}
            </span>
          </div>
          <div className="flex items-center gap-4 text-blue-200">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              2026-o'quv yili uchun qabul davom etmoqda!
            </span>
            <span className="text-blue-400/60">|</span>
            <span className="text-blue-300">{settings.workingHours.split('(')[0]}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="focus:outline-hidden text-left"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Topshiriq yuborish CTA */}
            <button
              onClick={() => handleNavClick('submit-assignment')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                activeTab === 'submit-assignment'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 ring-offset-2'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-blue-500/25 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Topshiriq yuborish</span>
            </button>

            {/* Role / Kabinet Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border ${badge.color} transition-all cursor-pointer hover:opacity-90`}
                title="Kabinet va rollar"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{badge.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Kabinetga o'tish (Rollarni sinash)
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('student');
                      setActiveTab('student-portal');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-500" />
                    <span>O'quvchi kabineti</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('teacher');
                      setActiveTab('teacher-portal');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-amber-500" />
                    <span>Ustoz kabineti</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      setActiveTab('admin-portal');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>Admin boshqaruv paneli</span>
                  </button>
                  <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setUserRole('guest');
                        setActiveTab('home');
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Mehmon rejimiga qaytish
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dark mode button */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Rang rejimini o'zgartirish"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile CTA */}
          <button
            onClick={() => handleNavClick('submit-assignment')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>Ustozga topshiriq yuborish</span>
          </button>

          {/* Mobile Portal Links */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase px-2 mb-1">
              Shaxsiy kabinetlar
            </div>
            <button
              onClick={() => {
                setUserRole('student');
                handleNavClick('student-portal');
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>O'quvchi kabineti</span>
            </button>
            <button
              onClick={() => {
                setUserRole('teacher');
                handleNavClick('teacher-portal');
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Briefcase className="w-4 h-4 text-amber-500" />
              <span>Ustoz kabineti</span>
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                handleNavClick('admin-portal');
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Admin boshqaruv paneli</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
