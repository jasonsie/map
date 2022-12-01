import React, { useEffect, useState, useRef, useContext, useLayoutEffect } from 'react';
// leaflet related
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap, useMapEvent } from 'react-leaflet/hooks';
import MarkerClusterGroup from 'react-leaflet-markercluster';
// components
import MarkerCluster from './markerCluster';
// css
import css from '../styles/All.module.scss';
// context
import { Context } from '../utilis/context';
// mui
import { Box, Card, CircularProgress } from '@mui/material';

// 點擊地圖任意一處，recenter
const SetViewOnClick = ({ animateRef }) => {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
};

// 點擊座標，recenter
const RerenderMap = (props) => {
  const { children, data } = props;
  const { mapPoist, sideBarPoist, markerArray } = data;
  const map = useMap();

  // recenter
  useEffect(() => {
    map.setView(mapPoist, 12);
  }, [mapPoist]);

  // popup effect from the sidebar
  useLayoutEffect(() => {
    if (markerArray[0] === undefined || sideBarPoist === undefined) return;
    const get_marker = markerArray.find((each) => each._latlng.lat === sideBarPoist[1][0]['x']);
    get_marker.bindPopup(`<Card>${sideBarPoist[0]}</Card>`).openPopup();
  }, [sideBarPoist]);

  return children;
};

const TrailMap = (props) => {
  const { data } = props;
  const { allData } = data;
  const mapRef = useRef(null);
  const animateRef = useRef(false);
  const { state } = useContext(Context);
  const [markerArray, setMarkerArray] = useState([]);
  const [crtDot, setCrtDot] = useState(allData[0]['TR_ENTRANCE'][0]);

  useEffect(() => {
    Object.keys(state).length !== 0 && setCrtDot(state['poist'][1][0]);
  }, [state.poist]);

  return (
    <>
      <MapContainer
        whenReady={(map) => {
          mapRef.current = map;
        }}
        className={css.map}
        center={[crtDot['x'], crtDot['y']]}
        zoom={8}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <RerenderMap
          data={{
            mapPoist: [crtDot['x'], crtDot['y']],
            sideBarPoist: state.poist,
            markerArray: markerArray,
          }}
        >
          {/* <MarkerClusterGroup> */}
          {allData.map((entrances) =>
            entrances['TR_ENTRANCE'].map((dot) => (
              <>
                <MarkerCluster
                  entrances={entrances}
                  dot={dot}
                  setCrtDot={setCrtDot}
                  setMarkerArray={setMarkerArray}
                />
              </>
            )),
          )}
          {/* </MarkerClusterGroup> */}Ï
        </RerenderMap>
        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    </>
  );
};

export default TrailMap;
