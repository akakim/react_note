import Feed from '../tutorial/Feed';
import {useContext, useState,useRef,useEffect} from 'react';
import DataContext from '../context/DataContext'

/* [Preview 구현 ] https://www.youtube.com/watch?v=BPUgM1Ig4Po */
const Note = () => {

    // const [image,setImage] = useState<File>('');
    // const [preview,setPreview] = useState<String>('');
    // const fileInputRef = useRef<HTMLInputElement>('');
    const [imageFileList,setImageFileList] = useState([]);
    const [preview,setPreview] = useState('');
    // eslint-disable-next-line no-mixed-operators
    const fileInputRef = useRef([]);

    useEffect( ()=>{

        console.log( `imageFileList 는 파일입니까? ${ imageFileList instanceof File}`);
        console.log( `imageFileList 는 문자열입니까? ${ imageFileList instanceof String}`);
        console.log( `imageFileList 는 객체입니까? ${ imageFileList instanceof Object}`);
        console.log( `imageFileList 는 FileList 입니까? ${ imageFileList instanceof FileList}`);
        const self = this;
       if(imageFileList instanceof FileList){
          const aFile = imageFileList[0]

           console.log( `aFile 는 파일입니까? ${ aFile instanceof File}`);
              const reader = new FileReader();


              reader.onloadend = ()=>{

                  setPreview(reader.result);
              }

              console.log( `aFile 타입은? ${ typeof aFile}`);
              reader.readAsDataURL(aFile);



        } else {

            setPreview(null);
        }

    },[imageFileList]);

    return (
        <main className={'About'}>
            <div>
                <form>


                    {preview? (
                       /* <p> {preview} </p>*/
                        <img  src={preview} onClick={()=>

                            setImageFileList(null)
                        }/>
                        /*<img alt={imageFileList.name} src={preview}> {preview} </img>*/
                    ): (
                        <button onClick={(event)=>{
                            event.preventDefault();
                            fileInputRef.current.click();
                        }}>
                            Add imageFileList
                        </button>

                    )}


                    <input
                        type={"file"}
                        style={{ display : "none"}}
                        ref={fileInputRef}
                        accept={"image/*"}
                        onChange={ (e) => {
                            const files = e.target.files

                            // console.log( `이벤트는 타입은 파일입니까? ${ e instanceof ChangeEvent}`);
                            console.log( `이벤트  ${typeof e }`);
                            console.log( `e.target.files 값은 File 입니까? ${ e.target.files instanceof File}`);
                            console.log( `e.target.value 값은 무엇입니까? ${ e.target.value }`);
                            console.log( `e.target.files 값은 FileList 입니까? ${ e.target.files instanceof FileList}`);
                            console.log( `이벤트 하위의 파일들은 배열입니까? ${ e.target.files instanceof Array}`);
                            console.log( `이벤트 하위의 파일들? ${ e.target.files }`);

                            // console.log( `이벤트 하위의 파일들은 파일입니까? ${ e.target.files instanceof File}`);
                            // console.log( `이미지의 타입은 문자열입니까? ${ e.target.files instanceof File}`);
                            // console.log( `이미지의 타입은 객체입니까? ${ imageFileList instanceof Object}`);
                            
                            // 파일과 파일타입 (MIME)을 확인한다.
                            /*if( file && file.type.substr(0,5) === "imageFileList" ){
                                setimageFileList(file);
                            }else {
                                setimageFileList(null);
                            }*/
                            if( files ){
                                setImageFileList(files);
                            }else {
                                setImageFileList(null);
                            }


                        }}
                        />
                </form>
            </div>

        </main>
    )
}

export default Note