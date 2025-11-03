import React from "react";

export default function FiltersBar({ filter, setFilter, categories }) {
  return (
    <div className="card filters">
      <div>
        <label>Search</label>
        <input
          value={filter.q}
          onChange={(e) => setFilter({ ...filter, q: e.target.value })}
          placeholder="notes or category"
        />
      </div>
      <div>
        <label>Category</label>
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Type</label>
        <select
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div>
        <label>Sort</label>
        <select
          value={filter.sort}
          onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
        >
          <option value="date_desc">Date ⬇️</option>
          <option value="date_asc">Date ⬆️</option>
          <option value="amount_desc">Amount ⬇️</option>
          <option value="amount_asc">Amount ⬆️</option>
        </select>
      </div>
    </div>
  );
}
