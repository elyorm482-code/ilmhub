import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Assignment, AssignmentStatus } from '../types';
import {
  GraduationCap,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  MessageSquare,
  BookOpen,
  Calendar,
  Phone,
  User,
  ArrowRight,
} from 'lucide-react';

export const StudentPortalPage: React.FC = () => {
  const {
    assignments,
    studentPhone,
    setStudentPhone,
    enrollments,
    setActiveTab,
    sendAssignmentMessage,
  } = useApp();

  const [inputPhone, setInputPhone] = useState(studentPhone);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [studentReply, setStudentReply] = useState('');

  // Filter assignments for this student's phone (or show all sample assignments if no exact phone match)
  const cleanCurrentPhone = studentPhone.replace(/\s+/g, '');
  const myAssignments = assignments.filter((a) => {
    return (
      a.studentPhone.replace(/\s+/g, '') === cleanCurrentPhone ||
      cleanCurrentPhone === ''
    );
  });

  const displayAssignments = myAssignments.length > 0 ? myAssignments : assignments;

  const selectedAssignment =
    displayAssignments.find((a) => a.id === selectedAssignmentId) || displayAssignments[0];

  const handlePhoneFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentPhone(inputPhone.trim());
  };

  const handleSendStudentReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentReply.trim() || !selectedAssignment) return;

    try {
      await sendAssignmentMessage(selectedAssignment.id, {
        senderRole: 'student',
        senderName: selectedAssignment.studentName || "O'quvchi",
        message: studentReply.trim(),
      });
      setStudentReply('');
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: AssignmentStatus) => {
    switch (status) {
      case 'Yangi':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300';
      case 'Ko‘rib chiqilmoqda':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-300';
      case 'Bajarilmoqda':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-300';
      case 'Bajarildi':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-300';
      case 'Qayta ishlash kerak':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>O'quvchi Shaxsiy Kabineti</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Mening topshiriqlarim va kurslarim
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Topshiriq holatlarini kuzating, ustozlar fikr-mulohazalarini o'qing va yangi vazifalarni yuboring.
          </p>
        </div>

        {/* Student Phone Quick Login/Lookup */}
        <form
          onSubmit={handlePhoneFilterSubmit}
          className="w-full md:w-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2"
        >
          <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider">
            Telefon raqam bo'yicha qidirish:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
              placeholder="+998 90 123 45 67"
              className="px-3 py-2 rounded-xl bg-slate-900/80 text-white text-xs border border-white/20 focus:outline-hidden font-mono"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              Ko'rish
            </button>
          </div>
        </form>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Enrolled Courses & Submitted Assignments List */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fast CTA */}
          <button
            onClick={() => {
              setActiveTab('submit-assignment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>Yangi topshiriq yuborish</span>
          </button>

          {/* Assignments History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Yuborilgan topshiriqlar ({displayAssignments.length})
              </h3>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {displayAssignments.map((assignment) => {
                const isSelected = selectedAssignment?.id === assignment.id;
                return (
                  <div
                    key={assignment.id}
                    onClick={() => setSelectedAssignmentId(assignment.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {assignment.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                      {assignment.title}
                    </h4>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Ustoz: {assignment.teacherName}</span>
                      <span>Dedlayn: {assignment.deadline}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My Enrollments / Registered Courses */}
          {enrollments.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Tanlangan va arizalar yuborilgan kurslar</span>
              </h4>
              <div className="space-y-2">
                {enrollments.map((enr) => (
                  <div
                    key={enr.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {enr.courseTitle}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Ariza ID: {enr.id}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 text-[10px] font-bold">
                      {enr.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Selected Assignment Details & Feedback */}
        <div className="lg:col-span-7">
          {selectedAssignment ? (
            <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                      {selectedAssignment.id}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {selectedAssignment.subject}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {selectedAssignment.title}
                  </h3>
                </div>

                <span className={`self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-extrabold border ${getStatusBadge(selectedAssignment.status)}`}>
                  {selectedAssignment.status}
                </span>
              </div>

              {/* Status commentary from teacher */}
              {selectedAssignment.statusComment && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                    <AlertCircle className="w-4 h-4" />
                    <span>Ustoz xulosasi va holat izohi:</span>
                  </div>
                  <p className="leading-relaxed pl-5 font-medium">
                    {selectedAssignment.statusComment}
                  </p>
                </div>
              )}

              {/* Assignment details */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Topshiriq mazmuni:
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedAssignment.description}
                </div>
              </div>

              {/* Attachment if present */}
              {selectedAssignment.attachmentName && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedAssignment.attachmentName} ({selectedAssignment.attachmentSize || 'Fayl'})
                    </span>
                  </div>
                  {selectedAssignment.attachmentData && (
                    <a
                      href={selectedAssignment.attachmentData}
                      download={selectedAssignment.attachmentName}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Yuklab olish
                    </a>
                  )}
                </div>
              )}

              {/* Dialogue with teacher */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>Ustoz bilan yozishma ({selectedAssignment.messages?.length || 0})</span>
                </h4>

                <div className="space-y-2.5 max-h-60 overflow-y-auto">
                  {selectedAssignment.messages?.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 text-center text-xs text-slate-400">
                      Ustoz hali javob xabari yozmagan. Tez orada ko'rib chiqiladi.
                    </div>
                  ) : (
                    selectedAssignment.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-2xl text-xs space-y-1 ${
                          msg.senderRole === 'student'
                            ? 'bg-emerald-600 text-white ml-8'
                            : 'bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 mr-8'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-[10px] opacity-80">
                          <span>{msg.senderName} ({msg.senderRole === 'student' ? "O'zingiz" : 'Ustoz'})</span>
                          <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="leading-relaxed">{msg.message}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleSendStudentReply} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Ustozga qo'shimcha savol yoki tushuntirish yozing..."
                    value={studentReply}
                    onChange={(e) => setStudentReply(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Yuborish</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Topshiriq tanlanmagan
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
