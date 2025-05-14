import { Divider, Input, Link, Pagination } from "@heroui/react";
import { Icon } from "@iconify/react";

import { IPlant } from "@/types/Plant";
import DefaultLayout from "@/layouts/default";
import { SearchIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { PlantCard } from "@/components/PlantCard";
import { useGlobalContext } from "@/context/context";
import { SearchFilters } from "@/components/SearchFilters";
import { siteConfig } from "@/config/site";

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
    if (!plant.name.toLowerCase().includes(searchContent.toLowerCase())) {
      return false;
    }

    // If no filters are active, we can just end
    if (
      filterToxicityStatus.length === 0 &&
      filterToxicToAnimals.length === 0
    ) {
      return true;
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
      plant.toxicity?.toLowerCase().includes(e),
    );
  };

  const filteredPlants = plants
    .filter((p) => applyFilters(p))
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  const paginatedPlants = filteredPlants.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const numPages = Math.ceil(filteredPlants.length / pageSize);

  return (
    <DefaultLayout>
      <div className="w-full text-center">
        <h1 className={title()}>{siteConfig.name}</h1>
        <h1 className={subtitle()}>{siteConfig.description}</h1>
      </div>

      <section className="gap-5 grid md:grid-cols-12 grid-cols-3 px-8 py-8">
        <div className="md:col-span-10 md:col-start-2 col-span-3 col-start-1">
          <Input
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
            value={searchContent}
            onValueChange={setSearchContent}
          />
        </div>

        <SearchFilters />

        <Divider className="md:col-span-12 col-span-3" />
        <div className="md:col-span-12 col-span-3 flex justify-between">
          <span>{filteredPlants.length} Results</span>
          <Link
            isExternal
            className={`flex items-center gap-1.5 text-foreground-400 hover:text-primary transition-colors mt-1  p-3 pt-0 pr-3`}
            href={`https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants`}
            size="sm"
            underline="hover"
          >
            <Icon icon="lucide:link" />
            <span>Source: ASPCA</span>
          </Link>
        </div>

        {paginatedPlants.map((plant) => (
          <PlantCard key={plant.name} plant={plant} />
        ))}
      </section>

      <div className="w-full flex justify-center">
        <Pagination
          isCompact
          page={currentPage}
          total={numPages}
          onChange={setCurrentPage}
        />
      </div>
    </DefaultLayout>
  );
}
