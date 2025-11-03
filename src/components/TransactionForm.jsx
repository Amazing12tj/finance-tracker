import React, { useState } from "react";

export default function TransactionForm({ categories, onAdd }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState(categories[0] || "Other");
  const [notes, setNotes] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount))) {
      alert("Enter valid amount");
      return;
    }
    const tx = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      date,
      category,
      notes,
    };
    onAdd(tx);
    setAmount("");
    setNotes("");
  }

  return (
    <form onSubmit={submit} className="card form">
      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div>
        <label>Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputMode="decimal"
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Notes (optional)</label>
        <input value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
}
