import './App.css';
import React, { Component } from 'react';
import MyProvider from './contexts/MyProvider';  // Đảm bảo đường dẫn đúng
import Login from './components/LoginComponent';
import Main from './components/MainComponent';
import Footer from './components/Footer'; 
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MyProvider>
                    <Login />
                    <Main />
                    <Footer/>
                </MyProvider>
            </BrowserRouter>
            
        );
    }
}

export default App;
