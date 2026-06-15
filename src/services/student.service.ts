import { simulateDelay } from '../lib/axios';
import { Student } from '../types/Student';
import { mockStudents } from '../mocks/student.mock';

let localStudents = [...mockStudents];

export const studentService = {
  getStudents: async (filters?: {
    search?: string;
    dormitoryId?: string;
    status?: string;
  }): Promise<Student[]> => {
    await simulateDelay(350);
    let result = [...localStudents];

    if (filters) {
      const { search, dormitoryId, status } = filters;
      if (search) {
        result = result.filter(
          s => s.mssv.toLowerCase().includes(search.toLowerCase()) ||
               s.fullName.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (dormitoryId) {
        result = result.filter(s => s.dormitoryId === dormitoryId);
      }
      if (status) {
        result = result.filter(s => s.status === status);
      }
    }
    return result;
  },

  getStudentByMssv: async (mssv: string): Promise<Student | undefined> => {
    await simulateDelay(150);
    return localStudents.find(s => s.mssv === mssv);
  },

  createStudent: async (student: Student): Promise<Student> => {
    await simulateDelay(300);
    localStudents.push(student);
    return student;
  },

  updateStudent: async (mssv: string, studentData: Partial<Student>): Promise<Student> => {
    await simulateDelay(300);
    localStudents = localStudents.map(s => 
      s.mssv === mssv ? { ...s, ...studentData } : s
    );
    const updated = localStudents.find(s => s.mssv === mssv);
    if (!updated) throw new Error('Student not found');
    return updated;
  },

  deleteStudent: async (mssv: string): Promise<boolean> => {
    await simulateDelay(200);
    localStudents = localStudents.filter(s => s.mssv !== mssv);
    return true;
  }
};
