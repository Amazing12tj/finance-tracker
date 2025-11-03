const TX_KEY = "pft_transactions_v1";
const CAT_KEY = "pft_categories_v1";

export function loadTransactions() {
  try {
    return JSON.parse(localStorage.getItem(TX_KEY) || "[]");
  } catch {
    return [];
  }
}
export function saveTransactions(txs) {
  localStorage.setItem(TX_KEY, JSON.stringify(txs));
}

export function loadCategories() {
  try {
    const def = ["Salary", "Food", "Transport", "Entertainment", "Other"];
    return JSON.parse(localStorage.getItem(CAT_KEY) || JSON.stringify(def));
  } catch {
    return ["Other"];
  }
}
export function saveCategories(cats) {
  localStorage.setItem(CAT_KEY, JSON.stringify(cats));
}
