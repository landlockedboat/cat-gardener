import { toggleValueInCollection } from "@/components/utils";
import { siteConfig } from "@/config/site";
import { ToxicityStatus, ToxicityToAnimals } from "@/types";
import { IPlant } from "@/types/Plant";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
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
  searchContent: string;
  setSearchContent: (content: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const useGetPlants = () => {
  const [plants, setPlants] = useState<IPlant[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${siteConfig.baseUrl}/plants.min.json`);
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

  const initialFilterToxicToAnimals: ToxicityToAnimals[] = [
    "toxic to cats",
    "toxic to dogs",
    "toxic to horses",
  ];

  const initialFilterToxicityStatus: ToxicityStatus[] = ["toxic", "safe"];

  const [filterToxicToAnimals, setFilterToxicToAnimals] = useState<
    ToxicityToAnimals[]
  >([...initialFilterToxicToAnimals]);
  const [filterToxicityStatus, setFilterToxicityStatus] = useState<
    ToxicityStatus[]
  >([...initialFilterToxicityStatus]);

  const [searchContent, setSearchContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchContent]);

  const createQueryString = useCallback(
    (queries: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      queries.forEach((q) => params.set(q.name, q.value));
      return params.toString();
    },
    [searchParams]
  );

  const updateSearchParameters = (
    newFilterToxicToAnimals: ToxicityToAnimals[],
    newFilterToxicityStatus: ToxicityStatus[]
  ) => {
    const newParametersAnimals = newFilterToxicToAnimals
      .map((f) => {
        return { name: f.split(" ")[2], value: "true" };
      })
      .concat(
        initialFilterToxicToAnimals
          .filter((i) => !newFilterToxicToAnimals.includes(i))
          .map((fi) => {
            return { name: fi.split(" ")[2], value: "false" };
          })
      );

    const newParametersToxicity = newFilterToxicityStatus
      .map((f) => {
        return { name: f, value: "true" };
      })
      .concat(
        initialFilterToxicityStatus
          .filter((i) => !newFilterToxicityStatus.includes(i))
          .map((fi) => {
            return { name: fi, value: "false" };
          })
      );

    router.push(
      pathname +
        "?" +
        createQueryString(newParametersAnimals.concat(newParametersToxicity))
    );
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (search) {
      setSearchContent(search.toString());
    }
  }, [router]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const newFilterToxicityStatus = initialFilterToxicityStatus.filter(
      (f) => searchParams.get(f) === "true"
    );
    const newFilterToxicToAnimals = initialFilterToxicToAnimals.filter(
      (f) => searchParams.get(f.split(" ")[2]) === "true"
    );

    setFilterToxicityStatus([...newFilterToxicityStatus]);
    setFilterToxicToAnimals([...newFilterToxicToAnimals]);
  }, [router]);

  const toggleFilterToxicToAnimals = (state: ToxicityToAnimals) => {
    const newFilterToxicToAnimals = toggleValueInCollection(
      filterToxicToAnimals,
      state
    );

    let newFilterToxicityStatus: ToxicityStatus[] = [...filterToxicityStatus];

    if (
      newFilterToxicToAnimals.length > 0 &&
      !filterToxicityStatus.includes("toxic")
    ) {
      newFilterToxicityStatus = [...filterToxicityStatus, "toxic"];
    } else if (
      newFilterToxicToAnimals.length === 0 &&
      filterToxicityStatus.includes("toxic")
    ) {
      newFilterToxicityStatus = [
        ...filterToxicityStatus.filter((f) => f !== "toxic"),
      ];
    }

    setCurrentPage(1);
    updateSearchParameters(newFilterToxicToAnimals, newFilterToxicityStatus);
  };

  const toggleFilterToxicityStatus = (state: ToxicityStatus) => {
    const newFilterToxicityStatus = toggleValueInCollection(
      filterToxicityStatus,
      state
    );

    let newFilterToxicToAnimals: ToxicityToAnimals[] = [
      ...filterToxicToAnimals,
    ];

    if (!newFilterToxicityStatus.includes("toxic")) {
      newFilterToxicToAnimals = [];
    }
    if (
      !filterToxicityStatus.includes("toxic") &&
      newFilterToxicityStatus.includes("toxic") &&
      filterToxicToAnimals.length === 0
    ) {
      newFilterToxicToAnimals = [...initialFilterToxicToAnimals];
    }

    setCurrentPage(1);
    updateSearchParameters(newFilterToxicToAnimals, newFilterToxicityStatus);
  };

  return (
    <GlobalContext.Provider
      value={{
        plants,
        filterToxicToAnimals,
        filterToxicityStatus,
        toggleFilterToxicToAnimals,
        toggleFilterToxicityStatus,
        searchContent,
        setSearchContent,
        currentPage,
        setCurrentPage,
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
