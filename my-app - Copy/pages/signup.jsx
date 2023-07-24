import {React, useState} from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
  const router = useRouter()

  const [data, setData] = useState({
    error: true,
    msg: ''
  })
  const [state, setState] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [state1, setState1] = useState({
    password: ""
  })


  function handleChange(e) {
    const copy = { ...state }
    copy[e.target.name] = e.target.value;
    setState(copy)

  }
  function handleChange2(e) {
    const copy = { ...state1 }
    copy[e.target.name] = e.target.value;
    setState1(copy)

  }

  function handleChangePassword() {
    var regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    var num = /\d/;

    if (state.password.length < 8 || state.password.length > 20) {
      data.error = false,
        data.msg = "Độ dài mật khẩu trong khoảng từ 8 đến 20 ký tự"
    }
    else if (!regex.test(state.password)) {
      data.error = false,
        data.msg = "Mật khẩu phải có các ký tự đặc biệt"
    }
    else if (!state.password.toUpperCase()) {
      data.error = false,
        data.msg = "Mật khẩu phải có chữ in hoa"
    }
    else if (!state.password.toLowerCase()) {
      data.error = false,
        data.msg = "Mật khẩu phải có chữ thường"
    } else if (!num.test(state.password)) {
      data.error = false,
        data.msg = "Mật khẩu phải có các chữ số"
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    handleChangePassword();

    if (!data.error) {
      toast(data.msg, { hideProgressBar: true,autoClose:2000, type: 'error' })
    } else if(!state.password==state1.password){
      toast('Mật khẩu nhập lại không giống mật khẩu ban đầu', { hideProgressBar: true,autoClose: 2000, type: 'error' })
    }
    else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json"
        }
      })
      let status= res.text
      if (res.ok) {
        toast('Success', { hideProgressBar: true,autoClose: 2000, type: 'success' })
        router.push("/signin")
      } else  toast(status, { hideProgressBar: true,autoClose: 2000, type: 'success' })
    }
  }
  return (
    <>
      <Head>
        <title>Register</title>
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

      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt="">
              <img src="images/img-01.png" alt="IMG" />
            </div>
            <form className="login100-form validate-form">
              <span className="login100-form-title">New Member</span>
              <div
                className="wrap-input100 validate-input"
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
                className="wrap-input100 validate-input"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={state.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true" />
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
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
              <div
                className="wrap-input100 validate-input"
              >

                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Enter the password"
                  value={state1.password}
                  onChange={handleChange2}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={(e)=>handleSubmit(e)}>Login</button>
              </div>
              <ToastContainer />
              <div className="text-center p-t-12">
                <span className="txt1">Forgot </span>
                <a className="txt2" href="#">
                  Username / Password?
                </a>
              </div>
              <div className="text-center p-t-136">
                <a className="txt2" href="./">
                  Login
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
