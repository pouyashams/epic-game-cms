import React from 'react';

const Footer = () => {
    return (
        <footer
            className="rtl float-left fixed-bottom navbar navbar-dark bg-dark col-md-9 ml-sm-auto col-lg-10 px-4 shadow">
            <div className="copyright">
                <span className="fa fa-copyright m-1"/>
                تمامی حقوق این سایت محفوظ میباشید
            </div>
            <div className={"socialmedia"}>
                <span className="fa fa-instagram m-1"/>
                <span className="fa fa-facebook-official m-1"/>
            </div>
        </footer>
    );
};

export default Footer;
