import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import "../../styles/stripe.css"

export const Stripe = () => {
    const { store, actions } = useContext(Context);
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()


    // Create PaymentIntent as soon as the page loads
    const createStripePayment = async () => {
        const response = await fetch(process.env.BACKEND_URL + 'api/create-payment-intent', {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "payment_method_id": store.user.payment_method[0].id, "items": store.user.items })
        })
        const data = await response.json()

        return data.clientSecret
        // setClientSecret(data.clientSecret);


    }

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        const clientSecret = await createStripePayment()
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            // actions.clearItems()
            actions.updateUserItems()
            navigate('/success')

        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            <div className="d-flex justify-content-end pe-0 mt-3">
                <Link to="/confirmDetails">
                    <button className="btn custom-button text-center me-2"><i className="fa-solid fa-arrow-left">&nbsp; Go back</i></button>
                </Link>
                <button
                    disabled={processing || disabled || succeeded}
                    id="submit" className="btn custom-button"
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            <>
                                <i className="fa-solid">Pay &nbsp;</i><i className="fa-solid fa-arrow-right"></i>
                            </>
                        )}
                    </span>
                </button>
            </div>
            {/* Show any error that happens when processing the payment */}
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
            {/* Show a success message upon completion
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded, see the result in your
                <a
                    href={`https://dashboard.stripe.com/test/payments`}
                >
                    {" "}
                    Stripe dashboard.
                </a> Refresh the page to pay again.
            </p> */}
        </form>
    );
}