import { useState,useEffect} from "react";
import axios from 'axios';

const useAxiosFetch = (dataUrl) =>{
    const [data,setData] = useState([]);
    const [fetchError,setFetchError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    useEffect( ()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) =>{
            setIsLoading(true);
            try{
                const response = await axios.get(url,{
                    cancelToken: source.token
                });

                if(isMounted){
                    console.log('Mounted...');
                    console.log(`responseData ${response.data}`);
                    setData(response.data);
                    setFetchError(null)
                }else {
                    console.log('is unMounted...');
                }


            } catch (err){
              if ( isMounted ){
                  setFetchError( err.message );
                  setData([]);
              }
            } finally {
                // 2초 이내에 응답해야됨
                isMounted && setIsLoading(false);
            }
        }
        console.log("before fetch...");

        fetchData(dataUrl);

        const cleanUp = () =>{
            console.log('clean up function');
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    },[dataUrl]);

    return { data, fetchError, isLoading};
}

export default useAxiosFetch;