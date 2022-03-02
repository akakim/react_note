import { Link } from 'react-router-dom';

const Post = ({ id,post }) => {
    return (
        <article className="post">
            <Link to={`post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
            </Link>

            {/*<p className="postBody">{
                Array.isArray(post) ?
                    `post bodyis Array ${post.length}`
                : `post body NotArray ${typeof (post)}`


            }</p>*/}
            {/*<p className="postBody">{

                JSON.stringify(post)
            }</p>*/}

            <p className="postBody">{
                (post.body).length <= 25
                    ? post.body
                    : `${(post.body).slice(0, 25)}...`
            }</p>
        </article>
    )
}

export default Post