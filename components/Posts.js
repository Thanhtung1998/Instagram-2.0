import Post from "./Post"
import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";

function Posts() {

    // const posts = [
    //     {
    //         id: "123",
    //         username: "thanh tung",
    //         userImg: "https://i.pinimg.com/564x/e4/cb/c4/e4cbc4c0569bc6c6f316b02abd438a30.jpg",
    //         img: "https://i.pinimg.com/564x/e4/cb/c4/e4cbc4c0569bc6c6f316b02abd438a30.jpg",
    //         caption: "SUBSCRIBE AND DESTROY THE LIKE BUTTON FOR THE YT algorithm",
    //     },
    //     {
    //         id: "234",
    //         username: "thanh tung",
    //         userImg: "https://i.pinimg.com/564x/e4/cb/c4/e4cbc4c0569bc6c6f316b02abd438a30.jpg",
    //         img: "https://i.pinimg.com/564x/e4/cb/c4/e4cbc4c0569bc6c6f316b02abd438a30.jpg",
    //         caption: "SUBSCRIBE AND DESTROY THE LIKE BUTTON FOR THE YT algorithm",
    //     }
    // ]

    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
                setPosts(snapshot.docs);
            }),

        [db]
    );

    console.log(posts)


    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} id={post.id} username={post.data().username} img={post.data().image} caption={post.data().caption} userImg={post.data().profileImg} />
            ))}
        </div>
    )
}

export default Posts
