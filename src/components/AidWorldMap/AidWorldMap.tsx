import React, { useState, useEffect } from 'react';
import { queue } from 'd3-queue';
import { csv, json } from 'd3-request'
import { feature } from 'topojson-client'
import { geoAlbersUsa, geoEquirectangular, geoMercator, geoPath } from 'd3-geo';
import { FeatureCollection, Feature, Geometry } from 'geojson';
import './styles.css';

export type MapObject = {
  mapFeatures: Array<Feature<Geometry | null>>
}

export type CoordinatesData = {
  id: number
  latitude: number
  longitude: number
}

function AidWorldMap() {

  const [ countriesData, setCountriesData ] = useState<MapObject>({ mapFeatures: [] });
  const [ coordinates, setCoordinates ] = useState<CoordinatesData[] | []>([]);
  
  const scale = 115;
  const width = 960;
  const height = 600;
  const scaleDivision = 3
  const fetchMapData = async () => {
    queue()
      .defer(json, './data/world-110m.json')
      .defer(csv, './data/coordinates.csv')
      .await((err, d1, d2: CoordinatesData[]) => {
        if (err) throw err;
        setCountriesData({ mapFeatures: ((feature(d1, d1.objects.countries) as unknown) as FeatureCollection).features })
        setCoordinates(d2);
      })
  }

  const projection = geoMercator()
    .scale(scale)
    .translate([width / 2.5, height / scaleDivision]);

  const returnProjectionValueWhenValid = (point: [number, number], index: number) => {
    const retVal: [number, number] | null = projection(point)
    if (retVal?.length) {
      return retVal[index]
    }
    return 0
  }

      
  const changeCoordsEveryTwoSeconds = () => {
    setInterval(() => {
      const newCoords = [
        {
          id: 1,
          latitude: JSON.parse(`${Math.floor(Math.random() * 120)}.${Math.floor(Math.random() * 5000)}`),
          longitude: JSON.parse(`-${Math.floor(Math.random() * 1060)}.${Math.floor(Math.random() * 5000)}`),
        },
        {
          id: 2,
          latitude: JSON.parse(`${Math.floor(Math.random() * 120)}.${Math.floor(Math.random() * 5000)}`),
          longitude: JSON.parse(`-${Math.floor(Math.random() * 1060)}.${Math.floor(Math.random() * 5000)}`),
        },
        {
          id: 3,
          latitude: JSON.parse(`${Math.floor(Math.random() * 120)}.${Math.floor(Math.random() * 5000)}`),
          longitude: JSON.parse(`-${Math.floor(Math.random() * 1060)}.${Math.floor(Math.random() * 5000)}`),
        },
        {
          id: 4,
          latitude: JSON.parse(`${Math.floor(Math.random() * 120)}.${Math.floor(Math.random() * 5000)}`),
          longitude: JSON.parse(`-${Math.floor(Math.random() * 1060)}.${Math.floor(Math.random() * 5000)}`),
        },
        {
          id: 5,
          latitude: JSON.parse(`${Math.floor(Math.random() * 120)}.${Math.floor(Math.random() * 5000)}`),
          longitude: JSON.parse(`-${Math.floor(Math.random() * 1060)}.${Math.floor(Math.random() * 5000)}`),
        },
        {
          id: 6,
          latitude: JSON.parse(`${Math.floor(Math.random() * 120)}.${Math.floor(Math.random() * 5000)}`),
          longitude: JSON.parse(`-${Math.floor(Math.random() * 1060)}.${Math.floor(Math.random() * 5000)}`),
        },
      ]
      setCoordinates(newCoords)
    }, 2000)
  }
  useEffect(() => {
    fetchMapData();
    changeCoordsEveryTwoSeconds();
  }, [])



  return (
    <div>
      <svg height={height} width={width} viewBox="0 0 800 250">
        <g>
          {countriesData && countriesData.mapFeatures.map((d, i) => {
            return (
              <path
                key={i}
                d={geoPath().projection(projection)(d) as string}
                fill="rgba(30, 50, 50, 1)"
                stroke="aliceblue"
                strokeWidth={0.2}
              />
            )
          })}
        </g>
        <g>
          {coordinates && coordinates.length && coordinates.map((d, i) => (
            <circle
              key={i}
              cx={returnProjectionValueWhenValid([d.longitude, d.latitude], 0)}
              cy={returnProjectionValueWhenValid([d.longitude, d.latitude], 1)}
              r={5}
              fill="#E91E63"
              stroke="#FFFFFF"
              className="animateCircle"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default AidWorldMap