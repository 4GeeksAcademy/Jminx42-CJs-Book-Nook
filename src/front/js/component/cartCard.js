import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { StarRating } from "../component/StarRating";
import { Link } from "react-router-dom";
import "../../styles/index.css"

const CartCard = ({ item, setShowModal }) => {
    const { store, actions } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [showBookDetails, setShowBookDetails] = useState(false);
    const [format, setFormat] = useState();
    const [rating, setRating] = useState(0);
    const [isGooglePreview, setIsGooglePreview] = useState(false);

    useEffect(() => {
        actions.getOneBook(item.isbn);
        actions.getBookFormats()
        setTimeout(() => {
            setIsLoading(false);
            setShowBookDetails(true);
        }, 3000);
        document.body.classList.add("modal-open");
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    useEffect(() => {
        if (store.book.preview && store.book.preview.includes("printsec=frontcover")) {
            setIsGooglePreview(true);
        } else {
            setIsGooglePreview(false);
        }
    }, [store.book.preview]);

    useEffect(() => {
        actions.clearError();
        actions.clearAlert();
    }, []);

    if (isLoading || !showBookDetails) {
        // Display loading spinner and message
        return (
            <div className="modal fade show" tabIndex="-1" style={{ display: "block" }} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="card container border-0 mt-3">
                                <div className="p-4 text-center bg-body-tertiary rounded-3">
                                    <div className="spinner-border filter-link" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div>Loading book...</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>



        );
    }
    return (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block" }} aria-hidden="true">

            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="card container mt-4 border-0">
                            <div className="row mt-3 text-center">
                                <div className="col-lg-4 d-flex justify-content-end">
                                    <img src={store.book.book_cover == null || store.book.book_cover == "" ? store.book.book_cover_b : store.book.book_cover} className="img-fluid" alt="Book cover" />

                                </div>
                                <div className="col-lg-7 p-0 text-start">
                                    <h2 className="filter-link">{actions.capitalizeWords(store.book.title)}</h2>
                                    <h4>by {store.book.author}</h4>

                                    <div className="row">
                                        <h4 className="filter-link fs-5 mt-4">Book Format:</h4>
                                        <div className="col-lg-8">
                                            <select className="form-select input-custom mt-1" aria-label="Default select example" defaultValue="" onChange={(e) => setFormat(e.target.value)}>
                                                <option value="" disabled>Select your format</option>
                                                {store.bookFormats.map((format) => (
                                                    <option key={format.id} value={format.id}>{format.book_format} - {format.book_price}€ </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-2 g-0">
                                            {
                                                sessionStorage.getItem("token") ?
                                                    !format ?
                                                        <button
                                                            type="button"
                                                            className="btn me-2 custom-button"
                                                            disabled={!format} // How does the Alert message work?
                                                            onClick={() => setAlert("Select a format for the book first!")}
                                                        >
                                                            <i className="fas fa-shopping-cart"></i>
                                                        </button>
                                                        :
                                                        <button
                                                            type="button"
                                                            className="btn me-2 custom-button"
                                                            disabled={!format}
                                                            onClick={() => actions.postCheckout(format)}
                                                        >
                                                            <i className="fas fa-shopping-cart"></i>
                                                        </button>
                                                    :
                                                    <div>
                                                        <p className="p-0 m-0">
                                                            Want to add to your cart?&nbsp;
                                                            <Link to="/login">
                                                                <sup>
                                                                    <button type="button" className="btn link-like p-0">Login</button>
                                                                </sup>
                                                            </Link>
                                                            &nbsp;first!
                                                        </p>
                                                    </div>
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row text-start mt-3">
                                <div className="">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed input-custom filter-link fs-5 fw-bold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseThree"
                                        >
                                            Book Details
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            {store.book.description ? <p className="mb-1"><strong>Sinopse:</strong> {store.book.description}</p> : null}
                                            {store.book.publisher ? <p className="mb-1"><strong>Publisher:</strong> {store.book.publisher}</p> : null}
                                            {store.book.year ? <p className="mb-1"><strong>Year:</strong> {store.book.year}</p> : null}
                                            {store.book.genre ? <p className="mb-1"><strong>Genre:</strong> {store.book.genre}</p> : null}
                                            {store.book.pages ? <p className="mb-1"><strong>Pages:</strong> {store.book.pages}</p> : null}
                                            {store.book.isbn ? <p className="mb-1"><strong>ISBN:</strong> {store.book.isbn}</p> : null}
                                        </div>
                                    </div>
                                </div>
                                {
                                    isGooglePreview ?
                                        <Link to={`/googlePreview/${store.book.isbn}`} className="filter-link">
                                            <p className="fs-5 filter-link fw-bold preview">Click here to preview the book</p>
                                        </Link>
                                        :
                                        null
                                }


                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                        <button type="button" disabled={!format} className="btn custom-button"
                            onClick={() => {
                                actions.postCheckout(format)
                                setShowModal(false)
                                actions.createAlertMsg("Your cart was updated successfully");
                            }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;