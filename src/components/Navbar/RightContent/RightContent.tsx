import { Button, Flex, Menu } from "@chakra-ui/react";
import React from "react";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import { auth } from "@/src/firebase/clientApp";
import { signOut, User } from "firebase/auth";

type RightContentProps = {
  user ?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          <Button onClick={() => signOut(auth)}>Log Out</Button>
        ) : (
          <AuthButtons />
        )}
        {/* <Menu /> */}
      </Flex>
    </>
  );
};
export default RightContent;
