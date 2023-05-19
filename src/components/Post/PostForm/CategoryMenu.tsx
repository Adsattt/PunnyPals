import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import React from "react";

type CategoryMenuProps = {};

const CategoryMenu: React.FC<CategoryMenuProps> = () => {
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
        <MenuItem>General</MenuItem>
        <MenuItem>Ilkom</MenuItem>
        <MenuItem>PKU</MenuItem>
      </MenuList>
    </Menu>
  );
};
export default CategoryMenu;
