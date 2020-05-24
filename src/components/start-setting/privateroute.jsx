import React from "react"
import {Redirect, Route} from "react-router-dom";

const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return false
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return false
    }
    return item.value
};

export const PrivateRoute = ({path, component: Component, exact, theme, language}) => {
    return <Route
        exact={exact}
        path={path}
        render={() => {
            if (getWithExpiry("valid")) return <Component
                language={language}
                theme={theme}
            />;
            else return <Redirect to="/login"/>;
        }}
    />
};


