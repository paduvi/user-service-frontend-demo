/**
 * Created by chotoxautinh on 1/3/17.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import userApp from './reducers';
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';
import * as config from '../config';

const configureStore = () => {
    const middlewares = [thunk];
    const persistedState = loadState();

    if (config.env !== 'production')
        middlewares.push(createLogger());

    const store = createStore(
        userApp,
        persistedState,
        applyMiddleware(...middlewares)
    );

    store.subscribe(throttle(() =>
        saveState({
            auth: {
                info: store.getState().auth.info
            }
        }), 1000));

    // observeStore(store, (state) => state.auth.info, () =>
    //     saveState({
    //         auth: {
    //             info: store.getState().auth.info
    //         }
    //     }));


    return store;
}

/* custom subscribe part of store */
function observeStore(store, select, onChange) {
    let currentState;

    function handleChange() {
        let nextState = select(store.getState());
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}

export default configureStore;
