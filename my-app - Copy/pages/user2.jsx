import React, { useState } from 'react'

const User = ({ user, deleteUser, editUser, profile }) => {
    console.log(profile)
    function ShowEdit() {
        return (
            <div>
                {(profile!=null&& profile.authorities[0].authority === "ROLE_USER") ? <MyButton3/> :<MyButton />}
            </div>
        )
    }
    function ShowDelete() {
        return (
            <div>
                {(profile!=null&&profile.authorities[0].authority === "ROLE_SUPERADMIN") ? <MyButton2 /> : <MyButton3/>}
            </div>
        )
    }
    function MyButton() {
        return <button onClick={(e) => editUser(e, user.id)}>Edit</button>
    }

    function MyButton2() {
        return <button onClick={(e)=>deleteUser(e,user.id)}>delete</button>
    }
    function MyButton3(){
        return
    }
    return (
        <tr key={user.id}>
            <td >
                <div className="text-sm text-gray-500">{user.username}</div>
            </td>
            <td >
                <div className="text-sm text-gray-500">{user.email}</div>
            </td>
            <td>
                <ShowEdit  />
            </td>
            <td>
                <ShowDelete />
            </td>
        </tr>
    )
}

export default User
