import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setLoginData({

            ...loginData,

            [e.target.name]: e.target.value

        });

    };

    const handleLogin = (e) => {

        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(

            (item) =>

                item.email === loginData.email &&

                item.password === loginData.password

        );

        if (validUser) {

            alert("Login Successful");

            navigate("/");

        }

        else {

            alert("Invalid Email or Password");

        }

    };

    return (

        <div className="signup-container">

            <form

                className="signup-form"

                onSubmit={handleLogin}

            >

                <h1>Login</h1>

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={loginData.email}

                    onChange={handleChange}

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={loginData.password}

                    onChange={handleChange}

                />

                <button type="submit">

                    Login

                </button>

            </form>

        </div>

    );

}

export default Login;