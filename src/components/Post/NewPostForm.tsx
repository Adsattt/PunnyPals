import { UserProfile } from "@/src/atoms/usersAtom";
import { Flex, Stack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import CategoryMenu from "./PostForm/CategoryMenu";
import CaptionInputs from "./PostForm/CaptionInputs";
import ImageUpload from "./PostForm/ImageUpload";

type NewPostFormProps = {
  userData: UserProfile;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ userData }) => {
  const [captionInputs, setCaptionInputs] = useState({
    caption: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();

  const selectFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {};

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result.toString());
      }
    };
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setCaptionInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={6} mt={2}>
      <Flex
        width="100%"
        align="center"
        justify="center"
        p="40px 20px"
        direction="column"
      >
        <Flex
          width="100%"
          border="1px"
          borderColor="#6F6F70"
          borderRadius={6}
          direction="column"
        >
          <Flex
            bg="gray.200"
            p="12px 8px"
            borderTopRadius={6}
            borderBottom="1px"
            borderColor="#6F6F70"
          >
            <CategoryMenu />
          </Flex>
          <Flex p="12px 8px" direction="column">
            <Stack spacing={3}>
              <CaptionInputs
                captionInputs={captionInputs}
                handleCreatePost={handleCreatePost}
                onchange={onTextChange}
                loading={false}
              />
              <ImageUpload
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                selectFileRef={selectFileRef}
                onSelectImage={onSelectImage}
              />
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
