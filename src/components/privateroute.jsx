import React from "react"
import {Redirect, Route} from "react-router-dom";


export const PrivateRoute = ({path, component: Component, exact}) => {
    return <Route
        exact={exact}
        path={path}
        render={() => {
            if (sessionStorage.getItem('valid')) return <Component/>;
            else return <Redirect to="/login"/>;
        }}
    />
};


