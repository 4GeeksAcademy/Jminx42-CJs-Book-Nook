import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css";
import "../../styles/home.css";

export const MobileCheckoutCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    useEffect(() => {
        actions.clearError();

    }, []);

    const handleAddUnit = async () => {
        const opts = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "transaction_id": item.id })
        };


        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/addunit', opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                const errorMessage = data.error || "Something went wrong";
                setErrorMessage(errorMessage);
                return false;
            } else {
                await actions.validate_user();
                setAlertMsg("Your cart was updated successfully");
                return true;
            }
        } catch (error) {
            console.error(`Error during fetch: ${process.env.BACKEND_URL}api/addunit`, error);
        }
    }

    const handleRemoveUnit = async (id) => {
        const opts = {
            method: 'PUT',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "transaction_id": item.id })
        };


        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/removeunit', opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                const errorMessage = data.error || "Something went wrong";
                setErrorMessage(errorMessage);
                return false;
            } else {
                await actions.validate_user();
                setAlertMsg("Your cart was updated successfully");
                return true;
            }
        } catch (error) {
            console.error(`Error during fetch: ${process.env.BACKEND_URL}api/removeunit`, error);
        }
    }

    const handleRemove = async (id) => {
        const opts = {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "transaction_id": item.id })
        };


        try {
            const resp = await fetch(process.env.BACKEND_URL + 'api/removeitem', opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                const errorMessage = data.error || "Something went wrong";
                setErrorMessage(errorMessage);
                return false;
            } else {
                await actions.validate_user();
                setAlertMsg("Your item was deleted successfully");
                return true;
            }
        } catch (error) {
            console.error(`Error during fetch: ${process.env.BACKEND_URL}api/removeitem`, error);
        }
    }


    return (
        <div className="container">

            <div className="row mb-2 d-flex">
                <div className="col-4 col-sm-3 col-md-2 col-lg-2">
                    <Link to={`/book/${item.book_id.isbn}`}>
                        <img src={item.book_id.book_cover} className="img-responsive" alt="..." />
                    </Link>
                </div>
                <div className="col-8 col-sm-8 ps-0">
                    <h4 className="text-start">{actions.capitalizeWords(item.book_id.title)}</h4>
                    <p className="text-start mb-0">{item.book_format_id.book_format}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn custom-button" onClick={() => handleAddUnit(item.id)}><i className="fa-solid fa-plus"></i></button>
                            <p className="text-center mb-0 px-3">{item.unit}</p>
                            <button className="btn custom-button" onClick={() => handleRemoveUnit(item.id)}><i className="fa-solid fa-minus"></i></button>
                        </div>
                        <p className="text-center mb-0 p-2">{item.book_format_id.book_price * item.unit}€</p>
                        <button className="btn custom-button" onClick={() => handleRemove(item.id)}><i className="fa-solid fa-trash"></i></button>
                    </div>

                </div>


            </div>
        </div>
    );
};


