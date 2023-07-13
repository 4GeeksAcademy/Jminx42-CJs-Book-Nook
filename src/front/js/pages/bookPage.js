import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { StarRating } from "../component/StarRating";
import { Footer } from "../component/footer";
import { ReviewBook } from "../component/reviewBook";
import "../../styles/home.css";

export const BookPage = () => {
	const params = useParams();
	const [review, setReview] = useState({ review: "", rating: 0 });
	const { store, actions } = useContext(Context);
	const [editClicked, setEditClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showBookDetails, setShowBookDetails] = useState(false);
	const [format, setFormat] = useState()
	const [alert, setAlert] = useState("");
	const [error, setError] = useState("");
	const [isGooglePreview, setIsGooglePreview] = useState(false);
	const [rating, setRating] = useState(0)



	useEffect(() => {
		actions.getBooks();
		actions.getOneBook(params.theisbn);
		actions.getNYTReview(params.theisbn);

		setTimeout(() => {
			setIsLoading(false);
			setShowBookDetails(true);
			actions.clearAlert();
			actions.clearError();

		}, 3000);

	}, [params.isbn, store.alert]);

	useEffect(() => {
		if (store.book.preview && store.book.preview.includes("printsec=frontcover")) {
			setIsGooglePreview(true);
		} else {
			setIsGooglePreview(false);
		}
	}, [store.book.preview]);

	useEffect(() => {
		actions.getBookFormats();

	}, []);

	const submitReview = async (book_id) => {
		const response = await fetch(process.env.BACKEND_URL + 'api/review', {
			method: "POST",
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			},

			body: JSON.stringify({ "book_id": book_id, "review": review.review, "rating": rating })
		});

		if (response.ok) {
			const data = await response.json();
			const reviewData = data.review;
			await actions.validate_user();
			actions.createAlertMsg("Review added successfully");
			// console.log(reviewData);
			actions.getOneBook(params.theisbn)
			setReview({
				rating: 0,
				review: "",

			});
			setRating(0)

		} else {
			const data = await response.json();
			setError(data.error);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		submitReview(store.book.id, review.review, rating)
	};

	const handleAddToWishlist = () => {
		if (sessionStorage.getItem("token") && store.user) {
			actions.postWishlist(store.book.id);
		} else {
			actions.createAlertMsg("Please log in to add to your wishlist.");
			navigate("/login");

		}
	};
	if (isLoading || !showBookDetails) {
		return (
			<div>
				<Navbar />

				<div className="container text-center mt-5">
					<div className="spinner-border filter-link" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<div>Loading book...</div>
				</div>

			</div>
		);
	}


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

			<div className="container-fluid mt-4 border-0">
				<div className="row mt-3 text-center d-flex justify-content-center">
					<div className="col-8 col-sm-4 col-md-3 col-lg-3 d-flex justify-content-end">
						<img src={store.book.book_cover == null || store.book.book_cover == "" ? store.book.book_cover_b : store.book.book_cover} className="img-fluid mb-2" alt="Book cover" />
						<button
							type="button"
							className="btn position-absolute top-0 start-0 bg-blue border-0 text-white dark-button rounded-circle mt-2 ms-4"
							onClick={handleAddToWishlist}
							style={{ zIndex: 1 }}
						>
							{store.user.wishlist.some((wishlistItem) => wishlistItem.book_id.id === store.book.id) ? (
								<i className="fas fa-heart"></i>
							) : (
								<i className="far fa-heart"></i>
							)}
						</button>
					</div>
					<div className="col-11 col-sm-8 col-md-7 col-lg-6 p-0 text-start">
						<h2 className="filter-link">{actions.capitalizeWords(store.book.title)}</h2>
						<h4>by {store.book.author}</h4>

						<div className="d-flex mt-2 mt-md-4 mt-lg-4">

							<div className="me-2">
								<StarRating rating={store.book.average_rating ? store.book.average_rating : 0}
									editable={store.book.average_rating ? false : true}
									onRatingChange={setRating}
								/> </div>
							{store.book.average_rating ? " (out of " + store.book.ratings_count + " votes)" : "Be the first to rate this book"}

						</div>
						<div className="row ">
							<h4 className="filter-link fs-5 mt-2 mt-md-4 mt-lg-4 mb-2 mb-md-3 mb-lg-3">Book Format:</h4>
							<div className="col-6 col-sm-6 col-md-6 col-lg-7 d-flex align-items-center">
								<select className="form-select input-custom " aria-label="Default select example" defaultValue="" onChange={(e) => setFormat(e.target.value)}>

									<option value="" disabled>Select your format</option>
									{store.bookFormats.map((format) => (
										<option key={format.id} value={format.id}>{format.book_format} - {format.book_price}€ </option>
									))}
								</select>
							</div>
							<div className="col-6 col-sm-6 col-md-6 col-lg-5 g-0 d-flex align-items-center">
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
										<div className="">
											<p className="p-0 m-0">

												Want to add to your cart?&nbsp;
												<Link to="/login">

													<button type="button" className="btn px-0 pt-0 link-like">Login</button>

												</Link>
												&nbsp;first!
											</p>
										</div>
								}


							</div>
						</div>
					</div>
				</div>
				<div className="row text-start mt-3 d-flex justify-content-center">
					<div className="col-12 col-sm-12 col-md-10 col-lg-9">
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
								{params.theisbn ? <p className="mb-1"><strong>ISBN:</strong> {params.theisbn}</p> : null}
							</div>
						</div>
						{
							isGooglePreview ?
								<Link to={`/googlePreview/${params.theisbn}`} className="filter-link">
									<p className="fs-5 filter-link fw-bold preview">Click here to preview the book</p>
								</Link>
								:
								null
						}
						<hr></hr>
					</div>
				</div>
			</div>
			<div className="container-fluid mt-0 border-0">
				{store.nytReview && Object.keys(store.nytReview).length > 0 ? (
					<div className="row my-0 d-flex justify-content-center">
						<div className="col-12 col-sm-12 col-md-9 col-lg-9">
							<h4 className="background-custom p-3 rounded">New York Times' Reviews</h4>
							<div className="card-body border">
								<h5 className="card-title">
									{store.nytReview.byline
										.split(' ')
										.map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
										.join(' ')}
								</h5>
								<h6 className="card-subtitle mb-2 text-muted">Reviewed in {store.nytReview.publication_dt}</h6>
								<p className="card-text">Excerpt: {store.nytReview.summary}</p>
								<p className="card-text">
									Review Link: <a href={store.nytReview.url} target="_blank" rel="noopener noreferrer" className="link-like">Click here</a>
								</p>
							</div>
						</div>
					</div>
				) : null}
				<div className="row my-0 d-flex justify-content-center">
					<div className="col-12 col-sm-12 col-md-10 col-lg-9">
						<h4 className="background-custom p-3 rounded">Reviews & Ratings</h4>
						{store.book.reviews.map((review) => (
							<div className="card mb-5" key={review.id}>
								<ReviewBook item={review} />
							</div>
						))}
					</div>
				</div>
				{!store.book.reviews.find((item) => item.user_id === store.user.id) && (
					<div className="row mb-5 mt-2 p-2 d-flex justify-content-center">
						<div className="col-12 col-sm-12 col-md-10 col-lg-9 border">
							<h4 className="mt-3">Submit your review</h4>
							<p className="fst-italic">Submit either a rating, a review or both!</p>
							{sessionStorage.getItem('token') ? (
								<div>
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<label htmlFor="rating">Rating</label>
											<StarRating
												rating={rating}
												editable={true}
												onRatingChange={setRating}
											/>
										</div>
										<div className="form-group m-1">
											<label htmlFor="review">Review</label>
											<textarea
												className="form-control"
												id="review"
												rows="5"
												value={review.review || ''}
												onChange={(e) => setReview({ ...review, review: e.target.value })}
											/>
										</div>
										<button className="btn custom-button mt-2" type="submit">
											Submit
										</button>
									</form>
								</div>
							) : (
								<div>
									<p>
										Want to submit your review?&nbsp;
										<Link to="/login">
											<button type="button" className="btn link-like px-0 pt-0">
												Login
											</button>
										</Link>
										&nbsp;first!
									</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div >
	);
};
