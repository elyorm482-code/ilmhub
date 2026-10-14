import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, Teacher, Assignment, SiteSettings, ContactMessage, SmsLog, Enrollment, UserRole } from '../types';
import { api } from '../services/api';
import { initialSiteSettings } from '../data/initialData';

export type NavTab =
  | 'home'
  | 'about'
  | 'courses'
  | 'teachers'
  | 'submit-assignment'
  | 'location'
  | 'contact'
  | 'teacher-portal'
  | 'student-portal'
  | 'admin-portal';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTeacherId: string;
  setActiveTeacherId: (id: string) => void;
  studentPhone: string;
  setStudentPhone: (phone: string) => void;
  
  // Data
  courses: Course[];
  teachers: Teacher[];
  assignments: Assignment[];
  smsLogs: SmsLog[];
  contactMessages: ContactMessage[];
  enrollments: Enrollment[];
  settings: SiteSettings;
  loading: boolean;
  
  // Actions
  refreshData: () => Promise<void>;
  preselectedTeacher: Teacher | null;
  setPreselectedTeacher: (teacher: Teacher | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Mutators
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => Promise<Course>;
  updateCourse: (id: string, course: Partial<Course>) => Promise<Course>;
  deleteCourse: (id: string) => Promise<void>;

  addTeacher: (teacher: Omit<Teacher, 'id'>) => Promise<Teacher>;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => Promise<Teacher>;
  deleteTeacher: (id: string) => Promise<void>;

  submitAssignment: (data: any) => Promise<any>;
  updateAssignmentStatus: (id: string, status: Assignment['status'], comment?: string) => Promise<Assignment>;
  sendAssignmentMessage: (id: string, message: any) => Promise<any>;

  submitContact: (data: any) => Promise<any>;
  submitEnrollment: (data: any) => Promise<any>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [activeTeacherId, setActiveTeacherId] = useState<string>('tch-1');
  const [studentPhone, setStudentPhone] = useState<string>('+998 90 987 65 43');
  const [preselectedTeacher, setPreselectedTeacher] = useState<Teacher | null>(null);

  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [smsLogs, setSmsLogs] = useState<SmsLog[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [loading, setLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('lobeble_theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lobeble_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lobeble_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshData = async () => {
    try {
      const [c, t, a, s, cnt, sms, enr] = await Promise.all([
        api.getCourses(),
        api.getTeachers(),
        api.getAssignments(),
        api.getSettings(),
        api.getContactMessages(),
        api.getSmsLogs(),
        api.getEnrollments(),
      ]);
      setCourses(c);
      setTeachers(t);
      setAssignments(a);
      setSettings(s);
      setContactMessages(cnt);
      setSmsLogs(sms);
      setEnrollments(enr);
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Mutator wrappers
  const addCourse = async (course: Omit<Course, 'id' | 'createdAt'>) => {
    const created = await api.createCourse(course);
    setCourses((prev) => [created, ...prev]);
    showToast("Kurs muvaffaqiyatli qo'shildi!");
    return created;
  };

  const updateCourse = async (id: string, course: Partial<Course>) => {
    const updated = await api.updateCourse(id, course);
    setCourses((prev) => prev.map((c) => (c.id === id ? updated : c)));
    showToast("Kurs ma'lumotlari yangilandi!");
    return updated;
  };

  const deleteCourse = async (id: string) => {
    await api.deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
    showToast("Kurs muvaffaqiyatli o'chirildi!");
  };

  const addTeacher = async (teacher: Omit<Teacher, 'id'>) => {
    const created = await api.createTeacher(teacher);
    setTeachers((prev) => [created, ...prev]);
    showToast("Ustoz profili qo'shildi!");
    return created;
  };

  const updateTeacher = async (id: string, teacher: Partial<Teacher>) => {
    const updated = await api.updateTeacher(id, teacher);
    setTeachers((prev) => prev.map((t) => (t.id === id ? updated : t)));
    showToast("Ustoz ma'lumotlari yangilandi!");
    return updated;
  };

  const deleteTeacher = async (id: string) => {
    await api.deleteTeacher(id);
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    showToast("Ustoz profili o'chirildi!");
  };

  const submitAssignment = async (data: any) => {
    const res = await api.submitAssignment(data);
    setAssignments((prev) => [res.assignment, ...prev]);
    await refreshData();
    return res;
  };

  const updateAssignmentStatus = async (
    id: string,
    status: Assignment['status'],
    comment?: string
  ) => {
    const updated = await api.updateAssignmentStatus(id, status, comment);
    setAssignments((prev) => prev.map((a) => (a.id === id ? updated : a)));
    showToast(`Topshiriq holati "${status}" ga o'zgartirildi`);
    return updated;
  };

  const sendAssignmentMessage = async (id: string, messagePayload: any) => {
    const newMsg = await api.sendAssignmentMessage(id, messagePayload);
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, messages: [...(a.messages || []), newMsg] } : a))
    );
    showToast("Xabar yuborildi");
    return newMsg;
  };

  const submitContact = async (data: any) => {
    const res = await api.sendContactMessage(data);
    setContactMessages((prev) => [res, ...prev]);
    showToast("Xabaringiz qabul qilindi! Tez orada aloqaga chiqamiz.");
    return res;
  };

  const submitEnrollment = async (data: any) => {
    const res = await api.enrollInCourse(data);
    setEnrollments((prev) => [res, ...prev]);
    showToast("Kursga arizangiz qabul qilindi! Menejerimiz bog'lanadi.");
    return res;
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = await api.updateSettings(newSettings);
    setSettings(updated);
    showToast("Sayt sozlamalari yangilandi!");
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userRole,
        setUserRole,
        activeTeacherId,
        setActiveTeacherId,
        studentPhone,
        setStudentPhone,
        courses,
        teachers,
        assignments,
        smsLogs,
        contactMessages,
        enrollments,
        settings,
        loading,
        refreshData,
        preselectedTeacher,
        setPreselectedTeacher,
        isDarkMode,
        toggleDarkMode,
        toasts,
        showToast,
        removeToast,
        addCourse,
        updateCourse,
        deleteCourse,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        submitAssignment,
        updateAssignmentStatus,
        sendAssignmentMessage,
        submitContact,
        submitEnrollment,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
