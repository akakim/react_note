import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from '../api/posts';
import useWindowSize from "../hooks/useWindowSize";
 import useAxiosFetch from "../hooks/useAxiosFetch";
//
 const DataContext = createContext({});

// 이 클래스를 통하여 Data를 전달할 것이다.
export const DataProvider = ({ children }) =>{


    const [posts, setPosts] = useState([]);
    const [search,setSearch] = useState(''); // 검색결과는 여기에 저장한다.
    const [searchResults,setSearchResults] = useState(''); // 검색결과는 여기에 저장한다.
    const [postTitle,setPostTitle] = useState(''); // 검색결과는 여기에 저장한다.
    const [postBody,setPostBody] = useState(''); // 검색결과는 여기에 저장한다.
//
    const [editTitle,setEditTitle] = useState(''); // 글을 업데이트한 결과는 여기에 저장한다.
    const [editBody,setEditBody] = useState(''); // 글을 업데이트한 결과는 여기에 저장한다.

//
    const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts');
//
    useEffect( ()=>{
        setPosts(data);
        console.log( `서버로부터 온 응답 ${JSON.stringify(data)}`)
    },[data])

    useEffect( () => {


        const filterResults = posts.filter(
            post=>
                (((post.body).toLowerCase()).includes(search.toLowerCase()))
                ||( ((post.title).toLowerCase()).includes(search.toLowerCase()))
        );

        console.log( `typeof posts ${ typeof posts}`);
        console.log( `posts length : ${posts.length}`);

        setSearchResults(filterResults.reverse());
    },[posts,search])
//



    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError,isLoading,
            posts,setPosts,
            postTitle,setPostTitle,postBody,setPostBody,
            editBody,setEditBody,editTitle,setEditTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;