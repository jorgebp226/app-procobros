// src/types/index.ts

export interface User {
    name: string;
    status: 'active' | 'pending' | 'inactive';
    avatar?: string;
  }
  
  export interface MockData {
    company: string;
    title: string;
    amount: number;
    date: string;
    type: string;
    status: 'pending' | 'active' | 'completed';
    progress: number;
    participants: User[];
    aiSummary: string;
  }
  
  export interface ContactInfo {
    phone: string;
    email: string;
    address: string;
    preferredTime: string;
  }
  
  export interface Interaction {
    date: string;
    type: string;
    status: string;
    notes: string;
  }
  
  export interface PaymentHistory {
    date: string;
    amount: number;
  }
  
  export interface History {
    startDate: string;
    lastContact: string;
    totalContacts: number;
    paymentHistory: PaymentHistory[];
    interactions: Interaction[];
  }
  
  export interface Agreement {
    paymentPlan: string;
    agreedAmount: number;
    nextPayment: string;
    remainingPayments: number;
  }
  
  export interface AiRiskFactors {
    paymentConsistency: number;
    communicationResponsiveness: number;
    agreementAdherence: number;
    overallRisk: string;
  }
  
  export interface Debtor {
    id: number;
    name: string;
    debt: number;
    progress: number;
    status: string;
    riskLevel: string;
    contact: ContactInfo;
    history: History;
    agreement: Agreement;
    aiSummary: string;
    aiRiskFactors: AiRiskFactors;
  }
  
  export interface Worker {
    id: number;
    name: string;
    type: string;
    performance: number;
    activeCases: number;
    totalResolved: number;
    successRate: number;
    averageResponseTime: string;
    dailyInteractions: number;
    monthlyProgress: {
      month: string;
      resolved: number;
      pending: number;
    }[];
    debtors: Debtor[];
    aiSummary: string;
  }
  