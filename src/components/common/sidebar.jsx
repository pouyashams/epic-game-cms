import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import getNavLinks from './../../services/NavLinks';
import "bootstrap-v4-rtl/dist/css/bootstrap.min.css"

class Sidebar extends Component {
    render() {
        let bgShadow;
        if (this.props.theme === "day") {
            bgShadow = "bg-shadow"
        } else {
            bgShadow = "bg-shadow-light"
        }
        let count = 1;
        const navLinks = getNavLinks(this.props.language);
        return (
            <nav
                className={this.props.theme === "day" ? "col-2 position-fixed d-none d-md-block sidebar side-back-light" : "col-2 position-fixed d-none d-md-block sidebar side-back"}>
                <div className="sidebar-sticky">
                    <div
                        className={this.props.language.rtl ? "sidebar-header pb-3 pt-1 justify-content-center " + bgShadow : "sidebar-header py-2 justify-content-center " + bgShadow}>
                        <div className="user-info justify-content-center text-center">
                            <span className="user-name justify-content-center text-white ">
                                <strong>{this.props.language.epicGameTeam}</strong>
                            </span>
                        </div>
                    </div>
                    <ul className="nav flex-column">
                        <div className={bgShadow} id="accordion">
                            <span>
                                 <li className="nav-item sidebar-dropdown" data-toggle="collapse" href="#collapseOne"
                                     key={count++}>
                                 <span className="nav-link pointer">
                                     <span
                                         className={this.props.theme === "day" ? "fa fa-unsorted text-light-green" : "fa fa-unsorted text-warning"}/>
                                    <span
                                        className={this.props.theme === "day" ? "icon-title m-2 font-weight-bold text-light-green" : "icon-title m-2 font-weight-bold text-warning"}>{this.props.language.manageTelegram}</span>
                                </span>
                            </li>
                                {navLinks.map(nav =>
                                    nav.type === "telegram-management" ?
                                        <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                            <li className="nav-item sidebar-dropdown" key={count++}>
                                                <Link className="nav-link" to={nav.path}>
                                                    <span className={`${nav.icon} text-light`}/>
                                                    <span className="icon-title m-2 text-light">{nav.name}</span>
                                                </Link>
                                            </li>
                                        </div>
                                        : null)}
                            </span>

                            {/*<span>*/}
                            {/*     <li className="nav-item sidebar-dropdown" data-toggle="collapse" href="#collapseTwo"*/}
                            {/*          key={count++}>*/}
                            {/*     <span className="nav-link pointer">*/}
                            {/*         <span className="fa fa-unsorted text-warning"/>*/}
                            {/*        <span className="icon-title m-2 font-weight-bold text-warning ">مدیریت اینستاگرام</span>*/}
                            {/*    </span>*/}
                            {/*</li>*/}
                            {/*    {navLinks.map(nav =>*/}
                            {/*        nav.type==="instagram-management" ?*/}
                            {/*            <div id="collapseTwo" className="collapse" data-parent="#accordion">*/}
                            {/*                <li className="nav-item sidebar-dropdown" key={count++}>*/}
                            {/*                    <Link className="nav-link" to={nav.path}>*/}
                            {/*                        <span className={`${nav.icon} text-light`}/>*/}
                            {/*                        <span className="icon-title m-2 text-light">{nav.name}</span>*/}
                            {/*                    </Link>*/}
                            {/*                </li>*/}
                            {/*            </div>*/}
                            {/*        : null)}*/}
                            {/*</span>*/}

                        </div>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Sidebar;
