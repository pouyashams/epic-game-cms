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
import Dark from "./images/dark-grey-terrazzo.jpeg"
import Light from "./images/light-grey-terrazzo.png"
import {setLanguage} from './services/setLanguage'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            language: "",
            theme: ""
        };
    };


    handelChangeLanguage = (value) => {
        localStorage.setItem('language', value);
        window.location.reload();
    };
    handelChangeTheme = (value) => {
        localStorage.setItem('theme', value);
        window.location.reload();
    };


    componentDidMount() {
        if (localStorage.getItem('language')) {
            const language = setLanguage(localStorage.getItem('language'));
            this.setState({language});
        } else {
            const language = setLanguage("persian");
            this.setState({language});
            localStorage.setItem('language', "persian");
        }
        if (localStorage.getItem('theme')) {
            this.setState({theme: localStorage.getItem('theme')});
        } else {
            this.setState({theme: "day"});
            localStorage.setItem('theme', "day");
        }

        sessionStorage.setItem('currentPage', 1);
        sessionStorage.setItem('contentSearch', "");
        sessionStorage.setItem('idSearch', "");
        sessionStorage.setItem('activeSearch', "true");
        if (localStorage.getItem("theme") === "day") {
            document.body.style.backgroundImage = `url(${Light})`
        } else {
            document.body.style.backgroundImage = `url(${Dark})`
        }
    }

    render() {
        return (
            <div
                className={this.state.language.rtl ? "container-fluid rtl body-font-per" : "container-fluid body-font-eng"}>
                <Navbar
                    handelChangeLanguage={this.handelChangeLanguage}
                    handelChangeTheme={this.handelChangeTheme}
                    language={this.state.language}
                    theme={this.state.theme}
                />
                <ToastContainer/>
                <div className="row">
                    <Sidebar
                        language={this.state.language}
                        theme={this.state.theme}
                    />
                    <main
                        role="main"
                        className="col-12 col-md-10 offset-md-2 text-center justify-content-center align-items-center"
                    >
                        <Router history={this.props.history}>
                            <Switch>
                                <PrivateRoute path="/default-post-attributes" language={this.state.language}
                                              theme={this.state.theme}
                                              exact={false} component={defaultPostAttributes}/>
                                <PrivateRoute path="/post-management" exact={false} language={this.state.language}
                                              theme={this.state.theme}
                                              component={postManagement}/>
                                <PrivateRoute path="/advanced-search" exact={false} component={advancedSearch}
                                              theme={this.state.theme}
                                              language={this.state.language}/>
                                <PrivateRoute path="/profile" exact={false} component={profile}
                                              language={this.state.language}
                                              theme={this.state.theme}
                                />
                                <PrivateRoute path="/add-post" exact={false} component={addPost}
                                              language={this.state.language}
                                              theme={this.state.theme}
                                />
                                <PrivateRoute path="/show-post" exact={false} component={showPost}
                                              language={this.state.language}
                                              theme={this.state.theme}
                                />
                                <PrivateRoute path="/show-history" exact={false} component={showHistory}
                                              language={this.state.language}
                                              theme={this.state.theme}
                                />
                                <PrivateRoute path="/edit-post" exact={false} component={editPost}
                                              language={this.state.language}
                                              theme={this.state.theme}
                                />
                                <PrivateRoute path="/edit-bot" exact={false} component={editBot}
                                              language={this.state.language}
                                              theme={this.state.theme}
                                />
                                <PrivateRoute path="/" exact={false} component={postManagement}
                                              language={this.state.language}
                                              theme={this.state.theme}
                                />
                                <Redirect to="/not-found"/>
                            </Switch>
                        </Router>
                    </main>
                </div>
                <Footer
                    language={this.state.language}
                    theme={this.state.theme}
                />

            </div>
        );
    }
}

export default withRouter(App);
