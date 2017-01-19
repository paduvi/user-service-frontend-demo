/**
 * Created by chotoxautinh on 1/12/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from '../../actions/auth';

import Client from './Client';
import FetchError from './FetchError';

class ClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            fetching: false,
            errorMessage: ''
        }
    }

    componentWillMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            this.setState({fetching: true});
            const response = await fetch(`${this.props.backendRoute}/api/clientsList`);
            const {clients:{rows}} = await response.json();
            this.setState({clients: rows});
        } catch (err) {
            this.setState({errorMessage: err.message || 'Something went wrong'});
        } finally {
            this.setState({fetching: false});
        }
    }

    async clientLogin(client) {
        try {
            const backendRoute = this.props.backendRoute;

            const secretResp = await fetch(`${backendRoute}/api/clientGetSecret`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({appId: client.id})
            });
            const {appSecret, err} = await secretResp.json();
            if (err) {
                return this.setState({errorMessage: err});
            }
            const authResp = await fetch(`${backendRoute}/api/clientAuth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    appId: client.id,
                    appSecret
                })
            });
            const {authCode, scope, error} = await authResp.json();
            if (error) {
                return this.setState({errorMessage: error});
            }
            this.props.router.push({
                pathname: '/login',
                query: {
                    scope: scope.join(','),
                    authCode
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const {errorMessage, fetching, clients} = this.state;
        const {accessToken, logout} = this.props;
        if (fetching && !clients.length) {
            return <p>Loading...</p>
        }
        if (errorMessage && !clients.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                />
            );
        }

        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>App ID</th>
                        <th>App Name</th>
                        <th>Scope</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map(client =>
                        <Client key={client.id} {...client}
                                onLoginClick={() => this.clientLogin(client)}
                        />
                    )}
                    </tbody>
                </table>
                {accessToken && <button onClick={logout}>Log Out</button>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    backendRoute: state.config.backendRoute,
    accessToken: state.auth.info.accessToken
})

export default withRouter(connect(
    mapStateToProps,
    actions
)(ClientList));