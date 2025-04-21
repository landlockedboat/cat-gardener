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

  return (
    <GlobalContext.Provider
      value={{
        plants,
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
