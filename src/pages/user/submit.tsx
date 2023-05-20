import PageContent from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Post/NewPostForm";
import { auth } from "@/src/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const submit: React.FC = () => {
  const [user] = useAuthState(auth)
  return (
    <PageContent>
      <>
        <Box padding="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600} color="#33B6FF" fontSize="23px">
            Create a post
          </Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContent>
  );
};
export default submit;
