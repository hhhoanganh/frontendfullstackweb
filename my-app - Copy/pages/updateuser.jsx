import { useRouter } from "next/router"
import { useState, React, useEffect } from "react"
import LayoutSidebar from "../components/layout-sidebar"
import Head from "next/head"

const UserProfile = () => {
    const router = useRouter()
    const [profile, setProfile] = useState(null);
    let id= router.query.id
    const [userProfile, setUserProfile] = useState(
        {   id:0,
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            phone: ""
        }
    );

    useEffect(() => {
        fetchUserProfile(id)
    }, [])
    useEffect(()=>{
        userProfile.id=id
    })

    async function fetchUserProfile(id) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userprofile/getuser/` + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const json = await response.json()
            setProfile(json)
        } catch (error) { }

    }
    const handleChange=(e)=>{
        const copy={...userProfile}
        copy[e.target.name]= e.target.value;
        setUserProfile(copy)
    }
    const updateUser= async (e)=>{
        e.preventDefault();
        console.log(userProfile)
        debugger
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userprofile/updateuser/` + id,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(userProfile)
        })
        debugger
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        if (response.ok) {
            const _user = await response.json();
            alert("update success")
        }
        router.push("/userprofile")
    }
    return (
        <>
            <LayoutSidebar>
                <div className="content">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="title">Edit Profile</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={(event)=> event.preventDefault()}>
                                        <div className="row">
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label>Company (disabled)</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        disabled=""
                                                        placeholder="Company"
                                                        defaultValue="Creative Code Inc."
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3 px-1">
                                                <div className="form-group">
                                                    <label>Username</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Username"
                                                        defaultValue={profile&&profile.username}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-1">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        name="email"
                                                        value={userProfile.email}
                                                        onChange={handleChange}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 pr-1">
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        name="firstname"
                                                        placeholder="First Name"
                                                        value={userProfile.firstname}
                                                        onChange={handleChange}
                                                        defaultValue={profile && profile.firstname}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 pl-1">
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="lastname"
                                                        placeholder="Last Name"
                                                        value={userProfile.lastname}
                                                        onChange={handleChange}
                                                        defaultValue={profile && profile.lastname}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Home Address"
                                                        name="address"
                                                        value={userProfile.address}
                                                        onChange={handleChange}
                                                        defaultValue={profile && profile.address}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 pr-1">
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="phone"
                                                        placeholder="Phone"
                                                        value={userProfile.phone}
                                                        onChange={handleChange}
                                                        defaultValue={profile && profile.phone}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 px-1">
                                                <div className="form-group">
                                                    <label>Country</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Country"
                                                        defaultValue="Andrew"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-1">
                                                <div className="form-group">
                                                    <label>Postal Code</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="ZIP Code"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>About Me</label>
                                                    <textarea
                                                        rows={4}
                                                        cols={80}
                                                        className="form-control"
                                                        placeholder="Here can be your description"
                                                        value="Mike"
                                                        defaultValue={
                                                            "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={updateUser}>Submit</button>
                        </div>
                        <div className="col-md-4">
                            <div className="card card-user">
                                <div className="image">
                                    <img src="../assets/img/bg5.jpg" alt="..." />
                                </div>
                                <div className="card-body">
                                    <div className="author">
                                        <a href="#">
                                            <img
                                                className="avatar border-gray"
                                                src="../assets/img/mike.jpg"
                                                alt="..."
                                            />
                                            <h5 className="title">{profile && profile.username}</h5>
                                        </a>
                                        <p className="description">User</p>
                                    </div>
                                    <p className="description text-center">
                                        Lamborghini Mercy <br />
                                        Your chick she so thirsty <br />
                                        I`&apos`m in that two seat Lambo
                                    </p>
                                </div>
                                <hr />
                                <div className="button-container">
                                    <button
                                        href="#"
                                        className="btn btn-neutral btn-icon btn-round btn-lg"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </button>
                                    <button
                                        href="#"
                                        className="btn btn-neutral btn-icon btn-round btn-lg"
                                    >
                                        <i className="fab fa-twitter" />
                                    </button>
                                    <button
                                        href="#"
                                        className="btn btn-neutral btn-icon btn-round btn-lg"
                                    >
                                        <i className="fab fa-google-plus-g" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutSidebar>
        </>
    )
}
export default UserProfile;
