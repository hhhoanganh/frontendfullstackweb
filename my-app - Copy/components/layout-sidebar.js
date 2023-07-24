/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, useEffect, React } from 'react';
import Head from "next/head"
export default function LayoutSidebar(props) {
    const [state, setState] = useState(false);
    const [stateProfile, setStateProfile] = useState(false);
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState(null);
    useEffect(() => {

        async function fetchProfile() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test/profile`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                if (res.ok) {
                    const json = await res.json()

                    if (json != null && json.authorities[0].authority != "ROLE_USER") {
                        setState(true)
                    }
                    if (json != null){
                        setStateProfile(true)
                        setProfile(json)
                    }

                }
            } catch (error) {
                console.log(null);
            }


        }
        fetchProfile()

    }, [])

    if (typeof document !== "undefined") {
        const links = document.querySelectorAll("li a");
        // Lấy đường dẫn hiện tại
        const currentPath = window.location.pathname;
        // Duyệt qua các liên kết
        links.forEach((link, index) => {
            // So sánh đường dẫn hiện tại với thuộc tính href của liên kết
            if (currentPath == link.getAttribute("href")) {
                // Thêm lớp "active" cho thẻ <li> chứa liên kết này
                link.parentElement.classList.add("active");
                // Lưu trữ chỉ số của liên kết này vào localStorage
                localStorage.setItem("activeIndex", index);
            }
        });
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
                <title>Film center</title>
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

                    <div className="sidebar-wrapper" id="sidebar-wrapper">
                        <ul className="nav">
                            <li>
                                <a href="/icons/icon">
                                    <i className="now-ui-icons education_atom" />
                                    <p>Icons</p>
                                </a>
                            </li>
                            <li>
                                <a href="/notifications/notification">
                                    <i className="now-ui-icons ui-1_bell-53" />
                                    <p>Notifications</p>
                                </a>
                            </li>
                            <li>
                                <a href="/userprofile">
                                    <i className="now-ui-icons users_single-02" />
                                    <p>User Profile</p>
                                </a>
                            </li>
                            <li >
                                {/* className="active " */}
                                <a href="/filmcenter/filmlist">
                                    <i className="now-ui-icons design_bullet-list-67" />
                                    <p>Film List</p>
                                </a>
                            </li>
                            <li >
                                <a href="/filmcenter/bookedticket">
                                    <i className="now-ui-icons design_bullet-list-67" />
                                    <p>Booked Ticket</p>
                                </a>
                            </li>
                            <li >
                                <a href="/cinema/cinemalist">
                                    <i className="now-ui-icons design_bullet-list-67" />
                                    <p>Cinema List</p>
                                </a>
                            </li>
                            <li>
                                <a href="/map/map">
                                    <i className="now-ui-icons location_map-big" />
                                    <p>Map</p>
                                </a>
                            </li>
                            {state && <li>
                                <a href="/usertest">
                                    <i className="now-ui-icons users_single-02" />
                                    <p>User List</p>
                                </a>
                            </li>}
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
                                    Table List
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
                                    <li>
                                        <a className="nav-link" >
                                            <i className="now-ui-icons users_single-02" onClick={() => setShow(true)} />

                                        </a>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </nav>
                    {/* End Navbar */}
                    <div className="panel-header panel-header-sm"></div>

                    {show && (

                        <div className="sidebar" >


                            <div
                                onClick={() => setShow(false)}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    display: 'block'
                                }}
                            >
                                <div

                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        right: 0,
                                        width: '18%',
                                        height: 150,
                                        backgroundColor: 'lightblue',
                                        borderRadius: 10,
                                        marginTop: 35,
                                        display: 'block'
                                    }}
                                >
                                    <div className="author" style={{ float: 'left' }}>
                                        <a href="#">
                                            <img style={{ borderRadius: 20, width: '20%', height: '20%' }}
                                                className="avatar border-gray"
                                                src="../assets/img/mike.jpg"
                                                alt="..."
                                            />
                                        </a>

                                    </div>
                                    {stateProfile && <div><h5>Username: {profile && profile.username}</h5></div>}
                                    {stateProfile && <div style={{ float: 'left' }}>
                                        <button className='btn'>Logout</button>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}

                    {props.children}
                </div>
            </div>
        </>
    )
}
