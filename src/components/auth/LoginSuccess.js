/**
 * Created by chotoxautinh on 1/18/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth';

class LoginSuccess extends Component {
    componentDidMount() {
        this.checkAuth();
    }

    checkAuth() {
        const {auth:{accessToken}, router} = this.props;
        if (accessToken)
            return router.push('/dashboard');
    }

    render() {
        return (
            <h2>
                Redirecting...
            </h2>
        )
    }
}

export const mapStateToProps = (state) => ({
    auth: state.auth.info
})

export default connect(
    mapStateToProps,
    actions
)(LoginSuccess);