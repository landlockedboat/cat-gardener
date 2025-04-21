export type Toxicity = "Safe" | "Toxic" | "Highly toxic";

export interface IPlant {
  id: string;
  image: string;
  additionalCommonNames: string;
  scientificName: string;
  family: string;
  toxicity?: string;
  toxicPrinciples?: string;
  clinicalSigns?: string;
  name: string;
  nonToxicity?: string;
  thumb?: string;
  extraData: {
    toxicityDescription: Toxicity;
    toxicToCats: boolean;
    toxicToDogs: boolean;
    toxicToHorses: boolean;
    searchableText: string;
  };
}
