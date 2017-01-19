/**
 * Created by chotoxautinh on 1/1/17.
 */
import React from 'react';
import {render} from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';

import Root from './components/Root';
import configureStore from './configureStore';

const store = configureStore();

render(
    <Root store={store}/>,
    document.getElementById('root')
);