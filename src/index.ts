const BASE_PAY = "BASE_PAY";
const REIMBURSEMENT = "REIMBURSEMENT";
const BONUS = "BONUS";
const STOCK_OPTIONS = "STOCK_OPTIONS";
const PAY_DAY = "PAY_DAY";

interface PayrollAction {
  type: string;
  amount?: number;
}
