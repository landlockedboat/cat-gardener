import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Link,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import NextHead from "next/head";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { IPlant } from "@/types/Plant";
import { getToxicityChipColor } from "@/components/utils";

interface PlantPageContentProps {
  plant: IPlant | undefined;
}

export default function PlantPageContent({ plant }: PlantPageContentProps) {
  const router = useRouter();

  if (!plant) {
    return "";
  }

  const toxicityColor = getToxicityChipColor(
    plant.extraData.toxicityDescription,
  );

  return (
    <DefaultLayout>
      <NextHead>
        <title key="title">{plant.name}</title>
        <meta key="og-title" content={plant.name} property="og:title" />
        <meta
          key="og-description"
          content={
            plant.name +
            " is " +
            plant.extraData.toxicityDescription +
            " for pets."
          }
          property="og:description"
        />
        <meta key="og-image" content={plant.image} property="og:image" />
      </NextHead>
      <section className="flex flex-col items-center w-full gap-3">
        <div className="w-full max-w-[800px]">
          <button
            className="flex gap-3 items-center"
            onClick={() => router.back()}
          >
            <Icon className="md:h-6 md:w-6 w-4 h-4" icon="lucide:arrow-left" />
            Back to plants list
          </button>
        </div>
        <Card className="w-full gap-5 max-w-[800px]">
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full object-cover rounded-t-md rounded-b-none"
            src={plant.image}
          />

          <div className="absolute z-10 top-1 p-5">
            <Chip color={toxicityColor} size="lg">
              {plant.extraData.toxicityDescription}
            </Chip>
          </div>
          <CardHeader className="pb-0 pt-2 px-4 flex-col gap-3 items-start">
            <div className="w-full flex justify-between flex-row">
              <i className="font-bold text-2xl text-default-300">
                {plant.scientificName}
              </i>
              <Link
                isExternal
                className={`flex items-center gap-1.5 text-foreground-400 hover:text-primary transition-colors mt-1 pr-3`}
                href={`https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants/${plant.id}`}
                size="sm"
                underline="hover"
              >
                <Icon icon="lucide:link" />
                <span>Source: ASPCA</span>
              </Link>
            </div>
            <h1 className={title()}>{plant.name}</h1>

            <div>
              Family <b>{plant.family}</b>
            </div>

            <div className="flex flex-wrap gap-2">
              {plant.extraData.toxicToCats && (
                <Chip color={toxicityColor} size="lg">
                  Cats
                </Chip>
              )}
              {plant.extraData.toxicToDogs && (
                <Chip color={toxicityColor} size="lg">
                  Dogs
                </Chip>
              )}
              {plant.extraData.toxicToHorses && (
                <Chip color={toxicityColor} size="lg">
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
