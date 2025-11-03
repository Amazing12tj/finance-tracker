export function exportCSV(transactions) {
  if (!transactions || transactions.length === 0) {
    alert("No transactions to export");
    return;
  }
  const header = ["type,amount,date,category,notes"];
  const rows = transactions.map((t) =>
    [
      t.type,
      t.amount,
      t.date,
      `"${t.category || ""}"`,
      `"${t.notes || ""}"`,
    ].join(",")
  );
  const csv = header.concat(rows).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pft_transactions_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
