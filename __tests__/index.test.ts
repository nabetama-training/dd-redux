import {
  processBasePay,
  processReimbursement,
  processBonus,
  processStockOptions,
  processPayDay,
  payrollEngineReducer,
} from "../src/index";

it("process base pay", () => {
  const action = processBasePay(10);
  const result = payrollEngineReducer(undefined, action);

  expect(result.basePay).toBe(10);
});

it("process reimbursement", () => {
  const action = processReimbursement(10);
  const result = payrollEngineReducer(undefined, action);

  expect(result.reimbursement).toBe(10);
  expect(result.totalPay).toBe(10);
});
