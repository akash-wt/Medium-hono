import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Blog from './pages/blog' 
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/blog/:id' element={<Blog/>} />
    </Routes>
    
    </BrowserRouter>
    
  )
}

export default App
