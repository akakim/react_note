import Post from "./Post";

const Feed = ({posts}) =>{

    // <> </> 리액트에서는 이걸 Fragment라고 부른다.
    return (
        <>
            {

                posts.map(post=>(
                    <Post key={post.id} post={post}/>
                ))
            }
        </>
    )
}

export default Feed