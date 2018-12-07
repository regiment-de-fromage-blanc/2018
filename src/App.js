import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import configureStore from './store';
import Todos from './pages/Todos';
import Weather from './pages/Weather';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/todos" component={Todos} />
            <Route path="/weather" component={Weather} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
