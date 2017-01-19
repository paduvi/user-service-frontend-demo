/**
 * Created by chotoxautinh on 1/18/17.
 */
import React from 'react';

const NeedAuth = ({returnHome}) => (
    <div>
        <p>Need Auth!</p>
        <button onClick={returnHome}>Return Home</button>
    </div>
);

export default NeedAuth;