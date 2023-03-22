import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function CreateAccount() {
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

    function onCreateClick() {
        createAccount();
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

    async function createAccount() {
        const newUser = {
          username: inputValues.username,
          password: inputValues.password
        }
      
        let response = await sendJson("/api/user/", "POST", newUser);
        console.log(response);
      
        if(response.status === 200) {
          console.log("Created account")
          navigate("/login")
        } else if (response.status === 400) {
          console.log("Bad request")
        }
      }

      function goToLogin() {
        navigate("/login")
      }

      function goToCreate() {
        navigate("/")
      }

    return(
        <div className="account-page">
            <h1>Create account</h1>

            <div className="create-btn-container">
              <button onClick={goToLogin}>Login page</button>
              <button onClick={goToCreate}>Create Account</button>
            </div>

            <section className="create-field">
            <div className="username-field">
                <label for="">Username</label>
                <input onChange={handleChange} value={inputValues.username} name="username" type="text" className="create-username-field" required/>
            </div>

            <div className="password-field">
                <label for="">Password</label>
                <input onChange={handleChange} value={inputValues.password} name="password" type="password" className="create-password-field" required/>
            </div>
            
            <button onClick={onCreateClick} className="create-btn">Create account</button>
            </section>
        </div>
    );
}

export default CreateAccount;