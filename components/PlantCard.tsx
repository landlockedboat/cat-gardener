import { Card, CardBody, CardHeader, Chip, Image } from "@heroui/react";
import { useRouter } from "next/router";

import { getToxicityChipColor } from "./utils";

import { IPlant } from "@/types/Plant";

export const PlantCard = ({ plant }: { plant: IPlant }) => {
  const router = useRouter();

  return (
    <Card
      isHoverable
      isPressable
      className="w-full col-span-3"
      onPress={() => router.push(`/plant/${plant.id}`)}
    >
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full object-cover rounded-t-md rounded-b-none"
        src={plant.image}
      />
      <div className="absolute z-10 top-1 p-5">
        <Chip
          color={getToxicityChipColor(plant.extraData.toxicityDescription)}
          size="lg"
        >
          {plant.extraData.toxicityDescription === "Highly toxic"
            ? "Toxic"
            : plant.extraData.toxicityDescription}
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
