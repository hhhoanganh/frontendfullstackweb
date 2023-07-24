import { useRouter } from "next/router"
import { React, useState, useEffect } from "react"
import Head from "next/head"

const EditUser = ({ }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    let userId = router.query.id
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/test/users" + "/" + userId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const user1 = await response.json();
                setUser(user1);
                setIsOpen(true);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();

    }, [userId])

    function handleChange(e) {
        console.log(50)
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value })
    }

    const updateUser = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/test/users" + "/" + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(user),
        })
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        if (response.ok) {
            const _user = await response.json();
            reset(e);
            alert("update success")
        }
        router.push("/usertest")
    };
    const reset = (e) => {
        e.preventDefault();
        setIsOpen(false);
    }
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="../assets/img/apple-icon.png"
                />
                <link rel="icon" type="image/png" href="../assets/img/favicon.png" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <title>User Profile</title>
                <meta
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
                    name="viewport"
                />
                {/*     Fonts and icons     */}
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
                    integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
                    crossOrigin="anonymous"
                />
                {/* CSS Files */}
                <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
                <link href="../assets/css/now-ui-dashboard.css?v=1.5.0" rel="stylesheet" />
                {/* CSS Just for demo purpose, don't include it in your project */}
                <link href="../assets/demo/demo.css" rel="stylesheet" />
            </Head>
            <div className="wrapper ">
                <div className="sidebar" data-color="orange">
                    {/*
  Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
    */}
                    <div className="logo">
                        <a href="http://www.creative-tim.com" className="simple-text logo-mini">
                            CT
                        </a>
                        <a href="http://www.creative-tim.com" className="simple-text logo-normal">
                            Creative Tim
                        </a>
                    </div>
                    <div className="sidebar-wrapper" id="sidebar-wrapper">
                        <ul className="nav">
                            <li>
                                <a href="./icons.html">
                                    <i className="now-ui-icons education_atom" />
                                    <p>Icons</p>
                                </a>
                            </li>
                            <li>
                                <a href="./notifications.html">
                                    <i className="now-ui-icons ui-1_bell-53" />
                                    <p>Notifications</p>
                                </a>
                            </li>
                            <li >
                                <a href="./user.html">
                                    <i className="now-ui-icons users_single-02" />
                                    <p>User Profile</p>
                                </a>
                            </li>
                            <li>
                                <a href="./FilmList">
                                    <i className="now-ui-icons design_bullet-list-67" />
                                    <p>Film List</p>
                                </a>
                            </li>
                            <li>
                                <a href="./bookedticket">
                                    <i className="now-ui-icons design_bullet-list-67" />
                                    <p>Booked Ticket</p>
                                </a>
                            </li>
                            <li>
                                <a href="./typography.html">
                                    <i className="now-ui-icons text_caps-small" />
                                    <p>Typography</p>
                                </a>
                            </li>
                            <li className="active-pro">
                                <a href="./upgrade.html">
                                    <i className="now-ui-icons arrows-1_cloud-download-93" />
                                    <p>Upgrade to PRO</p>
                                </a>
                            </li>
                            <li className="active ">
                                <a href="./usertest">
                                    <i className="now-ui-icons design_bullet-list-67" />
                                    <p>User List</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="main-panel" id="main-panel">
                    {/* Navbar */}
                    <nav className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
                        <div className="container-fluid">
                            <div className="navbar-wrapper">
                                <div className="navbar-toggle">
                                    <button type="button" className="navbar-toggler">
                                        <span className="navbar-toggler-bar bar1" />
                                        <span className="navbar-toggler-bar bar2" />
                                        <span className="navbar-toggler-bar bar3" />
                                    </button>
                                </div>
                                <a className="navbar-brand" href="#pablo">
                                    User Profile
                                </a>
                            </div>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navigation"
                                aria-controls="navigation-index"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-bar navbar-kebab" />
                                <span className="navbar-toggler-bar navbar-kebab" />
                                <span className="navbar-toggler-bar navbar-kebab" />
                            </button>
                            <div
                                className="collapse navbar-collapse justify-content-end"
                                id="navigation"
                            >
                                <form>
                                    <div className="input-group no-border">
                                        <input
                                            type="text"
                                            defaultValue=""
                                            className="form-control"
                                            placeholder="Search..."
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <i className="now-ui-icons ui-1_zoom-bold" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#pablo">
                                            <i className="now-ui-icons media-2_sound-wave" />
                                            <p>
                                                <span className="d-lg-none d-md-block">Stats</span>
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            id="navbarDropdownMenuLink"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="now-ui-icons location_world" />
                                            <p>
                                                <span className="d-lg-none d-md-block">Some Actions</span>
                                            </p>
                                        </a>
                                        <div
                                            className="dropdown-menu dropdown-menu-right"
                                            aria-labelledby="navbarDropdownMenuLink"
                                        >
                                            <a className="dropdown-item" href="#">
                                                Action
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                Another action
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                Something else here
                                            </a>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#pablo">
                                            <i className="now-ui-icons users_single-02" />
                                            <p>
                                                <span className="d-lg-none d-md-block">Account</span>
                                            </p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    {/* End Navbar */}
                    <div className="panel-header panel-header-sm"></div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="title">Edit Profile</h5>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(event) => event.preventDefault()}>
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="Company"
                                                        value={user.email}
                                                        onChange={handleChange}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label>password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        placeholder="Password"
                                                        value={user.password}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <button className="btn btn-primary btn-block" onClick={updateUser}>save</button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card card-user">
                                    <div className="image">
                                        <img src="../assets/img/bg5.jpg" alt="..." />
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
                </div>
            </div>
        </>

    )
}

export default EditUser;

