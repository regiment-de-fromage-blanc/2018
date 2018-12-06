import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import '../App.css';
import { Link } from 'react-router-dom';

const enhance = compose(
  firestoreConnect([{ collection: 'todos' }]),
  connect(({ firestore }) => ({
    todos: firestore.ordered.todos
  }))
);

const Home = ({ firestore, todos }) => (
  <div className="App">
    <Link to="/todos">Todos</Link>
  </div>
);

export default enhance(Home);
