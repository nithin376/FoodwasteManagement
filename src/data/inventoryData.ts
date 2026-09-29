export type Food = {
  id: number;
  name: string;
  category: string;
  quantity: string;
  expiry: string;
  days: number;
  storage: string;
  quality: string;
  risk: string;
  emoji: string;
};
export const inventoryData: Food[] = [
  {
    id: 1,
    name: "Basmati Rice",
    category: "Grains",
    quantity: "45 kg",
    expiry: "01 Oct 2026",
    days: 3,
    storage: "Dry storage",
    quality: "Good",
    risk: "Low",
    emoji: "🌾",
  },
  {
    id: 2,
    name: "Fresh Milk",
    category: "Dairy",
    quantity: "18 L",
    expiry: "29 Sep 2026",
    days: 1,
    storage: "Cold storage",
    quality: "Good",
    risk: "High",
    emoji: "🥛",
  },
  {
    id: 3,
    name: "Mixed Vegetables",
    category: "Produce",
    quantity: "32 kg",
    expiry: "30 Sep 2026",
    days: 2,
    storage: "Cold storage",
    quality: "Good",
    risk: "Medium",
    emoji: "🥦",
  },
  {
    id: 4,
    name: "Cooked Rice",
    category: "Prepared",
    quantity: "18 kg",
    expiry: "Today · 6:00 PM",
    days: 0,
    storage: "Kitchen 01",
    quality: "Fresh",
    risk: "Critical",
    emoji: "🍚",
  },
  {
    id: 5,
    name: "Vegetable Curry",
    category: "Prepared",
    quantity: "12 kg",
    expiry: "Today · 8:00 PM",
    days: 0,
    storage: "Kitchen 01",
    quality: "Fresh",
    risk: "High",
    emoji: "🥘",
  },
  {
    id: 6,
    name: "Whole Wheat Flour",
    category: "Grains",
    quantity: "60 kg",
    expiry: "12 Oct 2026",
    days: 14,
    storage: "Dry storage",
    quality: "Good",
    risk: "Low",
    emoji: "🌾",
  },
];
