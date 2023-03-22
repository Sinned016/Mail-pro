import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sent() {
    const [sent, setSent] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        fetchSent();
    }, [])

    async function fetchSent() {
        let response = await fetch("/api/sent")
        let result = await response.json();

        setSent(result);
        console.log(result);

    }

    function goHome() {
        navigate("/Home")
    }

    return(
        <div className="sent-wrapper">
            <h2>Sent Mails</h2>

            <div className="sent-btn-container">
                <button onClick={goHome}>Home</button>
                <button onClick={fetchSent}>Refresh</button>
            </div>

            
            {sent && sent.map((mail, index) => {
                return(
                    <div key={index} className="email-item">
                        <h2 className="email-title">{mail.to}</h2>
                        <p className="email-content">{mail.message}</p>
                    </div>
                )
            })}
            
        </div>
    )
}

export default Sent;