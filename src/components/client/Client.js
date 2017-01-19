/**
 * Created by chotoxautinh on 1/3/17.
 */
import React from 'react';

const str_ellipsis = (txt) =>
    txt.length > 10 ? txt.substring(0, 10) + '...' : txt


const Client = ({onLoginClick, title, scope, id, client_secret}) => (
    <tr>
        <td title={id}>{str_ellipsis(id)}</td>
        <td>{title}</td>
        <td>
            <ul>
                {scope.map(name => (
                    <li key={id + name}>
                        {name}
                    </li>
                ))}
            </ul>
        </td>
        <td>
            <button onClick={onLoginClick}>Login</button>
        </td>
    </tr>
)

export default Client;