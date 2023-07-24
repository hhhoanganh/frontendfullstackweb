import { useRouter } from "next/router"
import { useState, React, useEffect } from "react"
import LayoutSidebar from "../components/layout-sidebar"
import Head from "next/head"

const UserProfile = () => {
    const router = useRouter()
    const [profile, setProfile] = useState(null);
    const [userProfile, setUserProfile] = useState();
    let [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState();


    useEffect(() => {

        async function fetchProfile() {
            setIsLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (res.ok) {
                const json = await res.json()
                setId(json.id)
                setProfile(json)
            }
            if (!res.ok) {
                router.push("/")
            }
            setIsLoading(false)

        }
        fetchProfile()
    }, [])

    useEffect(() => {

        console.log(id)
        fetchUserProfile()

    }, [isLoading])


    async function fetchUserProfile() {
        // console.log(id)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userprofile/getuser/` + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const json = await response.json()
            setUserProfile(json)
        } catch (error) { }

    }

    function handleClick() {
        let id = profile.id
        router.push({
            pathname: "/updateuser",
            query: { id: id }
        })
    }


    return (
        <>
            <LayoutSidebar>
                <div className="content">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="title">Profile</h5>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label>Username</label>
                                                    <div>
                                                        <label>
                                                             <h5>{profile && profile.username}</h5>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                                    <div>
                                                        <label>
                                                            <h5>{userProfile && userProfile.email}</h5>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <div>
                                                        <label>
                                                            <h5>{userProfile && userProfile.firstname}</h5>
                                                        </label>
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <div>
                                                        <label>
                                                            <h5>{userProfile && userProfile.lastname}</h5>
                                                        </label>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <div>
                                                        <label>
                                                            <h5>{userProfile && userProfile.address}</h5>
                                                        </label>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <div>
                                                        <label >
                                                            <h5>{userProfile && userProfile.phone}</h5>
                                                        </label>
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label>Country</label>
                                                    <div>
                                                        <label >
                                                            <h5>Việt Nam</h5>
                                                        </label>
                                                    </div>
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
                            <button className="btn btn-primary" onClick={handleClick}>Update User</button>
                        </div>
                        {/* {* --------------------*} */}
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
