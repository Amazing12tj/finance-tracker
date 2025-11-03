import React from "react";

export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  return (
    <div className="card summary">
      <div>
        <strong>Income:</strong> ₦{income.toFixed(2)}
      </div>
      <div>
        <strong>Expense:</strong> ₦{expense.toFixed(2)}
      </div>
      <div>
        <strong>Balance:</strong> ₦{(income - expense).toFixed(2)}
      </div>
    </div>
  );
}
