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

export const PlantCard = ({ plant }: { plant: IPlant }) => {
  const router = useRouter();

  return (
    <Card
      isPressable
      isHoverable
      onPress={() => router.push(`/plant/${plant.id}`)}
      className="w-full col-span-3"
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{plant.scientificName}</p>
        <small className="text-default-500">{plant.family}</small>
        <h4 className="font-bold text-large">{plant.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={plant.image}
          width={270}
        />
      </CardBody>
      <CardFooter>
        <Chip color={getToxicityChipColor(plant.extraData.toxicityDescription)}>
          {plant.extraData.toxicityDescription}
        </Chip>
      </CardFooter>
    </Card>
  );
};
