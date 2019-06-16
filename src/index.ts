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

// reducer
const initialState: PayStubState = {
  basePay: 0,
  reimbursement: 0,
  bonus: 0,
  stockOptions: 0,
  totalPay: 0,
  payHistory: [],
};

// There is not defined the return type
// because it is already declared at PayStubState.
// Type Inference https://www.typescriptlang.org/docs/handbook/type-inference.html
const computeTotalPay = (payStub: PayStubState) =>
  payStub.totalPay >= payStub.stockOptions
    ? payStub.basePay +
      payStub.reimbursement +
      payStub.bonus -
      payStub.stockOptions
    : payStub.totalPay;

export const payrollEngineReducer = (
  state: PayStubState = initialState,
  action: PayrollAction
): PayStubState => {
  let totalPay: number = 0;

  switch (action.type) {
    case BASE_PAY:
      const { amount: basePay = 0 } = action;
      totalPay = computeTotalPay({ ...state, basePay });
      return { ...state, basePay, totalPay };

    case REIMBURSEMENT:
      const { amount: reimbursement = 0 } = action;
      totalPay = computeTotalPay({ ...state, reimbursement });
      return { ...state, reimbursement, totalPay };

    case BONUS:
      const { amount: bonus = 0 } = action;
      totalPay = computeTotalPay({ ...state, bonus });
      return { ...state, bonus, totalPay };

    case STOCK_OPTIONS:
      const { amount: stockOptions = 0 } = action;
      totalPay = computeTotalPay({ ...state, stockOptions });

      const newStockOptions = totalPay >= stockOptions ? stockOptions : 0;
      return { ...state, stockOptions: newStockOptions, totalPay };

    case PAY_DAY:
      const { payHistory } = state;
      totalPay = state.totalPay;

      const lastPayHistory = payHistory.slice(-1).pop();
      const lastTotalCompensation =
        (lastPayHistory && lastPayHistory.totalCompensation) || 0;
      const totalCompensation = totalPay + lastTotalCompensation;

      const newTotalPay = computeTotalPay({
        ...state,
        reimbursement: 0,
        bonus: 0,
      });
      const newPayHistory = [...payHistory, { totalPay, totalCompensation }];
      return {
        ...state,
        reimbursement: 0,
        bonus: 0,
        totalPay: newTotalPay,
        payHistory: newPayHistory,
      };

    default:
      return state;
  }
};
