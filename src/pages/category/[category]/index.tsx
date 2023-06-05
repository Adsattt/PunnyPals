import { Post } from "@/src/atoms/postsAtom";
import About from "@/src/components/AboutUs/About_us";
import PageNotFound from "@/src/components/Categories/PageNotFound";
import PageContent from "@/src/components/Layout/PageContent";
import CategoryPost from "@/src/components/LeftMenu/CategoryPost";
import PostLoader from "@/src/components/Post/PostLoader";
import PostItem from "@/src/components/Post/Postitem";
import { auth, firestore } from "@/src/firebase/clientApp";
import usePosts from "@/src/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import safeJsonStringify from "safe-json-stringify";

type CategoryPageProps = {
  postData: Post[];
};

const CategoryPage: React.FC<CategoryPageProps> = ({ postData }) => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();

  const buildCategoryFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("createdAt", "asc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("buildCategoryFeed posts: ", posts);
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.error("buildCategoryFeed error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    buildCategoryFeed();
  },[loadingUser]);

  useEffect(() => {
    setLoading(true);
    const filteredPosts = postData.filter(
      (post) => post.category === router.query.category
    );
    setPosts(filteredPosts);
    setLoading(false);
  }, [postData]);

  if (!postData) {
    return <PageNotFound />;
  }
  console.log("HERE SOME POST", postData);

  return (
    <PageContent>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {posts.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === item.id)
                  ?.voteValue
              }
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </Stack>
      )}
      <>
        <Stack spacing={4} position="sticky">
          <CategoryPost />
          <About />
        </Stack>
      </>
    </PageContent>
  );
};

export default CategoryPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const selectedCategory = context.query.category as string;

    const postsRef = collection(firestore, "posts");
    const querySnapshot = await getDocs(
      query(postsRef, where("category", "==", selectedCategory))
    );

    if (querySnapshot.empty) {
      return {
        props: {
          postData: [],
        },
      };
    }

    const postData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        postData: JSON.parse(safeJsonStringify(postData)),
      },
    };
  } catch (error: any) {
    console.error("getServerSideProps error", error);
    return {
      props: {
        postData: null,
      },
    };
  }
}
