import { describe, it, expect, beforeEach } from "vitest";
import { saveCategories, loadCategories } from "../utils/storage";

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

describe("Category Storage Utils", () => {
  it("saves and loads categories correctly", () => {
    const mockCats = ["Food", "Transport", "Utilities"];
    saveCategories(mockCats);
    const result = loadCategories();
    expect(result).toEqual(mockCats);
  });
});
