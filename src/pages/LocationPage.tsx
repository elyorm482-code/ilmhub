import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  PhoneCall,
  Clock,
  Compass,
  ExternalLink,
  Navigation,
  Info,
  ShieldCheck,
  Building2,
  Car,
  Bus,
} from 'lucide-react';

export const LocationPage: React.FC = () => {
  const { settings, setActiveTab } = useApp();

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${settings.googleMapsQuery || 'Zam-Zam binosi Toshkent'}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleGetDirections = () => {
    const query = encodeURIComponent(`${settings.googleMapsQuery || 'Zam-Zam binosi Toshkent'}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>Bizning joylashuv</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Lobeble ta’lim markazi manzili
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Markazimizga qulay transport vositalari orqali yetib kelishingiz mumkin.
        </p>
      </div>

      {/* Main Details and Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Address Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 text-white flex items-center justify-center shadow-md">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
                  Lobeble ta’lim markazi
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  Asosiy o'quv binosi
                </p>
              </div>
            </div>

            {/* Address fields */}
            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Rasmiy manzil:</span>
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">
                  {settings.address}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <strong>Mo‘ljal:</strong> {settings.addressLandmark}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Ish vaqti:</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      {settings.workingHours}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <PhoneCall className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Aloqa raqamlari:</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      {settings.phone1} • {settings.phone2}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons (Mandatory requirements) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleOpenGoogleMaps}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <ExternalLink className="w-4 h-4 text-amber-300" />
                <span>Xaritada ko‘rish</span>
              </button>

              <button
                onClick={handleGetDirections}
                className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Yo‘nalish olish</span>
              </button>
            </div>
          </div>

          {/* Honest Transparency Notice per Requirement */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Ma'lumotlarning aniqligi haqida:</strong> Bu manzilning aniq ko‘cha nomi, tuman va koordinatalari tasdiqlangach, admin panel orqali to‘ldiriladi. Uydirma koordinatalar ko‘rsatilmaydi.
            </div>
          </div>
        </div>

        {/* Right Column: Visual Interactive Map Container */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 overflow-hidden shadow-xl">
            {/* Map Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Interaktiv xarita zonasi: {settings.address}</span>
              </div>
              <span className="text-[11px] text-blue-300 font-mono">
                Mo'ljal: Zam-Zam binosi
              </span>
            </div>

            {/* Custom Map View Container */}
            <div className="relative h-96 w-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
              {/* Map grid lines simulation */}
              <div
                className="absolute inset-0 opacity-20 dark:opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #3b82f6 1px, transparent 1px), radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Road lines simulation */}
              <svg className="absolute inset-0 w-full h-full stroke-slate-300 dark:stroke-slate-800" strokeWidth="12" fill="none">
                <path d="M-50 150 Q 200 120 500 200 T 1000 240" />
                <path d="M250 -50 L 320 450" />
                <path d="M480 30 L 420 450" strokeWidth="8" strokeDasharray="6 6" />
              </svg>

              {/* Landmark Pin Indicator */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-white font-extrabold text-xs shadow-2xl border-2 border-amber-400 flex items-center gap-1.5 whitespace-nowrap">
                  <MapPin className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Lobeble Ta'lim Markazi</span>
                </div>
                <div className="w-3 h-3 bg-slate-950 rotate-45 -mt-1.5 border-r-2 border-b-2 border-amber-400" />
                <div className="w-4 h-4 rounded-full bg-blue-600/40 ring-4 ring-blue-500/20 mt-1 animate-ping" />
              </div>

              {/* Opposite Landmark: Zam-Zam binosi */}
              <div className="absolute top-20 right-16 sm:right-28 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Zam-Zam binosi</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  (Mo'ljal: bino to'g'risida)
                </div>
              </div>

              {/* Map controls bottom overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-md">
                  Toshkent shahar markazi
                </div>

                <button
                  onClick={handleOpenGoogleMaps}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Xaritada to'liq ochish</span>
                </button>
              </div>
            </div>

            {/* Transportation tips */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-3">
                <Bus className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Jamoat transporti
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    Zam-Zam bekati orqali harakatlanuvchi avtobus va yo'nalishli taksilar.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Avtomobil uchun to'xtash joyi
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    O'quv markazimiz oldida bepul avtoturargoh mavjud.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
