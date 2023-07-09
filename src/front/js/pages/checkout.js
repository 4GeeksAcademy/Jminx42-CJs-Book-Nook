import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { CheckoutCard } from "../component/checkoutCard";

import { MobileCheckoutCard } from "../component/mobileCheckoutCard";

import "../../styles/index.css"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from "../component/stripe";
import "../../styles/stripe.css"

export const Checkout = () => {
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();
    // we need to add a new card to show on the checkout... maybe it should be the same as the favorites??
    const [user, setUser] = useState(store.user);
    const [editAddress, setEditAddress] = useState(false);
    const [editBilling, setEditBilling] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");
    const [checked, setChecked] = useState(false)
    const navigate = useNavigate()
    const promise = loadStripe("pk_test_51NOm30LDriABBO71EslVAUR52crSoSLYDfGJgAF61S1HyL5sxQ63PGMxS2xffxW2x9ugJm1sPSuNfhNibLoODb6M00SiS5BrMT");

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

        setActiveTab(params)
    }, []);

    const isMobile = windowWidth <= 582;


    const handleSave = async () => {
        setEditAddress(false);
        setEditBilling(false);

        const response = await fetch(process.env.BACKEND_URL + 'api/user/update', {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            await actions.validate_user()
            setAlert("Profile successfully updated");
        } else {
            const data = await response.json()
            setError(data.error)
        }
    };

    const handleBillingAddressChange = () => {
        setChecked(!checked);
        setUser({ ...user, billing_address: checked ? "" : user.address });
    };

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            actions.validate_user()
        } else {
            navigate("/")
        };
    }, []);
    const total = () => {
        let totalCheckout = 0;
        for (let x = 0; x < store.user.items.length; x++) {
            totalCheckout += store.user.items[x].book_format_id.book_price * store.user.items[x].unit
        }
        return totalCheckout
    }

    const createCheckoutSession = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + 'api/create-checkout-session', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });

            if (response.status === 303) {
                const data = await response.json();
                console.log(data)
                const url = data.checkout_session.url
                console.log(url)
                const checkout_url = data.checkout_session.url;

                window.location.replace(checkout_url)
                console.log("response was okay")
            } else {
                throw new Error('Failed to create checkout session');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className="container mt-4">

                    
                <div className="row d-flex justify-content-center mt-4">
                    {store.user.items && store.user.items.length > 0 ?

                        (<div className="row d-flex justify-content-center">
                            {store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                return <CheckoutCard key={items.id} item={items} />;

                            })}
                            <div className="row d-flex justify-content-end pe-0">
                                <div className="col-sm-6 col-md-6 col-lg-4 text-center d-flex justify-content-end pe-0">
                                    <h5 className="text-center px-4 py-2 m-0"> Total: {parseFloat(total().toFixed(2))}€ </h5>
                                    <Link to="/confirmDetails">
                                        <button className="btn custom-button text-center"><i className="fa-solid">Proceed &nbsp;</i><i className="fa-solid fa-arrow-right"></i></button>
                                    </Link>
                                    <button onClick={createCheckoutSession}>Stripe redirect</button>
                                </div>

                <h1 className="feature-title m-5">CHECKOUT</h1>
                {store.user.items && store.user.items.length > 0 ?
                    <>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <h5 className="text-start feature-title">1. Shipping Address:</h5>
                            <div className="d-flex justify-content-between">
                                {!editAddress ? (
                                    <p>{store.user.address}</p>
                                ) : (
                                    <input
                                        className="form-control"
                                        id="address"
                                        aria-describedby="address"
                                        value={user.address}
                                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                                    />
                                )}
                                {!editAddress ? (


                                    <button className="btn btn-secondary custom-button" onClick={() => setEditAddress(true)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>

                                ) : (
                                    <div className="d-flex">
                                        <button className="btn btn-secondary me-2 custom-button" onClick={handleSave}>
                                            <i className="fa-solid fa-floppy-disk"></i>
                                        </button>
                                        <button className="btn btn-secondary " onClick={() => setEditAddress(false)}>
                                            <i className="fa-solid fa-x"></i>
                                        </button>
                                    </div>


                                )}
                            </div>
                        </div>
                        <div className="col-sm-6 md-col-6 lg-col-6">
                            <h5 className="text-start feature-title">2. Billing Address:</h5>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checked} onChange={handleBillingAddressChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Is the billing address the same as the shipping address?
                                </label>
                            </div>
                            <div className="d-flex justify-content-between">
                                {checked ? (
                                    <p>{store.user.address}</p>
                                ) : !editBilling ? (
                                    <p>{store.user.billing_address}</p>
                                ) : (
                                    <input
                                        className="form-control"
                                        id="billing_address"
                                        aria-describedby="billing_address"
                                        value={user.billing_address}
                                        onChange={(e) => setUser({ ...user, billing_address: e.target.value })}
                                    />
                                )}
                                {!editBilling ? (

                                    <button className="btn btn-secondary custom-button" onClick={() => setEditBilling(true)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>

                                ) : (
                                    <div className="d-flex">
                                        <button className="btn btn-secondary me-2 custom-button" onClick={handleSave}>
                                        </button>
                                        <button className="btn btn-secondary " onClick={() => setEditBilling(false)}>
                                            <i className="fa-solid fa-x"></i>
                                        </button>
                                    </div>

                                )}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center mt-4">

                            <div className="row d-flex justify-content-center mt-4">
                                {!isMobile ? (store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                    return <CheckoutCard key={items.id} item={items} />;

                                })) : (store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                    return <MobileCheckoutCard key={items.id} item={items} />;

                                }))}
                                <div className="row d-flex justify-content-start ps-0">
                                    <div className="col-sm-6 col-md-6 col-lg-4 d-flex justify-content-start pe-0">
                                        <h5 className="text-center py-2 m-0"> Order Total: {parseFloat(total().toFixed(2))}€ </h5>
                                    </div>

                                </div>
                                <Elements stripe={promise}>
                                    <Stripe />
                                </Elements>
                            </div>

                        </div>
                    </> : (
                        <div>Add a book to purchase!</div>
                    )}

            </div>
        </div>
    );
};


