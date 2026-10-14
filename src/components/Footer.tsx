import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  MapPin,
  PhoneCall,
  Clock,
  Mail,
  Send,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, settings } = useApp();

  const handleNav = (tab: any) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Banner CTA */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-blue-600/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Kelajagingizni bilim bilan yarating!
            </h3>
            <p className="mt-2 text-blue-100 text-sm max-w-xl">
              Lobeble ta'lim markazida zamonaviy kasblar, nufuzli tillar va chuqurlashtirilgan fanlarni professional ustozlardan o'rganing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleNav('courses')}
              className="px-6 py-3 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-blue-700" />
              <span>Kurslarni tanlash</span>
            </button>
            <button
              onClick={() => handleNav('submit-assignment')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Ustozga topshiriq</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Zamonaviy bilimlar, tajribali ustozlar va qulay ta’lim muhiti — muvaffaqiyat sari birinchi qadamingiz.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                title="Instagram"
              >
                <span className="font-bold text-xs">IG</span>
              </a>
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                title="YouTube"
              >
                <span className="font-bold text-xs">YT</span>
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs">
              Sahifalar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  Biz haqimizda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('courses')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  Kurslar katalogi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('teachers')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  Bizning ustozlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('submit-assignment')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-semibold text-amber-300"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  Ustozga topshiriq yuborish
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs">
              Bog'lanish
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{settings.address}</p>
                  <p className="text-xs text-slate-400">{settings.addressDetail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <a href={`tel:${settings.phone1}`} className="hover:text-white transition-colors">
                    {settings.phone1}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs text-slate-300">{settings.workingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-xs hover:text-white">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Trust and Mo'ljal */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs">
              Mo'ljal va Kafolat
            </h4>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Asosiy mo'ljal:</span>
              </div>
              <p className="text-sm font-medium text-white">
                {settings.address}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aniq ko'cha va tuman ma'lumotlari admin panel orqali tasdiqlangan tarzda yangilanib boriladi.
              </p>
              <button
                onClick={() => handleNav('location')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 pt-1"
              >
                Xaritada ko'rish va yo'nalish olish &rarr;
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sertifikatlangan o'quv dasturi</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Lobeble Ta'lim Markazi. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('about')} className="hover:text-slate-300">
              Ta'lim qoidalari
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-300">
              Qayta aloqa
            </button>
            <button
              onClick={() => {
                setActiveTab('admin-portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-300 text-slate-600"
            >
              Admin kirish
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
