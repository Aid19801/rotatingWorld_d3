import React, { useState, useEffect } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request'
import { feature } from 'topojson-client'
import { geoAlbersUsa, geoEquirectangular, geoMercator, geoPath } from 'd3-geo';
import { FeatureCollection, Feature, Geometry } from 'geojson';
import './styles.css';

export type MapObject = {
  mapFeatures: Array<Feature<Geometry | null>>
}

function AidWorldMap() {

  const [ countriesData, setCountriesData ] = useState<MapObject>({ mapFeatures: [] });
  
  const scale = 115;
  const width = 960;
  const height = 600;
  const scaleDivision = 3
  const fetchMapData = async () => {
    queue()
      .defer(json, './data/world-110m.json')
      .await((err, d1) => {
        if (err) throw err;
        setCountriesData({ mapFeatures: ((feature(d1, d1.objects.countries) as unknown) as FeatureCollection).features })
      })
  }

  const projection = geoMercator()
    .scale(scale)
    .translate([width / scaleDivision, height / scaleDivision]);

  useEffect(() => {
    fetchMapData();
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
      </svg>
    </div>
  )
}

export default AidWorldMap