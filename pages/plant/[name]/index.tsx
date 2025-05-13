import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import PlantPageContent from "./PlantPageContent";

import { useGlobalContext } from "@/context/context";
import { IPlant } from "@/types/Plant";
import plants from "@/public/plants.min.json";

const isProd = process.env.NODE_ENV === "production";

function DynamicPlantPage() {
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

  return <PlantPageContent plant={plant} />;
}

interface StaticPlantPageProps {
  name: string;
}

function StaticPlantPage({ name }: StaticPlantPageProps) {
  const router = useRouter();
  const { plants } = useGlobalContext();

  const [plant, setPlant] = useState<IPlant>();

  useEffect(() => {
    if (!plants || !router.isReady) {
      return;
    }

    const newPlant = plants.find((p) => p.id === name);

    if (newPlant) {
      setPlant(newPlant);
    }
  }, [plants, router]);

  return <PlantPageContent plant={plant} />;
}

export const getStaticPathsInner: GetStaticPaths = async () => {
  const plantData = plants as IPlant[];

  const paths = plantData.map((plant) => ({
    params: { name: plant.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticPropsInner: GetStaticProps<
  StaticPlantPageProps
> = async ({ params }) => {
  const name = params?.name as string;

  return {
    props: {
      name: name,
    },
  };
};

const PlantPage = isProd ? StaticPlantPage : DynamicPlantPage;

export default PlantPage;

export const getStaticPaths = isProd ? getStaticPathsInner : null;
export const getStaticProps = isProd ? getStaticPropsInner : null;
