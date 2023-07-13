import React from "react";
import "../../styles/index.css"
import "../../styles/home.css";
// Why does the prop need to be called "item"??
export const SupportCard = ({ item }) => {

    return (

        <div className="card">
            <div className="card-body text-start" >
                <h4 className="card-title">Ticket {item.ticket_id}</h4>
                <h5 className="card-subtitle mb-2 text-muted">Date Created: {item.support_created}</h5>
                <p className="card-text">Subject: {item.subject}</p>
                <p className="card-text">Message: {item.message}</p>

            </div>
        </div>
    );
}

export default SupportCard