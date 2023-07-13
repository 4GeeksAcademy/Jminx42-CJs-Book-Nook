import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";
import "../../styles/index.css"
import { Context } from "../store/appContext";
import { InputProfilePic } from "../component/inputProfilePic";
import { Footer } from "../component/footer";


export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState(store.user);
    const [editClicked, setEditClicked] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [alert, setAlert] = useState("");
    const [error, setError] = useState("");



    useEffect(() => {
        setUser(store.user)

    }, [store.user]);

    const handleSave = async () => {
        setEditClicked(false);

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

    useEffect(() => {
        getUserReviews();
    }, []);

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
                        {/* Not sure if this should be horizontally aligned as well */}

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
                            <li className="nav-item ">
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


                    {/* Adding content to each tab: */}
                    <div className={`tab-content ${isMobile ? 'mt-0' : 'profile-container'}`} >
                        <div>
                            <div className="container mt-3">
                                <div className="row d-flex">
                                    <div className="col-9 col-sm-5 col-md-5 col-lg-4 col-xl-4">
                                        {!editClicked ? (
                                            !user.profile_picture
                                                ?
                                                <img
                                                    src="https://www.pngmart.com/files/10/User-Account-Person-PNG-Transparent-Image.png"
                                                    className="profile-responsive"
                                                    alt="Profile Picture"
                                                />
                                                :
                                                <img
                                                    src={user.profile_picture}
                                                    className="profile-responsive"
                                                    id="profile-picture"
                                                    alt="Profile Picture"
                                                />
                                        ) : (
                                            <div>
                                                <InputProfilePic />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12 col-sm-7 col-md-7 col-lg-5">
                                        <div className="d-flex align-items-center my-2">
                                            <label htmlFor="full_name" className="form-floating fw-bold custom-text my-auto">Email:</label>
                                            <p className="ms-2 my-auto">{user.email}</p>
                                        </div>

                                        {!editClicked ? (
                                            <div className="d-flex align-items-center my-2">
                                                <label htmlFor="full_name" className="form-floating fw-bold custom-text my-auto">Name:</label>
                                                <p className="ms-2 my-auto">{user.full_name}</p>
                                            </div>
                                        ) : (
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control input-custom my-2 my-auto"
                                                    id="full_name"
                                                    aria-describedby="full_name"
                                                    value={user.full_name}
                                                    onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                                                />
                                                <label htmlFor="full_name">Name</label>
                                            </div>
                                        )}



                                        {!editClicked ? (
                                            <div className="d-flex align-items-center my-2 my-auto">
                                                <label htmlFor="password" className="form-floating fw-bold custom-text">Password:</label>
                                                <p className="ms-2 my-auto">{user.password}***</p>
                                            </div>
                                        ) : (
                                            <div className="form-floating">
                                                <input
                                                    className="form-control input-custom my-2"
                                                    id="password"
                                                    aria-describedby="password"
                                                    value={user.password || ""}
                                                    onChange={(e) => setUser({ ...user, password: e.target.value })}

                                                />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                        )}

                                        {!editClicked ? (
                                            <div className="d-flex align-items-center my-2">
                                                <label htmlFor="shipping" className="form-floating fw-bold custom-text my-auto">Shipping Address:</label>
                                                <p className="ms-2 my-auto">{user.address}</p>
                                            </div>
                                        ) : (
                                            <div className="form-floating">
                                                <input
                                                    className="form-control input-custom my-2"
                                                    id="address"
                                                    aria-describedby="address"
                                                    value={user.address || ""}
                                                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                                                />
                                                <label htmlFor="shipping">Shipping Address</label>
                                            </div>
                                        )}


                                        {!editClicked ? (
                                            <div className="d-flex align-items-center my-2">
                                                <label htmlFor="billing_address" className="form-floating fw-bold custom-text my-auto">Billing Address:</label>
                                                <p className="ms-2 my-auto">{user.billing_address}</p>
                                            </div>
                                        ) : (
                                            <div className="form-floating">
                                                <input
                                                    className="form-control input-custom my-2"
                                                    id="billing_address"
                                                    aria-describedby="billing_address"
                                                    value={user.billing_address || ""}
                                                    onChange={(e) => setUser({ ...user, billing_address: e.target.value })}
                                                />
                                                <label htmlFor="billing_address">Billing Address</label>
                                            </div>
                                        )}
                                        <div className="d-flex justify-content-end">

                                            {!editClicked ? (

                                                <button className="btn btn-secondary custom-button" onClick={() => setEditClicked(true)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>

                                            ) : (
                                                <div className="d-flex">
                                                    <button className="btn btn-secondary me-2 custom-button" onClick={handleSave}>
                                                        <i className="fa-solid fa-floppy-disk"></i>
                                                    </button>
                                                    <button className="btn btn-secondary " onClick={() => setEditClicked(false)}>
                                                        <i className="fa-solid fa-x"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">

                                    </div>
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
