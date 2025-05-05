import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';


function createStorageAdapter<T>(storage: Storage): PersistStorage<T> {
  return {
    getItem: (name) => {
      const value = storage.getItem(name);
      return value ? JSON.parse(value) : null;
    },
    setItem: (name, value) => {
      storage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name) => {
      storage.removeItem(name);
    },
  };
}

type User = {
  name: string;
  email: string;
  picture: string;
};

type FixedExpense = {
  id: string;
  name: string;
  amount: number;
};

type InstallmentExpense = {
  id: string;
  name: string;
  amount: number;
  remainingMonths: number;
};

type MonthlyData = {
  income: number;
  fixedExpenses: FixedExpense[];
  installmentExpenses: InstallmentExpense[];
};



type AppState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;

  selectedMonth: string;
  setSelectedMonth: (month: string) => void;

  dataByMonth: Record<string, MonthlyData>;
  setMonthlyIncome: (value: number) => void;
  addFixedExpense: (expense: FixedExpense) => void;
  addInstallmentExpense: (expense: InstallmentExpense) => void;
  calculateRemaining: (month?: string) => number;
};

const localStorageAdapter = createStorageAdapter<AppState>(localStorage);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      selectedMonth: new Date().toISOString().slice(0, 7), 
      setSelectedMonth: (month) => set({ selectedMonth: month }),

      dataByMonth: {},

      setMonthlyIncome: (income) => {
        const { selectedMonth, dataByMonth } = get();
        const monthData = dataByMonth[selectedMonth] || {
          monthlyIncome: 0,
          fixedExpenses: [],
          installmentExpenses: [],
        };
        set({
          dataByMonth: {
            ...dataByMonth,
            [selectedMonth]: { ...monthData, income },
          },
        });
      },

      addFixedExpense: (expense) => {
        const { selectedMonth, dataByMonth } = get();
        const monthData = dataByMonth[selectedMonth] || {
          income: 0,
          fixedExpenses: [],
          installmentExpenses: [],
        };
        set({
          dataByMonth: {
            ...dataByMonth,
            [selectedMonth]: {
              ...monthData,
              fixedExpenses: [...monthData.fixedExpenses, expense],
            },
          },
        });
      },

      addInstallmentExpense: (expense) => {
        const { selectedMonth, dataByMonth } = get();
        const monthData = dataByMonth[selectedMonth] || {
          income: 0,
          fixedExpenses: [],
          installmentExpenses: [],
        };
        set({
          dataByMonth: {
            ...dataByMonth,
            [selectedMonth]: {
              ...monthData,
              installmentExpenses: [...monthData.installmentExpenses, expense],
            },
          },
        });
      },

      calculateRemaining: (month) => {
        const { selectedMonth, dataByMonth } = get();
        const m = month || selectedMonth;
        const monthData = dataByMonth[m];
        if (!monthData) return 0;
        const totalFixed = monthData.fixedExpenses.reduce((sum, e) => sum + e.amount, 0);
        const totalInstallments = monthData.installmentExpenses.reduce((sum, e) => sum + e.amount, 0);
        return monthData.income - totalFixed - totalInstallments;
      },
    }),
    {
      name: 'app-session',
      storage: localStorageAdapter
    }
  )
);