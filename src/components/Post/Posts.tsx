import { auth, firestore } from "@/src/firebase/clientApp";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Post } from "@/src/atoms/postsAtom";
import usePosts from "@/src/hooks/usePosts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  } = usePosts();

  const getPosts = async () => {
    try {
      setLoading(true);

      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("createdAt", "desc")
      );
      const postSnapshot = await getDocs(postQuery);

      const postData: Post[] = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postData);
      setPostStateValue((prev) => ({ ...prev, posts: postData }));
      console.log("getPost", postData);
    } catch (error: any) {
      console.log("getPost error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((item) => (
            <PostItem
            key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={undefined}
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
