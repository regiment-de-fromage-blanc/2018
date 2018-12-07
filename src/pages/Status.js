import React from 'react';
import { Grid, Row, Col, Panel, ProgressBar } from 'react-bootstrap';
import '../App.css';
import './Status.css';

class Status extends React.Component {
  renderCol = state => {
    let issues = '';
    if (state.hasOwnProperty('issues')) {
      state.issues.forEach(issue => {
        issues += issue + ' ';
      });
      issues.substring(0, issues.length - 1);
    }

    return (
      <Col
        xs={12}
        className={
          state.operationnal ? 'statusOperationnal' : 'statusNotOperationnal'
        }
      >
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{state.name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <p>{state.operationnal ? 'Opérationnel' : 'Non opérationnel'}</p>
            {issues}
          </Panel.Body>
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
        operationnal: true,
        battery: 60
      },
      {
        name: 'C3PO',
        operationnal: false,
        battery: 77,
        issues: [
          'Pas de réseau non filaire détecté.',
          'Opérations en cours, veuillez patientez.'
        ]
      },
      {
        name: 'R2D2',
        operationnal: true,
        battery: 98
      },
      {
        name: 'Détecteur de mouvement',
        operationnal: false,
        battery: 27
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
