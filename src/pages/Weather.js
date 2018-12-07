import React, { Component } from 'react';
//import {compose} from 'redux';
//import {connect} from 'react-redux';
//import {withHandlers} from 'recompose';
//import {firestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import '../App.css';
import './Weather.css';
import { Grid, Row, Col } from 'react-bootstrap';

const APIKEY = '0d6f7cc6436391911282cbf7c0bf103c';

const WeatherImage = ({ weather }) => {
  switch (weather) {
    case 'Fog':
    case 'Mist':
      return (
        <img
          alt="Brouillard"
          src="https://img.icons8.com/plasticine/100/000000/fog-night.png"
        />
      );
    case 'Clouds':
      return <img src="https://img.icons8.com/dotty/80/000000/cloud.png" />;
    case 'Clear':
      return <img src="https://img.icons8.com/color/96/000000/summer.png" />;
    case 'Rain':
      return (
        <img src="https://img.icons8.com/plasticine/100/000000/rain.png" />
      );
    case 'Drizzle':
      return (
        <img src="https://img.icons8.com/ultraviolet/80/000000/rain.png" />
      );
    case 'Snow':
      return (
        <img src="https://img.icons8.com/ultraviolet/80/000000/snow.png" />
      );
    default:
      return null;
      break;
  }
};

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: {
        coord: { lon: 4.87, lat: 45.77 },
        weather: [
          { id: 701, main: 'Mist', description: 'mist', icon: '50n' },
          { id: 741, main: 'Fog', description: 'fog', icon: '50n' }
        ],
        base: 'stations',
        main: {
          temp: 282.35,
          pressure: 1025,
          humidity: 93,
          temp_min: 280.15,
          temp_max: 284.15
        },
        visibility: 4100,
        wind: { speed: 1.5 },
        clouds: { all: 90 },
        dt: 1544139000,
        sys: {
          type: 1,
          id: 6505,
          message: 0.0377,
          country: 'FR',
          sunrise: 1544166449,
          sunset: 1544198173
        },
        id: 2968254,
        name: 'Villeurbanne',
        cod: 200
      }
    };

    function getLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function(position) {
          resolve(position.coords);
        });
      });
    }

    //  getLocation()
    //     .then(position => fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&APPID=${APIKEY}`))
    //      .then(data => data.json())
    //      .then(data => {
    //          this.setState({loading: false, data: data});
    //          console.log(this.state.data);
    //      });
  }

  renderLoaded() {
    const { data } = this.state;
    let temps;
    switch (data.weather[0].main) {
      case 'Fog':
      case 'Mist':
        temps = 'Brouillard';
        break;
      case 'Clouds':
        temps = 'Nuageux';
        break;
      case 'Clear':
        temps = 'Ensoleillé';
        break;
      case 'Rain':
        temps = 'Averses';
        break;
      case 'Drizzle':
        temps = 'Bruine';
        break;
      case 'Snow':
        temps = 'Chutes de neige';
        break;
      default:
        break;
    }

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <h3>La météo d'aujourd'hui :</h3>
          </Col>
        </Row>
        <div id="main">
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <div id="status">
                <p>{temps}</p>
              </div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <div id="image">
                <WeatherImage weather={data.weather[0].main} />
              </div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <div id="town">
                <p>
                  {data.name}, {data.sys.country} | {data.coord.lon}/
                  {data.coord.lat}
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <br />
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <div id="temp">
              <p>
                <img src="https://img.icons8.com/office/40/000000/thermometer.png" />
                {(data.main.temp - 273.15).toFixed(2)} °C
              </p>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <div id="pressure">
              <p>
                <img src="https://img.icons8.com/ultraviolet/40/000000/barometer-gauge.png" />
                {data.main.pressure} hPa
              </p>
            </div>
          </Col>
        </Row>
        <br />
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <div id="humidity">
              <p>
                <img src="https://img.icons8.com/office/40/000000/humidity.png" />
                {data.main.humidity} g/m3
              </p>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <div id="wind">
              <p>
                <img src="https://img.icons8.com/doodle/48/000000/wind-indicator-arrows.png" />
                {data.wind.speed} km/h
              </p>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }

  render() {
    return <div>{this.state.loading ? 'Loading' : this.renderLoaded()}</div>;
  }
}

export default Weather;
