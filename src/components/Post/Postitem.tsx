import { Post } from "@/src/atoms/postsAtom";
import React from "react";
import { Flex } from "@chakra-ui/react";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onSelectPost: () => void;
  onDeletePost: () => {};
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  return (
    <Flex border='1px solid' bg='white'>
      {post.caption}
    </Flex>

  )
};
export default PostItem;
