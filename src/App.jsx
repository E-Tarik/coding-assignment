import React from 'react'
import { Routes, Route } from 'react-router-dom'
import 'reactjs-popup/dist/index.css'
import Header from './components/Header'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import Home from './components/Home'
import PlayerModal from './components/PlayerModal'
import './app.scss'

function App () {
  return (
    <div className="App">
      <Header />

      <div className="container">
        <Routes>
          <Route
            element={(
              <Home />
            )}
            path="/"
          />

          <Route
            element={<Starred />}
            path="/starred"
          />

          <Route
            element={<WatchLater />}
            path="/watch-later"
          />

          <Route
            element={(
              <h1 className="not-found">
                Page Not Found
              </h1>
            )}
            path="*"
          />
        </Routes>
      </div>

      <PlayerModal />
    </div>
  )
}

export default App
