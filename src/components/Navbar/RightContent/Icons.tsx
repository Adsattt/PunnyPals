import { Flex, Icon,Image } from "@chakra-ui/react";
import React from "react";
import { BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoNotificationsOutline
} from "react-icons/io5";

const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsChatDots} fontSize={20} />
        </Flex>
      </Flex>
      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Image src="/images/Notificationlogo.png" height="23px"
          marginTop={2}
          marginBottom={2} />
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Image src="/images/ic_round-plus.png" height="30px"
          marginTop={1}
          />
        </Flex>
      </>
    </Flex>
  );
};
export default Icons;
