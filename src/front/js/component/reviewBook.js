import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { StarRating } from "../component/StarRating";


import "../../styles/index.css";
import "../../styles/home.css";

export const ReviewBook = ({ item }) => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [editClicked, setEditClicked] = useState(false);
    const [editReview, setEditReview] = useState(item.review);
    const [editRating, setEditRating] = useState(item.rating);

    useEffect(() => {
        setTimeout(() => {
            actions.clearError();
            actions.clearAlert();
        }, 3000);
    }, [store.alert]);

    return (
        <div className="card-body">
            <div className="d-flex justify-content-between">
                <h5 className="card-title">By {item.full_name}</h5>
                <div className="d-flex">
                    {item.user_id != store.user.id ? null : !editClicked ? (
                        <>
                            <button className="btn custom-button me-2" onClick={() => setEditClicked(true)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className="btn custom-button" onClick={async () => {
                                await actions.removeFromReviews(item.id)
                                await actions.getOneBook(params.theisbn)
                                setEditReview("")
                                setEditRating(0)
                            }}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </>
                    ) : (
                        <button
                            className="btn custom-button"
                            onClick={async () => {
                                await actions.editReview(item.book_id, editReview, editRating);
                                setEditClicked(false);
                                actions.getOneBook(params.theisbn);
                            }}
                        >
                            <i className="fa-solid fa-floppy-disk"></i>
                        </button>
                    )}
                </div>
            </div>
            <h6 className="card-subtitle mb-2 text-muted">Posted on {item.created_at}</h6>

            {!editClicked ? (
                <>

                    <StarRating rating={editRating} editable={false} />
                </>
            ) : (
                <>
                    <label className="text-start mb-1">Rating:&nbsp; </label>
                    <StarRating
                        rating={editRating}
                        editable={true}
                        onRatingChange={(newRating) => setEditRating(newRating)}
                    />
                </>
            )}

            {!editClicked ? (
                <p className="mb-1">{editReview}</p>
            ) : (
                <>
                    <label className="text-start mb-1">Review:&nbsp;</label>
                    <textarea
                        className="form-control p-0 mb-1"
                        id="review"
                        aria-describedby="review"
                        rows="5"
                        defaultValue={editReview}
                        onChange={(e) => setEditReview(e.target.value)}
                    />
                </>
            )}
        </div>
    );
};

export default ReviewBook;
