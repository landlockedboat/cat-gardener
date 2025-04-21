import { Toxicity } from "@/types/Plant";

export const getToxicityChipColor = (toxicity: Toxicity) => {
  switch (toxicity) {
    case "Safe":
      return "success";
    case "Toxic":
      return "warning";
    case "Highly toxic":
      return "danger";
    default:
      return "default";
  }
};
