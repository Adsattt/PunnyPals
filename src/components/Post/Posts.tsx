import { firestore } from "@/src/firebase/clientApp";
import { async } from "@firebase/util";
import { collection, query } from "firebase/firestore";
import { type } from "os";
import React, { useEffect, useState } from "react";

type PostProps ={};

const Posts: React.FC<PostProps> = () => {

    const [loading, setloading] = useState(false);

    const getPost = async() =>{
        try{
            const postQuery = query(collection(firestore, 'posts'))
        }catch (error: any){
            console.log("getPost eeror", error.message);
        };
        
    }

    return <div>Posts</div>
};

export default Posts;