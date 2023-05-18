import { Flex, Icon, Input } from "@chakra-ui/react";
import { auth } from "@/src/firebase/clientApp";
import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import submit from "@/src/pages/user/submit";

type CreatePostProps = {};

const CreatePostLink: React.FC<CreatePostProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState  = useSetRecoilState(authModalState);
  const onClick = () => {
    // Could check for user to open auth modal before redirecting to submit
    if(!user){
        setAuthModalState({open: true, view: "login"});
        return;
    }
    const{} = router.query;
        router.push(`/submit`)
  };
  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={10}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
     <Image src="/images/Profile.png" height="35px" mr={5} />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.300"
        borderColor="gray.200"
        height="36px"
        borderRadius={100}
        mr={4}
        onClick={onClick}
      />
      <Image src="/images/image.svg" height="25px" mr={4} />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  );
};
export default CreatePostLink;