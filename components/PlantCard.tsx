import { IPlant } from "@/types/Plant";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@heroui/react";

import { getToxicityChipColor } from "./utils";

import { useRouter } from "next/router";
import { ToxicityStatus } from "@/types";

export const PlantCard = ({ plant }: { plant: IPlant }) => {
  const router = useRouter();

  return (
    <Card
      isPressable
      isHoverable
      onPress={() => router.push(`/plant/${plant.id}`)}
      className="w-full col-span-3"
    >
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full object-cover rounded-t-md rounded-b-none"
        src={plant.image}
      />
      <div className="absolute z-10 top-1 p-5">
        <Chip
          size="lg"
          color={getToxicityChipColor(plant.extraData.toxicityDescription)}
        >
          {plant.extraData.toxicityDescription === "Highly toxic"? "Toxic" : plant.extraData.toxicityDescription}
        </Chip>
      </div>
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <h4 className="font-bold text-xl">{plant.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <p className="text-tiny uppercase font-bold">{plant.scientificName}</p>
        <small className="text-default-500">{plant.family}</small>
      </CardBody>
    </Card>
  );
};
