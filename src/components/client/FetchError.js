/**
 * Created by chotoxautinh on 1/9/17.
 */
import React from 'react';

const FetchError = ({ message, onRetry }) => (
    <div>
        <p>Could not fetch clients. {message}</p>
        <button onClick={onRetry}>Retry</button>
    </div>
);

export default FetchError;