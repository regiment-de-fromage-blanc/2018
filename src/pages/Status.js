import React from 'react';
import { Grid, Row, Col, Panel, ProgressBar } from 'react-bootstrap';
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
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{state.name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{state.status}</Panel.Body>
          <ProgressBar
            now={state.battery}
            label={`${state.battery}%`}
            bsStyle={
              state.battery >= 66
                ? 'success'
                : state.battery >= 33
                ? 'warning'
                : 'danger'
            }
          />
        </Panel>
      </Col>
    );
  };

  render() {
    const states = [
      {
        name: 'Téléphone',
        status: 'Opérationnel',
        battery: '60'
      },
      {
        name: 'R2D2',
        status: 'Opérationnel',
        battery: '98'
      },
      {
        name: 'Détecteur de mouvement',
        status: 'Non opérationnel',
        battery: '27'
      }
    ];

    return (
      <div className="App">
        <div className="App-status">
          <h2>États des appareils</h2>
          <Grid>
            <Row>{states.map(this.renderCol)}</Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Status;
