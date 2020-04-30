import React, {Component} from 'react';
import {Switch, Redirect, Router, withRouter} from 'react-router-dom';
import Navbar from './components/common/navbar';
import Sidebar from './components/common/sidebar';
import Footer from './components/common/footer';
import {PrivateRoute} from "./components/start-setting/privateroute";
import {ToastContainer} from "react-toastify";
import postManagement from "./components/post-management/post-management"
import addPost from "./components/post-management/add-post"
import showPost from "./components/post-management/show-post"
import showHistory from "./components/post-management/show-history"
import editPost from "./components/post-management/edit-post"
import editBot from "./components/bot-setting/edit-bot"
import defaultPostAttributes from "./components/post-management/default-post-attributes"
import profile from "./components/profile/profile"
import advancedSearch from "./components/advanced-search/advanced-search"


class App extends Component {


    componentDidMount() {
        sessionStorage.setItem('currentPage', 1);
        sessionStorage.setItem('contentSearch', "");
        sessionStorage.setItem('idSearch', "");
        sessionStorage.setItem('activeSearch', "true");
    }

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
                                <PrivateRoute path="/default-post-attributes" exact={false}
                                              component={defaultPostAttributes}/>
                                <PrivateRoute path="/post-management" exact={false} component={postManagement}/>
                                <PrivateRoute path="/advanced-search" exact={false} component={advancedSearch}/>
                                <PrivateRoute path="/profile" exact={false} component={profile}/>
                                <PrivateRoute path="/add-post" exact={false} component={addPost}/>
                                <PrivateRoute path="/show-post" exact={false} component={showPost}/>
                                <PrivateRoute path="/show-history" exact={false} component={showHistory}/>
                                <PrivateRoute path="/edit-post" exact={false} component={editPost}/>
                                <PrivateRoute path="/edit-bot" exact={false} component={editBot}/>
                                <PrivateRoute path="/" exact={false} component={postManagement}/>
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
