import { React, useState, useEffect } from "react";
import User from "./user2";
import LayoutSidebar from "../components/layout-sidebar"
import { useRouter } from "next/router";

const UserList = ({ user }) => {
    const USER_API_BASE_URL = `http://localhost:8080/api/test/users`;
    const router = useRouter()
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [responseUser, setResponseUser] = useState(null);
    const [profile, setProfile] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const reponse = await fetch(USER_API_BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    },
                });
                const users = await reponse.json();
                setUsers(users);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [user, responseUser]);

    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test/profile`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        if (res.ok) {
            const json = await res.json()
            setProfile(json)
        }

    }
    const deleteUser = (e, id) => {
        e.preventDefault();
        fetch(USER_API_BASE_URL + "/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            if (users) {
                setUsers((prevElement) => {
                    return prevElement.filter((user) => user.id !== id);
                })
            }
        });
    }
    const editUser = (e, id) => {
        e.preventDefault();
        let userId = id
        router.push({
            pathname: "/editUser",
            query: { id: userId }
        })

    }


    return (
        <>
            <LayoutSidebar>                    <div className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Film List</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className=" text-primary">
                                            <tr>
                                                <th>User Name</th>
                                                <th>Email</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        {!loading && (
                                            <tbody className="bg-white">
                                                {users?.map((user) => (
                                                    <User user={user} key={user.id} deleteUser={deleteUser} editUser={editUser} profile={profile} />
                                                ))}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </LayoutSidebar>
        </>
    );
};

export default UserList;
