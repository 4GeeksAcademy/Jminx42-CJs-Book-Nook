import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { StarRating } from "../component/StarRating";

import "../../styles/index.css";
import "../../styles/home.css";

export const Review = ({ item }) => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [editClicked, setEditClicked] = useState(false);
    const [editReview, setEditReview] = useState({
        rating: item.rating,
        review: item.review
    });
    const [rating, setRating] = useState(0);

    useEffect(() => {
        actions.clearError();
        actions.clearAlert();
    }, []);




    return (
        <div className="card p-3 m-2">

            <div className="row">
                <div className="col-sm-4 col-md-3 col-lg-3">
                    <Link to={`/book/${item.book_id.isbn}`}>
                        <img
                            src={item.book_id.book_cover}
                            className="img-fluid rounded-start"
                            alt="book cover"
                            style={{ width: '200px' }} />
                    </Link>
                </div>
                <div className="col-sm-6 col-md-9 col-lg-9">
                    <h4 className="card-title">{actions.capitalizeWords(item.book_id.title)}</h4>
                    <h5 className="card-subtitle mb-2 text-muted">by {item.book_id.author}</h5>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="card-text mb-0">Posted on {item.created_at}</p>
                        <div className="d-flex">
                            {item.user_id != store.user.id ? null : !editClicked ?
                                <>
                                    <button className="btn custom-button me-2" onClick={() => setEditClicked(true)}><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className="btn custom-button" onClick={async () => {
                                        await actions.removeFromReviews(item.id)

                                    }}><i className="fa-solid fa-trash"></i></button>
                                </>
                                :
                                <button className="btn custom-button" onClick={async () => {
                                    await actions.editReview(item.book_id.id, editReview.review, rating)
                                    setEditClicked(false)
                                }}><i className="fa-solid fa-floppy-disk"></i></button>
                            }
                        </div>
                    </div>

                    <div className="d-flex align-items-center"> {/* Wrap label and input in a flex container */}
                        <label className="text-start mb-1">Rating:&nbsp; </label>
                        {!editClicked ? (
                            <StarRating rating={item.rating} editable={false} />
                        ) : (
                            <StarRating
                                rating={rating}
                                editable={true}
                                onRatingChange={setRating}
                            />
                        )}
                    </div>
                    <div className="d-flex align-items-center"> {/* Wrap label and input in a flex container */}
                        <label className="text-start mb-1">Review:&nbsp;</label>
                        {!editClicked ? (
                            <p className="mb-1">{item.review}</p>
                        ) : (
                            <textarea
                                className="form-control p-0 mb-1"
                                id="review"
                                aria-describedby="review"
                                rows="5"
                                defaultValue={editReview.review}
                                onChange={(e) => setEditReview({ ...editReview, review: e.target.value })}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
