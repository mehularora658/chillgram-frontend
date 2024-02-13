import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${url}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        const data = await response.json();
        const updatedData = [...data].reverse()
        dispatch(setPosts({ posts: updatedData }));
    }

    const getUserPosts = async () => {
        const url = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${url}/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        const data = await response.json();
        const updatedData = [...data].reverse()
        dispatch(setPosts({ posts: updatedData }));
    }
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )

};

export default PostsWidget;