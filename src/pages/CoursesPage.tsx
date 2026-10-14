import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, CourseCategory } from '../types';
import {
  Search,
  Clock,
  Layers,
  Users,
  CheckCircle2,
  X,
  Sparkles,
  BookOpen,
  Calendar,
  Send,
  CreditCard,
  GraduationCap,
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses, submitEnrollment, setActiveTab, setPreselectedTeacher, teachers } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);

  // Enroll form state
  const [enrollStudentName, setEnrollStudentName] = useState('');
  const [enrollStudentPhone, setEnrollStudentPhone] = useState('+998 ');
  const [enrollNotes, setEnrollNotes] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const categories: (CourseCategory | 'Barchasi')[] = [
    'Barchasi',
    'Dasturlash',
    'Kompyuter savodxonligi',
    'Ingliz tili',
    'Matematika',
    'Sun’iy intellekt',
    'Boshqa kurslar',
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'Barchasi' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollStudentName.trim() || enrollStudentPhone.length < 9) {
      alert("Iltimos, ismingiz va telefon raqamingizni to'liq kiriting");
      return;
    }

    setEnrolling(true);
    try {
      await submitEnrollment({
        courseId: selectedCourseForEnroll?.id || 'general',
        courseTitle: selectedCourseForEnroll?.title || 'Kurs',
        studentName: enrollStudentName,
        studentPhone: enrollStudentPhone,
        notes: enrollNotes,
      });
      setEnrollSuccess(true);
      setTimeout(() => {
        setEnrollSuccess(false);
        setSelectedCourseForEnroll(null);
        setEnrollStudentName('');
        setEnrollStudentPhone('+998 ');
        setEnrollNotes('');
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setEnrolling(false);
    }
  };

  const handleTeacherAssignment = (teacherName?: string) => {
    if (teacherName) {
      const match = teachers.find((t) => t.fullName.includes(teacherName) || teacherName.includes(t.fullName));
      if (match) {
        setPreselectedTeacher(match);
      }
    }
    setSelectedCourseForDetail(null);
    setActiveTab('submit-assignment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Ta'lim yo'nalishlari</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Zamonaviy va talabgir kurslar katalogi
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          O'zingizga mos yo'nalishni tanlang, tajribali ustozlardan bilim oling va yangi bosqichga ko'tariling.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Kurs nomi, mavzu yoki kalit so'z bilan qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Ushbu qidiruv bo'yicha kurslar topilmadi
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Qidiruv so'zini o'zgartirib ko'ring yoki boshqa kategoriyani tanlang.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Barchasi');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
          >
            Barchasini ko'rsatish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Course Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                    {course.category}
                  </div>
                  {course.isPopular && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Top</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {course.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {course.shortDesc}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Mo'ljallangan: </span>
                      {course.targetAudience}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Buttons */}
              <div className="p-6 pt-0 space-y-4">
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60 pt-4">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                      Oylik to'lov
                    </span>
                    <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                      {course.pricePerMonth}
                    </div>
                  </div>

                  {course.teacherName && (
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                        Ustoz
                      </span>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {course.teacherName.split(' ')[0]}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedCourseForDetail(course)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs transition-colors cursor-pointer text-center"
                  >
                    Batafsil
                  </button>
                  <button
                    onClick={() => setSelectedCourseForEnroll(course)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer text-center"
                  >
                    Kursga yozilish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedCourseForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setSelectedCourseForDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold">
                {selectedCourseForDetail.category}
              </span>
              <span className="text-xs text-slate-400">
                Davomiyligi: {selectedCourseForDetail.duration} ({selectedCourseForDetail.lessonsCount} dars)
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {selectedCourseForDetail.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {selectedCourseForDetail.description}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-center">
              <div>
                <div className="text-xs text-slate-400">Daraja</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">
                  {selectedCourseForDetail.level}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Darslar soni</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">
                  {selectedCourseForDetail.lessonsCount} ta
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Oylik to'lov</div>
                <div className="font-bold text-blue-600 dark:text-blue-400 text-sm mt-0.5">
                  {selectedCourseForDetail.pricePerMonth}
                </div>
              </div>
            </div>

            {/* Syllabus */}
            <div className="space-y-3">
              <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>O'quv dasturi (Mavzular rejasi)</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {selectedCourseForDetail.syllabus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons inside modal */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              {selectedCourseForDetail.teacherName && (
                <button
                  onClick={() => handleTeacherAssignment(selectedCourseForDetail.teacherName)}
                  className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ustozga to'g'ridan-to'g'ri topshiriq yuborish</span>
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setSelectedCourseForDetail(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Yopish
                </button>
                <button
                  onClick={() => {
                    setSelectedCourseForEnroll(selectedCourseForDetail);
                    setSelectedCourseForDetail(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
                >
                  Kursga yozilish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ENROLLMENT MODAL */}
      {selectedCourseForEnroll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setSelectedCourseForEnroll(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Ariza topshirish
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedCourseForEnroll.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Kurs narxi: <span className="font-bold text-blue-600 dark:text-blue-400">{selectedCourseForEnroll.pricePerMonth}</span>
              </p>
            </div>

            {enrollSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-emerald-800 dark:text-emerald-200">
                  Arizangiz muvaffaqiyatli qabul qilindi!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Tez orada operatorlarimiz siz bilan bog'lanib, o'quv jadvali va to'lov tafsilotlarini tushuntirishadi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ism va familiyangiz *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Anvar Qodirov"
                    value={enrollStudentName}
                    onChange={(e) => setEnrollStudentName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Telefon raqamingiz *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={enrollStudentPhone}
                    onChange={(e) => setEnrollStudentPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Qo'shimcha izoh yoki qulay vaqtingiz
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Masalan: Kechki guruh yoki shanba kunlari ma'qul"
                    value={enrollNotes}
                    onChange={(e) => setEnrollNotes(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={enrolling}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-sm shadow-md hover:from-blue-700 hover:to-indigo-800 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {enrolling ? (
                      <span>Yuborilmoqda...</span>
                    ) : (
                      <>
                        <GraduationCap className="w-4 h-4" />
                        <span>Kursga yozilishni tasdiqlash</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
