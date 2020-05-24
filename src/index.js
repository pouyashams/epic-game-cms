import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Redirect, Router} from 'react-router-dom';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.css';
import 'font-awesome/css/font-awesome.css';
import 'jquery/dist/jquery';
import './css/index.css';
import './css/navbar.css';
import './css/sidebar.css';
import './css/login.css';
import './css/404.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import 'react-advance-jalaali-datepicker/'
import Login from './components/start-setting/login';
import NotFound from './components/not-found/notFound';
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

ReactDOM.render(
    <div className="pouya">
        <div className="loading" id="loading" style={{display:"none"}}/>
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/not-found" component={NotFound}/>
                <Route path="/" component={App}/>
                <Redirect to="/not-found"/>
            </Switch>
        </Router>
    </div>
    ,
    document.getElementById('root')
);