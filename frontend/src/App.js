import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.js';
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector } from 'react-redux';


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (

      <div className='App'>
         <Header />
              <Routes>
                <Route exact path = "/auth" element = {<Auth />} />
                <Route exact path = "/blogs" element = {<Blogs />} /> 
                <Route exact path = "/myBlogs" element = {<UserBlogs />} />
                <Route exact path = "/myBlogs/:id" element = {<BlogDetail />} />
                <Route exact path = "/blogs/add" element = {<AddBlog />} />

              </Routes>
      </div>
  
  ); 
  

}

export default App;
