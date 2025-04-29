import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import Footer from './components/Footer'; 
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Main />
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;
