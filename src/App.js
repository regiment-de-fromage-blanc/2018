import React, {Component} from 'react';
import './App.css';
import {Provider} from "react-redux";

import Home from "./pages/Home";
import configureStore from './store';

const store = configureStore({});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Home/>
            </Provider>
        );
    }
}

export default App;
