import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentService } from '../services/student.service';
import { dormitoryService } from '../services/dormitory.service';
import { roomService } from '../services/room.service';
import { Student } from '../types/Student';
import { Dormitory } from '../types/Dormitory';
import { Room } from '../types/Room';

export const useStudents = (studentFilters?: { search?: string; dormitoryId?: string; status?: string }) => {
  const queryClient = useQueryClient();

  const studentsQuery = useQuery({
    queryKey: ['students', studentFilters],
    queryFn: () => studentService.getStudents(studentFilters),
  });

  const dormitoriesQuery = useQuery({
    queryKey: ['dormitories'],
    queryFn: () => dormitoryService.getDormitories(),
  });

  const roomsQuery = useQuery({
    queryKey: ['rooms'],
    queryFn: () => roomService.getRooms(),
  });

  const createStudentMutation = useMutation({
    mutationFn: (student: Student) => studentService.createStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ mssv, data }: { mssv: string; data: Partial<Student> }) =>
      studentService.updateStudent(mssv, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: (mssv: string) => studentService.deleteStudent(mssv),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
    },
  });

  return {
    students: studentsQuery.data || [],
    dormitories: dormitoriesQuery.data || [],
    rooms: roomsQuery.data || [],
    isLoadingStudents: studentsQuery.isLoading,
    isLoadingDormitories: dormitoriesQuery.isLoading,
    isLoadingRooms: roomsQuery.isLoading,
    createStudent: createStudentMutation.mutateAsync,
    updateStudent: updateStudentMutation.mutateAsync,
    deleteStudent: deleteStudentMutation.mutateAsync,
  };
};
