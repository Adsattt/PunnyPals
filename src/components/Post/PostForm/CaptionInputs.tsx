import { Input } from "@chakra-ui/react";
import React from "react";

type CaptionInputsProps = {
  captionInputs: {
    caption: string;
  };
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const CaptionInputs: React.FC<CaptionInputsProps> = ({
  captionInputs,
  onchange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Input
      name="caption"
      value={captionInputs.caption}
      onChange={onchange}
      bg="gray.200"
      fontSize="10pt"
      border="1px solid"
      borderColor="#6F6F70"
      borderRadius={6}
      placeholder="Write your caption here..."
      _placeholder={{ color: "gray.500" }}
      _focus={{
        outline: "none",
        bg: "white",
        border: "1px solid",
        borderColor: "black",
      }}
      _hover={{ bg: "white", borderColor: "blue.500" }}
    />
  );
};
export default CaptionInputs;
