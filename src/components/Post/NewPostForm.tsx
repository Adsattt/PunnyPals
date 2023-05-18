import { UserProfile } from "@/src/atoms/usersAtom";
import { Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

type NewPostFormProps = {
  userData: UserProfile;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ userData }) => {
  const [textInputs, setTextInputs] = useState({
    title: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();

  const handleCreatePost = async () => {};

  const onSelectImage = () => {};

  const onTextChange = () => {};

  return (
    <Flex direction="column" bg="white" borderRadius={6} mt={2}>
      <Flex width="95%" border="1px solid red">
        <Icon as={FaUserCircle} color="#33B6FF" fontSize={56} mt={4} ml={4} mr={4}/>
        <Flex>
          <Flex direction='column' mt={4}>
            <Text fontWeight={600} fontSize='20px' color='#33B6FF'>
              Name
            </Text>
            <Text mb={1}>
              @username
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
