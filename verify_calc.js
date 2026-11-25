const assert = require("assert");
const { calcMortgage } = require("./app.js");
const r = calcMortgage(1000, 2.2, 30, 0);
assert(r.repayMonthly >= 37900 && r.repayMonthly <= 38050);
console.log("MORTGAGE_TESTS_PASSED");