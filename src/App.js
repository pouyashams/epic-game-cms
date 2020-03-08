import React, {Component} from 'react';
import {Switch, Redirect, Router, withRouter} from 'react-router-dom';
import Navbar from './components/common/navbar';
import Sidebar from './components/common/sidebar';
import Footer from './components/common/footer';
import {PrivateRoute} from "./components/privateroute";
import {ToastContainer} from "react-toastify";

class App extends Component {
    render() {
        return (
            <div className="container-fluid rtl">
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
                                <PrivateRoute path="/product-category" exact={false} component={""}/>
                                <PrivateRoute path="/" exact={false} component={""}/>
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
