import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";

type CategoryMenuProps = {
  onSelectCategory: (category: string) => void;
};

const CategoryMenu: React.FC<CategoryMenuProps> = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const renderCategoryContent = (category: string) => {
    switch (category) {
      case "General":
        return (
          <>
            <Image src="/icons/general.svg" mr={2} height="12px" />
            <Text fontSize="10pt">General</Text>
          </>
        );
      case "Ilkom":
        return (
          <>
            <Image src="/icons/ilkom.svg" mr={2} height="12px" />
            <Text fontSize="10pt">Ilkom</Text>
          </>
        );
      case "PKU":
        return (
          <>
            <Image src="/icons/pku.svg" mr={2} height="12px" />
            <Text fontSize="10pt">PKU</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Menu>
      <MenuButton
        padding="0px 6px"
        height={7}
        borderWidth="1px"
        borderRadius={8}
        borderColor="#6F6F70"
        width="150px"
        cursor="pointer"
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _expanded={{ border: "1.5px solid", borderColor: "blue.500" }}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" fontWeight={700}>
            {selectedCategory ? (
              renderCategoryContent(selectedCategory)
            ) : (
              <Text fontSize="8pt">Category</Text>
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          fontSize="12pt"
          fontWeight={600}
          onClick={() => handleSelectCategory("General")}
          color={selectedCategory === "General" ? "blue.500" : "inherit"}
          _hover={{ bg: "blue.400", color: "white" }}
          sx={{
            "&:hover img": {
              filter: "brightness(0) invert(1)",
            },
          }}
        >
          <Flex direction="row" align="center" justifyItems="center">
            <Image src="/icons/general.svg" mr={2} height="16px" />
            <Text mb={1}>General</Text>
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="12pt"
          fontWeight={600}
          onClick={() => handleSelectCategory("Ilkom")}
          color={selectedCategory === "Ilkom" ? "blue.500" : "inherit"}
          _hover={{ bg: "blue.400", color: "white" }}
          sx={{
            "&:hover img": {
              filter: "brightness(0) invert(1)",
            },
          }}
        >
          <Flex direction="row" align="center" justifyItems="center">
            <Image src="/icons/ilkom.svg" mr={2} height="16px" />
            <Text>Ilkom</Text>
          </Flex>
        </MenuItem>
        <MenuItem
          fontSize="12pt"
          fontWeight={600}
          onClick={() => handleSelectCategory("PKU")}
          color={selectedCategory === "PKU" ? "blue.500" : "inherit"}
          _hover={{ bg: "blue.400", color: "white" }}
          sx={{
            "&:hover img": {
              filter: "brightness(0) invert(1)",
            },
          }}
        >
          <Flex direction="row" align="center" justifyItems="center">
            <Image src="/icons/pku.svg" mr={2} height="16px" />
            <Text>PKU</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CategoryMenu;
