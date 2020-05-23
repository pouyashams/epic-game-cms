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

const languages = [
    {
        title: "فارسی",
        id: "persian",
        icon: "fa fa-address-book text-info"
    },
    {
        title: "English",
        id: "English",
        icon: "fa fa-sign-out text-danger"
    },
];

let count = 1;

const Navbar = (props) => {
    const navLinks = getNavLinks(props.language);
    const dropdown = [
        {
            onclick: showProfile,
            title: props.language.profile,
            icon: "fa fa-address-book text-info"
        },
        {
            onclick: logOut,
            title: props.language.logOut,
            icon: "fa fa-sign-out text-danger"
        }];
    return (
        <nav className=" navbar navbar-dark fixed-top bg-color-dark flex-md-nowrap shadow py-2 tog-collapse">
            <h5 className={props.language.rtl ? "ml-3 text-center text-warning" : "mt-2 ml-2 text-center text-warning"}>
                {props.language.navTitle}
            </h5>

            <div className="row">


                <div
                    className="dropdown border-top border-bottom radius-circle border-warning py-1 px-user mb-auto mx-2">
                    <span className="text-white pointer" data-toggle="dropdown">
                     <i className="fa fa-globe"/>
                    </span>
                    <div
                        className={props.language.rtl ? "dropdown-menu dropdown-menu-m bg-dark w-25" : "dropdown-menu dropdown-menu-m-eng bg-dark w-25"}>
                        {languages.map((itemInfo) =>
                            (
                                <label className="dropdown-item pointer text-white dropdown-menu-hover"
                                       onClick={((e) => props.handelChangeLanguage(itemInfo.id))}
                                >
                                    <span className={`pl-10 ${itemInfo.icon}`}/>
                                    {itemInfo.title}
                                </label>


                            )
                        )
                        }
                    </div>
                </div>


                <div className="dropdown border-top border-bottom radius-circle border-warning py-1 px-user mb-auto mx-2">
                    <span className="text-white pointer" data-toggle="dropdown">
                     <i className="fa fa-user"/>
                    </span>
                    <div
                        className={props.language.rtl ? "dropdown-menu dropdown-menu-m bg-dark" : "dropdown-menu dropdown-menu-m-eng bg-dark"}>
                        {dropdown.map((itemInfo) =>
                            (
                                <label className="dropdown-item pointer text-white dropdown-menu-hover"
                                       onClick={itemInfo.onclick}
                                >
                                    <span className={`pl-10 ${itemInfo.icon}`}/>
                                    {itemInfo.title}
                                </label>


                            )
                        )
                        }
                    </div>
                </div>
                <span className="px-3">
                      <button className="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="fa fa-navicon mb-1"/>
                      </button>
                </span>
            </div>
            <div className="collapse nav-col ml-3" id="navbarSupportedContent">
                <span>
                                 <span className="nav-item sidebar-dropdown" data-toggle="collapse" href="#collapseOne"
                                       key={count++}>
                                 <span className="nav-link pointer">
                                     <span className="fa fa-unsorted text-warning"/>
                                    <span
                                        className="icon-title m-2 font-weight-bold text-warning ">{props.language.manageTelegram}</span>
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
