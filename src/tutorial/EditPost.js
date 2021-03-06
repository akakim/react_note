import {useEffect, useState} from "react";
import { useParams,Link,useNavigate } from "react-router-dom";

import { useContext } from 'react';
import DataContext from '../context/DataContext'
import api from "../api/posts";
import {format} from "date-fns";

const EditPost = () => {
    const { posts, setPosts} = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post =>(post.id).toString() === id );
    const [ editTitle,setEditTitle ] = useState([]);
    const [ editBody,setEditBody ] = useState([]);

    const navigate = useNavigate();
    useEffect( () =>{
        if ( post ){
            setEditTitle(post.title);
            setEditBody(post.body);
        }

    },[post,setEditTitle,setEditBody])

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

    const handleEdit = async ( id )=>{
        const dateTime = format( new Date(),`MMMM dd, yyyy pp`)
        const updatedPost = { id,title: editTitle,dateTime, body: editBody};
        try {

            const response = await api.put(`/posts/${id}`,updatedPost)
            setPosts( posts.map( post => post.id === id? { ...response.data}: post));
            setEditTitle('');
            setEditBody('');
            // eslint-disable-next-line no-restricted-globals
            //history.push('/');
            navigate('/')
        } catch (err){
            console.log( `Error : ${err.message}`)
        }
    }


    return (
        <main className={"NewPost"}>
            {editTitle &&
                <>
                    <form className={"newPostForm"} onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor={editTitle}>Title:</label>
                        <input
                            id={"postTitle"}
                            type={"text"}
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}/>

                        <label htmlFor={"postBody"}>Post:</label>

                        <textarea
                            id={"postBody"}
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type={"submit"} onClick={() => handleEdit(post.id)}>??????</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2> Post Not Found</h2>
                    <p> Well, that's disappointing.</p>
                    <p>
                        <Link to={'/'}> ??????????????? ?????????.</Link>
                    </p>
                </>

            }
        </main>
    )
}

export default EditPost