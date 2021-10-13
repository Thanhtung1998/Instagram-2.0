import {
    DotsHorizontalIcon,
    BookmarkIcon,
    HeartIcon,
    PaperAirplaneIcon,
    EmojiHappyIcon,
    ChatIcon
} from '@heroicons/react/outline'

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"

import { useSession } from 'next-auth/react';

import { useState, useEffect } from 'react';
import Moment from 'react-moment'

import { onSnapshot, query, orderBy, addDoc, collection, serverTimestamp, setDoc, deleteDoc, doc } from '@firebase/firestore'
import { db } from "../firebase"

function Post({ id, username, img, userImg, caption }) {

    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() =>
        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), snapshot => setComments(snapshot.docs))
        , [db, id])

    useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'likes')), snapshot => setLikes(snapshot.docs)),
        [db, id])

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
    }, [likes])

    const likePost = async (e) => {

        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session?.user?.username
            });
        }

    }

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session?.user?.name,
            profileImg: session?.user?.image,
            timestamp: serverTimestamp(),
        })
        setComment("");
    }

    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* Header */}
            <div className="flex items-center p-5">
                <img className="rounded-full h-12 w-12 object-contain p-1 mr-3 border cursor-pointer" src={userImg} alt="img user" />
                <p className="flex-1 font-bold">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>
            {/* Img */}
            <img src={img} className="object-cover w-full"
                alt="" />
            {/* Button */}
            {session && (
                <div className="flex justify-between px-4 pt-4">
                    <div className="flex items-center space-x-4">
                        {hasLiked ? (<HeartIconFilled onClick={likePost} className="btn text-red-500" />) : (<HeartIcon onClick={likePost} className="btn" />)}
                        <svg aria-label="Bình luận" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
                        {/* <ChatIcon className="btn" /> */}
                        <svg aria-label="Chia sẻ bài viết" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                        {/* <PaperAirplaneIcon className="btn" /> */}
                    </div>

                    <svg aria-label="Lưu" class="_8-yf5 " color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                    {/* <BookmarkIcon className="btn" /> */}
                </div>
            )}


            {/* caption */}


            <p className="p-5 truncate text-gray-400">
                {likes.length > 0 && (
                    <p className="font-semibold mb-1 text-gray-400"> 4,911 likes</p>
                )}
                <span className="font-semibold mr-1 text-gray-400">{username} </span>{caption}
            </p>

            {/* comment */}

            {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-h-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img className="h-7 rounded-full" src={comment.data().profileImg} alt="" />
                            <p className="text-sm flex-1"><span className="font-bold">{comment.data().username}</span>{" "}{comment.data().comment}</p>
                            <Moment fromNow className="pr-5 text-xs">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}

            {/* input box */}
            {session && (
                <form className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7" />
                    <input onChange={e => setComment(e.target.value)} className="border-none flex-1 focus:ring-0 outline-none" type="text" placeholder="Add a comment ..." value={comment} />
                    <button onClick={sendComment} type="submit" disabled={!comment.trim()} className="font-semibold text-blue-400">Post</button>
                </form>
            )}


        </div>
    )
}

export default Post
