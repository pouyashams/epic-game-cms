import React from 'react';
import "../../css/navbar.css"
import {Link, withRouter} from "react-router-dom";
import {logOutAccount} from "../../services/acountService";
import {toast} from "react-toastify";
import getNavLinks from './../../services/NavLinks';

const logOut = async () => {
    try {
        const result = await logOutAccount();
        if (result.status === 200) {
            localStorage.setItem("valid", "false");
            localStorage.setItem("token", "");
            localStorage.setItem("username", "");
            window.location = "/login";
        }
    } catch (ex) {
        if (ex.response && ex.response.status === 400) {
            toast.error(this.props.language.conError);
        }
    }
};

const showProfile = () => {
    window.location = "/profile";
};

let language = null;
let textLanguage = null;
if (localStorage.getItem("language") === "persian") {
    language = "English";
    textLanguage = "English";
} else {
    language = "persian";
    textLanguage = "فارسی";
}


let count = 1;

const Navbar = (props) => {
    let theme = null;
    let textTheme;
    let iconTheme;
    if (localStorage.getItem("theme") === "day") {
        theme = "night";
        textTheme = props.language.night;
        iconTheme = "fa fa-moon icon-hover"
    } else {
        theme = "day";
        textTheme = props.language.day;
        iconTheme = "fas fa-sun icon-hover-y"

    }


    const navLinks = getNavLinks(props.language);
    return (
        <nav
            className={props.theme === "day" ? "navbar fixed-top flex-md-nowrap shadow py-2 tog-collapse bg-color-green " : "navbar fixed-top flex-md-nowrap shadow py-2 tog-collapse bg-color-dark"}>
            <h5 className={props.language.rtl ? props.theme === "day" ? "ml-3 text-center text-light-green" : "ml-3 text-center text-warning" : props.theme === "day" ? "mt-2 ml-2 text-center text-light-green" : "mt-2 ml-2 text-center text-warning"}>
                {props.language.navTitle}
            </h5>

            <div className="row">

                <div
                    className={props.theme === "day" ? "radius-circle border-light-green py-1 px-user mb-auto mx-2 pointer" : "border-bottom radius-circle border-warning py-1 px-user mb-auto mx-2 pointer"}
                    onClick={((e) => props.handelChangeTheme(theme))}
                >
                    <span className="text-white pointer">
                     <i className={iconTheme + " mb-1"} title={textTheme}/>
                    </span>
                </div>

                <div
                    className={props.theme === "day" ? "radius-circle border-light-green py-1 px-user mb-auto mx-2 pointer" : "border-bottom radius-circle border-warning py-1 px-user mb-auto mx-2 pointer"}
                    onClick={((e) => props.handelChangeLanguage(language))}
                >
                    <span className="text-white pointer">
                     <i className={props.theme === "day" ? "fa fa-globe mb-1 icon-hover" : "fa fa-globe mb-1 icon-hover-y"}
                        title={textLanguage}/>
                    </span>
                </div>
                <div
                    className={props.theme === "day" ? "radius-circle border-light-green py-1 px-user mb-auto mx-2 pointer" : "border-bottom radius-circle border-warning py-1 px-user mb-auto mx-2 pointer"}
                    onClick={((e) => showProfile())}
                >
                    <span className="text-white pointer">
                     <i className={props.theme === "day" ? "fa fa-user mb-1 icon-hover" : "fa fa-user mb-1 icon-hover-y"}
                        title={props.language.profile}/>
                    </span>
                </div>
                <div
                    className={props.theme === "day" ? "radius-circle border-light-green py-1 px-user mb-auto mx-2 pointer" : "border-bottom radius-circle border-warning py-1 px-user mb-auto mx-2 pointer"}
                    onClick={((e) => logOut())}
                >
                    <span className="text-white pointer">
                     <i className={props.theme === "day" ? "fa fa-power-off mb-1 icon-hover" : "fa fa-power-off mb-1 icon-hover-y"}
                        title={props.language.logOut}/>
                    </span>
                </div>
                <span className="px-3">
                      <button className="navbar-toggler mr-2 text-white" type="button" data-toggle="collapse"
                              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                              aria-expanded="false" aria-label="Toggle navigation">
                                <span className={props.theme==="day"?"fa fa-navicon mb-1 icon-hover":"fa fa-navicon mb-1 icon-hover-y"}/>
                      </button>
                </span>
            </div>
            <div className="collapse nav-col ml-3" id="navbarSupportedContent">
                <span>
                                 <span className="nav-item sidebar-dropdown" data-toggle="collapse" href="#collapseOne"
                                       key={count++}>
                                 <span className="nav-link pointer">
                                     <span className={props.theme==="day"?"fa fa-unsorted text-light-green icon-hover":"fa fa-unsorted text-warning icon-hover-y"}/>
                                    <span
                                        className={props.theme==="day"?"icon-title m-2 font-weight-bold text-light-green":"icon-title m-2 font-weight-bold text-warning"}>{props.language.manageTelegram}</span>
                                </span>
                            </span>
                    {navLinks.map(nav =>
                        nav.type === "telegram-management" ?
                            // show in class name
                            <div id="collapseOne" className="collapse"
                                 data-parent="#accordion">
                                                            <span className="nav-item " key={count++}>
                                                                <Link className="nav-link" to={nav.path}>
                                                                    <span className={`${nav.icon} text-light`}/>
                                                                    <span
                                                                        className="icon-title m-2 text-light">{nav.name}</span>
                                                                </Link>
                                                            </span>
                            </div>
                            : null)}
                            </span>
            </div>
        </nav>
    );
};

export default withRouter(Navbar);
