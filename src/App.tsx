import './App.css'
import Posts from './components/Posts';
import Post from './components/Post';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HideAppBar from './components/Appbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme} >
      <HashRouter>
        <HideAppBar />
        <Routes>
          <Route index element={<Posts />}/>
          <Route path='/:postid' element={<Post />}/>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
