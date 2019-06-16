const BASE_PAY = "BASE_PAY";
const REIMBURSEMENT = "REIMBURSEMENT";
const BONUS = "BONUS";
const STOCK_OPTIONS = "STOCK_OPTIONS";
const PAY_DAY = "PAY_DAY";

// action
interface PayrollAction {
  type: string;
  amount?: number;
}

// states
interface PayStubState {
  basePay: number;
  reimbursement: number;
  bonus: number;
  stockOptions: number;
  totalPay: number;
  payHistory: Array<PayHistoryState>;
}

interface PayHistoryState {
  totalPay: number;
  totalCompensation: number;
}

// action functions
export const processBasePay = (amount: number): PayrollAction => ({
  type: BASE_PAY,
  amount,
});

export const processReimbursement = (amount: number): PayrollAction => ({
  type: REIMBURSEMENT,
  amount,
});

export const processBonus = (amount: number): PayrollAction => ({
  type: BONUS,
  amount,
});

export const processStockOptions = (amount: number): PayrollAction => ({
  type: STOCK_OPTIONS,
  amount,
});

export const processPayDay = (): PayrollAction => ({
  type: PAY_DAY,
});
