import React from 'react';
import {Redirect,Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
const PublicRoute = ({component: Component,restricted, ...rest}) => {
    const session=useSelector((state)=>state.sessionStore)
   
    return (

        <Route {...rest} render={props => (
            session.token && session.expire_at>new Date().valueOf() && restricted  ?
            <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute; 


