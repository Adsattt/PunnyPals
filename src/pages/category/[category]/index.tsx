import { Post } from "@/src/atoms/postsAtom";
import PageNotFound from "@/src/components/Categories/PageNotFound";
import PageContent from "@/src/components/Layout/PageContent";
import CategoryPost from "@/src/components/LeftMenu/CategoryPost";
import PostLoader from "@/src/components/Post/PostLoader";
import PostItem from "@/src/components/Post/Postitem";
import { auth, firestore } from "@/src/firebase/clientApp";
import usePosts from "@/src/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import safeJsonStringify from "safe-json-stringify";

type CategoryPageProps = {
  postData: Post[];
};

const CategoryPage: React.FC<CategoryPageProps> = ({ postData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const { postStateValue, onVote, onDeletePost, onSelectPost } = usePosts();

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
      <CategoryPost />
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
