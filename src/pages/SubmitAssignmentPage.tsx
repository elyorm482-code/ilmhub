import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Assignment } from '../types';
import {
  Send,
  Upload,
  Calendar,
  Phone,
  User,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  X,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

export const SubmitAssignmentPage: React.FC = () => {
  const {
    teachers,
    submitAssignment,
    preselectedTeacher,
    setPreselectedTeacher,
    setActiveTab,
    setUserRole,
    setActiveTeacherId,
    setStudentPhone,
  } = useApp();

  // Form Fields (10 items required)
  const [studentName, setStudentName] = useState('');
  const [studentPhoneNumber, setStudentPhoneNumber] = useState('+998 ');
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherPhoneNumber, setTeacherPhoneNumber] = useState('+998 ');
  const [subjectName, setSubjectName] = useState('');
  const [assignmentTopic, setAssignmentTopic] = useState('');
  const [assignmentText, setAssignmentText] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(() => {
    // Default 5 days from today
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });

  // Attachment state (PDF, DOCX, Images)
  const [attachment, setAttachment] = useState<{
    name: string;
    size: string;
    data: string; // base64
  } | null>(null);

  // Submission & UI State
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedResult, setSubmittedResult] = useState<{
    assignment: Assignment;
    sms: any;
    message: string;
  } | null>(null);

  // If teacher was preselected from Teachers page
  useEffect(() => {
    if (preselectedTeacher) {
      setSelectedTeacherId(preselectedTeacher.id);
      setTeacherName(preselectedTeacher.fullName);
      setTeacherPhoneNumber(preselectedTeacher.phone);
      setSubjectName(preselectedTeacher.subject);
    } else if (teachers.length > 0 && !selectedTeacherId) {
      // Default to first teacher
      const first = teachers[0];
      setSelectedTeacherId(first.id);
      setTeacherName(first.fullName);
      setTeacherPhoneNumber(first.phone);
      setSubjectName(first.subject);
    }
  }, [preselectedTeacher, teachers]);

  const handleTeacherChange = (teacherId: string) => {
    setSelectedTeacherId(teacherId);
    if (teacherId === 'custom') {
      setTeacherName('');
      setTeacherPhoneNumber('+998 ');
      setSubjectName('');
      setPreselectedTeacher(null);
    } else {
      const match = teachers.find((t) => t.id === teacherId);
      if (match) {
        setTeacherName(match.fullName);
        setTeacherPhoneNumber(match.phone);
        setSubjectName(match.subject);
        setPreselectedTeacher(match);
      }
    }
  };

  // File Upload Handler (PDF, DOCX, Images)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 10MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Fayl hajmi 10 MB dan oshmasligi lozim.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      setAttachment({
        name: file.name,
        size: sizeStr,
        data: reader.result as string,
      });
      setErrorMessage('');
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Validation
    if (!studentName.trim()) {
      setErrorMessage("O'quvchining ism-familiyasini kiriting.");
      return;
    }
    if (studentPhoneNumber.trim().length < 9) {
      setErrorMessage("O'quvchining telefon raqamini to'liq kiriting.");
      return;
    }
    if (!teacherName.trim()) {
      setErrorMessage("Ustozning ism-familiyasini kiriting yoki ro'yxatdan tanlang.");
      return;
    }
    if (teacherPhoneNumber.trim().length < 9) {
      setErrorMessage("Ustozning telefon raqamini to'liq kiriting.");
      return;
    }
    if (!subjectName.trim()) {
      setErrorMessage("Fan yoki kurs nomini kiriting.");
      return;
    }
    if (!assignmentTopic.trim()) {
      setErrorMessage("Topshiriq mavzusini kiriting.");
      return;
    }
    if (!assignmentText.trim()) {
      setErrorMessage("Topshiriqning to'liq matnini kiriting.");
      return;
    }
    if (!deadlineDate) {
      setErrorMessage("Topshiriq topshirish muddatini belgilang.");
      return;
    }

    // Phone format check
    const phoneRegex = /^(\+?998)?[0-9\s\-()]{9,15}$/;
    if (!phoneRegex.test(studentPhoneNumber.trim())) {
      setErrorMessage("O'quvchi telefon raqami formati noto'g'ri. Masalan: +998 90 123 45 67");
      return;
    }
    if (!phoneRegex.test(teacherPhoneNumber.trim())) {
      setErrorMessage("Ustoz telefon raqami formati noto'g'ri. Masalan: +998 90 123 45 67");
      return;
    }

    setSubmitting(true);

    try {
      const response = await submitAssignment({
        studentName: studentName.trim(),
        studentPhone: studentPhoneNumber.trim(),
        teacherId: selectedTeacherId === 'custom' ? `tch-${Date.now()}` : selectedTeacherId,
        teacherName: teacherName.trim(),
        teacherPhone: teacherPhoneNumber.trim(),
        subject: subjectName.trim(),
        title: assignmentTopic.trim(),
        description: assignmentText.trim(),
        deadline: deadlineDate,
        attachmentName: attachment?.name,
        attachmentSize: attachment?.size,
        attachmentData: attachment?.data,
      });

      // Save student phone for portal tracking
      setStudentPhone(studentPhoneNumber.trim());
      setSubmittedResult(response);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Topshiriq yuborishda xatolik yuz berdi. Qayta urinib ko\'ring.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedResult(null);
    setAssignmentTopic('');
    setAssignmentText('');
    setAttachment(null);
  };

  const handleGoToStudentPortal = () => {
    setUserRole('student');
    setActiveTab('student-portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToTeacherPortal = () => {
    setUserRole('teacher');
    if (submittedResult?.assignment?.teacherId) {
      setActiveTeacherId(submittedResult.assignment.teacherId);
    }
    setActiveTab('teacher-portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Send className="w-3.5 h-3.5" />
          <span>Interaktiv ta'lim tizimi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ustozga topshiriq yuborish
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mx-auto">
          Bajargan vazifangizni quyidagi forma orqali yuboring. Topshiriq ustozga biriktiriladi, tizimga saqlanadi va SMS bildirishnoma mexanizmi ishga tushadi.
        </p>
      </div>

      {/* SUCCESS CARD VIEW */}
      {submittedResult ? (
        <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-6 sm:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Topshiriq muvaffaqiyatli qabul qilindi!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
              Topshiriq ma'lumotlar bazasiga muvaffaqiyatli saqlandi va ustoz nazoratiga yuborildi.
            </p>
          </div>

          {/* Key Identifiers */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                  Noyob identifikator (ID)
                </span>
                <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                  {submittedResult.assignment.id}
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                  Topshiriq holati
                </span>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                    {submittedResult.assignment.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Ustoz:</span>{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {submittedResult.assignment.teacherName}
                </strong>{' '}
                ({submittedResult.assignment.teacherPhone})
              </div>
              <div>
                <span className="text-slate-400 font-medium">Fan / Kurs:</span>{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {submittedResult.assignment.subject}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Mavzu:</span>{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {submittedResult.assignment.title}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Belgilangan muddat:</span>{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {submittedResult.assignment.deadline}
                </strong>
              </div>
            </div>
          </div>

          {/* SMS Notification Status (Per requirement) */}
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>SMS xabarnoma holati</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {submittedResult.sms?.statusDetail || submittedResult.assignment.smsStatusDetail}
            </p>
            <div className="text-[11px] text-slate-500 font-mono pt-1">
              SMS namunasi: "Assalomu alaykum! Sizga Lobeble ta’lim platformasi orqali yangi topshiriq yuborildi. Fan: {submittedResult.assignment.subject}. Mavzu: {submittedResult.assignment.title}. ID: {submittedResult.assignment.id}."
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Yana yangi topshiriq yuborish
            </button>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleGoToStudentPortal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>O'quvchi kabinetida ko'rish</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleGoToTeacherPortal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Ustoz kabinetida tekshirish</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* MAIN SUBMISSION FORM */
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-lg p-6 sm:p-10 space-y-8"
        >
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: O'quvchi ma'lumotlari */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
              <User className="w-4 h-4 text-blue-600" />
              <span>1. O'quvchi ma'lumotlari</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  1. O‘quvchining ism-familiyasi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sardor Rustamov"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  2. O‘quvchining telefon raqami *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={studentPhoneNumber}
                    onChange={(e) => setStudentPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Ustoz ma'lumotlari */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>2. Ustoz va fan ma'lumotlari</span>
            </h3>

            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
              <label className="block text-xs font-bold text-blue-900 dark:text-blue-300">
                Markaz ustozlaridan tanlang yoki qo'lda kiriting:
              </label>
              <select
                value={selectedTeacherId}
                onChange={(e) => handleTeacherChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullName} — {t.subject} ({t.phone})
                  </option>
                ))}
                <option value="custom">Boshqa ustoz (qo'lda kiritish)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  3. Ustozning ism-familiyasi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ustoz ismi"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  4. Ustozning telefon raqami *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 000 00 00"
                    value={teacherPhoneNumber}
                    onChange={(e) => setTeacherPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  5. Fan yoki kurs nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Frontend Dasturlash"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Topshiriq tafsilotlari */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>3. Topshiriq tafsilotlari</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  6. Topshiriq mavzusi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: React Props & State amaliy vazifasi"
                  value={assignmentTopic}
                  onChange={(e) => setAssignmentTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  8. Topshiriq muddati (Dedlayn) *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                7. Topshiriqning to‘liq matni / tushuntirish *
              </label>
              <textarea
                rows={5}
                required
                placeholder="Topshiriq sharti, nimalar qilingani, ustozdan qanday savol yoki yordam kutayotganingizni batafsil bayon qiling..."
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>

            {/* 9. Fayl biriktirish */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                9. Fayl biriktirish (PDF, DOCX, ZIP yoki rasm)
              </label>

              {attachment ? (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {attachment.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Hajmi: {attachment.size}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all">
                  <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Faylni tanlang yoki shu yerga tashlang
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    PDF, DOCX, JPG, PNG yoki ZIP (maksimal 10 MB)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.zip"
                    onChange={handleFileUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* SMS Notification Transparency Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <Smartphone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong>SMS xabarnoma mexanizmi:</strong> Ustozning telefon raqamiga yangi topshiriq kelgani haqida rasmiy SMS yuboriladi. SMS provayderi faol bo'lmagan holatda tizim haqqoniy holatni ko'rsatadi va topshiriq kabinetda to'liq saqlanadi.
            </div>
          </div>

          {/* 10. Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 hover:from-blue-700 hover:to-indigo-900 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Tekshirilmoqda va yuborilmoqda...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 text-amber-300" />
                  <span>10. Topshiriqni yuborish</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
