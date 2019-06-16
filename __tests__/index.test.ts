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
