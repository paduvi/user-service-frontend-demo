/**
 * Created by chotoxautinh on 1/3/17.
 */
import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import ClientApp from './client/ClientApp';
import LoginApp from './auth/LoginApp';
import LoginSuccess from './auth/LoginSuccess';
import DashBoard from './dashboard/DashBoard';

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={ClientApp}/>
            <Route path='/login' component={LoginApp}/>
            <Route path='/auth/fail' component={LoginApp}/>
            <Route path='/auth/success' component={LoginSuccess}/>
            <Route path='/dashboard' component={DashBoard}/>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root;