import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

export type Post = {
  id: string;
  communityImageURL?: string;
  creatorDisplayName: string; // change to authorDisplayText
  creatorId: string;
  caption: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  // currentUserVoteStatus?: {
  //   id: string;
  //   voteValue: number;
  // };
  // postIdx?: number;
  createdAt?: Timestamp;
  // editedAt?: Timestamp;
};

// export type PostVote = {
//   id?: string;
//   postId: string;
//   voteValue: number;
// };

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  // postVotes: PostVote[];
  // postsCache: {
  //   [key: string]: Post[];
  // };
  // postUpdateRequired: boolean;
}

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  // postVotes: [],
  // postsCache: {},
  // postUpdateRequired: true,
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
