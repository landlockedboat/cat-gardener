import { IPlant } from "@/types/Plant";
import DefaultLayout from "@/layouts/default";
import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";

import { PlantCard } from "@/components/PlantCard";
import { useGlobalContext } from "@/context/context";
import { Divider, Input, Pagination } from "@heroui/react";
import { SearchFilters } from "@/components/SearchFilters";

export default function IndexPage() {
  const {
    plants,
    filterToxicToAnimals,
    filterToxicityStatus,
    searchContent,
    setSearchContent,
    currentPage,
    setCurrentPage,
  } = useGlobalContext();

  const pageSize = 20;

  const applyFilters = (plant: IPlant) => {
    if (
      !plant.extraData.searchableText
        .toLowerCase()
        .includes(searchContent.toLowerCase())
    ) {
      return false;
    }

    if (plant.extraData.toxicityDescription?.toLowerCase().includes("safe")) {
      return filterToxicityStatus.includes("safe");
    }

    // Only toxic plants remain now.
    // If user has not filtered by "toxic", we can stop now.
    if (!filterToxicityStatus.includes("toxic")) {
      return false;
    }

    // Filter toxic plants only now.
    return filterToxicToAnimals.find((e) =>
      plant.toxicity?.toLowerCase().includes(e)
    );
  };

  const filteredPlants = plants
    .filter((p) => applyFilters(p))
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  const paginatedPlants = filteredPlants.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const numPages = Math.ceil(filteredPlants.length / pageSize);

  return (
    <DefaultLayout>
      <div className="w-full text-center">
        <h1 className={title()}>Plants list</h1>
      </div>

      <section className="gap-5 grid md:grid-cols-12 grid-cols-3 px-8 py-8">
        <div className="md:col-span-10 md:col-start-2 col-span-3 col-start-1">
          <Input
            value={searchContent}
            onValueChange={setSearchContent}
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
          />
        </div>

        <SearchFilters />

        <Divider className="md:col-span-12 col-span-3" />
        <p className="md:col-span-12 col-span-3">
          {filteredPlants.length} Results
        </p>

        {paginatedPlants.map((plant) => (
          <PlantCard key={plant.name} plant={plant} />
        ))}
      </section>
      <div className="w-full flex justify-center">
        <Pagination
          showControls
          page={currentPage}
          onChange={setCurrentPage}
          total={numPages}
        />
      </div>
    </DefaultLayout>
  );
}
