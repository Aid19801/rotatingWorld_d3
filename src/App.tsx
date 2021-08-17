import React, { useEffect, useState } from 'react'
import './App.scss'
import { queue } from 'd3-queue'
import { csv, json } from 'd3-request'
import { FeatureCollection } from 'geojson'
import { feature } from 'topojson-client'
import WorldMap from './components/WorldMap/WorldMap'
import AidWorldMap from './components/AidWorldMap/AidWorldMap'
import { Types } from './components/WorldMap/types'

function App() {
  
  // const [ mapData, setMapData ] = useState<Types.MapObject>({ 'mapFeatures': [] })
  // const [ coordinatesData, setCoordinatesData ] = useState<Types.CoordinatesData[]>([])

  // useEffect(() => {
  //   if ( coordinatesData.length === 0 ) {
  //     const fileNames = ['./data/world-110m.json', './data/coordinates.csv']
  //     queue()
  //       .defer(json, fileNames[0])
  //       .defer(csv, fileNames[1])
  //       .await((error, d1, d2: Types.CoordinatesData[]) => {
  //         if (error) {
  //           console.log(`Houston we have a problem:${  error}`)
  //         }
  // setMapData({ mapFeatures: ((feature(d1, d1.objects.countries) as unknown) as FeatureCollection).features })
  //         setCoordinatesData(d2)
  //       })
  //   }
  // })

  return (
    <div className="App">
      <header className="App-header">
        {/* <WorldMap 
          mapData={mapData}
          coordinatesData={coordinatesData}
          scale={300}
          cx={400}
          cy={150}
          initRotation={50} 
          rotationSpeed={0.5}
        /> */}
        <AidWorldMap />
      </header>
    </div>
  )
}

export default App
