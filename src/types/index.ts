export type CourseCategory =
  | 'Barchasi'
  | 'Dasturlash'
  | 'Kompyuter savodxonligi'
  | 'Ingliz tili'
  | 'Matematika'
  | 'Sun’iy intellekt'
  | 'Boshqa kurslar';

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  description: string;
  shortDesc: string;
  duration: string; // e.g. "6 oy"
  level: 'Boshlang\'ich' | 'O\'rta' | 'Mukammal' | 'Barcha darajalar';
  targetAudience: string; // Kimlar uchun mo'ljallangani
  lessonsCount: number;
  pricePerMonth: string; // e.g. "850,000 so'm"
  syllabus: string[];
  imageUrl: string;
  teacherId?: string;
  teacherName?: string;
  isPopular?: boolean;
  createdAt: string;
}

export interface Teacher {
  id: string;
  fullName: string;
  subject: string;
  experience: string; // e.g. "6+ yil"
  specialty: string; // e.g. "Frontend & Mobile ilovalar"
  phone: string; // format +998...
  email?: string;
  bio: string;
  avatarUrl: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  isAvailableForAssignments: boolean;
}

export type AssignmentStatus =
  | 'Yangi'
  | 'Ko‘rib chiqilmoqda'
  | 'Bajarilmoqda'
  | 'Bajarildi'
  | 'Qayta ishlash kerak';

export interface AssignmentMessage {
  id: string;
  senderRole: 'student' | 'teacher' | 'admin';
  senderName: string;
  message: string;
  attachmentUrl?: string;
  attachmentName?: string;
  createdAt: string;
}

export interface Assignment {
  id: string; // e.g. "TSK-8492"
  studentName: string;
  studentPhone: string;
  teacherId: string;
  teacherName: string;
  teacherPhone: string;
  subject: string;
  title: string;
  description: string;
  deadline: string; // YYYY-MM-DD or ISO
  attachmentName?: string;
  attachmentSize?: string;
  attachmentData?: string; // base64 or download url
  status: AssignmentStatus;
  statusComment?: string;
  smsSent: boolean;
  smsStatusDetail: string;
  createdAt: string;
  updatedAt: string;
  messages: AssignmentMessage[];
}

export interface SmsLog {
  id: string;
  assignmentId: string;
  recipientName: string;
  recipientPhone: string;
  messageText: string;
  provider: string; // "twilio" | "eskiz" | "none"
  status: 'unconfigured' | 'sent' | 'failed';
  statusDetail: string;
  sentAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentPhone: string;
  notes?: string;
  status: 'kutilmoqda' | 'tasdiqlangan' | 'bekor_qilingan';
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  slogan: string;
  subtitle: string;
  address: string;
  addressLandmark: string;
  addressDetail: string;
  phone1: string;
  phone2: string;
  email: string;
  workingHours: string;
  telegramUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  googleMapsQuery: string;
  smsProviderConfigured: boolean;
  smsProviderName: string;
}

export type UserRole = 'guest' | 'student' | 'teacher' | 'admin';

export interface CurrentUser {
  id: string;
  role: UserRole;
  name: string;
  phone: string;
  teacherProfileId?: string;
}
