
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import "../../styles/home.css";
import CartCard from "./cartCard";



export const WishlistCard = ({ item }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showCartModal, setShowCartModal] = useState(false);

    const handleAddToWishlist = () => {
        if (sessionStorage.getItem("token") && store.user) {
            actions.postWishlist(item.id);
        } else {
            actions.createAlertMsg("Please log in to add to your wishlist.");
            navigate("/login");

        }
    };
    const handleAddToCart = () => {
        if (sessionStorage.getItem("token") && store.user) {
            setShowCartModal(true);
        } else {
            actions.createAlertMsg("Please log in to add to your cart.");
            navigate("/login");

        }
    };


    return (
        <div className="card d-flex flex-column m-2 p-0 border-0 pb-3" style={{ width: "12rem" }}>

            <div className="card-body-custom">
                {item.book_cover == null || item.book_cover == "" ? (

                    <>
                        <Link to={`/book/${item.isbn}`}>
                            <img src={item.book_cover_b} className="card-img-top contain" alt="Book Cover" style={{ height: "300px" }} />
                        </Link>


                    </>
                ) : (
                    <>
                        <Link to={`/book/${item.isbn}`}>
                            <img src={item.book_cover} className="card-img-top contain" alt="Book Cover" style={{ height: "300px" }} />
                        </Link>
                        <button
                            type="button"
                            className="btn position-absolute top-0 start-0 bg-blue border-0 text-white dark-button rounded-circle mt-2 ms-2"
                            onClick={handleAddToWishlist}
                            style={{ zIndex: 1 }}
                        >
                            <i className="fa-solid fa-trash"></i>

                        </button>

                    </>
                )}


                <div className="card-body pb-0">
                    <Link to={`/book/${item.isbn}`} className="link-like">
                        <div className="row d-flex flex-grow-1">
                            <h5 className="card-title text-center">{actions.capitalizeWords(item.title)}</h5>
                        </div>
                        <div className="row align-items-end">

                            <p className="card-text text-center">{item.author}</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="card-footer bg-white border-0 d-flex justify-content-center align-items-end flex-grow-1">

                <button type="button"
                    className="btn text-white dark-button"
                    onClick={handleAddToCart}
                >
                    Quick Add <i className="bi bi-cart"></i>
                </button>
                {
                    showCartModal &&
                    <CartCard item={item} setShowModal={setShowCartModal} />
                }

            </div>


        </div>
    );
};

