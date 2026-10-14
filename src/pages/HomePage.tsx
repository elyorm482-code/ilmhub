import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Send,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Zap,
  Layers,
  GraduationCap,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveTab, courses, teachers, setPreselectedTeacher } = useApp();

  const handleNav = (tab: any) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTeacherAssignment = (teacher: any) => {
    setPreselectedTeacher(teacher);
    handleNav('submit-assignment');
  };

  const featuredCourses = courses.slice(0, 3);
  const featuredTeachers = teachers.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-24 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-400/15 via-indigo-500/10 to-amber-300/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top Announcement Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold tracking-wide border border-blue-200 dark:border-blue-800/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Lobeble Ta'lim Markaziga xush kelibsiz!</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Kelajagingizni{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
                  bilim bilan
                </span>{' '}
                yarating!
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Zamonaviy bilimlar, tajribali ustozlar va qulay ta’lim muhiti — muvaffaqiyat sari birinchi qadamingiz.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleNav('courses')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-amber-300" />
                  <span>Kurslarni ko‘rish</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => handleNav('submit-assignment')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base shadow-md shadow-amber-500/20 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 text-slate-950" />
                  <span>Ustozga topshiriq yuborish</span>
                </button>

                <button
                  onClick={() => handleNav('contact')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-semibold text-base transition-all cursor-pointer"
                >
                  Biz bilan bog‘lanish
                </button>
              </div>

              {/* Key Features Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Amaliy real loyihalar</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Mentorlik va nazorat</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>SMS xabarnoma tizimi</span>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-white dark:bg-slate-800/90 p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-700/80">
                {/* Visual badge top */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 p-2.5 flex items-center justify-center text-white shadow-md">
                      <GraduationCap className="w-7 h-7 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        Lobeble Platformasi
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Topshiriq va ta'lim boshqaruvi
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                    Faol tizim
                  </span>
                </div>

                {/* Assignment mini flow simulation preview */}
                <div className="py-5 space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Send className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Topshiriq yuborish
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Fayl, muddat va ustoz tanlash
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                      1-qadam
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          SMS xabarnoma mexanizmi
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Ustoz telefoniga to'g'ridan-to'g'ri bildirishnoma
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      2-qadam
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Ustoz baholashi va tahlili
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Kabinet orqali xavfsiz javob yozish
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      3-qadam
                    </span>
                  </div>
                </div>

                {/* Landmark badge */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>Mo'ljal: Zam-Zam binosining to‘g‘risida</span>
                  </div>
                  <button
                    onClick={() => handleNav('location')}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Xarita
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              1,250+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Muvaffaqiyatli o'quvchilar
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              24+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Malakali ustozlar
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              16+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Zamonaviy o'quv kurslari
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              94%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Imtihon topshirish ko'rsatkichi
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Keng qamrovli dastur
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Eng ommabop o'quv kurslari
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Mehnat bozori talablariga mos, amaliyot bilan boyitilgan chuqur kurslarimiz bilan tanishing.
            </p>
          </div>
          <button
            onClick={() => handleNav('courses')}
            className="self-start md:self-auto text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Barcha kurslarni ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="group rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold">
                    {course.category}
                  </div>
                  {course.isPopular && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Top</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {course.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                    {course.shortDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-700/60 mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Oylik to'lov</div>
                  <div className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                    {course.pricePerMonth}
                  </div>
                </div>
                <button
                  onClick={() => handleNav('courses')}
                  className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-600 hover:text-white font-bold text-xs transition-all cursor-pointer"
                >
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
              Tajribali Pedagoglar
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Bizning yetakchi ustozlar
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Har bir fan bo'yicha ko'p yillik amaliy tajribaga ega sertifikatlangan mutaxassislar.
            </p>
          </div>
          <button
            onClick={() => handleNav('teachers')}
            className="self-start md:self-auto text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Barcha ustozlarni ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-4">
                  <img
                    src={teacher.avatarUrl}
                    alt={teacher.fullName}
                    className="w-full h-52 object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{teacher.rating}</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {teacher.subject}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {teacher.fullName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tajriba: <span className="font-semibold text-slate-700 dark:text-slate-200">{teacher.experience}</span>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                  {teacher.specialty}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  onClick={() => handleTeacherAssignment(teacher)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>Topshiriq yuborish</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assignment System Callout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 border border-blue-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-amber-400/30">
                Platformaning asosiy imkoniyati
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ustozga to'g'ridan-to'g'ri topshiriq yuborish
              </h2>
              <p className="text-blue-100 text-base max-w-2xl leading-relaxed">
                Uyga vazifa yoki loyiha topshiriqlaringizni onlayn biriktiring (fayl yuklash, muddat belgilash). Ustoz telefoniga SMS xabarnoma mexanizmi orqali bildirishnoma yetkaziladi va ustoz shaxsiy kabinetida batafsil tahlil qiladi.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleNav('submit-assignment')}
                  className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Topshiriq formasini ochish</span>
                </button>
                <button
                  onClick={() => handleNav('about')}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer"
                >
                  Tizim qoidalari haqida
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3 text-xs">
              <div className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Noyob xususiyatlar:</span>
              </div>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Har bir topshiriq uchun unikal ID (masalan: TSK-8492)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Serverda xavfsiz SMS provayder integratsiyasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>O'quvchi va ustoz o'rtasida shaxsiy izohlar yozishmasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>5 xil bosqichli holat monitoringi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
