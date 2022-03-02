import { Link } from 'react-router-dom';

const NavTwo = () =>{

    return (
        <nav className="Nav">

            <ul>
                <li> <Link to="/reactTimer"> ReactTimer </Link> </li>
                {/*<li> <Link to="/post"> Post </Link> </li>
                <li> <Link to="/about"> About </Link></li>
                <li> <Link to="/note"> Note </Link></li>*/}
            </ul>
        </nav>
    )
}


export default NavTwo