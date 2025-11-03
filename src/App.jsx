import React, { useEffect, useMemo, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import CategoryManager from "./components/CategoryManager";
import TransactionList from "./components/TransactionList";
import FiltersBar from "./components/FiltersBar";
import Summary from "./components/Summary";
import SummaryChart from "./components/SummaryChart";
import {
  loadTransactions,
  saveTransactions,
  loadCategories,
  saveCategories,
} from "./utils/storage";
import { exportCSV } from "./utils/csv";

export default function App() {
  const [transactions, setTransactions] = useState(loadTransactions());
  const [categories, setCategories] = useState(loadCategories());
  const [filter, setFilter] = useState({
    q: "",
    category: "",
    type: "",
    sort: "date_desc",
  });

  useEffect(() => saveTransactions(transactions), [transactions]);
  useEffect(() => saveCategories(categories), [categories]);

  function addTx(tx) {
    setTransactions((prev) => [tx, ...prev]);
  }
  function deleteTx(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }
  function addCategory(name) {
    setCategories((prev) => [...prev, name]);
  }
  function removeCategory(name) {
    setCategories((prev) => prev.filter((c) => c !== name));
  }

  const filtered = useMemo(() => {
    let out = [...transactions];
    if (filter.q) {
      const q = filter.q.toLowerCase();
      out = out.filter(
        (t) =>
          (t.notes || "").toLowerCase().includes(q) ||
          (t.category || "").toLowerCase().includes(q)
      );
    }
    if (filter.category)
      out = out.filter((t) => t.category === filter.category);
    if (filter.type) out = out.filter((t) => t.type === filter.type);
    switch (filter.sort) {
      case "date_asc":
        out.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case "date_desc":
        out.sort((a, b) => b.date.localeCompare(a.date));
        break;
      case "amount_asc":
        out.sort((a, b) => a.amount - b.amount);
        break;
      case "amount_desc":
        out.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }
    return out;
  }, [transactions, filter]);

  return (
    <div className="container">
      <h1>Personal Finance Tracker</h1>
      <div className="grid">
        <div>
          <TransactionForm categories={categories} onAdd={addTx} />
          <CategoryManager
            categories={categories}
            onAddCategory={addCategory}
            onRemoveCategory={removeCategory}
          />
          <div className="card">
            <button onClick={() => exportCSV(transactions)}>Export CSV</button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  JSON.stringify(transactions, null, 2)
                );
                alert("JSON copied");
              }}
            >
              Copy JSON
            </button>
          </div>
        </div>

        <div>
          <Summary transactions={transactions} />
          <SummaryChart transactions={transactions} />
          <FiltersBar
            filter={filter}
            setFilter={setFilter}
            categories={categories}
          />
          <TransactionList transactions={filtered} onDelete={deleteTx} />
        </div>
      </div>
    </div>
  );
}
