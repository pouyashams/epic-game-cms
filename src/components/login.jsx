import React, {Component} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios/index";
import ReCAPTCHA from "react-google-recaptcha";


class Login extends Component {
    state = {
        username: "",
        password: "",
        recapcha:""
    };

    onChange = (value) => {
        this.setState({productItemImageBase64List: value})
    };
    handleSubmit = async e => {
        e.preventDefault();
        try {
            const url = 'https://epicgameservices.ir/api/login';
            axios.post(url, {
                "username": this.state.username,
                "password": this.state.password
            }).then(response => {
                if (response.data.success === true ) {
                    if (this.state.recapcha!==""){
                        sessionStorage.setItem('token', response.data.data);
                        sessionStorage.setItem('valid', true);
                        sessionStorage.setItem('username', this.state.username);
                        this.props.history.replace('/');
                    }
                    else {
                        toast.error('بخش من بات نیستم را کامل کنید');
                    }

                } else {
                    toast.error('نام کاربری یا کلمه عبور اشتباه هست');
                }
            }).catch(() => {
                toast.error('نام کاربری یا کلمه عبور اشتباه هست');
            });
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('نام کاربری یا کلمه عبور اشتباه هست');
            }
        }
    };

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="rtl form-signin border rounded m-2 mx-auto bg-light shadow text-center"
            >
                <ToastContainer/>
                <h5 className="alert py-3 mb-3 font-weight-normal text-center bg-dark text-light">سیستم مدیریت اپیک
                    گیم</h5>
                <label htmlFor="inputUsername" className="sr-only">
                    نام کاربری
                </label>
                <input
                    type="text"
                    id="inputUsername"
                    className="form-control my-3 rounded dir-text-left text-center"
                    placeholder="نام کاربری"
                    value={this.state.username}
                    onChange={e => this.setState({username: e.target.value})}
                    required
                    autoFocus
                />
                <label htmlFor="inputPassword" className="sr-only">
                    کلمه عبور
                </label>
                <input
                    type="password"
                    id="inputPassword"
                    autoComplete="off"
                    className="form-control rounded dir-text-left text-center"
                    placeholder="کلمه عبور"
                    value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}
                    required
                />
                <div className="pt-2 pb-3">
                    <ReCAPTCHA
                        sitekey="6LdWRuYUAAAAAGfiGzmkFtaP7zJ9m3vOlXIoImC8"
                        onChange={this.onChange}
                    />
                </div>


                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    ورود
                </button>
            </form>
        );
    }
}

export default Login;
