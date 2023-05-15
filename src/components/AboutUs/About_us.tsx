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
            <Image src="/images/AboutUs.png" height="15px"
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
                    // justify="md: space-between"
                    // align="center"
                    // bg="gray.100"
                    // height="30px"
                    // borderRadius={5}
                    // p={2}
                    // mb={2}
                    >
                        <Flex 
                         justify="space-evenly"
                         align="center">
                        <Image src="/images/infologo.png" height="28px" mr={9} ml={2} marginBottom={2}>
                        </Image> 
                            <Flex mr={10}>
                            <Text fontWeight={700}
                            fontSize = {12} marginBottom={2}
                            color="gray.600">  More Information</Text>  
                            </Flex>
                        </Flex>
                    </Flex> 
                </Stack>
                <Stack>
                    <Flex>
                        <Flex 
                         justify="space-evenly"
                         align="center">
                        <Image src="/images/messagelogo.png" height="27px" mr={9} ml={2} marginBottom={2}>
                        </Image> 
                            <Text fontWeight={700}
                            fontSize = {12} marginBottom={2} color="gray.600">Contacts</Text>  
                        </Flex>
                    </Flex> 
                </Stack>
                <Stack>
                    <Flex 
                    >
                        <Flex 
                         justify="space-evenly"
                         align="center">
                        <Image src="/images/notelogo.png" height="28px" mr={9} ml={2} marginBottom={2}>
                        </Image> 
                            <Text fontWeight={700}
                            fontSize = {12} marginBottom={2} color="gray.600">Term of Service</Text>  
                        </Flex>
                    </Flex> 
                </Stack>
                <Stack>
                    <Flex>
                        <Flex 
                         justify="space-evenly"
                         align="center">
                        <Image src="/images/privacylogo.png" height="28px" mr={9} ml={2} marginBottom={2}>
                        </Image> 
                            <Text fontWeight={700}
                            fontSize = {12} marginBottom={2} color="gray.600">Privacy policy</Text>  
                        </Flex>
                    </Flex> 
                </Stack>
            </Flex>
        </Box>
        </div>
    )
}
export default About;