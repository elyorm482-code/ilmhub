import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Assignment, AssignmentStatus } from '../types';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  User,
  Phone,
  Calendar,
  FileCheck,
  MessageSquare,
  Filter,
  Shield,
  ChevronRight,
  ExternalLink,
  Save,
  Lock,
} from 'lucide-react';

export const TeacherPortalPage: React.FC = () => {
  const {
    teachers,
    activeTeacherId,
    setActiveTeacherId,
    assignments,
    updateAssignmentStatus,
    sendAssignmentMessage,
    updateTeacher,
  } = useApp();

  const currentTeacher = teachers.find((t) => t.id === activeTeacherId) || teachers[0];

  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('Barchasi');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

  // Reply message form state
  const [replyMessage, setReplyMessage] = useState('');
  const [statusComment, setStatusComment] = useState('');
  const [selectedNewStatus, setSelectedNewStatus] = useState<AssignmentStatus>('Ko‘rib chiqilmoqda');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Teacher Profile edit mode
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editBio, setEditBio] = useState(currentTeacher?.bio || '');
  const [editSpecialty, setEditSpecialty] = useState(currentTeacher?.specialty || '');
  const [editExperience, setEditExperience] = useState(currentTeacher?.experience || '');

  // Filter ONLY assignments belonging to this teacher (Requirement: Ustoz faqat o'ziga tegishli topshiriqlarni ko'rsin)
  const teacherAssignments = assignments.filter((a) => {
    if (!currentTeacher) return false;
    return (
      a.teacherId === currentTeacher.id ||
      a.teacherPhone.replace(/\s+/g, '') === currentTeacher.phone.replace(/\s+/g, '') ||
      a.teacherName.toLowerCase().includes(currentTeacher.fullName.toLowerCase())
    );
  });

  const filteredAssignments = teacherAssignments.filter((a) => {
    if (selectedStatusTab === 'Barchasi') return true;
    if (selectedStatusTab === 'Yangi') return a.status === 'Yangi';
    if (selectedStatusTab === 'Jarayonda')
      return a.status === 'Ko‘rib chiqilmoqda' || a.status === 'Bajarilmoqda';
    if (selectedStatusTab === 'Bajarilgan') return a.status === 'Bajarildi';
    if (selectedStatusTab === 'Qayta ishlash') return a.status === 'Qayta ishlash kerak';
    return a.status === selectedStatusTab;
  });

  const selectedAssignment = teacherAssignments.find((a) => a.id === selectedAssignmentId) || teacherAssignments[0];

  const handleStatusUpdate = async () => {
    if (!selectedAssignment) return;
    setIsUpdatingStatus(true);
    try {
      await updateAssignmentStatus(
        selectedAssignment.id,
        selectedNewStatus,
        statusComment.trim() || undefined
      );
      setStatusComment('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedAssignment) return;

    try {
      await sendAssignmentMessage(selectedAssignment.id, {
        senderRole: 'teacher',
        senderName: currentTeacher?.fullName || 'Ustoz',
        message: replyMessage.trim(),
      });
      setReplyMessage('');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveProfile = async () => {
    if (!currentTeacher) return;
    await updateTeacher(currentTeacher.id, {
      bio: editBio,
      specialty: editSpecialty,
      experience: editExperience,
    });
    setIsEditingProfile(false);
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

  // Metrics
  const newCount = teacherAssignments.filter((a) => a.status === 'Yangi').length;
  const inProgressCount = teacherAssignments.filter(
    (a) => a.status === 'Ko‘rib chiqilmoqda' || a.status === 'Bajarilmoqda' || a.status === 'Qayta ishlash kerak'
  ).length;
  const completedCount = teacherAssignments.filter((a) => a.status === 'Bajarildi').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner & Teacher Switcher */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentTeacher?.avatarUrl}
            alt={currentTeacher?.fullName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-lg"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Ustoz Shaxsiy Kabineti</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{currentTeacher?.fullName}</h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
              {currentTeacher?.subject} • {currentTeacher?.phone}
            </p>
          </div>
        </div>

        {/* Teacher Account Switcher (For demo/testing) */}
        <div className="w-full md:w-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2">
          <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
            Ustoz profilini tanlash:
          </label>
          <select
            value={currentTeacher?.id}
            onChange={(e) => setActiveTeacherId(e.target.value)}
            className="w-full md:w-64 px-3 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-semibold border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
          >
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName} ({t.subject.split('&')[0]})
              </option>
            ))}
          </select>
          <div className="text-[10px] text-blue-200 flex items-center gap-1">
            <Lock className="w-3 h-3 text-amber-300" />
            <span>Faqat ushbu ustozga tegishli topshiriqlar ochiladi.</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Yangi topshiriqlar</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
              {newCount} ta
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Jarayondagilar</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 mt-1">
              {inProgressCount} ta
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">Bajarilganlar</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 mt-1">
              {completedCount} ta
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Workspace (Split View: Assignment List + Assignment Detail) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filter and List of Assignments */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Kelib tushgan topshiriqlar ({teacherAssignments.length})</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            {['Barchasi', 'Yangi', 'Jarayonda', 'Bajarilgan', 'Qayta ishlash'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedStatusTab(tab)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedStatusTab === tab
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Assignment items */}
          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {filteredAssignments.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                <Clock className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-500">Ushbu filtr bo'yicha topshiriqlar mavjud emas</p>
              </div>
            ) : (
              filteredAssignments.map((assignment) => {
                const isSelected = selectedAssignment?.id === assignment.id;
                return (
                  <div
                    key={assignment.id}
                    onClick={() => setSelectedAssignmentId(assignment.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                      isSelected
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
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
                      <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                        <User className="w-3.5 h-3.5 text-blue-500" />
                        {assignment.studentName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {assignment.deadline}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Assignment Details & Actions */}
        <div className="lg:col-span-7">
          {selectedAssignment ? (
            <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400">
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

              {/* Student and Deadline Info Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700 text-xs">
                <div className="space-y-1">
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">O'quvchi:</div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedAssignment.studentName}
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-mono">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedAssignment.studentPhone}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 font-semibold uppercase text-[10px]">Topshiriq muddati:</div>
                  <div className="font-bold text-amber-600 dark:text-amber-400 text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedAssignment.deadline}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Yuborilgan vaqti: {new Date(selectedAssignment.createdAt).toLocaleDateString('uz-UZ')}
                  </div>
                </div>
              </div>

              {/* Description Body */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Topshiriq matni va shartlari:
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedAssignment.description}
                </div>
              </div>

              {/* Attachment if present */}
              {selectedAssignment.attachmentName && (
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {selectedAssignment.attachmentName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {selectedAssignment.attachmentSize || 'Biriktirilgan fayl'}
                      </div>
                    </div>
                  </div>
                  {selectedAssignment.attachmentData ? (
                    <a
                      href={selectedAssignment.attachmentData}
                      download={selectedAssignment.attachmentName}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
                    >
                      Yuklab olish
                    </a>
                  ) : (
                    <span className="text-xs text-blue-600 font-semibold">Fayl tizimda mavjud</span>
                  )}
                </div>
              )}

              {/* STATUS CHANGER PANEL */}
              <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Topshiriq holatini o'zgartirish</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Yangi holatni tanlang:
                    </label>
                    <select
                      value={selectedNewStatus}
                      onChange={(e) => setSelectedNewStatus(e.target.value as AssignmentStatus)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      <option value="Ko‘rib chiqilmoqda">Ko‘rib chiqilmoqda</option>
                      <option value="Bajarilmoqda">Bajarilmoqda (Jarayonda)</option>
                      <option value="Bajarildi">Bajarildi (Tasdiqlash)</option>
                      <option value="Qayta ishlash kerak">Qayta ishlash kerak (Xatolik bor)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Holat bo'yicha qisqa izoh:
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: Kod tekshirildi, a'lo natija!"
                      value={statusComment}
                      onChange={(e) => setStatusComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleStatusUpdate}
                    disabled={isUpdatingStatus}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Holatni yangilash</span>
                  </button>
                </div>
              </div>

              {/* MESSAGES THREAD (Teacher and Student dialogue) */}
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span>O'quvchi bilan xabarlar ({selectedAssignment.messages?.length || 0})</span>
                </h4>

                <div className="space-y-2.5 max-h-60 overflow-y-auto">
                  {selectedAssignment.messages?.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 text-center text-xs text-slate-400">
                      Hozircha xabarlar yo'q. Birinchi bo'lib fikr yozing.
                    </div>
                  ) : (
                    selectedAssignment.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-2xl text-xs space-y-1 ${
                          msg.senderRole === 'teacher'
                            ? 'bg-blue-600 text-white ml-8'
                            : 'bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 mr-8'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-[10px] opacity-80">
                          <span>{msg.senderName} ({msg.senderRole === 'teacher' ? 'Ustoz' : "O'quvchi"})</span>
                          <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="leading-relaxed">{msg.message}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Reply Input Form */}
                <form onSubmit={handleSendReply} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="O'quvchiga tushuntirish yoki fikr yozing..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Javob</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <Clock className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Topshiriq tanlanmagan
              </h3>
              <p className="text-xs text-slate-500">
                Chap tomondagi ro'yxatdan ko'rib chiqmoqchi bo'lgan topshiriqni bosing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
