import React, { useEffect, useState } from 'react'
import { geoOrthographic, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { Feature, FeatureCollection, Geometry } from 'geojson'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import { Button } from '@material-ui/core'
import AnimationFrame from '../../hooks/WindowDimensions'
import './WorldMap.scss'

const uuid = require('react-uuid')

const scale: number = 250
const cx: number = 400
const cy: number = 150
const initRotation: number = 100

const RotatingRoundWorldMapWithCoords = () => {

  const data: { name: string; coordinates: [number, number]}[] = [
    { name: '1', coordinates: [-73.9919, 40.7529] },
    { name: '2', coordinates: [-70.0007884457405, 40.75509010847814] }
  ]
  const [geographies, setGeographies] = useState<[] | Array<Feature<Geometry | null>>>([])
  const [ rotation, setRotation ] = useState<number>(initRotation)
  const [ isRotate, setIsRotate] = useState<Boolean>(false)

  const projection = geoOrthographic().scale(scale).translate([cx, cy]).rotate([rotation, 0])

  function returnProjectionValueWhenValid(point: [number, number], index: number) {
    const retVal: [number, number] | null = projection(point)
    if (retVal?.length) {
      return retVal[index]
    }
    return 0
  }

  const handleMarkerClick = (i: number) => {
    alert(`Marker: ${  JSON.stringify( data[i])}` )
  }

  useEffect(() => {
    fetch('/data/world-110m.json')
      .then((response) => {
        if (response.status !== 200) {
          console.log('Houston, we have a problem')
          return
        }
        response.json()
          .then((worldData) => {
            const mapFeatures: Array<Feature<Geometry | null>> = (feature(worldData, worldData.objects.countries) as unknown as FeatureCollection).features
            setGeographies(mapFeatures)
          })
      })
  }, [])

  

  AnimationFrame(() => {
    if (isRotate) {
      let newRotation = rotation;
      if (rotation >= 360) {
        newRotation = rotation - 360;
      }
      setRotation(newRotation + 0.2)
    //   console.log('Rotation is ', rotation);
    }
  })
  return (
    <>
      <Button
        size="medium"
        color="primary"
        startIcon={<PlayCircleFilledWhiteIcon />}
        onClick={() => setIsRotate(true)}
      />
      <svg width={scale * 3} height={scale * 3} viewBox="0 0 800 450">
        <g>
          <circle fill="#0098c8" cx={cx} cy={cy} r={scale} />
        </g>
        <g>
          {(geographies as []).map((d, i) => (
            <path
              key={`path-${uuid()}`}
              d={geoPath().projection(projection)(d) as string}
              fill={`rgba(38,50,56,${(1 / (geographies ? geographies.length : 0)) * i})`}
              stroke="aliceblue"
              strokeWidth={0.5}
            />
          ))}
        </g>
        <g>
          {data.map((d, i) => (
            <circle
              key={`marker-${uuid()}`}
              cx={returnProjectionValueWhenValid(d.coordinates, 0)}
              cy={returnProjectionValueWhenValid(d.coordinates, 1)}
              r={5}
              fill="#E91E63"
              stroke="#FFFFFF"
              onClick={() => handleMarkerClick(i)}
              onMouseEnter={() => setIsRotate(false)}
            />
          ))}
        </g>
      </svg>
    </>
  )
}

export default RotatingRoundWorldMapWithCoords
