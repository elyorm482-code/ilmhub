import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Target,
  Compass,
  Sparkles,
  BookCheck,
  CheckCircle2,
  Users2,
  Cpu,
  Laptop,
  GraduationCap,
  Award,
  ArrowRight,
  Shield,
  HelpCircle,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleNav = (tab: any) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const advantages = [
    {
      title: 'Amaliyotga 100% asoslangan dastur',
      desc: 'Quruq nazariyadan xoli, real bozor talabidagi loyihalar va amaliy vazifalar orqali o\'rganish.',
      icon: Laptop,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30',
    },
    {
      title: 'Tajribali va amaliyotchi ustozlar',
      desc: 'O\'z sohasida kamida 4-8 yillik real tajribaga ega bo\'lgan, sertifikatlangan kuchli mutaxassislar jamoasi.',
      icon: Users2,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
    },
    {
      title: 'Interaktiv topshiriqlar va SMS tizimi',
      desc: 'O\'quvchi bajargan vazifasini tizim orqali yuklaydi, ustoz xabardor qilinadi va tezkor fikr-mulohaza olinadi.',
      icon: Cpu,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30',
    },
    {
      title: 'Individual yondashuv va kichik guruhlar',
      desc: 'Har bir guruhda o\'quvchilar soni cheklangan bo\'lib, ustoz har bir o\'quvchining o\'zlashtirishini alohida nazorat qiladi.',
      icon: Target,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
    },
    {
      title: 'Zamonaviy jihozlangan sinfxonalar',
      desc: 'Yuqori tezlikdagi internet, qulay kovorking maydoni va shinam ta\'lim muhiti.',
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30',
    },
    {
      title: 'Rasmiy sertifikat va karyera ko\'magi',
      desc: 'Kursni muvaffaqiyatli tugatgan iqtidorli o\'quvchilarga xalqaro standartdagi sertifikat va tavsiyanoma taqdim etiladi.',
      icon: Award,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/30',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <BookCheck className="w-3.5 h-3.5" />
          <span>Lobeble Ta'lim Markazi haqida</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bilim — muvaffaqiyat va yorug' kelajak poydevoridir
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Biz zamonaviy texnologiyalar, aniq fanlar va xorijiy tillarni o'qitishda xalqaro standartlarga asoslangan, halol va shaffof ta'lim muhitini taqdim etamiz.
        </p>
      </div>

      {/* Maqsad va Vazifalar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Bizning maqsadimiz
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Yoshlarga mehnat bozorida eng yuqori talabga ega bo'lgan zamonaviy kasblar, dasturlash ko'nikmalari, mantiqiy matematika va xalqaro tillarni professional darajada o'rgatish orqali ularning mustaqil, raqobatbardosh va yuqori daromadli mutaxassis bo'lib yetishishlariga ko'maklashish.
          </p>
          <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Har bir o'quvchining ichki salohiyatini kashf qilish</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Nazariya va amaliyot mutanosibligini ta'minlash</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Xalqaro sertifikatsiyaga sifatli tayyorlash</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Bizning vazifalarimiz
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Har bir o'quvchiga qulay, xavfsiz va motivatsiyaga to'la ta'lim muhitini taqdim etish. O'qituvchilar va o'quvchilar o'rtasida to'siqsiz, doimiy muloqot va topshiriqlar nazorat tizimini yo'lga qo'yish.
          </p>
          <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Topshiriqlarni tezkor tekshirish va xatolarni bartaraf etish</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>O'quvchilar ota-onalari va o'qituvchilar o'rtasida shaffoflik</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Doimiy yangilanib boruvchi zamonaviy o'quv rejalari</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Ta'lim Uslubi & O'quvchilarga yaratilgan imkoniyatlar */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <GraduationCap className="w-4 h-4" />
              <span>Ta'lim uslubimiz</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Interaktiv va o'zlashtirishga yo'naltirilgan metodika
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Bizda darslar shunchaki ma'ruza emas, balki real muhokamalar, dasturiy kod yozish, guruhli loyihalar va vazifalarni mustaqil himoya qilish tarzida o'tadi. O'quvchi har bir darsda yangi amaliy natijaga ega bo'ladi.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <div className="font-bold text-amber-300 mb-1">Amaliyot ulushi</div>
                <div className="text-blue-100">80% amaliy darslar va kod yozish</div>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <div className="font-bold text-amber-300 mb-1">Doimiy nazorat</div>
                <div className="text-blue-100">Haftalik test va oraliq imtihonlar</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>O'quvchilarga imkoniyatlar</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Markazimizda yaratilgan qulay shart-sharoitlar
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              O'quvchilar darsdan tashqari vaqtlarda ham markazimiz kovorking hududida erkin shug'ullanishlari, bepul qahva/choy ichishlari va ustozlar bilan bevosita konsultatsiyalar o'tkazishlari mumkin.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <div className="font-bold text-amber-300 mb-1">Kovorking & Wi-Fi</div>
                <div className="text-blue-100">Darsdan tashqari erkin shug'ullanish</div>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <div className="font-bold text-amber-300 mb-1">Topshiriq kabineti</div>
                <div className="text-blue-100">24/7 topshiriq yuborish imkoni</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ustozlar tajribasi */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              Saralash mezonlari
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Ustozlarimizning tajribasi va professionalligi
            </h2>
          </div>
          <button
            onClick={() => handleNav('teachers')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all flex items-center gap-1.5 self-start cursor-pointer"
          >
            <span>Ustozlar bilan tanishish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Lobeble ta'lim markazida dars beruvchi har bir o'qituvchi 3 bosqichli sinovdan (nazariy bilim, amaliy loyiha himoyasi va ochiq pedagogik dars) o'tgan holda saralab olinadi. Bizning jamoamiz xalqaro darajadagi mutaxassislardan tashkil topgan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">4-8 yil+</div>
            <div className="text-xs text-slate-500 font-medium mt-1">O'rtacha amaliy tajriba</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <div className="text-2xl font-extrabold text-amber-500">100%</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Sertifikatlangan pedagoglar</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <div className="text-2xl font-extrabold text-emerald-500">Doimiy</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Mentorlik va aloqa</div>
          </div>
        </div>
      </div>

      {/* Markazning 6 ta asosiy afzalligi */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
            Nega aynan biz?
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Lobeble ta'lim markazining 6 ta asosiy afzalligi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shaffoflik va haqiqiylik eslatmasi */}
      <div className="p-6 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex items-start gap-4">
        <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white">Shaffoflik kafolati: </span>
          Lobeble platformasida faqatgina tasdiqlangan va tahrirlanadigan ma'lumotlar aks ettiriladi. Sayt matnlari va manzillar admin panel orqali rasmiy tartibda yangilanadi.
        </div>
      </div>
    </div>
  );
};
