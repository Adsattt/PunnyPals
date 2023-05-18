import { auth, firestore } from "@/src/firebase/clientApp";
import { async } from "@firebase/util";
import { collection, query } from "firebase/firestore";
import { type } from "os";
import React, { useEffect, useState } from "react";
import {Flex, Box, Stack, Text} from "@chakra-ui/react";
import usePosts from "@/src/hooks/usePosts";
import PostItem from "./Postitem";
import { useAuthState } from "react-firebase-hooks/auth";


type PostProps ={};

const Posts: React.FC<PostProps> = () => {
    const [user] = useAuthState(auth);
    const [loading, setloading] = useState(false);
    const {postStateValue, setPostStateValue, onVote, onDeletePost,onSelectPost} = usePosts();
    const getPost = async() =>{
        try{
            const postQuery = query(collection(firestore, 'posts'))
        }catch (error: any){
            console.log("getPost eeror", error.message);
        };
        
    }

    return (
        <>
        {postStateValue.posts.map(item => 
        <PostItem
            post={item}
            userIsCreator={user?.uid == item.creatorId}
            userVoteValue={undefined}
            onVote={onVote}
            onSelectPost={onSelectPost}
            onDeletePost={onDeletePost}
            />)}
        </>
    )
};

export default Posts;