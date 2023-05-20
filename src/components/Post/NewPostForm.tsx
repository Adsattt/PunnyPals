import { UserProfile } from "@/src/atoms/usersAtom";
import { Button, Flex, Stack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import CategoryMenu from "./PostForm/CategoryMenu";
import CaptionInputs from "./PostForm/CaptionInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/src/atoms/postsAtom";
import { User } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/src/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type NewPostFormProps = {
  user: User;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [captionInputs, setCaptionInputs] = useState({
    caption: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();

  const selectFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    // create new post object => type Post
    const newPost: Post = {
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      caption: captionInputs.caption,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      id: "",
    };
    setLoading(true)
    try {
      // strore the post in database
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // check for selectedFile
      if (selectedFile) {
        // store in storage => getDownloadURL (return imageURL)
        const imageRef = ref(storage,`posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');
        const downloadURL = await getDownloadURL(imageRef)

        // update post doc by adding imageURL
        await updateDoc(postDocRef, {
          imageURL: downloadURL
        })
      }
    } catch (error: any) {
      console.log("handleCreatePost error", error.message)
    }
    setLoading(false)

    // redirect user back to the homePage using router
    
  };

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
      <Flex width="100%" p="40px 20px 20px 20px" direction="column">
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
        <Flex justify="flex-end">
          <Button
            height="34px"
            padding="0px 30px"
            mt={4}
            isLoading={loading}
            disabled={!captionInputs.caption}
            onClick={() => {}}
          >
            Post
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
