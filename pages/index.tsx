import DefaultLayout from "@/layouts/default";
import { PlantCard } from "@/components/PlantCard";
import { useGlobalContext } from "@/context/context";
import { Divider, Input, Pagination } from "@heroui/react";
import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { IPlant } from "@/types/Plant";
import { SearchFilters } from "@/components/SearchFilters";

export default function IndexPage() {
  const { plants, filterToxicToAnimals, filterToxicityStatus } =
    useGlobalContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchContent, setSearchContent] = useState("");
  const pageSize = 20;

  const applyFilters = (plant: IPlant) => {
    if (!plant.extraData.searchableText.includes(searchContent)) {
      return false;
    }

    if (
      plant.extraData.toxicityDescription?.toLowerCase().includes("safe") &&
      filterToxicityStatus.includes("safe")
    ) {
      return true;
    }

    // Only toxic plants remain now.
    // If user has not filtered by "toxic", we can stop now.
    if (!filterToxicityStatus.includes("toxic")) {
      return false;
    }

    // Filter toxic plants only now.
    if (
      filterToxicToAnimals.length > 0 &&
      !filterToxicToAnimals.find((e) =>
        plant.toxicity?.toLowerCase().includes(e)
      )
    ) {
      return false;
    }

    return true;
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

      <section className="gap-5 grid grid-cols-12 px-8 py-8">
        <div className="col-span-10 col-start-2">
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

        <Divider className="col-span-12" />
        <p className="col-span-12">{filteredPlants.length} Results</p>

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
