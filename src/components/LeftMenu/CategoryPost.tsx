import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type CategoryPostProps = {};

const CategoryPost: React.FC<CategoryPostProps> = () => {
  const router = useRouter();
  const selectedCategory = router.query.category as string;

  const onClickCategory = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <Flex bg="white" borderRadius={6} direction="column">
      <Flex p="10px 20px 10px 20px" width="100%">
        <Text fontWeight={600} fontSize="14pt" color="#33B6FF">
          Category
        </Text>
      </Flex>
      <Flex justify="center" p={3} pb={5}>
        <Stack
          direction="column"
          spacing={2}
          width="100%"
          alignContent="center"
        >
          <Flex
            bg={selectedCategory === "General" ? "blue.400" : "gray.100"}
            direction="row"
            align="center"
            color={selectedCategory === "General" ? "white" : "gray.600"}
            _hover={{ bg: "blue.400", color: "white" }}
            borderRadius={3}
            pt={1}
            pb={1}
            cursor="pointer"
            onClick={() => onClickCategory("General")}
            sx={{
              "&:hover img": {
                filter: "brightness(0) invert(1)",
              },
              "&.active img": {
                filter: "brightness(0) invert(1)",
              },
            }}
            className={selectedCategory === "General" ? "active" : ""}
          >
            <Image src="/icons/general.svg" height="18px" ml={5} mr={10} />
            <Text fontWeight={550}>General</Text>
          </Flex>
          <Flex
            bg={selectedCategory === "PKU" ? "blue.400" : "gray.100"}
            direction="row"
            align="center"
            color={selectedCategory === "PKU" ? "white" : "gray.600"}
            _hover={{ bg: "blue.400", color: "white" }}
            borderRadius={3}
            pt={1}
            pb={1}
            cursor="pointer"
            onClick={() => onClickCategory("PKU")}
            sx={{
              "&:hover img": {
                filter: "brightness(0) invert(1)",
              },
              "&.active img": {
                filter: "brightness(0) invert(1)",
              },
            }}
            className={selectedCategory === "PKU" ? "active" : ""}
          >
            <Image src="/icons/pku.svg" height="18px" ml={5} mr={10} />
            <Text fontWeight={550}>PKU</Text>
          </Flex>
          <Flex
            bg={selectedCategory === "Ilkom" ? "blue.400" : "gray.100"}
            direction="row"
            align="center"
            color={selectedCategory === "Ilkom" ? "white" : "gray.600"}
            _hover={{ bg: "blue.400", color: "white" }}
            borderRadius={3}
            pt={1}
            pb={1}
            cursor="pointer"
            onClick={() => onClickCategory("Ilkom")}
            sx={{
              "&:hover img": {
                filter: "brightness(0) invert(1)",
              },
              "&.active img": {
                filter: "brightness(0) invert(1)",
              },
            }}
            className={selectedCategory === "Ilkom" ? "active" : ""}
          >
            <Image src="/icons/ilkom.svg" height="18px" ml={5} mr={10} />
            <Text fontWeight={550} ml={1}>
              Ilkom
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default CategoryPost;
