import { Course, Teacher, Assignment, SiteSettings, ContactMessage, SmsLog, Enrollment } from '../types';
import {
  initialCourses,
  initialTeachers,
  initialAssignments,
  initialSiteSettings,
  initialContactMessages,
  initialSmsLogs,
} from '../data/initialData';

// Local storage keys for client resilience
const STORAGE_KEYS = {
  COURSES: 'lobeble_courses',
  TEACHERS: 'lobeble_teachers',
  ASSIGNMENTS: 'lobeble_assignments',
  SETTINGS: 'lobeble_settings',
  CONTACT: 'lobeble_contact',
  SMS_LOGS: 'lobeble_sms_logs',
  ENROLLMENTS: 'lobeble_enrollments',
};

function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Storage set failed', e);
  }
}

export const api = {
  // Settings
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.SETTINGS, data);
        return data;
      }
    } catch (e) {
      console.warn('Server fetch settings failed, using cache:', e);
    }
    return getLocal(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.SETTINGS, data.settings);
        return data.settings;
      }
    } catch (e) {
      console.warn('Server update settings failed, updating cache:', e);
    }
    const current = getLocal(STORAGE_KEYS.SETTINGS, initialSiteSettings);
    const updated = { ...current, ...settings };
    setLocal(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // Courses
  async getCourses(): Promise<Course[]> {
    try {
      const res = await fetch('/api/courses');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.COURSES, data);
        return data;
      }
    } catch (e) {
      console.warn('Fetch courses failed, using cache:', e);
    }
    return getLocal(STORAGE_KEYS.COURSES, initialCourses);
  },

  async createCourse(course: Omit<Course, 'id' | 'createdAt'>): Promise<Course> {
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
      });
      if (res.ok) {
        const created = await res.json();
        const current = getLocal<Course[]>(STORAGE_KEYS.COURSES, initialCourses);
        setLocal(STORAGE_KEYS.COURSES, [created, ...current]);
        return created;
      }
    } catch (e) {
      console.warn('API create course failed, using client fallback', e);
    }
    const fallbackCourse: Course = {
      ...course,
      id: `crs-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const current = getLocal<Course[]>(STORAGE_KEYS.COURSES, initialCourses);
    const updated = [fallbackCourse, ...current];
    setLocal(STORAGE_KEYS.COURSES, updated);
    return fallbackCourse;
  },

  async updateCourse(id: string, course: Partial<Course>): Promise<Course> {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
      });
      if (res.ok) {
        const updated = await res.json();
        const current = getLocal<Course[]>(STORAGE_KEYS.COURSES, initialCourses);
        setLocal(STORAGE_KEYS.COURSES, current.map((c) => (c.id === id ? updated : c)));
        return updated;
      }
    } catch (e) {
      console.warn('API update course failed', e);
    }
    const current = getLocal<Course[]>(STORAGE_KEYS.COURSES, initialCourses);
    const updated = current.map((c) => (c.id === id ? { ...c, ...course } : c));
    setLocal(STORAGE_KEYS.COURSES, updated);
    return updated.find((c) => c.id === id)!;
  },

  async deleteCourse(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const current = getLocal<Course[]>(STORAGE_KEYS.COURSES, initialCourses);
        setLocal(STORAGE_KEYS.COURSES, current.filter((c) => c.id !== id));
        return true;
      }
    } catch (e) {
      console.warn('API delete course failed', e);
    }
    const current = getLocal<Course[]>(STORAGE_KEYS.COURSES, initialCourses);
    setLocal(STORAGE_KEYS.COURSES, current.filter((c) => c.id !== id));
    return true;
  },

  // Teachers
  async getTeachers(): Promise<Teacher[]> {
    try {
      const res = await fetch('/api/teachers');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.TEACHERS, data);
        return data;
      }
    } catch (e) {
      console.warn('Fetch teachers failed, using cache:', e);
    }
    return getLocal(STORAGE_KEYS.TEACHERS, initialTeachers);
  },

  async createTeacher(teacher: Omit<Teacher, 'id'>): Promise<Teacher> {
    try {
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      });
      if (res.ok) {
        const created = await res.json();
        const current = getLocal<Teacher[]>(STORAGE_KEYS.TEACHERS, initialTeachers);
        setLocal(STORAGE_KEYS.TEACHERS, [created, ...current]);
        return created;
      }
    } catch (e) {
      console.warn('API create teacher failed', e);
    }
    const newTch: Teacher = {
      ...teacher,
      id: `tch-${Date.now()}`,
    };
    const current = getLocal<Teacher[]>(STORAGE_KEYS.TEACHERS, initialTeachers);
    setLocal(STORAGE_KEYS.TEACHERS, [newTch, ...current]);
    return newTch;
  },

  async updateTeacher(id: string, teacher: Partial<Teacher>): Promise<Teacher> {
    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      });
      if (res.ok) {
        const updated = await res.json();
        const current = getLocal<Teacher[]>(STORAGE_KEYS.TEACHERS, initialTeachers);
        setLocal(STORAGE_KEYS.TEACHERS, current.map((t) => (t.id === id ? updated : t)));
        return updated;
      }
    } catch (e) {
      console.warn('API update teacher failed', e);
    }
    const current = getLocal<Teacher[]>(STORAGE_KEYS.TEACHERS, initialTeachers);
    const updated = current.map((t) => (t.id === id ? { ...t, ...teacher } : t));
    setLocal(STORAGE_KEYS.TEACHERS, updated);
    return updated.find((t) => t.id === id)!;
  },

  async deleteTeacher(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const current = getLocal<Teacher[]>(STORAGE_KEYS.TEACHERS, initialTeachers);
        setLocal(STORAGE_KEYS.TEACHERS, current.filter((t) => t.id !== id));
        return true;
      }
    } catch (e) {
      console.warn('API delete teacher failed', e);
    }
    const current = getLocal<Teacher[]>(STORAGE_KEYS.TEACHERS, initialTeachers);
    setLocal(STORAGE_KEYS.TEACHERS, current.filter((t) => t.id !== id));
    return true;
  },

  // Assignments
  async getAssignments(filters?: {
    teacherId?: string;
    teacherPhone?: string;
    studentPhone?: string;
    status?: string;
  }): Promise<Assignment[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.teacherId) params.append('teacherId', filters.teacherId);
      if (filters?.teacherPhone) params.append('teacherPhone', filters.teacherPhone);
      if (filters?.studentPhone) params.append('studentPhone', filters.studentPhone);
      if (filters?.status) params.append('status', filters.status);

      const res = await fetch(`/api/assignments?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (!filters || Object.keys(filters).length === 0) {
          setLocal(STORAGE_KEYS.ASSIGNMENTS, data);
        }
        return data;
      }
    } catch (e) {
      console.warn('Fetch assignments failed, using cache:', e);
    }

    let list = getLocal<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, initialAssignments);
    if (filters?.teacherId) {
      list = list.filter((a) => a.teacherId === filters.teacherId);
    }
    if (filters?.teacherPhone) {
      const clean = filters.teacherPhone.replace(/\s+/g, '');
      list = list.filter((a) => a.teacherPhone.replace(/\s+/g, '') === clean);
    }
    if (filters?.studentPhone) {
      const clean = filters.studentPhone.replace(/\s+/g, '');
      list = list.filter((a) => a.studentPhone.replace(/\s+/g, '') === clean);
    }
    if (filters?.status) {
      list = list.filter((a) => a.status === filters.status);
    }
    return list;
  },

  async submitAssignment(payload: {
    studentName: string;
    studentPhone: string;
    teacherId: string;
    teacherName: string;
    teacherPhone: string;
    subject: string;
    title: string;
    description: string;
    deadline: string;
    attachmentName?: string;
    attachmentSize?: string;
    attachmentData?: string;
  }): Promise<{ success: boolean; assignment: Assignment; message: string; sms: any }> {
    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        const current = getLocal<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, initialAssignments);
        setLocal(STORAGE_KEYS.ASSIGNMENTS, [result.assignment, ...current]);
        return result;
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Topshiriqni yuborishda xatolik yuz berdi');
      }
    } catch (e: any) {
      if (e.message && e.message !== 'Failed to fetch') {
        throw e;
      }
      // Offline fallback creation
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const newAssignment: Assignment = {
        id: `TSK-${randomCode}`,
        studentName: payload.studentName.trim(),
        studentPhone: payload.studentPhone.trim(),
        teacherId: payload.teacherId,
        teacherName: payload.teacherName.trim(),
        teacherPhone: payload.teacherPhone.trim(),
        subject: payload.subject.trim(),
        title: payload.title.trim(),
        description: payload.description.trim(),
        deadline: payload.deadline,
        attachmentName: payload.attachmentName,
        attachmentSize: payload.attachmentSize,
        attachmentData: payload.attachmentData,
        status: 'Yangi',
        statusComment: 'Topshiriq qabul qilindi va navbatga qo\'yildi.',
        smsSent: false,
        smsStatusDetail: 'SMS xabarnoma yuborish uchun SMS xizmati ulanishi kerak (soxta SMS ko‘rsatilmaydi)',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      };
      const current = getLocal<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, initialAssignments);
      setLocal(STORAGE_KEYS.ASSIGNMENTS, [newAssignment, ...current]);
      return {
        success: true,
        assignment: newAssignment,
        message: 'Topshiriq muvaffaqiyatli saqlandi!',
        sms: {
          sent: false,
          status: 'unconfigured',
          statusDetail: 'SMS xabarnoma yuborish uchun SMS xizmati ulanishi kerak (soxta SMS ko‘rsatilmaydi)',
        },
      };
    }
  },

  async updateAssignmentStatus(
    id: string,
    status: Assignment['status'],
    statusComment?: string
  ): Promise<Assignment> {
    try {
      const res = await fetch(`/api/assignments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, statusComment }),
      });
      if (res.ok) {
        const data = await res.json();
        const current = getLocal<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, initialAssignments);
        setLocal(
          STORAGE_KEYS.ASSIGNMENTS,
          current.map((a) => (a.id === id ? data.assignment : a))
        );
        return data.assignment;
      }
    } catch (e) {
      console.warn('Update assignment status via API failed', e);
    }

    const current = getLocal<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, initialAssignments);
    const updated = current.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          status,
          statusComment: statusComment || a.statusComment,
          updatedAt: new Date().toISOString(),
        };
      }
      return a;
    });
    setLocal(STORAGE_KEYS.ASSIGNMENTS, updated);
    return updated.find((a) => a.id === id)!;
  },

  async sendAssignmentMessage(
    id: string,
    messagePayload: {
      senderRole: 'student' | 'teacher' | 'admin';
      senderName: string;
      message: string;
      attachmentName?: string;
    }
  ) {
    try {
      const res = await fetch(`/api/assignments/${id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messagePayload),
      });
      if (res.ok) {
        const newMsg = await res.json();
        return newMsg;
      }
    } catch (e) {
      console.warn('API send msg failed', e);
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      ...messagePayload,
      createdAt: new Date().toISOString(),
    };
    const current = getLocal<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, initialAssignments);
    const updated = current.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          messages: [...(a.messages || []), newMsg],
          updatedAt: new Date().toISOString(),
        };
      }
      return a;
    });
    setLocal(STORAGE_KEYS.ASSIGNMENTS, updated);
    return newMsg;
  },

  // Contact
  async sendContactMessage(msg: {
    name: string;
    phone: string;
    subject: string;
    message: string;
  }): Promise<ContactMessage> {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
      if (res.ok) {
        const data = await res.json();
        const current = getLocal<ContactMessage[]>(STORAGE_KEYS.CONTACT, initialContactMessages);
        setLocal(STORAGE_KEYS.CONTACT, [data.message, ...current]);
        return data.message;
      }
    } catch (e) {
      console.warn('API send contact failed', e);
    }

    const newContact: ContactMessage = {
      id: `CNT-${Date.now()}`,
      ...msg,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    const current = getLocal<ContactMessage[]>(STORAGE_KEYS.CONTACT, initialContactMessages);
    setLocal(STORAGE_KEYS.CONTACT, [newContact, ...current]);
    return newContact;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.CONTACT, data);
        return data;
      }
    } catch (e) {
      console.warn('API get contact failed', e);
    }
    return getLocal(STORAGE_KEYS.CONTACT, initialContactMessages);
  },

  // Enrollments
  async enrollInCourse(enrollData: {
    courseId: string;
    courseTitle: string;
    studentName: string;
    studentPhone: string;
    notes?: string;
  }): Promise<Enrollment> {
    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrollData),
      });
      if (res.ok) {
        const data = await res.json();
        const current = getLocal<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, []);
        setLocal(STORAGE_KEYS.ENROLLMENTS, [data.enrollment, ...current]);
        return data.enrollment;
      }
    } catch (e) {
      console.warn('API enroll failed', e);
    }
    const newEnroll: Enrollment = {
      id: `ENR-${Date.now()}`,
      ...enrollData,
      status: 'kutilmoqda',
      createdAt: new Date().toISOString(),
    };
    const current = getLocal<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, []);
    setLocal(STORAGE_KEYS.ENROLLMENTS, [newEnroll, ...current]);
    return newEnroll;
  },

  async getEnrollments(): Promise<Enrollment[]> {
    try {
      const res = await fetch('/api/enrollments');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.ENROLLMENTS, data);
        return data;
      }
    } catch (e) {
      console.warn('API get enrollments failed', e);
    }
    return getLocal<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, []);
  },

  // SMS Logs
  async getSmsLogs(): Promise<SmsLog[]> {
    try {
      const res = await fetch('/api/sms-logs');
      if (res.ok) {
        const data = await res.json();
        setLocal(STORAGE_KEYS.SMS_LOGS, data);
        return data;
      }
    } catch (e) {
      console.warn('API get sms-logs failed', e);
    }
    return getLocal<SmsLog[]>(STORAGE_KEYS.SMS_LOGS, initialSmsLogs);
  },
};
