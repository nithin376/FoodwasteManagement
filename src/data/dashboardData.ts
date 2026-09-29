export const forecast = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
  (day, i) => ({
    day,
    actual: [1420, 1580, 1460, 1710, 1610, 1470, 1540][i],
    predicted: [1490, 1530, 1560, 1670, 1720, 1590, 1640][i],
    surplus: [110, 85, 125, 95, 126, 102, 98][i],
    prepared: [1680, 1750, 1800, 1920, 1850, 1720, 1790][i],
    consumed: [1420, 1580, 1460, 1710, 1610, 1470, 1540][i],
    wasted: [90, 65, 80, 50, 72, 58, 42][i],
    redistributed: [75, 90, 110, 82, 94, 120, 132][i],
  }),
);
export const alerts = [
  {
    title: "Milk batch expires tomorrow",
    detail: "Batch #M102 · 18 L · Cold storage",
    kind: "High",
  },
  {
    title: "18 kg cooked rice surplus detected",
    detail: "Kitchen 01 · Ready for redistribution",
    kind: "Medium",
  },
  {
    title: "NGO pickup scheduled",
    detail: "Community Kitchen A · Today, 2:30 PM",
    kind: "Scheduled",
  },
  {
    title: "Cold-storage temperature alert",
    detail: "Zone B · 8.1°C · Check refrigeration",
    kind: "Critical",
  },
];
