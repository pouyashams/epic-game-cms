import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import getNavLinks from './../../services/NavLinks';
import "bootstrap-v4-rtl/dist/css/bootstrap.min.css"

class Sidebar extends Component {

    render() {
        let count = 1;
        const navLinks = getNavLinks();
        return (
            <nav className="col-2 position-fixed d-none d-md-block sidebar side-back">
                <div className="sidebar-sticky">
                    <div className="sidebar-header pb-3 pt-1 justify-content-center">
                        <div className="user-info justify-content-center text-center">
                            <span className="user-name justify-content-center text-white">
                                <strong>تیم اپیک گیم</strong>
                            </span>
                        </div>
                    </div>
                    <ul className="nav flex-column">
                        <div id="accordion">
                            <span>
                                 <li className="nav-item sidebar-dropdown" data-toggle="collapse" href="#collapseOne"
                                      key={count++}>
                                 <span className="nav-link pointer">
                                     <span className="fa fa-unsorted text-warning"/>
                                    <span className="icon-title m-2 font-weight-bold text-warning ">مدیریت ها</span>
                                </span>
                            </li>
                                {navLinks.map(nav =>
                                    nav.type==="management" ?
                                        <div id="collapseOne" className="collapse" data-parent="#accordion">
                                            <li className="nav-item sidebar-dropdown" key={count++}>
                                                <Link className="nav-link" to={nav.path}>
                                                    <span className={`${nav.icon} text-light`}/>
                                                    <span className="icon-title m-2 text-light">{nav.name}</span>
                                                </Link>
                                            </li>
                                        </div>
                                    : null)}
                            </span>

                        </div>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Sidebar;
