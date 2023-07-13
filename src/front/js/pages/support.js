import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";



export const Support = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({ subject: "", message: "" });
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            actions.clearError();
            actions.clearAlert();
        }, 3000);
    }, []);
    const submitSupport = async () => {
        if (formData.message.trim() === "") {
            setError("Please enter a message");
            return;
        }
        if (formData.subject.trim() === "") {
            setError("Please enter a subject");
            return;
        }
        const response = await fetch(process.env.BACKEND_URL + 'api/support', {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ "subject": formData.subject, "message": formData.message })
        });

        if (response.ok) {
            const data = await response.json();
            const supportData = data.support;
            await actions.validate_user();
            setAlert(supportData);
            setFormData({
                subject: '',
                message: ''
            });
        } else {
            const data = await response.json();
            setError(data.error);
        }
    }

    const handleSupport = (e) => {
        e.preventDefault();
        setFormData({ ...formData, user_id: store.user.id })
        submitSupport()
    }

    return (
        <div>
            <Navbar />
            {
                alert && alert !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <div>
                                {alert}
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
                <h1 className='fs-1 mt-5 fw-bold legal-title mb-3 text-center'>FAQ</h1>
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                How do I place an order?
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body"> To place an order, follow these steps:
                                <ol>
                                    <li>Search or browse our book collection.</li>
                                    <li>Select the book(s) you wish to purchase and add them to your shopping cart.</li>
                                    <li>Proceed to checkout and provide your billing and shipping information.</li>
                                    <li>Review your order details and complete the payment.</li>
                                    <li>Once your order is confirmed, you will receive an email notification.</li>
                                </ol></div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                What payment methods do you accept?
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">We accept major credit cards (Visa, Mastercard, American Express) and PayPal as
                                payment methods. All transactions are processed securely.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                Can I cancel my order?
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body"> If you need to cancel your order, please contact us as soon as possible. We will do
                                our best to accommodate your request if the order has not been shipped yet.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                Can I leave a review for a book?
                            </button>
                        </h2>
                        <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body"> Yes, as a logged-in user, you can leave a review for any book in our collection.
                                Simply navigate to the book's page and scroll down to the review section. Rate the book and add your comments. Once submitted,
                                your review will be visible to other users.</div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='fs-4 mt-5 fw-bold legal-title mb-3 text-center'>Still unsure? Get in Touch!</h1>
            <div className="container mt-4 mx-auto">

                <form onSubmit={handleSupport} className="mx-auto">
                    <label>Subject</label>
                    <input
                        className="form-control"
                        id="subject"
                        aria-describedby="subject"
                        value={formData.subject || ""}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    <label>Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        aria-describedby="message"
                        rows="5"
                        value={formData.message || ""}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <button className="btn custom-button mt-3 mb-4" type="submit">
                        Submit
                    </button>

                </form>


            </div>


            <Footer />
        </div>

    );
}