import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";



export const Success = () => {
    const { store, actions } = useContext(Context);
    const [error, setError] = useState("");

    useEffect(() => {
        createTransaction();

        setTimeout(() => {
            actions.clearError();
            actions.clearAlert();
        }, 3000);

    }, []);

    const createTransaction = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + 'api/createTransaction', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                },

            });

            if (response.status === 200) {
                const data = await response.json();
                await actions.validate_user();
                console.log(data);
                actions.createAlertMsg("Payment was successful!");
                console.log("response was okay");
            } else {
                throw new Error('Failed to create transaction');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error);
        }
    }

    return (
        <div>
            <Navbar />
            {
                store.alert && store.alert !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <div>
                                {store.alert}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            {
                error && error !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <div>
                                {error}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            <div className="container mt-5 mx-auto">
                <h1 className='fs-1 mt-5 fw-bold legal-title my-3 text-center'>Thank you for your order</h1>

                <p className="text-center my-5">Keep Exploring and Find New Books!</p>
                <img src="https://www.liveabout.com/thmb/A17WsoyH1xnIsJnT15yOL60-OBg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bookmemecover-5c520a8ec9e77c0001d764a1.png" className="img-fluid" alt="book meme" />

                <Link to="/explore">
                    <button className="btn custom-button text-center mt-5 mb-5"><i className="fa-solid fa-arrow-left">&nbsp; Go Back</i></button>
                </Link>
            </div>

            <Footer />
        </div>

    );
}