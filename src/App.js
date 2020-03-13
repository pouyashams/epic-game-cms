import React, {Component} from 'react';
import {Switch, Redirect, Router, withRouter} from 'react-router-dom';
import Navbar from './components/common/navbar';
import Sidebar from './components/common/sidebar';
import Footer from './components/common/footer';
import {PrivateRoute} from "./components/privateroute";
import {ToastContainer} from "react-toastify";
import acountManagement from "./components/acount-management/acount-management"
import addAcount from "./components/acount-management/add-acount"
import showAcount from "./components/acount-management/show-acount"
import editAcount from "./components/acount-management/update-acount"


class App extends Component {


    componentDidMount() {
        sessionStorage.setItem('currentPage', 1);
    }

    isPhone = () => {
        return !!(navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/Android/i));
    };

    render() {

        return (
            <div className={this.isPhone() ? "rtl" : "container-fluid rtl"}>
                <Navbar/>
                <ToastContainer/>
                <div className="row">
                    <Sidebar/>
                    <main
                        role="main"
                        className="col-12 col-md-10 offset-md-2 text-center justify-content-center align-items-center"
                    >
                        <Router history={this.props.history}>
                            <Switch>
                                <PrivateRoute path="/acount-managemnet" exact={false} component={acountManagement}/>
                                <PrivateRoute path="/add-acount" exact={false} component={addAcount}/>
                                <PrivateRoute path="/show-acount" exact={false} component={showAcount}/>
                                <PrivateRoute path="/edit-acount" exact={false} component={editAcount}/>
                                <PrivateRoute path="/" exact={false} component={acountManagement}/>
                                <Redirect to="/not-found"/>
                            </Switch>
                        </Router>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(App);
