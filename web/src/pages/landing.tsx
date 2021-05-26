import React from 'react';
import'../styles/pages/landing.css';
import logoImg from '../images/logo.svg';
import{FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';


 function Landing(){
  return(
    <div id="page-landing" >
    <div className="content-wrapper">
      <img src={logoImg} alt="GoPet" width="250" height= "250"></img>

      <main>
        <h1>Leve Felicidade a um pet.</h1>
        <p>Visite abrigos e mude a vida de um pet. </p>
      </main>

      <div className="location">
      <strong>Tijuca</strong>
      <span>Rio de Janeiro</span>
      </div>

      <Link to="/map" className="enter-app">
      <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
      </Link>    
    </div>

    
  </div>
  );
};

export default Landing;