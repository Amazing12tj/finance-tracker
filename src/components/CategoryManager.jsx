import React, { useState } from "react";

export default function CategoryManager({
  categories,
  onAddCategory,
  onRemoveCategory,
}) {
  const [name, setName] = useState("");
  function add() {
    const n = name.trim();
    if (!n) return alert("Enter category name");
    if (categories.includes(n)) return alert("Category exists");
    onAddCategory(n);
    setName("");
  }
  return (
    <div className="card">
      <h3>Categories</h3>
      <ul>
        {categories.map((c) => (
          <li key={c}>
            {c} <button onClick={() => onRemoveCategory(c)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
}
