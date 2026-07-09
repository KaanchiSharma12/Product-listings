import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [user, setUser] = useState({

        username: "",

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!user.username || !user.email || !user.password) {

            alert("Please fill all fields");

            return;

        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        const alreadyExists = existingUsers.find(

            (item) => item.email === user.email

        );

        if (alreadyExists) {

            alert("Email already registered");

            return;

        }

        const newUser = {

            username: user.username,

            email: user.email,

            password: user.password,

        };

        existingUsers.push(newUser);

        localStorage.setItem(

            "users",

            JSON.stringify(existingUsers)

        );

        alert("Signup Successful");

        navigate("/login");

    };

    return (

        <div className="signup-container">

            <form

                className="signup-form"

                onSubmit={handleSubmit}

            >

                <h1>Signup</h1>

                <input

                    type="text"

                    name="username"

                    placeholder="Username"

                    value={user.username}

                    onChange={handleChange}

                />

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={user.email}

                    onChange={handleChange}

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={user.password}

                    onChange={handleChange}

                />

                <button type="submit">

                    Signup

                </button>

            </form>

        </div>

    );

}

export default Signup;