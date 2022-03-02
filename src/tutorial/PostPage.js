import {useParams, Link, useNavigate} from 'react-router-dom'
import { useContext } from "react";
import DataContext from "../context/DataContext";
import {format} from "date-fns";
import api from "../api/posts";

const PostPage = () =>{

    const { posts,setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find( post=>(post.id).toString() === id );

    const navigate = useNavigate();
    // const handleEdit = async ( id )=>{
    //     const dateTime = format( new Date(),`MMMM dd, yyyy pp`)
    //     const updatedPost = { id,title: editTitle,dateTime, body: editBody};
    //     try {
    //
    //         const response = await api.put(`/posts/${id}`,updatedPost)
    //         setPosts( posts.map( post => post.id === id? { ...response.data}: post));
    //         setEditTitle('');
    //         setEditBody('');
    //         // eslint-disable-next-line no-restricted-globals
    //         //history.push('/');
    //         navigate('/')
    //     } catch (err){
    //         console.log( `Error : ${err.message}`)
    //     }
    // }


    const handleDelete = async (id) =>{
        try {
            await api.delete(`/posts/${id}`);
            const postsList = posts.filter((post => post.id !== id))
            setPosts(postsList);
            navigate('/')

        } catch( err ){
            console.log( `Error : ${err.message}`)
        }
    }

    // inside jsx 문법
    return (
        <main className={"PostPage"}>
            <article className="post">
                {post &&
                        <>
                            <h2>{post.title}</h2>
                            <p className={"postDate"}>{post.datetime}</p>
                            <p className={"postBody"}>{post.body}</p>
                            <Link to={`/edit/${post.id}`}>
                                <button className={"editButton"} > Edit Post </button>
                            </Link>
                            <button className="deleteButton" onClick={ () => handleDelete(post.id)}>
                                Delete Post
                            </button>

                        </>
                }
                {!post&&
                    <>
                        <h2> post not founc</h2>
                        <p> 아쉽지만 </p>
                        <p>
                            <Link to={'/'}> 홈페이지에 오세요!</Link>
                        </p>
                    </>

                }
            </article>
        </main>
    )
}

export default PostPage