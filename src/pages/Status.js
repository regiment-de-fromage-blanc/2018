import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../App.css';
import './Status.css';

class Status extends React.Component {
  renderCol = state => {
    return (
      <Col
        xs={12}
        className={
          state.status === 'Opérationnel'
            ? 'statusOperationnal'
            : 'statusNotOperationnal'
        }
      >
        <div className="statusName">{state.name}</div>
        <div className="statusStatus">{state.status}</div>
        <div className="statusBattery">{state.battery}</div>
      </Col>
    );
  };

  render() {
    const states = [
      {
        name: 'Téléphone',
        status: 'Opérationnel',
        battery: '67%'
      },
      {
        name: 'R2D2',
        status: 'Opérationnel',
        battery: '100%'
      },
      {
        name: 'Détecteur de mouvement',
        status: 'Non opérationnel',
        battery: '0%'
      }
    ];

    return (
      <div className="App">
        <div className="App-status">
          <Grid>
            <Row>{states.map(this.renderCol)}</Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Status;
