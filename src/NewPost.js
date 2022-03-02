

import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import DataContext from './context/DataContext'
import {format} from "date-fns";
import api from "./api/posts";
// import { styled } from '@mui/material/styles';

// const Input = styled('input')({
//     display: 'contents'
// })

const NewPost = () =>{
    const [ postTitle, setPostTitle ] = useState('');
//    const [ postBody, setPostBody ] = useState('');
//    const [postTitle, setPostTitle] = useState('');

    const { postBody,setPostBody } = useContext(DataContext);
    const { posts,setPosts } = useContext(DataContext);
    const navigate = useNavigate();

    //const selectedFile = document.getElementById('input').files[0];

    /*
    * 수업 외적인 내용 테스트.
    * */


    const handleSubmit = async (e) =>{
        e.preventDefault()
        // id 는 1부터 시작한다.
        const id = posts.length ? posts[posts.length - 1].id  + 1 : 1
        const datetime = format(new Date(),'MMMM dd, yyyy pp');

        const newPost = { id, title: postTitle, datetime, body: postBody };

        try {
            const response = api.post('/posts',newPost);
            const allPosts = [...posts, newPost];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/');
//            history.push('/');
        } catch ( e ){
            console.log( `Error : ${e.message}`);
        }
    }

    const updateSize = async (e) =>{
        console.log ( `updateSize() valueOf ${e.valueOf()}`);
        console.log ( `event Target Value ${e.target.value}`);
        console.log ( `updateSize Files Clicked ${e.target.files[0]}`);

        let aFile = e.target.files[0];
        let oFiles = e.target.files;
        let nBytes = 0;
        let nFiles = oFiles.length;

        for (let nFileId = 0; nFileId  < oFiles; nFileId ++){
            nBytes += oFiles[nFileId].size;
        }

        let sOutput = nBytes + " bytes";
        // multiples approximation을 위한 선택적 코드
        for (let aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
        }

        document.getElementById("fileNum").innerHTML = nFiles;
        document.getElementById("fileSize").innerHTML = sOutput;

    }

    const handleFiles = (e) => {

        let aFile = e.target.files[0];
        let oFiles = e.target.files;
        let nBytes = 0;
        let nFiles = oFiles.length;

        console.log ( `handleFiles :: ${oFiles}`);
        console.log ( `file Length :: ${oFiles.length}`);

        /*if ( document.getElementById("1") !== undefined ){
            document.getElementById("1").remove();
        }*/


        for (let i = 0; i < oFiles.length; i++) {
            const file = oFiles[i];

            if (!file.type.startsWith('image/')){ continue }

            const img = document.createElement("img");
            img.id = "1";
            img.classList.add("obj");
            img.file = file;


            document.createElement("preview").
            document.getElementById("preview").append(img);
            //preview.appendChild(img); // "preview"가 결과를 보여줄 div 출력이라 가정.

            const reader = new FileReader();
            reader.onload = (
                ( aImg) => {
                        return function(e) {
                            aImg.src = e.target.result;
                        };
                    }
                )(img);
            reader.readAsDataURL(file);
        }
    }


    return (
        <main className={"NewPost"}>
          <h1> NewPost </h1>
            <form className={"newPostForm"} onSubmit={handleSubmit}>
                <label htmlFor={postTitle}>Title:</label>
                <input
                    id={"postTitle"}
                    type={"text"}
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}/>

                <label htmlFor={"postBody"}>Post:</label>

                <textarea
                    id={"postBody"}
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />



                <input type="file" id="input"
                       onChange={(e)=>{
                            updateSize(e);
                            handleFiles(e);
                        }}
                />
                <p>selected files: <span id="fileNum">0</span>
                    total size: <span id="fileSize">0</span></p>

                <div id={"preview"}/>
                <button type={"submit"}>제출</button>
            </form>
        </main>
    )
}

export default NewPost