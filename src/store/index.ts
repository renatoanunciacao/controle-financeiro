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
  id: string; // ID como string
  name: string;
  value: number;
  dueDate: string;
};

type InstallmentExpense = {
  id: string;
  name: string;
  amount: number;
  totalMonths: number;
  currentMonth: number;
  remainingMonths: number;
  cardName: string;
  dueDate: string;
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
  addFixedExpense: (expense: Omit<FixedExpense, 'id'>) => void; // Omit 'id' from the argument
  addInstallmentExpense: (expense: Omit<InstallmentExpense, 'id'>) => void;
  calculateTotalFixedExpenses: (month?: string) => number;
};

const localStorageAdapter = createStorageAdapter<AppState>(localStorage);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      selectedMonth: new Date().toISOString().slice(0, 7), // Formato: YYYY-MM
      setSelectedMonth: (month) => set({ selectedMonth: month }),

      dataByMonth: {},

      setMonthlyIncome: (income) => {
        const { selectedMonth, dataByMonth } = get();
        const monthData = dataByMonth[selectedMonth] || {
          income: 0,
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

        // Gerar ID incremental (como string)
        const nextId = monthData.fixedExpenses.length
          ? (Math.max(...monthData.fixedExpenses.map((e) => parseInt(e.id))) + 1).toString()
          : '1'; // Começa em 1 se não houver despesas ainda, e garante que seja string

        const newExpense = { ...expense, id: nextId };

        set({
          dataByMonth: {
            ...dataByMonth,
            [selectedMonth]: {
              ...monthData,
              fixedExpenses: [...monthData.fixedExpenses, newExpense],
            },
          },
        });
      },

      addInstallmentExpense: (expense: Omit<InstallmentExpense, 'id'>) => {
        const { selectedMonth, dataByMonth } = get();
        const monthData = dataByMonth[selectedMonth] || {
          income: 0,
          fixedExpenses: [],
          installmentExpenses: [],
        };

        const nextId = monthData.installmentExpenses.length
          ? Math.max(...monthData.installmentExpenses.map((e) => +e.id)) + 1
          : 1;

        const newExpense: InstallmentExpense = { ...expense, id: nextId.toString() };

        set({
          dataByMonth: {
            ...dataByMonth,
            [selectedMonth]: {
              ...monthData,
              installmentExpenses: [...monthData.installmentExpenses, newExpense],
            },
          },
        });
      },

      calculateTotalFixedExpenses: (month) => {
        const { selectedMonth, dataByMonth } = get();
        const m = month || selectedMonth;
        const monthData = dataByMonth[m];
        if (!monthData) return 0;

        // Soma todas as despesas fixas
        const totalFixed = monthData.fixedExpenses.reduce((sum, e) => sum + e.value, 0);

        // Retorna a soma total das despesas fixas
        return totalFixed;
      },
    }),
    {
      name: 'app-session',
      storage: localStorageAdapter, // Usando o adaptador de storage
    }
  )
);
