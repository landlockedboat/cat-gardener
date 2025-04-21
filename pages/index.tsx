import DefaultLayout from "@/layouts/default";
import { PlantCard } from "@/components/PlantCard";
import { useGlobalContext } from "@/context/context";

export default function IndexPage() {
  const { plants } = useGlobalContext();

  return (
    <DefaultLayout>
      <section className="gap-5 grid grid-cols-12 grid-rows-2 px-8 py-8">
        {plants.slice(0, 10).map((plant) => (
          <PlantCard key={plant.name} plant={plant}/>
        ))}
      </section>
    </DefaultLayout>
  );
}
