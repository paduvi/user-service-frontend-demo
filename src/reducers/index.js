/**
 * Created by chotoxautinh on 1/2/17.
 */
import {combineReducers} from 'redux';

import config from './config';
import auth from './auth';

const app = combineReducers({
    config,
    auth
});

export default app;