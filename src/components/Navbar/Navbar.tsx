import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import Directory from "./Directory/Directory";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const handleImageClick = () => {
    router.push("/");
  };
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
      >
        <Image src="/images/punnypalsFace.svg" height="30px" cursor="pointer" onClick={handleImageClick} />
        <Image
          src="/images/punnypalsText.svg"
          height="20px"
          display={{ base: "none", md: "unset" }}
          ml="2"
          cursor="pointer"
          onClick={handleImageClick}
        />
      </Flex>
      {/* {user && <Directory />} */}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
