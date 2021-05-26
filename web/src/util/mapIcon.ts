import Leaflet from 'leaflet';
import mapMarker from '../images/petMapMarker.svg';

const mapIcon= Leaflet.icon({
  iconUrl:mapMarker,
  iconSize:[130,130],
  iconAnchor:[10,95],
  popupAnchor:[212,-7]
}) 

export default mapIcon;