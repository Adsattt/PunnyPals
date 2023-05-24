import { Button, Flex, Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import CaptionInputs from "./PostForm/CaptionInputs";
import CategoryMenu from "./PostForm/CategoryMenu";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/src/atoms/postsAtom";
import { firestore, storage } from "@/src/firebase/clientApp";

type NewPostFormProps = {
  user: User;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [captionInputs, setCaptionInputs] = useState({
    caption: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(""); // Declare selectedCategory state variable
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const selectFileRef = useRef<HTMLInputElement>(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCreatePost = async () => {
    // create new post object => type Post
    const newPost: Post = {
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      caption: captionInputs.caption,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      category: selectedCategory,
    };
    setLoading(true);
    try {
      // store the post in database
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      console.log("HERE IS NEW POST ID", postDocRef.id);
      
      // check for selectedFile
      if (selectedFile) {
        // store in storage => getDownloadURL (return imageURL)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        // update post doc by adding imageURL
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
    } catch (error: any) {
      console.log("handleCreatePost error", error.message);
    }
    setLoading(false);

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
            <CategoryMenu onSelectCategory={handleSelectCategory} />
          </Flex>
          <Flex p="12px 8px" direction="column">
            <Stack spacing={3}>
              <CaptionInputs
                captionInputs={captionInputs}
                handleCreatePost={handleCreatePost}
                onchange={onTextChange}
                loading={loading}
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
            disabled={!captionInputs.caption || !selectedCategory} // Disable button jika caption atau category tidak terisi
            onClick={handleCreatePost} // Panggil handleCreatePost saat tombol ditekan
          >
            Post
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewPostForm;
