export const monthly = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"].map(
  (month, i) => ({
    month,
    waste: [340, 290, 245, 210, 165, 120][i],
    redistributed: [420, 580, 720, 890, 1050, 1240][i],
    carbon: [0.5, 0.7, 0.9, 1.2, 1.5, 1.8][i],
    efficiency: [52, 59, 65, 71, 77, 82][i],
  }),
);
export const categories = [
  { name: "Prepared meals", value: 42, fill: "#195b45" },
  { name: "Produce", value: 28, fill: "#8dbd78" },
  { name: "Dairy", value: 18, fill: "#e7b978" },
  { name: "Grains", value: 12, fill: "#d7e5d0" },
];
