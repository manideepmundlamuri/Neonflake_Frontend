import './App.css'
import { BrowserRouter as Router , Route, Routes  } from 'react-router-dom'
import Upload from './components/Upload/Upload'
import Listing from './components/Listing/Listing'
import DisplayVideo from './components/DisplayVideo/DisplayVideo'
function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Upload/>}></Route>
        <Route path='/listing' element={<Listing/>}></Route>
        <Route path='/video/:id' element={<DisplayVideo/>}></Route>
     </Routes>
     </Router>
    </>
  )
}

export default App
