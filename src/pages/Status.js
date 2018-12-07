import React from 'react';
import { Grid, Row, Col, Panel, ProgressBar, Badge } from 'react-bootstrap';
import '../App.css';
import './Status.css';

class Status extends React.Component {
  constructor(props) {
    super(props);

    // This 'states' is directly declared in the code because
    // we don't have the devices to get our measurements

    // states is an array of state
    // state is composed of
    // * name (String) -> name of the device
    // * battery (number) -> level of battery
    // * operationnal (boolean) -> is the device operationnal ?
    // * issues (String[]) (optional) -> error messages
    this.states = [
      {
        name: 'Téléphone',
        battery: this.getRandomBattery(),
        issues: this.getRandomIssues()
      },
      {
        name: 'C3PO',
        battery: this.getRandomBattery(),
        issues: this.getRandomIssues()
      },
      {
        name: 'R2D2',
        battery: this.getRandomBattery(),
        issues: this.getRandomIssues()
      },
      {
        name: 'Détecteur de mouvement',
        battery: this.getRandomBattery(),
        issues: this.getRandomIssues()
      }
    ];

    this.states.forEach(state => {
      if (state.hasOwnProperty('issues')) {
        state.operationnal = state.issues.length === 0;
      }
    });
  }

  getRandomBattery() {
    return Math.trunc(Math.random() * 100);
  }

  getRandomIssues() {
    if (Math.trunc(Math.random() * 2) === 0) {
      return [];
    } else {
      let issues = [];
      const allIssues = [
        'Pas de réseau non filaire détecté.',
        'Opérations en cours, veuillez patientez.',
        'Mémoire surchargée, veuillez la vider'
      ];
      let possibleIssues = allIssues.slice(0, allIssues.length);
      const nbIssues = Math.trunc(Math.random() * allIssues.length);

      let i = 0;
      do {
        const random = Math.trunc(Math.random() * possibleIssues.length);
        issues.push(possibleIssues.splice(random, 1));
        i++;
      } while (i !== nbIssues);

      return issues;
    }
  }

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
            <p>
              <Badge>
                {state.operationnal ? 'Opérationnel' : 'Non opérationnel'}
              </Badge>
            </p>
            {issues}
          </Panel.Body>
          <ProgressBar now={state.battery} label={`${state.battery}%`} />
        </Panel>
      </Col>
    );
  };

  render() {
    console.log(this);
    return (
      <div className="App">
        <div className="App-status">
          <h2>États des appareils</h2>
          <Grid>
            <Row>{this.states.map(this.renderCol)}</Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Status;
