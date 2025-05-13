import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { useGlobalContext } from "@/context/context";

export const SearchFilters = () => {
  const {
    filterToxicToAnimals,
    filterToxicityStatus,
    toggleFilterToxicToAnimals,
    toggleFilterToxicityStatus,
  } = useGlobalContext();

  const SwitchFilters = ({ newClassName }: { newClassName: string }) => {
    return (
      <div className={newClassName}>
        <Switch
          color="success"
          isSelected={filterToxicityStatus.includes("safe")}
          onValueChange={() => toggleFilterToxicityStatus("safe")}
        >
          Show safe plants
        </Switch>
        <div className="flex md:flex-row flex-col md:gap-3 gap-5">
          <Switch
            color="danger"
            isSelected={filterToxicityStatus.includes("toxic")}
            onValueChange={() => toggleFilterToxicityStatus("toxic")}
          >
            Show toxic plants
          </Switch>
          <Switch
            color="warning"
            isSelected={filterToxicToAnimals.includes("toxic to cats")}
            onValueChange={() => toggleFilterToxicToAnimals("toxic to cats")}
          >
            Toxic to cats
          </Switch>
          <Switch
            color="warning"
            isSelected={filterToxicToAnimals.includes("toxic to dogs")}
            onValueChange={() => toggleFilterToxicToAnimals("toxic to dogs")}
          >
            Toxic to dogs
          </Switch>
          <Switch
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getActiveFilters = () => {
    return filterToxicToAnimals.length + filterToxicityStatus.length;
  };

  return (
    <div className="md:col-span-12 col-span-3 flex">
      <SwitchFilters newClassName="md:col-span-12 hidden col-span-3 md:flex gap-3 justify-between" />
      <Badge
        className={`md:hidden flex ${getActiveFilters() === 0 && "hidden"} `}
        color="primary"
        content={getActiveFilters()}
        showOutline={false}
        size="lg"
      >
        <Button
          className="md:hidden flex"
          startContent={<Icon className="h-4 w-4" icon="lucide:filter" />}
          onPress={onOpen}
        >
          Filters
        </Button>
      </Badge>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
              <ModalBody>
                <SwitchFilters newClassName="flex flex-col gap-3" />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
