import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Teacher } from '../types';
import {
  Star,
  Send,
  Phone,
  Mail,
  ShieldCheck,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  X,
  Lock,
} from 'lucide-react';

export const TeachersPage: React.FC = () => {
  const { teachers, setActiveTab, setPreselectedTeacher } = useApp();
  const [selectedTeacherModal, setSelectedTeacherModal] = useState<Teacher | null>(null);

  const handleSendAssignment = (teacher: Teacher) => {
    setPreselectedTeacher(teacher);
    setActiveTab('submit-assignment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Tajribali pedagoglar jamoasi</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bizning professional ustozlar
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          O'z sohasining yetuk ustalari, xalqaro tajribaga ega amaliyotchi mutaxassislar.
        </p>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
          <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            <strong>Maxfiylik va axborot xavfsizligi:</strong> Ustozning telefon raqami va boshqa shaxsiy ma’lumotlari faqat markaz tomonidan ruxsat berilgan va tasdiqlangan hollarda ko‘rsatiladi.
          </span>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="group rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo */}
              <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={teacher.avatarUrl}
                  alt={teacher.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{teacher.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-blue-600/90 backdrop-blur-md text-white text-xs font-semibold">
                  {teacher.subject}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    Tajriba: {teacher.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    {teacher.studentsCount}+ o'quvchi
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {teacher.fullName}
                </h3>

                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {teacher.specialty}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {teacher.bio}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedTeacherModal(teacher)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  Batafsil profil
                </button>
                <button
                  onClick={() => handleSendAssignment(teacher)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>Topshiriq berish</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TEACHER PROFILE MODAL */}
      {selectedTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setSelectedTeacherModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <img
                src={selectedTeacherModal.avatarUrl}
                alt={selectedTeacherModal.fullName}
                className="w-24 h-24 rounded-2xl object-cover shadow-md"
              />
              <div className="text-center sm:text-left space-y-1">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
                  {selectedTeacherModal.subject}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedTeacherModal.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  Tajriba: <strong className="text-slate-700 dark:text-slate-300">{selectedTeacherModal.experience}</strong> • Reyting: <strong className="text-amber-500">★ {selectedTeacherModal.rating}</strong>
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Mutaxassisligi va tajriba yo'li
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedTeacherModal.bio}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold pt-1">
                Asosiy ko'nikmalar: {selectedTeacherModal.specialty}
              </p>
            </div>

            {/* Contact permission info */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Markaz tomonidan ruxsat etilgan aloqa kanallari:</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    Xizmat telefon raqami
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {selectedTeacherModal.phone}
                  </span>
                </div>
                {selectedTeacherModal.email && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-500" />
                      Elektron pochta
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {selectedTeacherModal.email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal CTA */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedTeacherModal(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Yopish
              </button>
              <button
                onClick={() => {
                  setSelectedTeacherModal(null);
                  handleSendAssignment(selectedTeacherModal);
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Ushbu ustozga topshiriq yuborish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
