import { Box, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import About from "../components/AboutUs/About_us";
import Category from "../components/Categories/Category";
import CreatePostLink from "../components/Layout/CreatePostLink";
import PageContent from "../components/Layout/PageContent";
import Posts from "../components/Post/Posts";
import CategoryPost from "../components/LeftMenu/CategoryPost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { use, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import usePosts from "../hooks/usePosts";
import { Post, PostVote } from "../atoms/postsAtom";
import PostLoader from "../components/Post/PostLoader";
import PostItem from "../components/Post/Postitem";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      console.log("postQuery: ", postQuery);

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("NonUserHomeFeed posts: ", posts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildNonUserHomeFeed error: ", error);
    }
    setLoading(false);
  };

  const buildNonUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      console.log("postQuery: ", postQuery);

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("NonUserHomeFeed posts: ", posts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildNonUserHomeFeed error: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && !loadingUser) buildUserHomeFeed();
  }, [user, loadingUser]);

  useEffect(() => {
    if (!user && !loadingUser) buildNonUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <>
      <PageContent>
        <>
          <CreatePostLink />
          {loading ? (
            <PostLoader />
          ) : (
            <Stack>
              {postStateValue.posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  userIsCreator={user?.uid === post.creatorId}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (vote) => vote.postId === post.id
                    )?.voteValue
                  }
                  onSelectPost={onSelectPost}
                  onDeletePost={onDeletePost}
                  onVote={onVote}
                />
              ))}
            </Stack>
          )}
          {/* <Posts /> */}
        </>
        <>
          <Stack spacing={4} position="sticky">
            <CategoryPost />
            <About />
          </Stack>
        </>
      </PageContent>
    </>
  );
};

export default Home;
