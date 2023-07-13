import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import "../../styles/index.css"
import { TransactionCard } from "../component/transactionCard";
import { Context } from "../store/appContext";
import { Footer } from "../component/footer";


export const PurchaseHistory = () => {
    const { store, actions } = useContext(Context);
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");
    const [reviews, setReviews] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        setTimeout(() => {
            actions.clearError();
            actions.clearAlert();
        }, 3000);
        getUserReviews()
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };


    }, []);

    const isMobile = windowWidth <= 768;

    const getUserReviews = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + "api/user_reviews", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                setReviews(data.reviews);
                console.log(data.reviews)
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
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
            <div className="d-flex">
                {!isMobile ?
                    (<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">

                        <p className="fs-4 legal-title m-0 d-flex justify-content-center">Profile</p>

                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto profile-li">
                            <li className="nav-item">
                                <Link to={`/profile`}>
                                    <button
                                        className="btn link-like w-100 text-start"

                                    >
                                        <i className="fa-solid fa-user"></i> Personal Information
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/wishlist`}>
                                    <button
                                        className="btn link-like w-100 text-start"
                                    >
                                        <i className="fa-solid fa-heart"></i> Wishlist
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/profileReviews`}>
                                    <button
                                        className="btn link-like w-100 text-start"
                                    >
                                        <i className="fa-regular fa-keyboard"></i> My Reviews
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/purchaseHistory`}>
                                    <button
                                        className="btn link-like w-100 text-start"
                                    >
                                        <i className="fa-regular fa-calendar-days"></i> Purchase History
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/profileSupport`}>
                                    <button
                                        className="btn link-like w-100 text-start"
                                    >
                                        <i className="fa-solid fa-envelope"></i> Support
                                    </button>
                                </Link>
                            </li>
                        </ul>

                    </div>) :
                    (
                        <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: "3rem" }}>
                            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                                <li className="nav-item">
                                    <Link to={`/profile`}>
                                        <button className="py-3 border-bottom rounded-0 btn link-like" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Personal" data-bs-original-title="Personal">
                                            <i className="fa-solid fa-user"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/wishlist`}>
                                        <button className="py-3 border-bottom rounded-0 btn link-like" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Reviews" data-bs-original-title="Reviews">
                                            <i className="fa-solid fa-heart"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/profileReviews`}>
                                        <button className="py-3 border-bottom rounded-0 btn link-like" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Reviews" data-bs-original-title="Reviews">
                                            <i className="fa-regular fa-keyboard"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/purchaseHistory`}>
                                        <button className="py-3 border-bottom rounded-0 btn link-like" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Purchase History" data-bs-original-title="Purchase History">
                                            <i className="fa-regular fa-calendar-days"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/profileSupport`}>
                                        <button className="py-3 border-bottom rounded-0 btn link-like" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Support" data-bs-original-title="Support">
                                            <i className="fa-solid fa-envelope"></i>
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                {/* Creating the different tabs: */}
                <div className="flex-grow-1 m-0">

                    <div className={`tab-content ${isMobile ? 'mt-0' : 'profile-container'}`} >
                        <div className="container mt-4">
                            <div className="container mt-4">

                                <div className="row d-flex mx-1 gap-2">
                                    {store.user.transaction && store.user.transaction.map((transaction) => {
                                        return <TransactionCard key={transaction.id} item={transaction} />
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
