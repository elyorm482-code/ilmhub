import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, submitContact } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || phone.length < 9 || !message.trim()) {
      setError("Iltimos, ismingiz, telefon raqamingiz va xabar matnini to'liq kiriting.");
      return;
    }

    setSubmitting(true);
    try {
      await submitContact({
        name: name.trim(),
        phone: phone.trim(),
        subject: subject.trim() || 'Umumiy murojaat',
        message: message.trim(),
      });
      setSuccess(true);
      setName('');
      setPhone('+998 ');
      setSubject('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Xabar yuborishda xatolik yuz berdi');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Biz bilan bog'lanish</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Savollaringiz bormi? Murojaat qiling!
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Kurslar, to'lovlar, o'quv dasturi yoki ustozlar bo'yicha har qanday savolingizga javob berishdan mamnunmiz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-700">
              Aloqa ma'lumotlari
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Manzil:</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {settings.address}
                  </div>
                  <div className="text-xs text-slate-500">{settings.addressDetail}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Telefon raqamlar:</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {settings.phone1}
                  </div>
                  <div className="text-xs text-slate-500">{settings.phone2}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Elektron pochta:</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {settings.email}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase">Ish tartibi:</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {settings.workingHours}
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                Ijtimoiy tarmoqlarimiz:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={settings.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-blue-600 hover:text-white text-xs font-semibold transition-colors"
                >
                  Telegram kanal
                </a>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-rose-600 hover:text-white text-xs font-semibold transition-colors"
                >
                  Instagram sahifa
                </a>
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-red-600 hover:text-white text-xs font-semibold transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 p-6 sm:p-10 space-y-5 shadow-lg"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
              Qayta aloqa formasi
            </h3>

            {success && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                <span>
                  Xabaringiz ma'lumotlar bazasiga muvaffaqiyatli saqlandi! Tez orada menejerimiz bog'lanadi.
                </span>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ismingiz *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Shohrux"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Mavzu
              </label>
              <input
                type="text"
                placeholder="Masalan: Kurs narxi va to'lov shartlari haqida"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Xabaringiz *
              </label>
              <textarea
                rows={5}
                required
                placeholder="Savolingiz yoki taklifingizni bu yerga yozing..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <span>Yuborilmoqda...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Xabarni yuborish</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
