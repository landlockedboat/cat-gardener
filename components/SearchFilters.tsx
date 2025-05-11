import { useGlobalContext } from "@/context/context";
import { Switch } from "@heroui/react";

export const SearchFilters = () => {
  const {
    filterToxicToAnimals,
    filterToxicityStatus,
    toggleFilterToxicToAnimals,
    toggleFilterToxicityStatus,
  } = useGlobalContext();

  return (
    <div className="col-span-12 flex gap-3 justify-between">
      <Switch
        color="success"
        isSelected={filterToxicityStatus.includes("safe")}
        onValueChange={() => toggleFilterToxicityStatus("safe")}
      >
        Show safe plants
      </Switch>
      <div className="flex gap-3">
        <Switch
          color="danger"
          isSelected={filterToxicityStatus.includes("toxic")}
          onValueChange={() => toggleFilterToxicityStatus("toxic")}
        >
          Show toxic plants
        </Switch>
        <Switch
          size="md"
          color="warning"
          isSelected={filterToxicToAnimals.includes("toxic to cats")}
          onValueChange={() => toggleFilterToxicToAnimals("toxic to cats")}
        >
          Toxic to cats
        </Switch>
        <Switch
          size="md"
          color="warning"
          isSelected={filterToxicToAnimals.includes("toxic to dogs")}
          onValueChange={() => toggleFilterToxicToAnimals("toxic to dogs")}
        >
          Toxic to dogs
        </Switch>
        <Switch
          size="md"
          color="warning"
          isSelected={filterToxicToAnimals.includes("toxic to horses")}
          onValueChange={() => toggleFilterToxicToAnimals("toxic to horses")}
        >
          Toxic to horses
        </Switch>
      </div>
    </div>
  );
};
