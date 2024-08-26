import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, 'Full Name is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  gender: z.string().min(1, 'Gender is required'),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const transactionSchema = z.object({
  description: z.string().min(1, 'Transaction description is required'),
  paymentType: z.enum(['card', 'cash', 'bank'], 'Invalid payment type'),
  category: z.enum(['saving', 'expense', 'investment'], 'Invalid category'),
  amount: z.coerce.number().min(1, 'Amount must be greater than zero'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
});
