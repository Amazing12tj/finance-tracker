import React from "react";

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) return <div className="card">No transactions</div>;
  return (
    <div className="card">
      <table className="tx-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.type}</td>
              <td>{tx.amount.toFixed(2)}</td>
              <td>{tx.category}</td>
              <td>{tx.notes}</td>
              <td>
                <button onClick={() => onDelete(tx.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
