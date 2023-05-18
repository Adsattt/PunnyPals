import PageContent from "@/src/components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@/src/components/Post/NewPostForm";
import React from "react";
const submit: React.FC = () => {
  return (
    <PageContent>
      <>
        <Box padding="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600} color="#33B6FF" fontSize="23px">
            Create a post
          </Text>
        </Box>
        <NewPostForm />
      </>
      <></>
    </PageContent>
  );
};
export default submit;
