// Mock data for School ERP System

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  class: string;
  section: string;
  rollNumber: string;
  admissionDate: string;
  profilePicture?: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  attendance: number; // percentage
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  employeeId: string;
  department: string;
  position: string;
  joiningDate: string;
  salary: number;
  subjects?: string[];
  classes?: string[];
  profilePicture?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface Fee {
  id: string;
  studentId: string;
  type: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
}

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1234567890',
    dateOfBirth: '2008-05-15',
    gender: 'Male',
    address: '123 Oak Street, City, State 12345',
    class: '10th Grade',
    section: 'A',
    rollNumber: '10A001',
    admissionDate: '2023-04-15',
    guardianName: 'Michael Smith',
    guardianPhone: '+1234567891',
    guardianEmail: 'michael.smith@email.com',
    feeStatus: 'paid',
    attendance: 92
  },
  {
    id: '2',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@email.com',
    phone: '+1234567892',
    dateOfBirth: '2009-03-22',
    gender: 'Female',
    address: '456 Pine Avenue, City, State 12345',
    class: '9th Grade',
    section: 'B',
    rollNumber: '9B015',
    admissionDate: '2023-04-20',
    guardianName: 'Sarah Johnson',
    guardianPhone: '+1234567893',
    guardianEmail: 'sarah.johnson@email.com',
    feeStatus: 'pending',
    attendance: 88
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '+1234567894',
    dateOfBirth: '2007-11-08',
    gender: 'Male',
    address: '789 Elm Street, City, State 12345',
    class: '11th Grade',
    section: 'A',
    rollNumber: '11A007',
    admissionDate: '2022-04-10',
    guardianName: 'Robert Brown',
    guardianPhone: '+1234567895',
    guardianEmail: 'robert.brown@email.com',
    feeStatus: 'overdue',
    attendance: 95
  }
];

// Mock Staff Data
export const mockStaff: Staff[] = [
  {
    id: '1',
    firstName: 'Dr. Jane',
    lastName: 'Wilson',
    email: 'jane.wilson@school.edu',
    phone: '+1234567896',
    dateOfBirth: '1985-07-12',
    gender: 'Female',
    address: '321 Maple Drive, City, State 12345',
    employeeId: 'EMP001',
    department: 'Mathematics',
    position: 'Senior Teacher',
    joiningDate: '2020-08-15',
    salary: 55000,
    subjects: ['Mathematics', 'Statistics'],
    classes: ['10th Grade A', '11th Grade A']
  },
  {
    id: '2',
    firstName: 'Prof. David',
    lastName: 'Anderson',
    email: 'david.anderson@school.edu',
    phone: '+1234567897',
    dateOfBirth: '1978-02-28',
    gender: 'Male',
    address: '654 Cedar Lane, City, State 12345',
    employeeId: 'EMP002',
    department: 'Science',
    position: 'Department Head',
    joiningDate: '2018-06-01',
    salary: 65000,
    subjects: ['Physics', 'Chemistry'],
    classes: ['11th Grade A', '12th Grade A']
  },
  {
    id: '3',
    firstName: 'Ms. Lisa',
    lastName: 'Martinez',
    email: 'lisa.martinez@school.edu',
    phone: '+1234567898',
    dateOfBirth: '1990-09-14',
    gender: 'Female',
    address: '987 Birch Road, City, State 12345',
    employeeId: 'EMP003',
    department: 'English',
    position: 'Teacher',
    joiningDate: '2022-01-10',
    salary: 48000,
    subjects: ['English Literature', 'Creative Writing'],
    classes: ['9th Grade B', '10th Grade B']
  }
];

// Dashboard Statistics
export const dashboardStats = {
  totalStudents: 1247,
  totalStaff: 89,
  totalRevenue: 2847650,
  attendanceRate: 92.5,
  monthlyGrowth: {
    students: 5.2,
    revenue: 8.7,
    attendance: 2.1
  }
};

// Chart data for dashboard
export const attendanceChartData = [
  { month: 'Jan', attendance: 89 },
  { month: 'Feb', attendance: 91 },
  { month: 'Mar', attendance: 88 },
  { month: 'Apr', attendance: 94 },
  { month: 'May', attendance: 92 },
  { month: 'Jun', attendance: 96 }
];

export const revenueChartData = [
  { month: 'Jan', revenue: 245000 },
  { month: 'Feb', revenue: 268000 },
  { month: 'Mar', revenue: 252000 },
  { month: 'Apr', revenue: 289000 },
  { month: 'May', revenue: 305000 },
  { month: 'Jun', revenue: 324000 }
];