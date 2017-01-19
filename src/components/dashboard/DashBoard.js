/**
 * Created by chotoxautinh on 1/18/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth';

import NeedAuth from './NeedAuth';
import UserList from './UserList';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            fetching: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        this.setState({fetching: true}, this.fetchUser);
    }

    async fetchUser() {
        try {
            let {
                auth: {accessToken, authScheme, refreshToken, expiredTime},
                updateToken, backendRoute
            } = this.props;
            if (!accessToken)
                return Promise.resolve();
            if (expiredTime < Date.now() / 1000) {
                const res = await fetch(`${backendRoute}/api/refreshToken`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${authScheme} ${accessToken}`
                    },
                    body: JSON.stringify({refreshToken})
                });
                const json = await res.json();
                const authResp = {
                    accessToken: json.accessToken,
                    authScheme: json.authScheme,
                    expiredTime: json.expiredTime,
                    refreshToken: json.refreshToken
                };
                return updateToken(authResp);
            }

            const res = await fetch(`${backendRoute}/api/usersList`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authScheme} ${accessToken}`
                }
            });
            const {error, users} = await res.json();
            if (error) {
                return this.setState({
                    errorMessage: error, fetching: false
                });
            }
            this.setState({users: users.rows, fetching: false});
        } catch (err) {
            this.setState({errorMessage: err.message || 'Something went wrong', fetching: false});
        }
    }

    render() {
        const {auth:{accessToken}, router, logout} = this.props;
        const {fetching, users, errorMessage} = this.state;
        if (!accessToken)
            return <NeedAuth returnHome={() => router.push('/')}/>
        return (
            <div>
                <button onClick={logout}>Log Out</button>
                <h1>User List</h1>
                {fetching && !users.length && <p>Loading...</p>}
                {errorMessage && !users.length && <p>Error: {errorMessage}</p>}
                {users.length > 0 && <UserList users={users}/>}
            </div>
        )
    }
}

export const mapStateToProps = (state) => ({
    backendRoute: state.config.backendRoute,
    auth: state.auth.info
})

export default connect(
    mapStateToProps,
    actions
)(DashBoard);