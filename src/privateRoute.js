import React from 'react';
import {Redirect,Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
const PrivateRoute = ({component: Component, ...rest}) => {
    const session=useSelector((state)=>state.sessionStore)
    return (

        <Route {...rest} render={props => (
            session.token && session.expire_at>new Date().valueOf() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;