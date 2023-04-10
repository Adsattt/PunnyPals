import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { use } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth" mb={2}>
        <Image src="/images/facebooklogo.png" height="22px" mr={2} />
        Continue with Facebook
      </Button>
      {error && <Text>(error.message)</Text>}
    </Flex>
  );
};
export default OAuthButtons;