/**
 * Created by chotoxautinh on 1/13/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth';
import {getIsRequesting} from '../../reducers/auth';

class LoginApp extends Component {

    componentWillMount() {
        this.checkAuth();
    }

    componentDidUpdate() {
        this.checkAuth();
    }

    async checkAuth() {
        const {auth:{accessToken}, router} = this.props;
        if (!accessToken)
            return Promise.resolve();
        return router.push('/dashboard');
    }

    submitAuth(e) {
        const {authCode, scope, userLogin, router} = this.props;
        const auth = {
            authCode,
            scope: scope.split(','),
            user_email: this.user_email_input.value,
            user_pass: this.user_pass_input.value
        };
        userLogin(auth, router);
        e.preventDefault();
    }

    render() {
        const {isRequesting, error} = this.props;

        return (
            <form onSubmit={(e) => this.submitAuth(e)}>
                <label>Email:</label>
                <input type="text" name="user_email"
                       ref={(input) => {
                           this.user_email_input = input
                       }}/>
                <label>Password:</label>
                <input type="password" name="user_pass"
                       ref={(input) => {
                           this.user_pass_input = input
                       }}/>
                <button type="submit" disabled={isRequesting}>Submit</button>
                {error && <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}
                {isRequesting && <p>Submitting...</p>}
            </form>
        )
    }
}

export const mapStateToProps = (state, {location: {query: {authCode, scope, error}}}) => ({
    isRequesting: getIsRequesting(state.auth),
    auth: state.auth.info,
    authCode,
    scope,
    error
})

export default connect(
    mapStateToProps,
    actions
)(LoginApp);