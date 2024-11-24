export interface User {
  id: string;
  email: string;
  role: 'admin' | 'parent' | 'student';
  name: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  parentId: string;
  studentId: string;
}

export interface FeeStructure {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'annually';
  category: 'tuition' | 'exam' | 'other';
}

export interface Payment {
  id: string;
  studentId: string;
  feeStructureId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  transactionId?: string;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  studentId: string;
  items: {
    feeStructureId: string;
    amount: number;
  }[];
  totalAmount: number;
  status: 'unpaid' | 'partial' | 'paid';
  dueDate: Date;
  createdAt: Date;
}