import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { StarRating } from "../component/StarRating";
import "../../styles/index.css"


import "../../styles/home.css";

export const LandingCard = ({ item }) => {
    const { store, actions } = useContext(Context);

    return (

        <div className="card d-flex flex-column m-2 p-0 border-0" style={{ width: "12rem", height: "27.4rem" }}>

            <Link to={`/book/${item.isbn}`}>
                <img src={item.book_cover} className="card-img-top contain" alt="..." style={{ height: "300px" }} />
            </Link>
            <div className="card-body pb-0 pt-2">
                <Link to={`/book/${item.isbn}`} className="link-like">
                    <div className="row d-flex flex-grow-1">
                        <h5 className="card-title text-center">{actions.capitalizeWords(item.title)}</h5>
                    </div>
                    <div className="row align-items-end">
                        <p className="card-text text-center mb-0 pb-0">{item.author}</p>
                    </div>
                </Link>
            </div>

            <div className="card-footer bg-white border-0 d-flex justify-content-center">
                <StarRating rating={item.average_rating} editable={false} />

            </div>


        </div >
    );
}

export default LandingCard