import { toggleValueInCollection } from "@/components/utils";
import { ToxicityStatus, ToxicityToAnimals } from "@/types";
import { IPlant } from "@/types/Plant";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface GlobalContextType {
  plants: IPlant[];
  filterToxicToAnimals: ToxicityToAnimals[];
  filterToxicityStatus: ToxicityStatus[];
  toggleFilterToxicToAnimals: (state: ToxicityToAnimals) => void;
  toggleFilterToxicityStatus: (state: ToxicityStatus) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const useGetPlants = () => {
  const [plants, setPlants] = useState<IPlant[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/plants.min.json`);
      const plantData: IPlant[] = await res.json();
      setPlants(plantData);
    })();
  }, []);

  return plants;
};

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const plants = useGetPlants();

  const [filterToxicToAnimals, setFilterToxicToAnimals] = useState<
    ToxicityToAnimals[]
  >(["toxic to cats", "toxic to dogs", "toxic to horses"]);
  const [filterToxicityStatus, setFilterToxicityStatus] = useState<
    ToxicityStatus[]
  >(["toxic", "safe"]);

  const toggleFilterToxicToAnimals = (state: ToxicityToAnimals) => {
    const newFilterToxicToAnimals = toggleValueInCollection(
      filterToxicToAnimals,
      state
    );

    if (
      newFilterToxicToAnimals.length > 0 &&
      !filterToxicityStatus.includes("toxic")
    ) {
      setFilterToxicityStatus([...filterToxicityStatus, "toxic"]);
    } else if (
      newFilterToxicToAnimals.length === 0 &&
      filterToxicityStatus.includes("toxic")
    ) {
      setFilterToxicityStatus([
        ...filterToxicityStatus.filter((f) => f !== "toxic"),
      ]);
    }

    setFilterToxicToAnimals(newFilterToxicToAnimals);
  };

  const toggleFilterToxicityStatus = (state: ToxicityStatus) => {
    const newFilterToxicityStatus = toggleValueInCollection(
      filterToxicityStatus,
      state
    );

    if (!newFilterToxicityStatus.includes("toxic")) {
      setFilterToxicToAnimals([]);
    }
    if (
      !filterToxicityStatus.includes("toxic") &&
      newFilterToxicityStatus.includes("toxic") &&
      filterToxicToAnimals.length === 0
    ) {
      setFilterToxicToAnimals([
        "toxic to cats",
        "toxic to dogs",
        "toxic to horses",
      ]);
    }

    setFilterToxicityStatus(newFilterToxicityStatus);
  };

  return (
    <GlobalContext.Provider
      value={{
        plants,
        filterToxicToAnimals,
        filterToxicityStatus,
        toggleFilterToxicToAnimals,
        toggleFilterToxicityStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a ClusterProvider");
  }
  return context;
};
