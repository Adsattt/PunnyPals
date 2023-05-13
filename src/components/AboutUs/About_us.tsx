import { Flex, Icon,Input, Image, Box, Text, Stack } from "@chakra-ui/react";
import React from "react";
import { BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoNotificationsOutline
} from "react-icons/io5";

type AboutProps = {};

const About: React.FC<AboutProps>=({}) =>{
    return(
        <div>
        <Box position="sticky" top="14px">
            <Flex
            p={3}
            bg="white"
            borderRadius="10px 10px 0px 0px"
        >
            <Image src="/images/Category.png" height="18px"
            marginTop={1}
            marginLeft={2}
            />
            </Flex>
            
            <Flex
                justify="space-evenly"
                direction= "column"
                p={3}
                bg="White"
                borderRadius="0px 0px 10px 10px">
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
                        <Flex 
                         justify="space-evenly"
                         align="center">
                        <Image src="/images/generallogo.png" height="20px" mr={10} ml={3}>
                        </Image> 
                            <Flex mr={10}>
                            <Text> General</Text>  
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
                        <Flex 
                         justify="space-evenly"
                         align="center">
                        <Image src="/images/pkulogo.png" height="18px" mr={10} ml={3}>
                        </Image> 
                            <Text>PKU</Text>  
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
                        <Flex 
                         justify="space-evenly"
                         align="center">
                        <Image src="/images/ilkomlogo.png" height="28px" mr={9} ml={2}>
                        </Image> 
                            <Text>Ilkom</Text>  
                        </Flex>
                    </Flex> 
                </Stack>
            </Flex>
        </Box>
        </div>
    )
}
export default About;