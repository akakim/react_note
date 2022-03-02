import Header   from './tutorial/Header'
import Nav      from './tutorial/Nav'
import NavTwo   from './tutorial/NavTwo'
import Footer   from './tutorial/Footer'
/* 주된 내용들. */
import Home     from './tutorial/Home'
import NewPost  from './tutorial/NewPost'
import EditPost from './tutorial/EditPost'
import PostPage from './tutorial/PostPage'
import About    from './tutorial/About';
import Missing  from './tutorial/Missing'
import Note  from './additional/Note'

import { Route, Routes, useNavigate } from "react-router-dom";
import { DataProvider } from './context/DataContext';
import ReactTimer from "./additional/ReactTimer";


function App() {

  return (
    <div className="App">
        <DataProvider>
          <Header title={"Hello React JS Blog"} />
          <Nav />
          <NavTwo/>
            <Routes>
                <Route path={"/"} element ={ <Home /> }  />
                <Route path={"/post"} element ={ <NewPost />}/>
                <Route path={"/edit/:id"} element ={<EditPost />}/>
                <Route path={"/post/:id"} element={<PostPage />}/>
                <Route path={"/about"} element={<About/>}/>
                <Route path={"/note"} element={<Note/>}/>
                <Route path={"/reactTimer"} element={<ReactTimer/>}/>
                <Route path={"/*"} element={<Missing/>}/>
            </Routes>
            <Footer />
        </DataProvider>
    </div>
  );
}

export default App;
