import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setInputValues((previnputValues) => {
            return {
                ...previnputValues,
                [name]: value //Säger ändra bara på denna variabel
            }
        })
    }

    function onLoginClick() {
        authenticateLogin();
    }

    async function authenticateLogin() {
        const user = {
          username: inputValues.username,
          password: inputValues.password
        }
      
        let response = await sendJson("/api/users/login/", "POST", user);
        console.log(response);
      
        if(response.status === 200) {
          console.log("login successful")
          navigate("/Home");
        } else {
          return null;
        }
      }
    
    async function sendJson(url, method, data) {
        const fetchOptions = {
          method: method,
          body: JSON.stringify(data), // Gör om data till json
          headers: {
            "Content-Type": "application/json" // Media type json
          }
        }
    
        return await fetch(url, fetchOptions);
    }

    function goToLogin() {
      navigate("/login")
    }

    function goToCreate() {
      navigate("/")
    }
    return(
        <div className="login-page">
            <h1>Pro-mail Login</h1>

            <div className="login-btn-container">
              <button onClick={goToLogin}>Login page</button>
              <button onClick={goToCreate}>Create Account</button>
            </div>

            <section className="login-field">
            <div className="username-field">
                <label>Username</label>
                <input onChange={handleChange} name="username" value={inputValues.username} type="text" className="username-field" required />
            </div>
            <div className="password-field">
                <label>Password</label>
                <input onChange={handleChange} name="password" value={inputValues.password} type="password" className="password-field" required />
            </div>
            <button onClick={onLoginClick} className="login-btn">Login</button>

            </section>
        </div>
    )
}

export default Login;