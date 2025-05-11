import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { useGlobalContext } from "@/context/context";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
} from "@heroui/react";
import { IPlant } from "@/types/Plant";
import { getToxicityChipColor } from "@/components/utils";
import { Icon } from "@iconify/react";

export default function PlantPage() {
  const router = useRouter();
  const { plants } = useGlobalContext();

  const [plant, setPlant] = useState<IPlant>();

  useEffect(() => {
    if (!plants || !router.isReady) {
      return;
    }

    const newPlant = plants.find((p) => p.id === router.query.name);

    if (newPlant) {
      setPlant(newPlant);
    }
  }, [plants, router]);

  console.log(plant);

  if (!plant) {
    return "";
  }

  const toxicityColor = getToxicityChipColor(
    plant.extraData.toxicityDescription
  );

  return (
    <DefaultLayout>
      <section className="flex flex-col justify-center w-full gap-3">
        <div><button className="flex gap-3 items-center"> <Icon className="md:h-6 md:w-6 w-4 h-4" icon="lucide:arrow-left" /> Back</button></div>
        <Card className="w-full gap-5 max-w-[800px]">
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full object-cover rounded-t-md rounded-b-none"
            src={plant.image}
          />
          <div className="absolute z-10 top-1 p-5">
            <Chip size="lg" color={toxicityColor}>
              {plant.extraData.toxicityDescription}
            </Chip>
          </div>
          <CardHeader className="pb-0 pt-2 px-4 flex-col gap-3 items-start">
            <i className="font-bold text-2xl text-default-300">
              {plant.scientificName}
            </i>
            <h1 className={title()}>{plant.name}</h1>
            <div>Family <b>{plant.family}</b></div>
            <div className="flex flex-wrap gap-2">
              {plant.extraData.toxicToCats && (
                <Chip size="lg" color={toxicityColor}>
                  Cats
                </Chip>
              )}
              {plant.extraData.toxicToDogs && (
                <Chip size="lg" color={toxicityColor}>
                  Dogs
                </Chip>
              )}
              {plant.extraData.toxicToHorses && (
                <Chip size="lg" color={toxicityColor}>
                  Horses
                </Chip>
              )}
            </div>

          </CardHeader>
          {plant.extraData.toxicityDescription !== "Safe" && (
            <CardBody className="flex flex-col gap-5 p-5">
              <Divider />
              <div className="font-bold text-2xl">Toxic principles</div>
              <div className="flex flex-wrap gap-2">
                <Chip size="lg">{plant.toxicPrinciples}</Chip>
              </div>
              <div className="font-bold text-2xl">Clinical signs</div>
              <div className="flex flex-wrap gap-2">
                {plant.clinicalSigns &&
                  plant.clinicalSigns
                    .toUpperCase()
                    .replace(" ", "")
                    .replace(".", "")
                    .split(",")
                    .map((e) => <Chip key={e}>{e}</Chip>)}
              </div>
            </CardBody>
          )}
        </Card>
      </section>
    </DefaultLayout>
  );
}
