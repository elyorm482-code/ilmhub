import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_PATH = path.resolve(DATA_DIR, 'db.json');

// Helper to load or initialize DB
function getInitialDb() {
  return {
    courses: [
      {
        id: "crs-1",
        title: "Frontend Dasturlash: React & TypeScript",
        category: "Dasturlash",
        shortDesc: "Zamonaviy veb-saytlar va murakkab interfeyslar yaratishni noldan o'rganing.",
        description: "HTML5, CSS3, Tailwind, JavaScript ES6+, TypeScript, React.js va REST API lar bilan amaliy loyihalar.",
        duration: "6 oy",
        level: "Boshlang'ich",
        targetAudience: "Dasturlash sohasiga qiziquvchilar, yangi kasb egallamoqchi bo'lganlar.",
        lessonsCount: 72,
        pricePerMonth: "850,000 so'm",
        syllabus: [
          "Veb-texnologiyalar asoslari (HTML & CSS)",
          "Tailwind CSS va zamonaviy responsive dizayn",
          "JavaScript (ES6+, DOM, LocalStorage)",
          "TypeScript bilan xavfsiz dasturlash",
          "React.js arxitekturasi va Hooklar",
          "Global State va API integratsiyasi",
          "Loyihani serverga deploy qilish"
        ],
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        teacherId: "tch-1",
        teacherName: "Sardorbek Rahimberdiyev",
        isPopular: true,
        createdAt: "2026-01-10T10:00:00.000Z"
      },
      {
        id: "crs-2",
        title: "Python & Backend: Django va FastAPI",
        category: "Dasturlash",
        shortDesc: "Kuchli backend tizimlari, API lar va ma'lumotlar bazalarini boshqarish.",
        description: "Server mantiqi, PostgreSQL ma'lumotlar bazasi, Django, FastAPI, xavfsizlik va Docker asoslari.",
        duration: "7 oy",
        level: "Boshlang'ich",
        targetAudience: "Mantiqiy fikrlashga qiziquvchi, server va backend yo'nalishini tanlaganlar.",
        lessonsCount: 84,
        pricePerMonth: "900,000 so'm",
        syllabus: [
          "Python sintaksisi va chuqur algoritmlar",
          "OOP tamoyillari",
          "PostgreSQL va murakkab SQL so'rovlar",
          "Django Framework va Admin panel",
          "FastAPI va Microservice asoslari",
          "JWT autentifikatsiya",
          "Docker konteynerlash"
        ],
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        teacherId: "tch-3",
        teacherName: "Bobur Jalolov",
        isPopular: true,
        createdAt: "2026-01-12T10:00:00.000Z"
      },
      {
        id: "crs-3",
        title: "Kompyuter Savodxonligi & IT Foundation",
        category: "Kompyuter savodxonligi",
        shortDesc: "Kompyuterni erkin boshqarish, tezkor klaviatura va ofis dasturlarida professional ishlash.",
        description: "Windows tizimi, Microsoft Office (Word, Excel, PowerPoint), Google Docs va internet xavfsizligi.",
        duration: "2 oy",
        level: "Boshlang'ich",
        targetAudience: "Noldan kompyuter o'rganuvchilar, ofis xodimlari va maktab o'quvchilari.",
        lessonsCount: 24,
        pricePerMonth: "550,000 so'm",
        syllabus: [
          "Operatsion tizim va fayl tizimi",
          "Tezkor yozish (Blind typing)",
          "Microsoft Word: Hujjatlar rasmiylashtirish",
          "Microsoft Excel: Formulalar va hisobotlar",
          "PowerPoint: Taqdimotlar tayyorlash",
          "Google Workspace vositalari",
          "Kiberxavfsizlik gigiyenasi"
        ],
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        teacherId: "tch-5",
        teacherName: "Jasurbek Bekmurodov",
        isPopular: false,
        createdAt: "2026-01-15T10:00:00.000Z"
      },
      {
        id: "crs-4",
        title: "IELTS Intensive & Akademik Ingliz Tili",
        category: "Ingliz tili",
        shortDesc: "Xalqaro sertifikat olish uchun Listening, Reading, Writing va Speaking bo'yicha tayyorgarlik.",
        description: "IELTS 7.0+ natijasiga erishish uchun uslubiyot. Haftalik to'liq Mock imtihonlari va ustoz tahlili.",
        duration: "4 oy",
        level: "O'rta",
        targetAudience: "Xorijda yoki nufuzli oliygohlarda o'qishni rejalashtirayotgan talabalar.",
        lessonsCount: 48,
        pricePerMonth: "750,000 so'm",
        syllabus: [
          "IELTS Listening strategiyalari",
          "IELTS Reading: Skimming & Scanning",
          "IELTS Writing Task 1 & 2 tahlili",
          "Speaking ravonligi va talaffuz",
          "Lug'at boyligini oshirish (Academic Lexicon)",
          "Haftalik Mock imtihonlari"
        ],
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
        teacherId: "tch-2",
        teacherName: "Madina Usmonova",
        isPopular: true,
        createdAt: "2026-01-20T10:00:00.000Z"
      },
      {
        id: "crs-5",
        title: "Prezident Maktabi & Mantiqiy Matematika",
        category: "Matematika",
        shortDesc: "Mantiqiy fikrlash, nostandart masalalarni tez yechish va olimpiada darajasi.",
        description: "Prezident va ixtisoslashtirilgan maktablarga tayyorlovchi maxsus dastur.",
        duration: "6 oy",
        level: "Mukammal",
        targetAudience: "4-9 sinf o'quvchilari va olimpiadachilar.",
        lessonsCount: 72,
        pricePerMonth: "650,000 so'm",
        syllabus: [
          "Tezkor arifmetika va sonlar xossalari",
          "Mantiqiy topshiriqlar va topishmoqlar",
          "Kombinatorika asoslari",
          "Planometriya va fazoviy geometriya",
          "Tenglamalar va matnli masalalar",
          "Sinov testlari simulyatsiyasi"
        ],
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
        teacherId: "tch-4",
        teacherName: "Nilufar Qosimova",
        isPopular: false,
        createdAt: "2026-02-01T10:00:00.000Z"
      },
      {
        id: "crs-6",
        title: "Sun’iy Intellekt va Prompt Engineering",
        category: "Sun’iy intellekt",
        shortDesc: "AI vositalari (ChatGPT, Midjourney, Claude) yordamida ishingizni 10 barobar tezlashtiring.",
        description: "Sun'iy intellektning amaliy qo'llanilishi, prompt muhandisligi va biznes jarayonlarini avtomatlashtirish.",
        duration: "3 oy",
        level: "Barcha darajalar",
        targetAudience: "Dasturchilar, marketologlar va zamonaviy AI foydalanuvchilari.",
        lessonsCount: 36,
        pricePerMonth: "800,000 so'm",
        syllabus: [
          "Katta Til Modellari (LLM) tamoyili",
          "Prompt Engineering strategiyalari",
          "AI yordamida kod tahlili",
          "Grafik generatsiya vositalari",
          "Avtomatlashtirish usullari",
          "Shaxsiy AI botlarni yaratish"
        ],
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        teacherId: "tch-3",
        teacherName: "Bobur Jalolov",
        isPopular: true,
        createdAt: "2026-02-10T10:00:00.000Z"
      }
    ],
    teachers: [
      {
        id: "tch-1",
        fullName: "Sardorbek Rahimberdiyev",
        subject: "Frontend & Web Dasturlash",
        experience: "6+ yil",
        specialty: "React, TypeScript, Next.js va zamonaviy veb-arxitektura",
        phone: "+998 90 123 45 67",
        email: "sardor@lobeble.uz",
        bio: "Ko'plab xalqaro loyihalar tajribasiga ega yetakchi dasturchi. 300+ o'quvchiga mentorlik qilgan.",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        rating: 4.95,
        studentsCount: 280,
        coursesCount: 3,
        isAvailableForAssignments: true
      },
      {
        id: "tch-2",
        fullName: "Madina Usmonova",
        subject: "Ingliz tili (IELTS Intensive)",
        experience: "7+ yil",
        specialty: "IELTS 8.5 sohibi, Akademik yozish va nutq sirlari",
        phone: "+998 91 234 56 78",
        email: "madina@lobeble.uz",
        bio: "CELTA sertifikatiga ega xalqaro instruktor. O'quvchilarining o'rtacha IELTS natijasi 7.5.",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        rating: 4.98,
        studentsCount: 410,
        coursesCount: 2,
        isAvailableForAssignments: true
      },
      {
        id: "tch-3",
        fullName: "Bobur Jalolov",
        subject: "Python, AI & Backend",
        experience: "5+ yil",
        specialty: "Python, Django, FastAPI, Machine Learning asoslari",
        phone: "+998 93 345 67 89",
        email: "bobur@lobeble.uz",
        bio: "Sun'iy intellekt modellarini amaliyotga joriy etish bo'yicha ekspert va backend arxitektor.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        studentsCount: 240,
        coursesCount: 2,
        isAvailableForAssignments: true
      },
      {
        id: "tch-4",
        fullName: "Nilufar Qosimova",
        subject: "Matematika & Mantiqiy fikrlash",
        experience: "8+ yil",
        specialty: "Prezident maktabi, Al-Xorazmiy va olimpiadalarga tayyorlov",
        phone: "+998 97 456 78 90",
        email: "nilufar@lobeble.uz",
        bio: "O'zbekiston Xalq ta'limi a'lochisi. Murakkab mavzularni sodda tilda tushuntiruvchi pedagog.",
        avatarUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
        rating: 4.97,
        studentsCount: 350,
        coursesCount: 2,
        isAvailableForAssignments: true
      },
      {
        id: "tch-5",
        fullName: "Jasurbek Bekmurodov",
        subject: "Kompyuter savodxonligi & IT Foundation",
        experience: "4+ yil",
        specialty: "Windows, Linux, MS Office, Tarmoqlar va Kibergigiyena",
        phone: "+998 99 567 89 01",
        email: "jasur@lobeble.uz",
        bio: "Noldan boshlovchilarga texnologiya olamini ochib beruvchi sabrli ustoz.",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        rating: 4.88,
        studentsCount: 190,
        coursesCount: 2,
        isAvailableForAssignments: true
      }
    ],
    assignments: [
      {
        id: "TSK-8492",
        studentName: "Javohir Toshpo'latov",
        studentPhone: "+998 90 987 65 43",
        teacherId: "tch-1",
        teacherName: "Sardorbek Rahimberdiyev",
        teacherPhone: "+998 90 123 45 67",
        subject: "Frontend & Web Dasturlash",
        title: "React Hook Form va Zod validatsiyasi loyihasi",
        description: "Hurmatli ustoz, darsda o'tilgan forma validatsiyasi va xatoliklarni chiqarish topshirig'ini bajardim. Kodda TypeScript interfeyslari to'liq kiritilgan.",
        deadline: "2026-10-18",
        attachmentName: "react_form_validation.zip",
        attachmentSize: "2.4 MB",
        status: "Ko‘rib chiqilmoqda",
        statusComment: "Topshiriq ko'rib chiqilmoqda. Bugun kechgacha fikr bildiriladi.",
        smsSent: false,
        smsStatusDetail: "SMS xizmati ulanishi kerak (soxta SMS ko'rsatilmaydi)",
        createdAt: "2026-10-12T14:30:00.000Z",
        updatedAt: "2026-10-13T09:15:00.000Z",
        messages: [
          {
            id: "msg-1",
            senderRole: "student",
            senderName: "Javohir Toshpo'latov",
            message: "Ustoz, input mask qismida kichik savolim bor edi, tekshirib bera olasizmi?",
            createdAt: "2026-10-12T14:35:00.000Z"
          },
          {
            id: "msg-2",
            senderRole: "teacher",
            senderName: "Sardorbek Rahimberdiyev",
            message: "Assalomu alaykum Javohir. Kodni ko'rdim, regex qoidangiz to'g'ri, submit qilingan holatni ham tekshirib chiqaman.",
            createdAt: "2026-10-13T09:15:00.000Z"
          }
        ]
      },
      {
        id: "TSK-8493",
        studentName: "Dildora Karimova",
        studentPhone: "+998 93 456 78 90",
        teacherId: "tch-2",
        teacherName: "Madina Usmonova",
        teacherPhone: "+998 91 234 56 78",
        subject: "Ingliz tili (IELTS Intensive)",
        title: "IELTS Writing Task 2: Education & Technology Essay",
        description: "Mavzu: 'Some people think technology has made learning easier, while others argue it distracts students.' 285 so'zlik insho yozildi.",
        deadline: "2026-10-16",
        attachmentName: "ielts_essay_task2_dildora.docx",
        attachmentSize: "450 KB",
        status: "Bajarildi",
        statusComment: "Ajoyib natija! Baho: Band 7.5. Leksik boylik yuqori darajada.",
        smsSent: false,
        smsStatusDetail: "SMS xizmati ulanishi kerak (soxta SMS ko'rsatilmaydi)",
        createdAt: "2026-10-11T16:00:00.000Z",
        updatedAt: "2026-10-12T18:20:00.000Z",
        messages: [
          {
            id: "msg-3",
            senderRole: "teacher",
            senderName: "Madina Usmonova",
            message: "Paragraf 2 dagi bog'lovchi so'zlar juda mos tanlangan. Keyingi safar xulosani yana 1 ta taklif bilan mustahkamlang.",
            createdAt: "2026-10-12T18:20:00.000Z"
          }
        ]
      },
      {
        id: "TSK-8494",
        studentName: "Akbar Xolmatov",
        studentPhone: "+998 94 777 88 99",
        teacherId: "tch-3",
        teacherName: "Bobur Jalolov",
        teacherPhone: "+998 93 345 67 89",
        subject: "Python, AI & Backend",
        title: "Bank hisobi algoritmi va tranzaksiyalar",
        description: "OOP yordamida BankAccount va SavingsAccount klasslari tuzildi. Depozit va yechish operatsiyalarida istisno (exception) lar tekshirildi.",
        deadline: "2026-10-20",
        attachmentName: "bank_oop_solution.py",
        attachmentSize: "18 KB",
        status: "Yangi",
        statusComment: "Yangi topshirildi, navbatda kutmoqda.",
        smsSent: false,
        smsStatusDetail: "SMS xizmati ulanishi kerak (soxta SMS ko'rsatilmaydi)",
        createdAt: "2026-10-13T18:40:00.000Z",
        updatedAt: "2026-10-13T18:40:00.000Z",
        messages: []
      }
    ],
    smsLogs: [
      {
        id: "SMS-101",
        assignmentId: "TSK-8494",
        recipientName: "Bobur Jalolov",
        recipientPhone: "+998 93 345 67 89",
        messageText: "Assalomu alaykum! Sizga Lobeble ta’lim platformasi orqali yangi topshiriq yuborildi. Fan: Python, AI & Backend. Mavzu: Bank hisobi algoritmi. Lobeble kabinetida ko'ring.",
        provider: "Twilio / Eskiz (unconfigured)",
        status: "unconfigured",
        statusDetail: "SMS xabarnoma yuborish uchun SMS xizmati ulanishi kerak (soxta SMS ko'rsatilmaydi)",
        sentAt: "2026-10-13T18:40:05.000Z"
      }
    ],
    contactMessages: [
      {
        id: "CNT-1",
        name: "Alisher Normatov",
        phone: "+998 90 111 22 33",
        subject: "Kechki guruhlar bormi?",
        message: "Assalomu alaykum, men ishdan keyin (19:00 dan so'ng) Frontend kursiga qatnashmoqchiman. Shu vaqtda guruhlar mavjudmi?",
        status: "new",
        createdAt: "2026-10-13T17:10:00.000Z"
      }
    ],
    enrollments: [
      {
        id: "ENR-1",
        courseId: "crs-1",
        courseTitle: "Frontend Dasturlash: React & TypeScript",
        studentName: "Dilshod Olimov",
        studentPhone: "+998 90 555 44 33",
        notes: "Darslar boshlanish sanasi haqida xabar bering",
        status: "kutilmoqda",
        createdAt: "2026-10-13T16:00:00.000Z"
      }
    ],
    settings: {
      name: "Lobeble",
      slogan: "Kelajagingizni bilim bilan yarating!",
      subtitle: "Zamonaviy bilimlar, tajribali ustozlar va qulay ta’lim muhiti — muvaffaqiyat sari birinchi qadamingiz.",
      address: "Zam-Zam binosining to‘g‘risida",
      addressLandmark: "Zam-Zam binosi ro'parasi",
      addressDetail: "Toshkent shahri (Aniq ko'cha va tuman nomi admin orqali kiritiladi)",
      phone1: "+998 71 200 45 45",
      phone2: "+998 90 123 45 67",
      email: "info@lobeble.uz",
      workingHours: "Dushanba - Shanba: 08:30 - 20:30 (Yakshanba dam olish kuni)",
      telegramUrl: "https://t.me/lobeble_edu",
      instagramUrl: "https://instagram.com/lobeble_uz",
      youtubeUrl: "https://youtube.com/@lobeble",
      googleMapsQuery: "Zam-Zam binosi, Tashkent",
      smsProviderConfigured: false,
      smsProviderName: "Twilio / Eskiz.uz"
    }
  };
}

function readDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      const initial = getInitialDb();
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db:', err);
    return getInitialDb();
  }
}

function writeDb(data: any) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db:', err);
  }
}

// Real SMS Dispatcher
async function sendSmsNotification({
  recipientPhone,
  recipientName,
  assignmentId,
  subject,
  assignmentTitle,
}: {
  recipientPhone: string;
  recipientName: string;
  assignmentId: string;
  subject: string;
  assignmentTitle: string;
}): Promise<{
  sent: boolean;
  status: 'unconfigured' | 'sent' | 'failed';
  statusDetail: string;
  provider: string;
  smsText: string;
}> {
  const smsText = `Assalomu alaykum! Sizga Lobeble ta’lim platformasi orqali yangi topshiriq yuborildi. Fan: ${subject}. Mavzu: ${assignmentTitle}. ID: ${assignmentId}. Batafsil ma’lumotni platformadagi ustoz kabinetidan ko‘ring.`;

  const smsProvider = (process.env.SMS_PROVIDER || '').toLowerCase();
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  const eskizEmail = process.env.ESKIZ_EMAIL;
  const eskizPassword = process.env.ESKIZ_PASSWORD;

  // Check if Twilio is configured
  if (smsProvider === 'twilio' && twilioSid && twilioToken && twilioPhone) {
    try {
      const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
        {
          method: 'POST',
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: recipientPhone.replace(/\s+/g, ''),
            From: twilioPhone,
            Body: smsText,
          }).toString(),
        }
      );

      if (response.ok) {
        return {
          sent: true,
          status: 'sent',
          statusDetail: 'SMS muvaffaqiyatli yetkazildi (Twilio)',
          provider: 'Twilio',
          smsText,
        };
      } else {
        const errorText = await response.text();
        return {
          sent: false,
          status: 'failed',
          statusDetail: `Twilio xatosi: ${errorText.substring(0, 100)}`,
          provider: 'Twilio',
          smsText,
        };
      }
    } catch (err: any) {
      return {
        sent: false,
        status: 'failed',
        statusDetail: `SMS tarmoq xatosi: ${err.message}`,
        provider: 'Twilio',
        smsText,
      };
    }
  }

  // Check if Eskiz (Uzbekistan SMS gateway) is configured
  if (smsProvider === 'eskiz' && eskizEmail && eskizPassword) {
    try {
      const loginRes = await fetch('https://notify.eskiz.uz/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: eskizEmail, password: eskizPassword }),
      });
      const loginData = await loginRes.json() as any;
      const token = loginData?.data?.token;

      if (!token) {
        return {
          sent: false,
          status: 'failed',
          statusDetail: 'Eskiz SMS autentifikatsiya xatosi',
          provider: 'Eskiz.uz',
          smsText,
        };
      }

      const cleanPhone = recipientPhone.replace(/[^0-9]/g, '');
      const sendRes = await fetch('https://notify.eskiz.uz/api/message/sms/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile_phone: cleanPhone,
          message: smsText,
          from: '4546',
        }),
      });

      if (sendRes.ok) {
        return {
          sent: true,
          status: 'sent',
          statusDetail: 'SMS muvaffaqiyatli yetkazildi (Eskiz.uz)',
          provider: 'Eskiz.uz',
          smsText,
        };
      } else {
        const errBody = await sendRes.text();
        return {
          sent: false,
          status: 'failed',
          statusDetail: `Eskiz SMS xatosi: ${errBody.substring(0, 100)}`,
          provider: 'Eskiz.uz',
          smsText,
        };
      }
    } catch (err: any) {
      return {
        sent: false,
        status: 'failed',
        statusDetail: `Eskiz SMS tarmoq xatosi: ${err.message}`,
        provider: 'Eskiz.uz',
        smsText,
      };
    }
  }

  // Not configured: per prompt requirements:
  // "Agar SMS provayderi hali ulanmagan bo‘lsa, soxta SMS yuborildi deb ko‘rsatma. Topshiriq bazaga saqlansin va 'SMS xabarnoma yuborish uchun SMS xizmati ulanishi kerak' degan tushunarli holat ko‘rsatilsin."
  return {
    sent: false,
    status: 'unconfigured',
    statusDetail: 'SMS xabarnoma yuborish uchun SMS xizmati ulanishi kerak (soxta SMS ko‘rsatilmaydi)',
    provider: smsProvider || 'SMS xizmati (Ulanmagan)',
    smsText,
  };
}

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // API Routes

  // Health
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
      smsConfigured: Boolean(
        (process.env.SMS_PROVIDER === 'twilio' && process.env.TWILIO_ACCOUNT_SID) ||
        (process.env.SMS_PROVIDER === 'eskiz' && process.env.ESKIZ_EMAIL)
      ),
    });
  });

  // Settings
  app.get('/api/settings', (_req: Request, res: Response) => {
    const db = readDb();
    const smsConfigured = Boolean(
      (process.env.SMS_PROVIDER === 'twilio' && process.env.TWILIO_ACCOUNT_SID) ||
      (process.env.SMS_PROVIDER === 'eskiz' && process.env.ESKIZ_EMAIL)
    );
    res.json({
      ...db.settings,
      smsProviderConfigured: smsConfigured,
      smsProviderName: process.env.SMS_PROVIDER || 'Ulanmagan (Twilio / Eskiz.uz)',
    });
  });

  app.put('/api/settings', (req: Request, res: Response) => {
    const db = readDb();
    db.settings = { ...db.settings, ...req.body };
    writeDb(db);
    res.json({ success: true, settings: db.settings });
  });

  // Courses
  app.get('/api/courses', (_req: Request, res: Response) => {
    const db = readDb();
    res.json(db.courses || []);
  });

  app.post('/api/courses', (req: Request, res: Response) => {
    const db = readDb();
    const newCourse = {
      id: `crs-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    db.courses = [newCourse, ...(db.courses || [])];
    writeDb(db);
    res.status(201).json(newCourse);
  });

  app.put('/api/courses/:id', (req: Request, res: Response) => {
    const db = readDb();
    const index = db.courses.findIndex((c: any) => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Kurs topilmadi' });
    }
    db.courses[index] = { ...db.courses[index], ...req.body };
    writeDb(db);
    res.json(db.courses[index]);
  });

  app.delete('/api/courses/:id', (req: Request, res: Response) => {
    const db = readDb();
    db.courses = db.courses.filter((c: any) => c.id !== req.params.id);
    writeDb(db);
    res.json({ success: true, message: "Kurs o'chirildi" });
  });

  // Teachers
  app.get('/api/teachers', (_req: Request, res: Response) => {
    const db = readDb();
    res.json(db.teachers || []);
  });

  app.post('/api/teachers', (req: Request, res: Response) => {
    const db = readDb();
    const newTeacher = {
      id: `tch-${Date.now()}`,
      rating: 5.0,
      studentsCount: 0,
      coursesCount: 1,
      isAvailableForAssignments: true,
      ...req.body,
    };
    db.teachers = [newTeacher, ...(db.teachers || [])];
    writeDb(db);
    res.status(201).json(newTeacher);
  });

  app.put('/api/teachers/:id', (req: Request, res: Response) => {
    const db = readDb();
    const index = db.teachers.findIndex((t: any) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Ustoz topilmadi' });
    }
    db.teachers[index] = { ...db.teachers[index], ...req.body };
    writeDb(db);
    res.json(db.teachers[index]);
  });

  app.delete('/api/teachers/:id', (req: Request, res: Response) => {
    const db = readDb();
    db.teachers = db.teachers.filter((t: any) => t.id !== req.params.id);
    writeDb(db);
    res.json({ success: true, message: "Ustoz o'chirildi" });
  });

  // Assignments
  app.get('/api/assignments', (req: Request, res: Response) => {
    const db = readDb();
    let results = db.assignments || [];

    const { teacherId, teacherPhone, studentPhone, status } = req.query;

    if (teacherId) {
      results = results.filter((a: any) => a.teacherId === teacherId);
    }
    if (teacherPhone) {
      const clean = String(teacherPhone).replace(/\s+/g, '');
      results = results.filter((a: any) => a.teacherPhone.replace(/\s+/g, '') === clean);
    }
    if (studentPhone) {
      const clean = String(studentPhone).replace(/\s+/g, '');
      results = results.filter((a: any) => a.studentPhone.replace(/\s+/g, '') === clean);
    }
    if (status) {
      results = results.filter((a: any) => a.status === status);
    }

    res.json(results);
  });

  app.get('/api/assignments/:id', (req: Request, res: Response) => {
    const db = readDb();
    const assignment = db.assignments.find((a: any) => a.id === req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Topshiriq topilmadi' });
    }
    res.json(assignment);
  });

  // Assignment submission (with validation, unique ID, SMS dispatch, anti-spam)
  app.post('/api/assignments', async (req: Request, res: Response) => {
    const {
      studentName,
      studentPhone,
      teacherId,
      teacherName,
      teacherPhone,
      subject,
      title,
      description,
      deadline,
      attachmentName,
      attachmentSize,
      attachmentData,
    } = req.body;

    // Strict validation
    if (!studentName?.trim() || !studentPhone?.trim()) {
      return res.status(400).json({ error: "O'quvchi ismi va telefon raqami kiritilishi shart." });
    }
    if (!teacherName?.trim() || !teacherPhone?.trim()) {
      return res.status(400).json({ error: "Ustoz ismi va telefon raqami kiritilishi shart." });
    }
    if (!subject?.trim() || !title?.trim() || !description?.trim()) {
      return res.status(400).json({ error: "Fan, mavzu va topshiriq matni kiritilishi shart." });
    }

    // Phone validation
    const phoneRegex = /^(\+?998)?[0-9\s\-()]{9,15}$/;
    if (!phoneRegex.test(studentPhone.trim()) || !phoneRegex.test(teacherPhone.trim())) {
      return res.status(400).json({ error: "Telefon raqami formati noto'g'ri. Masalan: +998 90 123 45 67" });
    }

    const db = readDb();

    // Anti-spam check: prevent duplicate submissions within 1 minute with same title & phone
    const oneMinuteAgo = Date.now() - 60 * 1000;
    const isSpam = db.assignments.some(
      (a: any) =>
        a.studentPhone.replace(/\s+/g, '') === studentPhone.replace(/\s+/g, '') &&
        a.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        new Date(a.createdAt).getTime() > oneMinuteAgo
    );

    if (isSpam) {
      return res.status(429).json({
        error: "Siz bu topshiriqni hozirgina yubordingiz. Iltimos, birozdan so'ng qayta urinib ko'ring.",
      });
    }

    // Generate unique human-readable ID
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const assignmentId = `TSK-${randomCode}`;

    // Handle SMS
    const smsResult = await sendSmsNotification({
      recipientPhone: teacherPhone,
      recipientName: teacherName,
      assignmentId,
      subject,
      assignmentTitle: title,
    });

    const newAssignment = {
      id: assignmentId,
      studentName: studentName.trim(),
      studentPhone: studentPhone.trim(),
      teacherId: teacherId || `tch-custom`,
      teacherName: teacherName.trim(),
      teacherPhone: teacherPhone.trim(),
      subject: subject.trim(),
      title: title.trim(),
      description: description.trim(),
      deadline: deadline || new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      attachmentName: attachmentName || null,
      attachmentSize: attachmentSize || null,
      attachmentData: attachmentData || null,
      status: 'Yangi',
      statusComment: 'Topshiriq qabul qilindi va navbatga qo\'yildi.',
      smsSent: smsResult.sent,
      smsStatusDetail: smsResult.statusDetail,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };

    db.assignments = [newAssignment, ...(db.assignments || [])];

    // Log SMS action
    const smsLogEntry = {
      id: `SMS-${Date.now()}`,
      assignmentId,
      recipientName: teacherName,
      recipientPhone: teacherPhone,
      messageText: smsResult.smsText,
      provider: smsResult.provider,
      status: smsResult.status,
      statusDetail: smsResult.statusDetail,
      sentAt: new Date().toISOString(),
    };
    db.smsLogs = [smsLogEntry, ...(db.smsLogs || [])];

    writeDb(db);

    res.status(201).json({
      success: true,
      assignment: newAssignment,
      sms: smsResult,
      message: "Topshiriq muvaffaqiyatli qabul qilindi!",
    });
  });

  // Update status (teacher/admin)
  app.patch('/api/assignments/:id/status', (req: Request, res: Response) => {
    const { status, statusComment } = req.body;
    const allowed = ['Yangi', 'Ko‘rib chiqilmoqda', 'Bajarilmoqda', 'Bajarildi', 'Qayta ishlash kerak'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Noto'g'ri topshiriq holati" });
    }

    const db = readDb();
    const index = db.assignments.findIndex((a: any) => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Topshiriq topilmadi' });
    }

    db.assignments[index].status = status;
    if (statusComment) {
      db.assignments[index].statusComment = statusComment;
    }
    db.assignments[index].updatedAt = new Date().toISOString();
    writeDb(db);

    res.json({ success: true, assignment: db.assignments[index] });
  });

  // Add message to assignment thread
  app.post('/api/assignments/:id/messages', (req: Request, res: Response) => {
    const { senderRole, senderName, message, attachmentName, attachmentUrl } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: 'Xabar matni bo\'sh bo\'lishi mumkin emas' });
    }

    const db = readDb();
    const assignment = db.assignments.find((a: any) => a.id === req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Topshiriq topilmadi' });
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderRole: senderRole || 'student',
      senderName: senderName || 'Foydalanuvchi',
      message: message.trim(),
      attachmentName,
      attachmentUrl,
      createdAt: new Date().toISOString(),
    };

    assignment.messages = [...(assignment.messages || []), newMsg];
    assignment.updatedAt = new Date().toISOString();
    writeDb(db);

    res.status(201).json(newMsg);
  });

  // SMS logs
  app.get('/api/sms-logs', (_req: Request, res: Response) => {
    const db = readDb();
    res.json(db.smsLogs || []);
  });

  // Enrollments
  app.get('/api/enrollments', (_req: Request, res: Response) => {
    const db = readDb();
    res.json(db.enrollments || []);
  });

  app.post('/api/enrollments', (req: Request, res: Response) => {
    const { courseId, courseTitle, studentName, studentPhone, notes } = req.body;
    if (!studentName?.trim() || !studentPhone?.trim()) {
      return res.status(400).json({ error: "Ism va telefon raqami kiritilishi shart." });
    }

    const db = readDb();
    const enrollment = {
      id: `ENR-${Date.now()}`,
      courseId: courseId || 'general',
      courseTitle: courseTitle || 'Umumiy kurs',
      studentName: studentName.trim(),
      studentPhone: studentPhone.trim(),
      notes: notes || '',
      status: 'kutilmoqda',
      createdAt: new Date().toISOString(),
    };

    db.enrollments = [enrollment, ...(db.enrollments || [])];
    writeDb(db);

    res.status(201).json({ success: true, enrollment });
  });

  // Contact messages
  app.get('/api/contact', (_req: Request, res: Response) => {
    const db = readDb();
    res.json(db.contactMessages || []);
  });

  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, phone, subject, message } = req.body;
    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Barcha majburiy maydonlarni to'ldiring." });
    }

    const db = readDb();
    const newMsg = {
      id: `CNT-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      subject: (subject || "Umumiy savol").trim(),
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    db.contactMessages = [newMsg, ...(db.contactMessages || [])];
    writeDb(db);

    res.status(201).json({ success: true, message: newMsg });
  });

  app.patch('/api/contact/:id/status', (req: Request, res: Response) => {
    const { status } = req.body;
    const db = readDb();
    const index = db.contactMessages.findIndex((m: any) => m.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Xabar topilmadi' });
    }
    db.contactMessages[index].status = status;
    writeDb(db);
    res.json(db.contactMessages[index]);
  });

  // Dev server or Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lobeble server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
