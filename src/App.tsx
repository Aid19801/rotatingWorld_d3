import React from 'react'
import './App.scss'
import RotatingRoundWorldMap from './components/WorldMap/RotatingRoundWorldMap'
import RotatingRoundWorldMapWithCoords from './components/WorldMap/RotatingRoundWorldMapWIthCoordinates'
import RoundWorldMap from './components/WorldMap/RoundWorldMap'
import WorldMapAtlas from './components/WorldMap/WorldMapAtlas'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <WorldMapAtlas /> */}
        {/* <RoundWorldMap /> */}
        {/* <RotatingRoundWorldMap /> */}
        <RotatingRoundWorldMapWithCoords />
      </header>
    </div>
  )
}

export default App
