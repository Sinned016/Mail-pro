import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

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

    function sendEmail() {
        navigate("/sendEmail");
    }

    function inbox() {
        navigate("/inbox")
    }

    function logout() {
        authenticateLogout();
    }

    async function authenticateLogout() {
        let response = await sendJson("/api/logout", "POST");

        if(response.status === 200) {
            navigate("/login");
        } else {
            navigate("/login");
        }
    }

    function sent() {
        navigate("/sent")
    }

    return(
        <div className="home-container">
            <h2 className="home-title">PRO-MAIL</h2>

            <div className="home-btn-container">
                <button onClick={inbox} className="home-btn">Inbox</button>
                <button onClick={sendEmail} className="home-btn">Send Email</button>
                <button onClick={sent} className="home-btn">Sent</button>
                <button onClick={logout} className="home-btn">Logout</button>
            </div>
        </div>
    )
}

export default Home;