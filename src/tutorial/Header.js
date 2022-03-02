import { FaLaptop,FaTabletAlt,FaMobileAlt } from 'react-icons/fa';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import useWindowSize from "../hooks/useWindowSize";

const Header = ({title}) =>{

    // 원래는 DataContext에 있었던 useWindowSize이지만,
    // Decoupling을 위해 여기로 옮겼다.
    // https://youtu.be/RVFAyFWO4go?t=27800
    const { width } = useWindowSize();

    return (
        <header className={"Header"}>
          <h1> {title} </h1>
            {
                width < 768 ? < FaMobileAlt />
                    : width < 992 ? <FaTabletAlt/>
                        : <FaLaptop/>
            }
        </header>
    )
}

export default Header