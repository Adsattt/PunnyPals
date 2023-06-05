import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

type CategoryProps = {};

const Category: React.FC<CategoryProps> = ({}) => {
  return (
    <Box position="sticky" top="14px">
      <Flex p={3} bg="white" borderRadius="10px 10px 0px 0px">
        <Image
          src="/images/Category.png"
          height="18px"
          marginTop={1}
          marginLeft={2}
        />
      </Flex>

      <Flex
        justify="space-evenly"
        direction="column"
        p={3}
        bg="White"
        borderRadius="0px 0px 10px 10px"
      >
        <Stack>
          <Flex
            justify="md: space-between"
            align="center"
            bg="gray.100"
            height="30px"
            borderRadius={5}
            p={2}
            mb={2}
          >
            <Flex justify="space-evenly" align="center" _hover={{bg: 'blue.400'}}>
              <Image
                src="/images/generallogo.png"
                height="20px"
                mr={10}
                ml={3}
              ></Image>
              <Flex _hover={{bg: 'blue.400'}}>
                <Text fontWeight={550} color="gray.600">
                  General
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Stack>
        <Stack>
          <Flex
            justify="md: space-between"
            align="center"
            bg="gray.100"
            height="30px"
            borderRadius={5}
            p={2}
            mb={2}
          >
            <Flex justify="space-evenly" align="center">
              <Image
                src="/images/pkulogo.png"
                height="18px"
                mr={10}
                ml={3}
              ></Image>
              <Text fontWeight={550} color="gray.600">
                PKU
              </Text>
            </Flex>
          </Flex>
        </Stack>
        <Stack>
          <Flex
            justify="md: space-between"
            align="center"
            bg="gray.100"
            height="30px"
            borderRadius={5}
            p={2}
            mb={2}
          >
            <Flex justify="space-evenly" align="center">
              <Image
                src="/images/ilkomlogo.png"
                height="28px"
                mr={9}
                ml={2}
              ></Image>
              <Text fontWeight={550} color="gray.600">
                Ilkom
              </Text>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};
export default Category;
