import { Button, Flex, Icon, Image } from "@chakra-ui/react";
import React, { useRef } from "react";
import { MdClose, MdCloudUpload } from "react-icons/md";

type ImageUploadProps = {
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  selectFileRef: React.RefObject<HTMLInputElement>;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedFile,
  onSelectImage,
  selectFileRef,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Flex position="relative" justifyContent="flex-end">
            <Image
              src={selectedFile as string}
              maxWidth="400px"
              maxHeight="400px"
            />
            <Button
              position="absolute"
              top="8px"
              right="8px"
              size="12px"
              p={1}
              variant="solid"
              bg='gray.500'
            _hover={{bg: 'red.400'}}
              onClick={() => setSelectedFile("")}
            >
              <Icon as={MdClose} fontSize="16px" />
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          width="100%"
          direction="column"
        >
          <Icon as={MdCloudUpload} color="gray.300" fontSize="120px" />
          <Button
            variant="outline"
            colorScheme="blue"
            height="28px"
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload Image
          </Button>
          <input
            ref={selectedFileRef}
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
