import { Link } from 'react-router-dom'

const Missing = () =>{

    return (
        <main className={'Missing'}>

            <h2> 페이지를 찾을 수 없습니다. </h2>
                <p> 아쉽지만 </p>
                <p>
                    <Link to={'/'}> 홈페이지에 오세요!</Link>
                </p>
        </main>
    )
}

export default Missing