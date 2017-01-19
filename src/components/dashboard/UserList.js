/**
 * Created by chotoxautinh on 1/18/17.
 */
import React from 'react';

import User from './User';

const UserList = ({users}) => (
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <User user={user} key={user.id}/>
        ))}
        </tbody>
    </table>
);

export default UserList;