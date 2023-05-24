import React, { useEffect, useState } from 'react';

type PostsProps = {
    
};

const Posts:React.FC<PostsProps> = () => {
    // useAuthState
    const [loading, setLoading] = useState(false);

    const getPosts = async () => {};

    useEffect(() => {
        getPosts();
    }, []);
    

    return <div>Have a good coding</div>
}
export default Posts;