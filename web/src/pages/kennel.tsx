import React, { useEffect, useState } from 'react';
import{Map, Marker, TileLayer}from 'react-leaflet';
import '../styles/pages/kennel.css'
import mapIcon from '../util/mapIcon';
import {FiClock, FiInfo} from 'react-icons/fi';
import Sidebar from '../components/sidebar';
import {useParams} from 'react-router-dom';
import api from '../services/api';



interface KennelParams {
  id:string;
}

interface KennelData {
  latitude:number;
  longitude:number;
  name:string;
  about:string;
  instructions:string;
  opening_hours:string;
  open_on_weekends:string;
  images:Array<{
    id:number;
    url:string;
  }>

}


export default function Kennel(){
  const params = useParams<KennelParams>();
  const [kennel, setKennel] = useState<KennelData>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);


  useEffect(()=>{
    api.get(`/kennels/${params.id}`).then(response=>{
      setKennel(response.data)
    })
  },[params.id]);

  if(!kennel) {
    return <p>Carregando...</p>
  }
  return(
    <div id="page-kennel">
      <Sidebar/>

    <main>
      <div className="kennel-details">
        <img 

        src={kennel.images[activeImageIndex].url}
        alt={kennel.name}
        />

        <div className="images">
          {kennel.images.map((image,index)=>{
            return (
               <button
                key={image.id}
                className={activeImageIndex === index ? 'active' : '' }
                type="button"
                onClick={()=>{
                  setActiveImageIndex(index);
                }}
               >
            
                <img src={image.url} alt={kennel.name}/>
               </button>
            );
          })}  
        </div>

        <div className="kennel-details-content"> 
          <h1>{kennel.name}</h1>
          <p> {kennel.about} </p>
          
          <div className="map-container">
            <Map 
            center={[kennel.latitude, kennel.longitude]}
            zoom={16}
            style={{width:'100%', height:280}}
            dragging={false}
            touchZoom={false}
            zoomControl={false}
            scrollWhelzoom={false}
            >
              <TileLayer 
              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MY_MAP_TOKEN}`}
              >
              </TileLayer>

              <Marker
              interactive={false}
              icon={mapIcon}
              position={[kennel.latitude, kennel.longitude]}
              />
            </Map>
            
            <footer>
              <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://www.google.com/maps/dir/?api=1&¨destination=${kennel.latitude},${kennel.longitude}`}
              >
                Ver Rotas no Google Maps
              </a>
            </footer>

          </div>

        <hr/>

          <h2>Insctruções de visita</h2>
          <p>{kennel.instructions}</p>

          <div className="open-details">

            <div className="hour">
              <FiClock size={32} color="#15B6D6"/>
              Segunda à sexta <br/>
              {kennel.opening_hours}
            </div>

            {kennel.open_on_weekends ? (
              <div className="open-on-weekends">
              <FiInfo size={32} color="#39CC83"/>
              Atendemos<br/>
              Finais de semana
            </div>
            ) : (
              <div className="open-on-weekends dont-open">
              <FiInfo size={32} color="#FF669D"/>
              Não Atendemos<br/>
              finais de semana
            </div>
            )}           
          </div>

          <button type="button" className="contact-button"> 
           Entre em contato pelo Whatsapp 
          </button>
        </div>
      </div>
    </main>

    </div>

  )
};
