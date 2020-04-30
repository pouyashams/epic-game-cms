import React, {Component} from 'react';
import "../../css/login.css"
import ps4 from "./ps4.gif"
import Reaptcha from 'reaptcha';
import Timer from "../timer/timer"
import Progress from "../progress/progress";
import Notification from "../notification/notification";
import {createVerification, verifyCode, verifyUserPass} from "../../services/loginService"


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: "",
            verificationCode: "",
            username: "",
            password: "",
            actionKey: "",
            hasValidCaptcha: false,
            resend: true,
            progress: false,

            //steps
            step1: true,
            step2: false,
            step3: false,

            //notification
            type: "",
            active: false,
            text: "",
            boldText: "",

            //timer
            time: 120
        };
        this.captcha = null;
    }

    isPhone = () => {
        return !!(navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/Android/i));
    };

    setWithExpiry = (key, value, ttl) => {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item))
    };

    onVerify = async (recaptchaResponse) => {
        if (!this.state.hasValidCaptcha) {
            this.setState({
                hasValidCaptcha: true
            }, () => {
                this.createVerification()
            })
        }
    };

    endTime = (valid) => {
        this.setState({resend: valid});
    };

    editMobileNumber = () => {
        this.setState({
            step1: true,
            step2: false,
            step3: false,
            mobileNumber: "",
        });
    };

    createVerification = async e => {
        if (e) {
            e.preventDefault();
        } else {
            this.setState({resend: true, time: 120});
        }
        this.captcha.execute();
        try {
            if (this.state.mobileNumber.split('').length === 11) {
                const data = {
                    mobileNumber: this.state.mobileNumber,
                    actionName: "LOGIN_VERIFICATION_ACTION_TYPE"
                };
                if (this.state.hasValidCaptcha) {
                    this.setState({progress: true});
                    const result = await createVerification(data);
                    if (result.status === 200) {
                        this.setState({
                            progress: false,
                            step1: false,
                            step2: true,
                            step3: false,
                        });
                    }
                }
            } else {
                this.setState({
                    progress: false,
                    active: true,
                    type: "alert-danger",
                    text: "شماره موبایل اشتباه است.",
                    boldText: "خطا",
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({
                    progress: false,
                    active: true,
                    type: "alert-danger",
                    text: ex.response.data.data,
                    boldText: "خطا",
                });
            }
        }
    };

    verifyCode = async e => {
        e.preventDefault();
        this.setState({progress: true});
        try {
            const data = {
                mobileNumber: this.state.mobileNumber,
                actionName: "LOGIN_VERIFICATION_ACTION_TYPE",
                verificationCode: this.state.verificationCode
            };
            const result = await verifyCode(data);
            if (result.status === 200) {
                this.setState({
                    progress: false,
                    actionKey: result.data.data,
                    step1: false,
                    step2: false,
                    step3: true,
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({
                    progress: false,
                    active: true,
                    type: "alert-danger",
                    text: ex.response.data.data,
                    boldText: "خطا",
                });
            }
        }
    };

    verifyUserPass = async e => {
        e.preventDefault();
        this.setState({progress: true});
        try {
            const data = {
                username: this.state.username,
                password: this.state.password,
                mobileNumber: this.state.mobileNumber,
                actionKey: this.state.actionKey.toString(),
                actionName: "LOGIN_VERIFICATION_ACTION_TYPE"
            };
            const result = await verifyUserPass(data);
            if (result.status === 200) {

                this.setWithExpiry("token", result.data.data, 6.048e+8);
                this.setWithExpiry("username", this.state.username, 6.048e+8);
                this.setWithExpiry("valid", true, 6.048e+8);
                this.props.history.replace('/');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({
                    progress: false,
                    active: true,
                    type: "alert-danger",
                    text: ex.response.data.data,
                    boldText: "خطا",
                });
            }
        }
    };

    closeNotification = () => {
        this.setState({
            active: false,
        });
    };

    render() {
        return (
            <div className="blue-bg">
                <div className={this.isPhone() ? "translate-login-phone" : "translate-login"}>
                    <div
                        className={this.isPhone() ? "anime-text translate-title-phone text-center" : "anime-text pb-5 ml-6 mb-3 text-center"}>
                        <label className={this.isPhone() ? "title-login-phone" : "title-login"}>پنل مدیریت اپیک
                            گیم</label>
                    </div>
                    <div className={this.isPhone() ? "anime" : "middle anime"}>
                        <div id={this.isPhone() ? "login-phone" : "login"}>
                            {this.state.step1 ?
                                <form method="get" onSubmit={this.createVerification}>
                                    <fieldset>
                                        <p>
                                            <span className="fa fa-mobile"/>
                                            <input className="text-right"
                                                   type="text"
                                                   value={this.state.mobileNumber}
                                                   onChange={e => this.setState({mobileNumber: e.target.value})}
                                                   placeholder="شماره موبایل" required
                                            />
                                        </p>
                                        <div>
                                            <span style={{width: "50%", textAlign: "left", display: " inline-block"}}/>
                                            <span style={{
                                                width: "50%",
                                                textAlign: "right",
                                                display: " inline-block"
                                            }}>
                                                    <input className=" p-1px" type="submit" value="بررسی و ادامه"/>
                                                </span>
                                        </div>
                                    </fieldset>
                                </form>
                                : this.state.step2 ?
                                    <form method="get" onSubmit={this.verifyCode}>
                                        <fieldset>
                                            <p>
                                                <span className="fa fa-key"/>
                                                <input className="text-right"
                                                       type="text"
                                                       value={this.state.verificationCode}
                                                       onChange={e => this.setState({verificationCode: e.target.value})}
                                                       placeholder="کد ارسال شده" required
                                                />
                                            </p>
                                            <div>
                                        <span style={{width: "50%", textAlign: "left", display: " inline-block"}}>
                                            <input className=" p-1px"
                                                   type="submit"
                                                   value="اصلاح شماره"
                                                   onClick={() => {
                                                       this.editMobileNumber()
                                                   }}/>
                                        </span>


                                                <span style={{
                                                    width: "50%",
                                                    textAlign: "right",
                                                    display: " inline-block"
                                                }}>
                                                    <input className=" p-1px" type="submit" value="بررسی و ادامه"/>
                                                </span>
                                            </div>

                                            {this.state.resend ?
                                                <span className="timer-style">
                                                   <Timer
                                                       seconds={this.state.time}
                                                       onTime={this.endTime}
                                                   />
                                                 </span>
                                                :
                                                <span style={{
                                                    width: "100%",
                                                    textAlign: "right",
                                                    display: " inline-block",
                                                    marginTop: "40px"
                                                }}>
                                                      <input className=" p-1px"
                                                             type="submit" value="ارسال مجدد"
                                                             onClick={() => {
                                                                 this.createVerification()
                                                             }}/>
                                                </span>
                                            }

                                        </fieldset>
                                    </form>
                                    : this.state.step3 ?
                                        <form method="get" onSubmit={this.verifyUserPass}>
                                            <fieldset>

                                                <p>
                                                    <span className="fa fa-user"/>
                                                    <input className="text-right"
                                                           type="text"
                                                           value={this.state.username}
                                                           onChange={e => this.setState({username: e.target.value})}
                                                           placeholder="نام کاربری" required
                                                    />
                                                </p>

                                                <p>
                                                    <span className="fa fa-lock"/>
                                                    <input className="text-right "
                                                           value={this.state.password}
                                                           onChange={e => this.setState({password: e.target.value})}
                                                           type="password"
                                                           placeholder="رمز عبور"
                                                    />

                                                </p>

                                                <div>
                                                  <span style={{
                                                      width: "50%",
                                                      textAlign: "left",
                                                      display: " inline-block"
                                                  }}>
                                                      <input className="px-3 p-1px" type="submit" value="ورود"/>
                                                  </span>

                                                    <span
                                                        className="small-text text-white text-d pointer"
                                                        style={{
                                                            width: "48%",
                                                            textAlign: "right",
                                                            display: " inline-block"
                                                        }}>
                                                                  فراموشی رمز عبور؟
                                                    </span>

                                                </div>

                                            </fieldset>
                                        </form>
                                        : null
                            }
                        </div>
                        {!this.isPhone() ?
                            <div>
                                <img src={ps4} className="rounded" alt="Cinque Terre" width={200} height={194}/>
                            </div>
                            : null
                        }

                    </div>
                </div>
                <div className="pt-2 pb-3">
                    <Reaptcha
                        ref={e => {
                            this.captcha = e
                        }}
                        sitekey="6Let6OYUAAAAADcPI9VYg-dmtNLzLkivnAlvpOOe"
                        onVerify={this.onVerify}
                        size="invisible"
                    />
                </div>
                <Progress
                    progress={this.state.progress}
                />
                <Notification
                    active={this.state.active}
                    boldText={this.state.boldText}
                    type={this.state.type}
                    text={this.state.text}
                    closeNotification={this.closeNotification}
                />
            </div>
        );
    }
}

export default Login;
