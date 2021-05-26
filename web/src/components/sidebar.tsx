import React from 'react';

import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import LogoImg from '../images/logo.svg';
//import PetMapMarker from '../images/petMapMarker.svg';
import '../styles/components/sidebar.css'

export default function Sidebar(){
  const {goBack} = useHistory();

  return(
    <aside className="app-sidebar">
      <Link to="/">
      <img src={LogoImg} alt="goPet"/> 
      </Link> 
      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF"/> 
        </button>
      </footer>
    </aside>
  );
}