import './App.css'
import Posts from './components/Posts';
import Post from './components/Post';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Posts />}/>
        <Route path='/:postid' element={<Post />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
