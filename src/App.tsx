import './App.css'
import Posts from './components/Posts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Posts />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
