import React from 'react'
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import{Map,TileLayer, Marker, Popup}from 'react-leaflet';

import '../styles/pages/kennelsMap.css';
import 'leaflet/dist/leaflet.css';

import logoImg from '../images/logo.svg';
import mapIcon from '../util/mapIcon';
import { useEffect, useState } from 'react';
import api from '../services/api';

interface Kennel{
  id:number,
  latitude:number,
  longitude:number,
  name:string,
}

export default function KennelsMap(){
 const [kennels, setKennels] =useState<Kennel[]>([]);

 useEffect(()=>{
   api.get('/kennels').then(response=>{
     setKennels(response.data);
   })
 },[]);

  return(
    <div id="page-map">
      <aside>

        <header>
          <img src={logoImg} alt="GoPet" width="250" height= "250"/>
          <h2>Escolha um abrigo</h2>
          <p> Muitos pets aguardam sua visita :) </p>
        </header>
        
        <footer>
          <strong>Tijuca</strong>
          <span>Rio de Janeiro</span>
        </footer>

      </aside>

      <Map
      center={[-22.920175,-43.2368368]}
      zoom={16}
      style={{width:'100%', height:'100%'}}
      >
        <TileLayer 
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MY_MAP_TOKEN}`}
        > 
        </TileLayer>

        {kennels.map(kennel=>{
          return (
            <Marker 
        key={kennel.id}
        icon={mapIcon}
        position={[kennel.latitude,kennel.longitude]}
        className="map-popup"
        >

        <Popup 
        closeButton={false}  
        minWidth={220} 
        maxWidth={220}
        className="map-popup"
        >
            {kennel.name}
            <Link to={`/kennels/${kennel.id}`}>
              <FiArrowRight size={20} color="#FFF"/>  
            </Link>
        </Popup>

        </Marker>
          )
        })}

      </Map>

      <div></div>

       <Link to="/kennels/create" className="create-kennel">
         <FiPlus size={32} color="#fff"/>
      </Link>
    </div>
  )
};

