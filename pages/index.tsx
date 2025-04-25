import DefaultLayout from "@/layouts/default";
import { PlantCard } from "@/components/PlantCard";
import { useGlobalContext } from "@/context/context";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Pagination,
} from "@heroui/react";
import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { IPlant } from "@/types/Plant";

export default function IndexPage() {
  const { plants } = useGlobalContext();

  const [filterToxicToAnimals, setFilterToxicToAnimals] = useState<string[]>([
    "toxic to cats",
    "toxic to dogs",
    "toxic to horses",
  ]);
  const [filterToxicityStatus, setFilterToxicityStatus] = useState<string[]>([
    "highly toxic",
    "toxic",
    "safe",
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchContent, setSearchContent] = useState("");
  const pageSize = 20;

  const applyFilters = (plant: IPlant) => {
    if (!plant.extraData.searchableText.includes(searchContent)) {
      return false;
    }
    if (
      filterToxicToAnimals.find((e) =>
        plant.toxicity?.toLowerCase().includes(e)
      )
    ) {
      return true;
    }

    if (
      filterToxicityStatus.find((e) =>
        plant.extraData.toxicityDescription?.toLowerCase().includes(e)
      )
    ) {
      return true;
    }

    return false;
  };

  const filteredPlants = plants
    .filter((p) => applyFilters(p))
    .filter((p) => p.extraData.searchableText.includes(searchContent))
    .filter((p) => !filterToxicToAnimals.find((e) => p.toxicity?.includes(e)))
    .filter(
      (p) =>
        !filterToxicityStatus.find((e) =>
          p.extraData.toxicityDescription?.includes(e)
        )
    );

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
          <Accordion>
            <AccordionItem title="Filters" subtitle="Press to expand">
              <CheckboxGroup
                value={filterToxicToAnimals}
                onValueChange={setFilterToxicToAnimals}
                className="pb-5"
                label="Toxic to"
                orientation="horizontal"
              >
                <Checkbox value={"toxic to cats"}>Toxic to cats</Checkbox>
                <Checkbox value={"toxic to dogs"}>Toxic to dogs</Checkbox>
                <Checkbox value={"toxic to horses"}>Toxic to horses</Checkbox>
              </CheckboxGroup>
              <CheckboxGroup
                className="pb-5"
                label="Toxicity level"
                orientation="horizontal"
                value={filterToxicityStatus}
                onValueChange={setFilterToxicityStatus}
              >
                <Checkbox value={"highly toxic"}>Highly Toxic</Checkbox>
                <Checkbox value={"toxic"}>Toxic</Checkbox>
                <Checkbox value={"safe"}>Safe</Checkbox>
              </CheckboxGroup>
            </AccordionItem>
          </Accordion>
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
        <Divider className="col-span-12" />
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
