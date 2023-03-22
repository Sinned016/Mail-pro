import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Inbox() {
    const [inbox, setInbox] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        fetchInbox();
    }, [])

    async function fetchInbox() {
        let response = await fetch("/api/inbox")
        let result = await response.json();

        setInbox(result);
        console.log(result);

    }

    function goHome() {
        navigate("/Home")
    }


    return(
        <div className="inbox-wrapper">
            <h2>Inbox</h2>

            <div className="inbox-btn-container">
                <button onClick={goHome}>Home</button>
                <button onClick={fetchInbox}>Refresh</button>
            </div>

            
            {inbox && inbox.map((mail, index) => {
                return(
                    <div key={index} className="email-item">
                        <h2 className="email-title">{mail.from}</h2>
                        <p className="email-content">{mail.message}</p>
                    </div>
                )
            })}
            

        </div>
        
    )
}

export default Inbox;