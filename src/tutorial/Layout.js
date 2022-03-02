import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = () =>{

    return (
        <div className="App">

            <Header title="reactJS Blog"/>
            <Nav />
            <Footer/>
        </div>
    )
}

export default Layout