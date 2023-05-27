import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image
} from "@chakra-ui/react";
import React, { useState } from "react";

type CategoryMenuProps = {
  onSelectCategory: (category: string) => void;
};

const CategoryMenu: React.FC<CategoryMenuProps> = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category); // Call the onSelectCategory prop with the selected category
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
          outLine: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _expanded={{ border: "1.5px solid", borderColor: "blue.500" }}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" fontWeight={700}>
            <Text fontSize="8pt">Category</Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => handleSelectCategory("General")}
          color={selectedCategory === "General" ? "blue.500" : "inherit"} // Mengubah warna teks jika menu dipilih
          _hover={{bg: "blue.300" }}
        >
          <Image src="/images/generallogo.png" height="18px" mr={9} ml={3}>
          </Image>
          General
        </MenuItem>
        <MenuItem
          onClick={() => handleSelectCategory("Ilkom")}
          color={selectedCategory === "Ilkom" ? "blue.500" : "inherit"} // Mengubah warna teks jika menu dipilih
          _hover={{bg: "blue.300" }}
        >
          <Image src="/images/ilkomlogo.png" height="25px" mr={9} ml={2}>
          </Image>
          Ilkom
        </MenuItem>
        <MenuItem
          onClick={() => handleSelectCategory("PKU")}
          color={selectedCategory === "PKU" ? "blue.500" : "inherit"} // Mengubah warna teks jika menu dipilih
          _hover={{bg: "blue.300" }}
        >
          <Image src="/images/pkulogo.png" height="16px" mr={9} ml={3}>
          </Image>
          PKU
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CategoryMenu;
