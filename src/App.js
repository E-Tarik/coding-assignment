import { Routes, Route } from "react-router-dom"
import 'reactjs-popup/dist/index.css'
import Header from './components/Header'
import Movies from './pages/Movies'
import Starred from './pages/Starred'
import WatchLater from './pages/WatchLater'
import './app.scss'

const App = () => {

  return (
    <div className="App">
      <Header />

      <div className="container">

        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/starred" element={<Starred />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
