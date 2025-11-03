// src/__tests__/utils.test.js
import { describe, it, expect, beforeEach } from "vitest";
import { saveTransactions, loadTransactions } from "../utils/storage";

// ✅ Mock localStorage for Vitest (Node environment)
beforeEach(() => {
  const store = {};
  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
  };
});

describe("Storage Utils", () => {
  it("saves and loads transactions correctly", () => {
    const mockTx = [{ id: 1, amount: 500, type: "income" }];
    saveTransactions(mockTx);
    const result = loadTransactions();
    expect(result).toEqual(mockTx);
  });
});
