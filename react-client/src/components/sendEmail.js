import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SendEmail() {
    const navigate = useNavigate();

    const [emailValues, setemailValues] = useState({
        to: "",
        message: ""
    })

    function handleChange(event) {
        const { name, value } = event.target; //Plockar ut name och value från eventet
        setemailValues((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
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

    function onSendClick() {
        sendEmail();
    }
    
    
    async function sendEmail() {
        const message = {
            to: emailValues.to,
            message: emailValues.message
        }
    
        
        let response = await sendJson("/api/user/send/", "POST", message);

        if(response.status === 200) {
            setemailValues({
                to: "",
                message: ""
            })
        }
        console.log(response);
        console.log("Email sent");
    }

    function navigateHome() {
        navigate("/Home")
    }


    return(
        <div className="email-wrapper">
            <h2>Send Email</h2>

            <button onClick={navigateHome}>Home</button>

            <section className="field-container">
            <div className="to-container">
                <label>TO</label>
                <input onChange={handleChange} value={emailValues.to} name="to" className="to-field" type="text" />
            </div>

            <div className="message-container">
                <label>Message</label>
                <textarea onChange={handleChange} value={emailValues.message} name="message" className="message-field" cols="30" rows="10"></textarea>
            </div>

            <button onClick={onSendClick} className="send-btn">Send mail</button>
            </section>


        </div>
    )
}

export default SendEmail;