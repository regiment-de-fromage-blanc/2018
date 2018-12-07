import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const stamenTonerTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr =
  '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const zoomLevel = 10;
const defaultLo = [45, 5];
const gettingCoords =
  'Getting your position... Please, share your position with us !';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      position: null
    };
    let getPosition = new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords);
        resolve(position.coords);
      });
    });

    getPosition
      .then(val => {
        console.log(val);
        this.setState({
          loading: false,
          position: val
        });
        console.log(this.state);
      })
      .catch(console.error);
  }

  renderLoaded() {
    return (
      <div>
        <Map
          center={[this.state.position.latitude, this.state.position.longitude]}
          zoom={zoomLevel}
        >
          <TileLayer attribution={stamenTonerAttr} url={stamenTonerTiles} />
          <Marker
            position={[
              this.state.position.latitude,
              this.state.position.longitude
            ]}
          >
            <Popup>Vous êtes ici.</Popup>
          </Marker>
        </Map>
        <p>Où voulez-vous aller?</p>
        <form>
          <label>
            Destination:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>{this.state.loading ? gettingCoords : this.renderLoaded()}</div>
    );
  }
}
