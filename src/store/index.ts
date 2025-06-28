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
  borrowers: Borrower[];
};

type Borrower = {
  id: string;
  name: string;
  debts: {
    expenseId: string;         // ID da despesa parcelada
    cardName: string;          // Nome do cartão usado
    totalAmount: number;       // Valor total da compra
    installmentAmount: number; // Valor da parcela mensal
    totalInstallments: number; // Parcelas totais
    currentInstallment: number;// Parcela atual
    dueDate: string;           // Data de vencimento
  }[];
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
  addInstallmentExpense: (expense: InstallmentExpense) => void;
  calculateTotalExpenses: (month?: string) => number;
  
  addBorrower: (borrower: Borrower) => void;
  addBorrowerDebt: (
    borrowerId: string,
    debt: {
      expenseId: string;
      cardName: string;
      totalAmount: number;
      installmentAmount: number;
      totalInstallments: number;
      currentInstallment: number;
      dueDate: string;
    }
  ) => void;
};

const localStorageAdapter = createStorageAdapter<AppState>(localStorage);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      selectedMonth: new Date().toISOString().slice(0, 7),
      setSelectedMonth: (month) => {
        const { selectedMonth, dataByMonth } = get();
        if (selectedMonth === month) return; 
        set({
          selectedMonth: month,
          dataByMonth: {
            ...dataByMonth,
            [month]: dataByMonth[month] ?? {
              income: 0,
              fixedExpenses: [],
              installmentExpenses: [],
              borrowers: []
            },
          },
        });
      },

      dataByMonth: {},

      setMonthlyIncome: (income) => {
        const { selectedMonth, dataByMonth } = get();
        const existing = dataByMonth[selectedMonth];
        if (existing?.income === income) return;
        
        const monthData: MonthlyData = {
          income,
          fixedExpenses: existing?.fixedExpenses ? [...existing.fixedExpenses] : [],
          installmentExpenses: existing?.installmentExpenses ? [...existing.installmentExpenses] : [],
          borrowers: existing?.borrowers ?? [],
        };

        set({
          dataByMonth: {
            ...dataByMonth,
            [selectedMonth]: monthData,
          },
        });
      },

      addFixedExpense: (expense) => {
        const { selectedMonth, dataByMonth } = get();
        const monthData = dataByMonth[selectedMonth] || {
          income: 0,
          fixedExpenses: [],
          installmentExpenses: [],
          borrowers: [],
        };

        const nextId = monthData.fixedExpenses.length
          ? (Math.max(...monthData.fixedExpenses.map((e) => parseInt(e.id))) + 1).toString()
          : '1';

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

      addInstallmentExpense: (expense) => {
        const { selectedMonth, dataByMonth } = get();
        const monthData = dataByMonth[selectedMonth] || {
          income: 0,
          fixedExpenses: [],
          installmentExpenses: [],
          borrowers: [],
        };

       const newExpense: InstallmentExpense = { ...expense };

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

      calculateTotalExpenses: (month) => {
        const { selectedMonth, dataByMonth } = get();
        const m = month || selectedMonth;
        const monthData = dataByMonth[m];
        if (!monthData) return 0;

        const totalFixed = monthData.fixedExpenses.reduce((sum, e) => sum + e.value, 0);
        const totalInstallmentExpenses = monthData.installmentExpenses.reduce((sum, e) => sum + e.amount, 0);

        return totalFixed + totalInstallmentExpenses;
      },

      addBorrower: (borrower: Borrower) => {
        const { selectedMonth, dataByMonth } = get();
        const monthData = dataByMonth[selectedMonth] ?? {
          income: 0,
          fixedExpenses: [],
          installmentExpenses: [],
          borrowers: [],
        };

        const newBorrower: Borrower = {
          ...borrower,
          debts: [],
        };

        set({
          dataByMonth: {
            ...dataByMonth,
            [selectedMonth]: {
              ...monthData,
              borrowers: [...monthData.borrowers, newBorrower],
            },
          },
        });
      },

      addBorrowerDebt: (borrowerId, debt) => {
        const { selectedMonth, dataByMonth } = get();
        const monthData = dataByMonth[selectedMonth] ?? {
          income: 0,
          fixedExpenses: [],
          installmentExpenses: [],
          borrowers: [],
        };

        const borrowers = monthData.borrowers ?? [];
        const updatedBorrowers = borrowers.map((b) => {
          if (b.id === borrowerId) {
            return {
              ...b,
              debts: [...(b.debts ?? []), debt],
            };
          }
          return b;
        });

        set({
          dataByMonth: {
            ...dataByMonth,
            [selectedMonth]: {
              ...monthData,
              borrowers: updatedBorrowers,
            },
          },
        });
      }

    }),
    {
      name: 'app-session',
      storage: localStorageAdapter,
    }
  )
);
