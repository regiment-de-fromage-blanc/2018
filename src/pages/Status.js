import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import '../App.css';
import './Status.css';

class Status extends React.Component {
  renderCol() {
    return (
      <Col xs={12} className="statusCol">
        <div className="statusName">Machine</div>
      </Col>
    );
  }
  render() {
    return (
      <div className="App">
        <div className="App-status">
          <Grid>
            <Row>
              {this.renderCol()}
              {this.renderCol()}
              {this.renderCol()}
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Status;
