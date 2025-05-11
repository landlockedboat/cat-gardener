import { Toxicity } from "@/types/Plant";

export const getToxicityChipColor = (toxicity: Toxicity) => {
  switch (toxicity) {
    case "Safe":
      return "success";
    case "Toxic":
      return "danger";
    case "Highly toxic":
      return "danger";
    default:
      return "default";
  }
};

export const toggleValueInCollection = <T>(col: T[], value: T): T[] => {
  if (!col.includes(value)) {
    return [...col, value];
  }

  return [...col.filter((v) => v !== value)];
};
