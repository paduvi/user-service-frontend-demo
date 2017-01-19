/**
 * Created by chotoxautinh on 1/13/17.
 */
import qs from 'query-string';
import {normalize} from 'normalizr';
import * as schema from './schema';
import {getIsRequesting} from '../../reducers/auth';

export const userLogin = (auth, router) => async(dispatch, getState) => {
    if (getIsRequesting(getState().auth)) {
        return Promise.resolve();
    }
    dispatch({type: 'REQUEST_AUTH'});

    try {
        let authResp = await fetch(`${getState().config.backendRoute}/api/userLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(auth)
        });
        authResp = await authResp.json();
        if (authResp.error) {
            const {redirectURL, authCode, scope, error} = authResp;
            dispatch({
                type: 'REQUEST_AUTH_FAILURE',
                message: error || 'Something went wrong.',
            });
            return router.push({
                pathname: new URL(redirectURL).pathname,
                query: {
                    authCode,
                    scope: scope.join(','),
                    error
                }
            });
        }
        const res = {
            accessToken: authResp.accessToken,
            authScheme: authResp.authScheme,
            expiredTime: authResp.expiredTime,
            refreshToken: authResp.refreshToken
        };
        dispatch({
            type: 'REQUEST_AUTH_SUCCESS',
            response: {entities: {auth: res}},
        });
        return router.push({
            pathname: new URL(authResp.redirectURL).pathname,
            query: res
        })
    } catch (error) {
        dispatch({
            type: 'REQUEST_AUTH_FAILURE',
            message: error.message || 'Something went wrong.',
        });
    }
}

export const updateToken = (obj) => (dispatch, getState) => dispatch({
    type: 'REQUEST_AUTH_SUCCESS',
    response: {entities: {auth: obj}},
});

export const logout = () => (dispatch, getState) => dispatch({
    type: 'LOGOUT',
    response: {
        entities: {
            auth: {
                accessToken: undefined,
                authScheme: undefined,
                expiredTime: undefined,
                refreshToken: undefined
            }
        }
    }
})