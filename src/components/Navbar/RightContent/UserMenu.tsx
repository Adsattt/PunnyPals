import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {Flex, Icon, Menu, MenuButton, MenuDivider,MenuItem,MenuList,Text, Image, Button} from "@chakra-ui/react";
import { User } from "@firebase/auth";
import { signOut } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { BsPersonX } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { useSetRecoilState } from "recoil";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Image src="/images/Profile.png" height="30px" mr={4} />
                <Flex
                  display={{ base: "none", md: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                </Flex>
              </>
            ) : (
              <Icon as={VscAccount} fontSize={24} mr={1} color="gray.600" />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={600}
              _hover={{ bg: "blue.400", color: "white" }}
            >

              <Flex align="center">
                <Image src="/images/Profile.png" height="20px" mr={4} /> Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={600}
              _hover={{ bg: "blue.400", color: "white" }}
              onClick={() => signOut(auth)}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} /> Logout
              </Flex>
            </MenuItem>
            <MenuItem
              fontSize="10pt"
              fontWeight={600}
              _hover={{ bg: "blue.400", color: "white" }}
            >
              
              <Flex align="center">
                <Icon as={BsPersonX} fontSize={20} mr={2} /> Delete Account
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={600}
              _hover={{ bg: "blue.400", color: "white" }}
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} /> Log In / Sign
                Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
