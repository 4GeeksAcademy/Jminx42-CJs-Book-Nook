import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import "../../styles/index.css"
import { HomeCard } from "../component/homeCard";
import { Review } from "../component/review";

import { TransactionCard } from "../component/transactionCard";

import { Context } from "../store/appContext";
import { InputProfilePic } from "../component/inputProfilePic";
import { SupportCard } from "../component/supportCard";


export const Wishlist = () => {
    const { store, actions } = useContext(Context);
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");
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

    const isMobile = windowWidth <= 768;

    return (
        <div>
            <Navbar />
            <div className="d-flex">
                {!isMobile ?
                    (<div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '15rem' }}>

                        <p className="fs-4 legal-title">Profile</p>

                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto ">
                            <li className="nav-item">
                                <Link to={`/personalInformation`}>
                                    <button
                                        className="nav-link btn w-100 text-start"

                                    >
                                        <i className="fa-solid fa-user"></i> Personal Information
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/wishlist`}>
                                    <button
                                        className="nav-link btn w-100 text-start"
                                    >
                                        <i className="fa-solid fa-heart"></i> Wishlist
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/profileReviews`}>
                                    <button
                                        className="nav-link btn w-100 text-start"
                                    >
                                        <i className="fa-regular fa-keyboard"></i> My Reviews
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/personalInformation`}>
                                    <button
                                        className="nav-link btn w-100 text-start"
                                    >
                                        <i className="fa-regular fa-calendar-days"></i> Purchase History
                                    </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/personalInformation`}>
                                    <button
                                        className="nav-link btn w-100 text-start"
                                    >
                                        <i className="fa-solid fa-envelope"></i> Support
                                    </button>
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </div>) :
                    (
                        <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style={{ width: "3rem" }}>
                            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                                <li className="nav-item">
                                    <Link to={`/personalInformation`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Personal" data-bs-original-title="Personal">
                                            <i className="fa-solid fa-user"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/wishlist`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Reviews" data-bs-original-title="Reviews">
                                            <i className="fa-solid fa-heart"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/profileReviews`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Reviews" data-bs-original-title="Reviews">
                                            <i className="fa-regular fa-keyboard"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/personalInformation`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Purchase History" data-bs-original-title="Purchase History">
                                            <i className="fa-regular fa-calendar-days"></i>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/personalInformation`}>
                                        <button className="py-3 border-bottom rounded-0 nav-link btn" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Support" data-bs-original-title="Support">
                                            <i className="fa-solid fa-envelope"></i>
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                {/* Creating the different tabs: */}
                <div className="flex-grow-1 m-0">
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

                    {/* Adding content to each tab: */}
                    <div className={`tab-content ${isMobile ? 'mt-0' : 'profile-container'}`} >
                        <div className="container mt-4">
                            <div className="row d-flex">
                                {/* {store.user.wishlist && store.user.wishlist.length !== 0 ? store.user.wishlist.filter((book) => book.title.toLowerCase().includes(store.search)).map((book) => {
								return <Card key={book.isbn} item={book} />
							}) : null} */}
                                {store.user.wishlist && store.user.wishlist.length !== 0 ? store.user.wishlist.map((book) => {
                                    return <HomeCard key={book.id} item={book.book_id} />
                                }) :
                                    <div>
                                        Add books to your wishlist!
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
