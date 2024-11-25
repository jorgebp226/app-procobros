
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface Debt {
    id: number;
    company: string;
    title: string;
    amount: number;
    type: string;
    status: string;
    progress: number;
    totalDebtors: number;
    debtorsResolved: number;
    collected: number;
    aiSummary: string;
    workers: Worker[];
  }
  
  export interface Worker {
    id: number;
    name: string;
    type: 'human' | 'ai';
    performance: number;
    activeCases: number;
    debtors: Debtor[];
  }
  
  export interface Debtor {
    id: number;
    name: string;
    debt: number;
    progress: number;
    status: string;
    riskLevel: string;
    lastContact: string;
  }