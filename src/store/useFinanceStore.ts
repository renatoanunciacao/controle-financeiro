import { create } from 'zustand';

interface FinanceState {
    monthlyIncome: number
    fixedExpenses: { name: string; value: number; dueDate: string }[]
    installments: { name: string; value: number; installmentNumber: number }[]
    setIncome: (value: number) => void
    addFixedExpense: (expense: { name: string; value: number; dueDate: string }) => void
    addInstallment: (installment: { name: string; value: number; installmentNumber: number }) => void
}

export const useFinanceStore = create<FinanceState>((set) => ({
    monthlyIncome: 0,
    fixedExpenses: [],
    installments: [],
    setIncome: (value) => set({ monthlyIncome: value }),
    addFixedExpense: (expense) => set((state) => ({ fixedExpenses: [...state.fixedExpenses, expense] })),
    addInstallment: (installment) => set((state) => ({ installments: [...state.installments, installment] })),
  }))