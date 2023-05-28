import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Post, PostVote, postState } from "../atoms/postsAtom";
import { deleteObject, ref } from "firebase/storage";
import { auth, firestore, storage } from "../firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { authModalState } from "../atoms/authModalAtom";
import { useRouter } from "next/router";

const usePosts = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [, setAuthModalState] = useRecoilState(authModalState);
  const router = useRouter();

  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number
  ) => {
    event.stopPropagation();
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const { voteStatus } = post;
    const existingVote = postStateValue.postVotes.find(
      (vote) => vote.postId === post.id
    );
    try {
      let voteChange = vote;
      const batch = writeBatch(firestore);
      const updatePost = { ...post };
      const updatedPost = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];

      // new vote
      if (!existingVote) {
        // create a new postVote document
        const postVoteRef = doc(
          collection(firestore, "users", `${user?.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id,
          voteValue: vote,
        };
        console.log("NEW VOTE!!", newVote);

        batch.set(postVoteRef, newVote);
        // add/subtrack 1 from voteStatus
        updatePost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      }
      // existing vote -they have voted on the post before
      else {
        const postVoteRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`
        );

        // removing their vote (up => neutral OR down => neutral)
        if (existingVote.voteValue === vote) {
          // add/subtrack 1 from voteStatus
          updatePost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );

          // delete postVote document
          batch.delete(postVoteRef);
          voteChange = -1;
        }
        // changing their vote (up => down OR down => up)
        else {
          // add/subtrack 2 from voteStatus
          updatePost.voteStatus = voteStatus + 2 * vote;

          const voteIndex = postStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );

          if (voteIndex !== -1) {
            updatedPostVotes[voteIndex] = {
              ...existingVote,
              voteValue: vote,
            };
          }

          // update postVote document
          batch.update(postVoteRef, { voteValue: vote });
          voteChange = 2 * vote;
        }
      }
      let updatedState = { ...postState, postVotes: updatedPostVotes };
      // udate state with updated values
      const postIndex = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );
      updatedPost[postIndex] = updatePost;
      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPost,
        postVotes: updatedPostVotes,
      }));

      if (postStateValue.selectedPost) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatePost,
        }));
      }

      // update post document
      const postRef = doc(firestore, "posts", post.id);
      batch.update(postRef, { voteStatus: updatePost.voteStatus });

      await batch.commit();
    } catch (error) {
      console.log("error voting on post", error);
    }
  };

  const onSelectPost = (post: Post) => {
    console.log("HERE IS STUFF", post);
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: { ...post },
    }));
    router.push(`/comments/${post.id}`);
  };

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // check if image & delete if exists
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      //dele post document from firestore
      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      // update state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error: any) {
      return false;
    }
  };

  useEffect(() => {
    const fetchVotes = async () => {
      const voteSnapshot = await getDocs(
        collection(firestore, "users", `${user?.uid}/postVotes`)
      );
      const postVotes = voteSnapshot.docs.map((doc) => doc.data());
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    };
    fetchVotes();
  }, [user]);

  useEffect(() => {
    // Logout or no authenticated user
    if (!user?.uid && !loadingUser) {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
      return;
    }
  }, [user, loadingUser]);

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
