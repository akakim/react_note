import Header   from './Header'
import Nav      from './Nav'
import Footer   from './Footer'
/* 주된 내용들. */
import Home     from './Home'
import NewPost  from './NewPost'
import EditPost from './EditPost'
import PostPage from './PostPage'
import About    from './About';
import Missing  from './Missing'
import Note  from './Note'

import { Route, Routes, useNavigate } from "react-router-dom";
import { DataProvider } from './context/DataContext';


function App() {

  return (
    <div className="App">
        <DataProvider>
          <Header title={"Hello React JS Blog"} />
          <Nav />

            <Routes>
                <Route path={"/"} element ={ <Home /> }  />
                <Route path={"/post"} element ={ <NewPost />}/>
                <Route path={"/edit/:id"} element ={<EditPost />}/>
                <Route path={"/post/:id"} element={<PostPage />}/>
                <Route path={"/about"} element={<About/>}/>
                <Route path={"/note"} element={<Note/>}/>
                <Route path={"/*"} element={<Missing/>}/>
            </Routes>
            <Footer />
        </DataProvider>
    </div>
  );
}

export default App;
