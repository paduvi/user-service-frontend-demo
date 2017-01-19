/**
 * Created by chotoxautinh on 1/18/17.
 */
import React from 'react';

const User = ({user}) => (
    <tr>
        <td>{user.id}</td>
        <td>{user.display_name}</td>
        <td>{user.user_email}</td>
    </tr>
);

export default User;
