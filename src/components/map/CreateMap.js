import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Form from 'react-bootstrap/es/Form';
import FormGroup from 'react-bootstrap/es/FormGroup';
import FormControl from 'react-bootstrap/es/FormControl';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import Col from 'react-bootstrap/es/Col';
import Button from 'react-bootstrap/es/Button';

const stamenTonerTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr =
  '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const zoomLevel = 10;
const gettingCoords =
  'Getting your position... Please, share your position with us !';

const link = 'https://nominatim.openstreetmap.org/search?q=';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      position: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    let getPosition = new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position) {
        resolve(position.coords);
      });
    });

    getPosition
      .then(val => {
        console.log(val);
        this.setState({
          loading: false,
          position: val,
          address: '',
          city: '',
          lat: null,
          lon: null
        });
        console.log(this.state);
      })
      .catch(console.error);
  }

  handleChange(event) {
    this.setState(
      {
        address: event.target.address,
        city: event.target.city
      },
      () => {
        this.getDestinationCoords(this.state.address, this.state.city);
      }
    );
    console.log(event);
  }

  handleSubmit() {
    if (this.state.address != null && this.state.city != null) {
      this.getDestinationCoords(this.state.address, this.state.city);
    }
  }

  getDestinationCoords(address, city) {
    String.prototype.replaceAll = function(search, replacement) {
      let target = this;
      return target.split(search).join(replacement);
    };

    let formatAdd = address.replaceAll(' ', '+');
    let formatCity = '+' + city.replaceAll(' ', '+');

    const completeLink =
      link + formatAdd + ',' + formatCity + '&format=json&limit=1';
    return fetch(completeLink)
      .then(response => response.json())
      .then(responseJson => {
        this.state.lat = responseJson[0].lat;
        this.state.lon = responseJson[0].lon;
        return this.state;
      })
      .then(data => console.log(data))
      .catch(error => {
        console.error(error);
      });
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
        <Form horizontal>
          <h4>Destination: </h4>
          <FormGroup controlId="formAddress">
            <Col componentClass={ControlLabel} sm={2} />
            <Col sm={10}>
              <FormControl
                type="text"
                value={this.state.address}
                placeholder="Adresse"
                onChange={event =>
                  this.setState({ address: event.target.value })
                }
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formCity">
            <Col componentClass={ControlLabel} sm={2} />
            <Col sm={10}>
              <FormControl
                type="text"
                value={this.state.city}
                placeholder="Ville"
                onChange={event => this.setState({ city: event.target.value })}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={() => this.handleSubmit()}>Chercher</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div>{this.state.loading ? gettingCoords : this.renderLoaded()}</div>
    );
  }
}
