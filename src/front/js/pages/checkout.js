import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { CheckoutCard } from "../component/checkoutCard";
import { MobileCheckoutCard } from "../component/mobileCheckoutCard";
import "../../styles/index.css"
import { Footer } from "../component/footer";


export const Checkout = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(store.user);
    const [editAddress, setEditAddress] = useState(false);
    const [editBilling, setEditBilling] = useState(false);
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            actions.clearError();
            actions.clearAlert();
        }, 3000);

        const handleResize = () => {
            setIsMobile(window.matchMedia("(max-width: 767px)").matches ||
                window.matchMedia("(max-width: 375px)").matches);
        };

        handleResize(); // Initial check on component mount

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };


    }, []);



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
            actions.createAlertMsg("Profile successfully updated");
        } else {
            const data = await response.json()
            setError(data.error)
        }
    };

    const handleBillingAddressChange = () => {
        setChecked(!checked);
        setUser({ ...user, billing_address: checked ? "" : user.address });

    };

    const total = () => {
        let totalCheckout = 0;
        for (let x = 0; x < store.user.items.length; x++) {
            totalCheckout += store.user.items[x].book_format_id.book_price * store.user.items[x].unit
        }
        return totalCheckout
    };

    const createCheckoutSession = async () => {
        const priceIdsAndUnits = [];
        store.user.items.forEach(item => {
            const priceId = item.book_format_id.price_id;
            const quantity = item.unit;
            priceIdsAndUnits.push({ "price_id": priceId, "quantity": quantity })

        });
        console.log(priceIdsAndUnits)
        try {
            const response = await fetch(process.env.BACKEND_URL + 'api/create-checkout-session', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(priceIdsAndUnits)
            });
            if (response.status === 303) {
                const data = await response.json();
                console.log(data)
                const checkout_url = data.checkout_session.url;
                window.location.replace(checkout_url)
            } else {
                throw new Error('Failed to create checkout session');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error)
        }
    };


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
            <div className="container mt-4 p-3">
                <h1 className="feature-title m-5">CHECKOUT</h1>
                {store.user.items && store.user.items.length > 0 ?
                    <>
                        <div className="row mb-2">
                            <h5 className="text-start feature-title">1. Shipping Address:</h5>
                            <div className="col-11 col-md-10 col-lg-9">


                                {!editAddress ? (
                                    <>
                                        {
                                            store.user.billing_address === null && checked ?
                                                store.user.billing_address
                                                :
                                                store.user.address
                                        }
                                    </>
                                ) : (
                                    <input
                                        className="form-control"
                                        id="address"
                                        aria-describedby="address"
                                        value={user.address}
                                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                                    />
                                )}
                            </div>
                            <div className="col-md-2 col-lg-3 d-flex justify-content-end">
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
                        <div className="row">
                            <h5 className="text-start feature-title">2. Billing Address:</h5>
                            <div className="col-11 col-md-10 col-lg-9">

                                {!editBilling ? (
                                    <>
                                        {
                                            store.user.billing_address === null && checked ?
                                                store.user.address
                                                :
                                                store.user.billing_address
                                        }
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checked} onChange={handleBillingAddressChange} />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Is the billing address the same as the shipping address?
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <input
                                        className="form-control"
                                        id="address"
                                        aria-describedby="address"
                                        value={user.billing_address}
                                        onChange={(e) => setUser({ ...user, billing_address: e.target.value })}
                                    />
                                )}



                            </div>

                            <div className="col-md-2 col-lg-3 d-flex justify-content-end">
                                <div>
                                    {!editBilling ? (

                                        <button className="btn btn-secondary custom-button" onClick={() => setEditBilling(true)}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>

                                    ) : (
                                        <div className="d-flex">
                                            <button className="btn btn-secondary me-2 custom-button" onClick={handleSave}>
                                                <i className="fa-solid fa-floppy-disk"></i>
                                            </button>
                                            <button className="btn btn-secondary " onClick={() => setEditBilling(false)}>
                                                <i className="fa-solid fa-x"></i>
                                            </button>
                                        </div>


                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="row d-flex justify-content-center mt-3">
                            <h5 className="text-start feature-title">3. Order Summary:</h5>


                            {!isMobile ? (store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                return (
                                    <div className="row" key={items.id}>
                                        <CheckoutCard key={items.id} item={items} />
                                    </div>
                                );

                            })) : (store.user.items.sort((a, b) => a.id - b.id).map((items) => {
                                return (
                                    <MobileCheckoutCard key={items.id} item={items} />
                                );

                            }))}

                            <div className="row d-flex justify-content-between align-items-center ps-0 my-2">
                                <div className="col-4 col-sm-4 col-md-2 col-lg-2 pe-0">
                                    <h5 className="text-center feature-title py-2 m-0"> Order Total:</h5>
                                </div>
                                <div className="col-1 col-md-3 col-lg-4">
                                </div>
                                <div className="col-1 col-md-2 col-lg-2 d-flex h-25 align-items-center">
                                </div>
                                <div className="col-3 col-sm-2 col-md-2 col-lg-1 text-center">
                                    {parseFloat(total().toFixed(2))}€
                                </div>
                                <div className="col-3 col-sm-1 col-md-1 col-lg-1 d-flex text-center justify-content-end p-0 ">
                                    <button className="btn custom-button d-flex " onClick={createCheckoutSession}><i className="fa-solid">PAY &nbsp;</i><i className="fa-solid fa-arrow-right"></i></button>
                                </div>

                            </div>

                        </div>

                    </> : (
                        <>
                            <Link to="/explore" className="link-like">
                                <div className="text-center">Add a book to purchase!</div>
                            </Link>

                        </>
                    )}

            </div>
            <Footer />
        </div>




    );
};
