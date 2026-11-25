function calcMortgage(loanWan, annualRatePct, years = 30, graceYears = 0) {
  const principal = Math.max(0, Number(loanWan) || 0) * 10000;
  const r = Math.max(0.0001, (Number(annualRatePct) || 2.2) / 100 / 12);
  const totalMonths = Math.max(12, (Number(years) || 30) * 12);
  const gMonths = Math.min(totalMonths - 12, Math.max(0, (Number(graceYears) || 0) * 12));

  const graceMonthly = gMonths > 0 ? Math.round(principal * r) : 0;
  const repayMonths = totalMonths - gMonths;
  const factor = Math.pow(1 + r, repayMonths);
  const repayMonthly = Math.round((principal * r * factor) / (factor - 1));
  const totalPaid = graceMonthly * gMonths + repayMonthly * repayMonths;
  const totalInterest = Math.max(0, totalPaid - principal);
  return { graceMonthly, repayMonthly, totalInterest };
}
if (typeof document !== "undefined") {
  const ids = ["loanWan", "ratePct", "yearsInput", "graceYears"];
  function render() {
    const [lw, rp, y, g] = ids.map(id => document.getElementById(id).value);
    const res = calcMortgage(lw, rp, y, g);
    document.getElementById("gracePayEl").textContent = res.graceMonthly > 0 ? `NT$ ${res.graceMonthly.toLocaleString()}` : "無寬限期";
    document.getElementById("afterPayEl").textContent = `NT$ ${res.repayMonthly.toLocaleString()}`;
    document.getElementById("totalIntEl").textContent = `約 ${(res.totalInterest / 10000).toFixed(1)} 萬元`;
  }
  ids.forEach(id => document.getElementById(id).addEventListener("input", render));
  render();
}
if (typeof module !== "undefined" && module.exports) module.exports = { calcMortgage };