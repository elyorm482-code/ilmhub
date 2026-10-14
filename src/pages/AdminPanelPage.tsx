import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, Teacher, CourseCategory } from '../types';
import {
  ShieldAlert,
  BookOpen,
  Users,
  Send,
  Smartphone,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Calendar,
  Phone,
  RefreshCw,
} from 'lucide-react';

export const AdminPanelPage: React.FC = () => {
  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    assignments,
    updateAssignmentStatus,
    smsLogs,
    contactMessages,
    enrollments,
    settings,
    updateSettings,
    refreshData,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<
    'overview' | 'courses' | 'teachers' | 'assignments' | 'sms' | 'messages' | 'settings'
  >('overview');

  // Course Add/Edit Form State
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    category: 'Dasturlash' as CourseCategory,
    shortDesc: '',
    description: '',
    duration: '6 oy',
    level: 'Boshlang\'ich' as const,
    targetAudience: '',
    lessonsCount: 60,
    pricePerMonth: "800,000 so'm",
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    syllabus: 'HTML va CSS asoslari\nJavaScript ES6+\nReact.js va TypeScript',
  });

  // Teacher Add/Edit Form State
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [teacherFormData, setTeacherFormData] = useState({
    fullName: '',
    subject: '',
    experience: '5+ yil',
    specialty: '',
    phone: '+998 ',
    email: '',
    bio: '',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  });

  // Settings Form State
  const [settingsFormData, setSettingsFormData] = useState({
    name: settings.name,
    slogan: settings.slogan,
    subtitle: settings.subtitle,
    address: settings.address,
    addressLandmark: settings.addressLandmark,
    addressDetail: settings.addressDetail,
    phone1: settings.phone1,
    phone2: settings.phone2,
    email: settings.email,
    workingHours: settings.workingHours,
    googleMapsQuery: settings.googleMapsQuery,
  });

  // Handle Course Save
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const syllabusArray = courseFormData.syllabus
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingCourseId) {
      await updateCourse(editingCourseId, {
        title: courseFormData.title,
        category: courseFormData.category,
        shortDesc: courseFormData.shortDesc,
        description: courseFormData.description,
        duration: courseFormData.duration,
        level: courseFormData.level,
        targetAudience: courseFormData.targetAudience,
        lessonsCount: Number(courseFormData.lessonsCount),
        pricePerMonth: courseFormData.pricePerMonth,
        imageUrl: courseFormData.imageUrl,
        syllabus: syllabusArray,
      });
      setEditingCourseId(null);
    } else {
      await addCourse({
        title: courseFormData.title,
        category: courseFormData.category,
        shortDesc: courseFormData.shortDesc,
        description: courseFormData.description,
        duration: courseFormData.duration,
        level: courseFormData.level,
        targetAudience: courseFormData.targetAudience,
        lessonsCount: Number(courseFormData.lessonsCount),
        pricePerMonth: courseFormData.pricePerMonth,
        imageUrl: courseFormData.imageUrl,
        syllabus: syllabusArray,
      });
      setIsAddingCourse(false);
    }
  };

  const startEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setIsAddingCourse(true);
    setCourseFormData({
      title: course.title,
      category: course.category,
      shortDesc: course.shortDesc,
      description: course.description,
      duration: course.duration,
      level: course.level as any,
      targetAudience: course.targetAudience,
      lessonsCount: course.lessonsCount,
      pricePerMonth: course.pricePerMonth,
      imageUrl: course.imageUrl,
      syllabus: course.syllabus.join('\n'),
    });
  };

  // Handle Teacher Save
  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacherId) {
      await updateTeacher(editingTeacherId, teacherFormData);
      setEditingTeacherId(null);
    } else {
      await addTeacher({
        ...teacherFormData,
        rating: 5.0,
        studentsCount: 50,
        coursesCount: 1,
        isAvailableForAssignments: true,
      });
      setIsAddingTeacher(false);
    }
  };

  const startEditTeacher = (teacher: Teacher) => {
    setEditingTeacherId(teacher.id);
    setIsAddingTeacher(true);
    setTeacherFormData({
      fullName: teacher.fullName,
      subject: teacher.subject,
      experience: teacher.experience,
      specialty: teacher.specialty,
      phone: teacher.phone,
      email: teacher.email || '',
      bio: teacher.bio,
      avatarUrl: teacher.avatarUrl,
    });
  };

  // Handle Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settingsFormData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Xavfsiz Boshqaruv Markazi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Lobeble Admin Panel</h1>
          <p className="text-xs text-slate-300 mt-1">
            Kurslar, ustozlar, topshiriqlar, SMS loglar va sayt sozlamalarini to'liq nazorat qilish
          </p>
        </div>
        <button
          onClick={() => refreshData()}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Ma'lumotlarni yangilash</span>
        </button>
      </div>

      {/* Admin Subtabs Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold">
        {[
          { id: 'overview', label: 'Umumiy ko\'rsatkichlar', icon: ShieldAlert },
          { id: 'courses', label: `Kurslar (${courses.length})`, icon: BookOpen },
          { id: 'teachers', label: `Ustozlar (${teachers.length})`, icon: Users },
          { id: 'assignments', label: `Topshiriqlar (${assignments.length})`, icon: Send },
          { id: 'sms', label: `SMS Jurnali (${smsLogs.length})`, icon: Smartphone },
          { id: 'messages', label: `Murojaatlar (${contactMessages.length + enrollments.length})`, icon: MessageSquare },
          { id: 'settings', label: 'Sayt sozlamalari', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                active
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">Jami topshiriqlar</div>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                {assignments.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Yangi: {assignments.filter((a) => a.status === 'Yangi').length} ta
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">Faol kurslar</div>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {courses.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Arizalar: {enrollments.length} ta
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">Ustozlar jamoasi</div>
              <div className="text-3xl font-extrabold text-amber-500 mt-1">
                {teachers.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Barchasi qabul uchun faol
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">SMS xabarlar jurnali</div>
              <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
                {smsLogs.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Holat: {settings.smsProviderConfigured ? 'Ulangan' : 'Kalit kutilmoqda'}
              </div>
            </div>
          </div>

          {/* Quick status summary */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Tizim holati va xavfsizlik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  SMS Gateway holati:
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  Provayder: <span className="font-mono text-blue-600 font-bold">{settings.smsProviderName}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Agar `.env` faylida `SMS_PROVIDER=twilio` yoki `SMS_PROVIDER=eskiz` ko'rsatilmagan bo'lsa, xizmat shaffof holatda tizimga saqlanadi va soxta SMS hisoboti ko'rsatilmaydi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Manzil va koordinatalar nazorati:
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  Manzil: <span className="font-bold text-amber-600">{settings.address}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Ko'cha nomi va koordinatalar tasdiqlangach, "Sayt sozlamalari" bo'limidan to'g'ridan-to'g'ri o'zgartirish mumkin.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. COURSES TAB */}
      {activeSubTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Kurslar boshqaruvi
            </h3>
            <button
              onClick={() => {
                setIsAddingCourse(true);
                setEditingCourseId(null);
                setCourseFormData({
                  title: '',
                  category: 'Dasturlash',
                  shortDesc: '',
                  description: '',
                  duration: '6 oy',
                  level: 'Boshlang\'ich',
                  targetAudience: '',
                  lessonsCount: 60,
                  pricePerMonth: "800,000 so'm",
                  imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                  syllabus: '1-modul: Asoslar\n2-modul: Amaliyot',
                });
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi kurs qo'shish</span>
            </button>
          </div>

          {/* Course Add/Edit Modal */}
          {isAddingCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-4">
                <button
                  onClick={() => setIsAddingCourse(false)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingCourseId ? 'Kursni tahrirlash' : 'Yangi kurs qo\'shish'}
                </h3>
                <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Kurs nomi *</label>
                    <input
                      type="text"
                      required
                      value={courseFormData.title}
                      onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Kategoriya</label>
                      <select
                        value={courseFormData.category}
                        onChange={(e) => setCourseFormData({ ...courseFormData, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      >
                        <option value="Dasturlash">Dasturlash</option>
                        <option value="Kompyuter savodxonligi">Kompyuter savodxonligi</option>
                        <option value="Ingliz tili">Ingliz tili</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Sun’iy intellekt">Sun’iy intellekt</option>
                        <option value="Boshqa kurslar">Boshqa kurslar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Davomiyligi</label>
                      <input
                        type="text"
                        value={courseFormData.duration}
                        onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Oylik to'lov</label>
                      <input
                        type="text"
                        value={courseFormData.pricePerMonth}
                        onChange={(e) => setCourseFormData({ ...courseFormData, pricePerMonth: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Kimlar uchun (Auditoriya)</label>
                      <input
                        type="text"
                        value={courseFormData.targetAudience}
                        onChange={(e) => setCourseFormData({ ...courseFormData, targetAudience: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Qisqa tavsif</label>
                    <input
                      type="text"
                      value={courseFormData.shortDesc}
                      onChange={(e) => setCourseFormData({ ...courseFormData, shortDesc: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Batafsil ma'lumot</label>
                    <textarea
                      rows={3}
                      value={courseFormData.description}
                      onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">O'quv rejasi / Sillabus (Har bir qator alohida mavzu)</label>
                    <textarea
                      rows={3}
                      value={courseFormData.syllabus}
                      onChange={(e) => setCourseFormData({ ...courseFormData, syllabus: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Rasm havolasi (URL)</label>
                    <input
                      type="text"
                      value={courseFormData.imageUrl}
                      onChange={(e) => setCourseFormData({ ...courseFormData, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingCourse(false)}
                      className="px-4 py-2 rounded-xl border border-slate-300"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
                    >
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Courses Table */}
          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Kurs</th>
                    <th className="p-4">Kategoriya</th>
                    <th className="p-4">Davomiyligi</th>
                    <th className="p-4">Oylik to'lov</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {course.title}
                        </div>
                        <div className="text-[11px] text-slate-400">{course.id}</div>
                      </td>
                      <td className="p-4 font-semibold text-blue-600 dark:text-blue-400">
                        {course.category}
                      </td>
                      <td className="p-4">{course.duration}</td>
                      <td className="p-4 font-bold">{course.pricePerMonth}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => startEditCourse(course)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                          title="Tahrirlash"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Rostdan ham "${course.title}" kursini o'chirmoqchimisiz?`)) {
                              deleteCourse(course.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. TEACHERS TAB */}
      {activeSubTab === 'teachers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Ustozlar profillarini boshqarish
            </h3>
            <button
              onClick={() => {
                setIsAddingTeacher(true);
                setEditingTeacherId(null);
                setTeacherFormData({
                  fullName: '',
                  subject: '',
                  experience: '5+ yil',
                  specialty: '',
                  phone: '+998 ',
                  email: '',
                  bio: '',
                  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
                });
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi ustoz qo'shish</span>
            </button>
          </div>

          {/* Teacher Add/Edit Modal */}
          {isAddingTeacher && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-4">
                <button
                  onClick={() => setIsAddingTeacher(false)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingTeacherId ? 'Ustoz profilini tahrirlash' : 'Yangi ustoz qo\'shish'}
                </h3>
                <form onSubmit={handleSaveTeacher} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Ism va familiyasi *</label>
                    <input
                      type="text"
                      required
                      value={teacherFormData.fullName}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">O'qitadigan fani *</label>
                      <input
                        type="text"
                        required
                        value={teacherFormData.subject}
                        onChange={(e) => setTeacherFormData({ ...teacherFormData, subject: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Ish tajribasi</label>
                      <input
                        type="text"
                        value={teacherFormData.experience}
                        onChange={(e) => setTeacherFormData({ ...teacherFormData, experience: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Telefon raqami *</label>
                      <input
                        type="tel"
                        required
                        value={teacherFormData.phone}
                        onChange={(e) => setTeacherFormData({ ...teacherFormData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Mutaxassisligi</label>
                      <input
                        type="text"
                        value={teacherFormData.specialty}
                        onChange={(e) => setTeacherFormData({ ...teacherFormData, specialty: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Ustoz haqida (Bio)</label>
                    <textarea
                      rows={3}
                      value={teacherFormData.bio}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Rasm havolasi (URL)</label>
                    <input
                      type="text"
                      value={teacherFormData.avatarUrl}
                      onChange={(e) => setTeacherFormData({ ...teacherFormData, avatarUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingTeacher(false)}
                      className="px-4 py-2 rounded-xl border border-slate-300"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
                    >
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.fullName}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {t.fullName}
                    </h4>
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      {t.subject}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{t.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEditTeacher(t)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Ustoz "${t.fullName}" profilini o'chirmoqchimisiz?`)) {
                        deleteTeacher(t.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ASSIGNMENTS TAB */}
      {activeSubTab === 'assignments' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Topshiriqlar monitoringi
          </h3>

          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Mavzu</th>
                    <th className="p-4">O'quvchi</th>
                    <th className="p-4">Biriktirilgan Ustoz</th>
                    <th className="p-4">Dedlayn</th>
                    <th className="p-4">Holat</th>
                    <th className="p-4">SMS Holati</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {assignments.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                      <td className="p-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {a.id}
                      </td>
                      <td className="p-4 font-medium max-w-xs truncate">{a.title}</td>
                      <td className="p-4">
                        <div className="font-semibold">{a.studentName}</div>
                        <div className="text-[11px] text-slate-400">{a.studentPhone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold">{a.teacherName}</div>
                        <div className="text-[11px] text-slate-400">{a.teacherPhone}</div>
                      </td>
                      <td className="p-4 font-mono">{a.deadline}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                          {a.status}
                        </span>
                      </td>
                      <td className="p-4 text-[11px] text-slate-500 max-w-xs truncate">
                        {a.smsStatusDetail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. SMS LOGS TAB */}
      {activeSubTab === 'sms' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                SMS xabarnomalar jurnali
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Topshiriq yuborilganda ustozlarga yuborilgan yoki yuborilishi kerak bo'lgan barcha SMS loglar
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Log ID</th>
                    <th className="p-4">Qabul qiluvchi (Ustoz)</th>
                    <th className="p-4">SMS Matni</th>
                    <th className="p-4">Provayder</th>
                    <th className="p-4">Holat / Tafsilot</th>
                    <th className="p-4">Vaqt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {smsLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                      <td className="p-4 font-mono font-bold">{log.id}</td>
                      <td className="p-4">
                        <div className="font-semibold">{log.recipientName}</div>
                        <div className="font-mono text-slate-400 text-[11px]">{log.recipientPhone}</div>
                      </td>
                      <td className="p-4 max-w-sm text-slate-600 dark:text-slate-300 leading-snug">
                        {log.messageText}
                      </td>
                      <td className="p-4 font-bold text-blue-600 dark:text-blue-400">
                        {log.provider}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            log.status === 'sent'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                          }`}
                        >
                          {log.statusDetail}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-[11px]">
                        {new Date(log.sentAt).toLocaleString('uz-UZ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. MESSAGES & ENROLLMENTS TAB */}
      {activeSubTab === 'messages' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Messages */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Sayt orqali kelgan xabarlar ({contactMessages.length})</span>
            </h3>

            <div className="space-y-3">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {msg.name}
                    </span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      {msg.phone}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">
                    Mavzu: {msg.subject}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl">
                    {msg.message}
                  </p>
                  <div className="text-[10px] text-slate-400 text-right">
                    {new Date(msg.createdAt).toLocaleString('uz-UZ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kurslarga yozilish arizalari */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Kurslarga yozilish arizalari ({enrollments.length})</span>
            </h3>

            <div className="space-y-3">
              {enrollments.map((enr) => (
                <div
                  key={enr.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {enr.studentName}
                    </span>
                    <span className="font-mono text-emerald-600 font-bold">
                      {enr.studentPhone}
                    </span>
                  </div>
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    Kurs: {enr.courseTitle}
                  </div>
                  {enr.notes && (
                    <div className="text-slate-500 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl">
                      Izoh: {enr.notes}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>ID: {enr.id}</span>
                    <span>{new Date(enr.createdAt).toLocaleString('uz-UZ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. SETTINGS TAB */}
      {activeSubTab === 'settings' && (
        <form
          onSubmit={handleSaveSettings}
          className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md p-6 sm:p-10 space-y-6"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
            Sayt manzili, matnlari va aloqa sozlamalari
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Sayt / Markaz nomi</label>
              <input
                type="text"
                value={settingsFormData.name}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Asosiy shior (Slogan)</label>
              <input
                type="text"
                value={settingsFormData.slogan}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, slogan: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold mb-1">Bosh sahifa izohi (Subtitle)</label>
            <input
              type="text"
              value={settingsFormData.subtitle}
              onChange={(e) => setSettingsFormData({ ...settingsFormData, subtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Rasmiy manzil (Address)</label>
              <input
                type="text"
                value={settingsFormData.address}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Mo‘ljal (Landmark)</label>
              <input
                type="text"
                value={settingsFormData.addressLandmark}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, addressLandmark: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Telefon raqam 1</label>
              <input
                type="text"
                value={settingsFormData.phone1}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, phone1: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Telefon raqam 2</label>
              <input
                type="text"
                value={settingsFormData.phone2}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, phone2: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Elektron pochta</label>
              <input
                type="email"
                value={settingsFormData.email}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Ish tartibi</label>
              <input
                type="text"
                value={settingsFormData.workingHours}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, workingHours: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Google Maps qidiruv so'zi</label>
              <input
                type="text"
                value={settingsFormData.googleMapsQuery}
                onChange={(e) => setSettingsFormData({ ...settingsFormData, googleMapsQuery: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Sozlamalarni saqlash</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
