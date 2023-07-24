import { React, useState } from "react";
import Head from 'next/head'
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
  const router = useRouter();
  const [count, setCount] = useState(0)
  const [state, setState] = useState({
    username: "",
    password: "",

  })


  function handleChange(e) {
    const copy = { ...state }
    copy[e.target.name] = e.target.value
    setState(copy)
  }
  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })

    if (count > 6)
      toast('Cần tải lại trang để đăng nhập', { hideProgressBar: true, autoClose: 2000, type: 'error' })

    else {
      if (res.ok) {
        const json = await res.json()
        localStorage.setItem("token", json.token)
        router.push("./filmcenter/filmlist")
      } else {

        toast('Tài khoản hoặc mật khẩu sai', { hideProgressBar: true, autoClose: 2000, type: 'error' })
        setCount(count + 1)
      }
    }
  }
  return (
    <>
      <Head>
        <title>Login</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/*===============================================================================================*/}
        <link rel="icon" type="image/png" href="images/icons/favicon.ico" />
        {/*===============================================================================================*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="fonts/font-awesome-4.7.0/css/font-awesome.min.css"
        />
        {/*===============================================================================================*/}
        <link rel="stylesheet" type="text/css" href="css/util.css" />
        <link rel="stylesheet" type="text/css" href="css/main.css" />
        {/*===============================================================================================*/}

      </Head >
      <ToastContainer />
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt="">
              <img src="images/img-01.png" alt="IMG" />
            </div>
            <form className="login100-form " onSubmit={(event) => event.preventDefault()}>
              <span className="login100-form-title">Member Login</span>
              <div
                className="wrap-input100"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={state.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true" />
                </span>
              </div>
              <div
                className="wrap-input100 "
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={handleSubmit}>Login</button>
              </div>
              <div className="text-center p-t-12">
                <span className="txt1">Forgot</span>
                <a className="txt2" href="#">
                  Username / Password?
                </a>
              </div>
              <div className="text-center p-t-136">
                <a className="txt2" href="./signup">
                  Create your Account
                  <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
