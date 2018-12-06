import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import configureStore from './store';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Home}>
            {/*<Route path="weather" />*/}
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
