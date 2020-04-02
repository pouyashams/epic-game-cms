import React from 'react';

const Footer = () => {
    return (
        <footer
            className="rtl float-left fixed-bottom navbar navbar-dark bg-dark col-md-9 ml-sm-auto col-lg-10 px-4 shadow">
            <div className="copyright">
                <span className="fa fa-copyright m-1"/>
                تمامی حقوق این سیستم مدیریت محفوظ میباشید
            </div>
            <div className={"socialmedia"}>
                <a className="fa fa-instagram pointer m-1 text-white" href="http://instagram.com/epicgameir">{""}</a>
                <a className="fa fa-telegram pointer text-white m-1" href="https://t.me/joinchat/AAAAAEvgtLthuUjsNZObyg">{""}</a>
            </div>
        </footer>
    );
};

export default Footer;
