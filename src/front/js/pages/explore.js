import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

import { HomeCard } from "../component/homeCard";

export const Explore = () => {
	const { store, actions } = useContext(Context);
	const [genre, setGenre] = useState([]);
	const [publisher, setPublisher] = useState([]);
	const [year, setYear] = useState("");
	const [fictionChecked, setFictionChecked] = useState(false);
	const [crimeChecked, setCrimeChecked] = useState(false);
	const [healthChecked, setHealthChecked] = useState(false);
	const [biographyChecked, setBiographyChecked] = useState(false);
	const [historyChecked, setHistoryChecked] = useState(false);
	const [humorChecked, setHumorChecked] = useState(false);
	const [selfChecked, setSelfChecked] = useState(false);
	const [penguinChecked, setPenguinChecked] = useState(false);
	const [nationalChecked, setNationalChecked] = useState(false);
	const [simonChecked, setSimonChecked] = useState(false);
	const [washingtonChecked, setWashingtonChecked] = useState(false);
	const [bloomChecked, setBloomChecked] = useState(false);
	const [harperChecked, setHarperChecked] = useState(false);
	const [ballantineChecked, setBallantineChecked] = useState(false);
	const [martinChecked, setMartinChecked] = useState(false);
	const [bayChecked, setBayChecked] = useState(false);


	useEffect(() => {
		actions.getBooks();
		actions.emptyBook();
		setTimeout(() => {
			actions.clearError();
			actions.clearAlert();
		}, 3000);
	}, []);

	const handleGenreCheckboxChange = (value) => {
		if (genre.includes(value)) {
			setGenre(genre.filter((item) => item !== value));
		} else {
			setGenre([...genre, value]);
		}
	};

	const handlePublisherCheckboxChange = (value) => {
		if (publisher.includes(value)) {
			setPublisher(publisher.filter((item) => item !== value));
		} else {
			setPublisher([...publisher, value]);
		}
	};

	const handleClearGenreFilters = () => {
		setGenre([]);
		setFictionChecked(false);
		setCrimeChecked(false);
		setHealthChecked(false);
		setBiographyChecked(false);
		setHistoryChecked(false);
		setHumorChecked(false);
		setSelfChecked(false);
	};

	const handleClearPublisherFilters = () => {
		setPublisher([]);
		setPenguinChecked(false);
		setNationalChecked(false);
		setSimonChecked(false);
		setWashingtonChecked(false);
		setBloomChecked(false);
		setHarperChecked(false);
		setBallantineChecked(false);
		setMartinChecked(false);
		setBayChecked(false);
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
			<div className="container-fluid text-center mt-5">

				<div className="row d-flex justify-content-center">
					{store.books && store.books.length !== 0 ? (
						<div className="container">
							<div className="row mb-2 ">
								<div className="d-flex justify-content-center align-items-baseline">
									<h4>Filter by</h4>
									<button className="btn custom-button d-flex justify-content-start ms-3" onClick={() => {
										handleClearGenreFilters()
										handleClearPublisherFilters()
									}}>Clear filters</button>
								</div>
							</div>
							<div className="row mb-3 d-flex justify-content-center">
								<div className="col-9 col-sm-4 col-md-4 col-lg-4 col-xl-4">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed input-custom"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#flush-collapseOne"
												aria-expanded="false"
												aria-controls="flush-collapseOne"
											>
												Genre
											</button>
										</h2>
										<div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
											<div className="accordion-body ">

												{/* Add filters for genre below */}
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Fiction
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="fiction"
														checked={fictionChecked}
														onChange={() => {
															setFictionChecked(!fictionChecked);
															handleGenreCheckboxChange("Fiction");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														True Crime
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="crime"
														checked={crimeChecked}
														onChange={() => {
															setCrimeChecked(!crimeChecked);
															handleGenreCheckboxChange("True Crime");
														}}
													/>

												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Health & Fitness
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="health"
														checked={healthChecked}
														onChange={() => {
															setHealthChecked(!healthChecked);
															handleGenreCheckboxChange("Health & Fitness");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Biography
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="biography"
														checked={biographyChecked}
														onChange={() => {
															setBiographyChecked(!biographyChecked);
															handleGenreCheckboxChange("Biography & Autobiography");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														History
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="history"
														checked={historyChecked}
														onChange={() => {
															setHistoryChecked(!historyChecked);
															handleGenreCheckboxChange("History");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Humor
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="humor"
														checked={humorChecked}
														onChange={() => {
															setHumorChecked(!humorChecked);
															handleGenreCheckboxChange("Humor");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Self-Help
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="self"
														checked={selfChecked}
														onChange={() => {
															setSelfChecked(!selfChecked);
															handleGenreCheckboxChange("Self-Help");
														}}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-9 col-sm-5 col-md-4 col-lg-4 col-xl-4">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed input-custom"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#flush-collapseTwo"
												aria-expanded="false"
												aria-controls="flush-collapseTwo"
											>
												Publisher
											</button>
										</h2>
										<div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
											<div className="accordion-body">

												{/* Add filters for publisher below */}
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Penguin
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="penguin"
														checked={penguinChecked}
														onChange={() => {
															setPenguinChecked(!penguinChecked);
															handlePublisherCheckboxChange("Penguin");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														National Geo. Books
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="national"
														checked={nationalChecked}
														onChange={() => {
															setNationalChecked(!nationalChecked);
															handlePublisherCheckboxChange("National Geographic Books");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Simon and Schuster
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="simon"
														checked={simonChecked}
														onChange={() => {
															setSimonChecked(!simonChecked);
															handlePublisherCheckboxChange("Simon and Schuster");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Washington Square
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="washington"
														checked={washingtonChecked}
														onChange={() => {
															setWashingtonChecked(!washingtonChecked);
															handlePublisherCheckboxChange("Washington Square");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Bloom Books
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="bloom"
														checked={bloomChecked}
														onChange={() => {
															setBloomChecked(!bloomChecked);
															handlePublisherCheckboxChange("Bloom Books");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Harper
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="harper"
														checked={harperChecked}
														onChange={() => {
															setHarperChecked(!harperChecked);
															handlePublisherCheckboxChange("Harper");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Ballantine Books
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="ballantine"
														checked={ballantineChecked}
														onChange={() => {
															setBallantineChecked(!ballantineChecked);
															handlePublisherCheckboxChange("Ballantine Books");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														St. Martin's Press
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="martin"
														checked={martinChecked}
														onChange={() => {
															setMartinChecked(!martinChecked);
															handlePublisherCheckboxChange("St. Martin's Press");
														}}
													/>
												</div>
												<div className="d-flex justify-content-start ms-4 mb-1">
													<label className="form-check-label me-2" htmlFor="flexCheckDefault">
														Back Bay Books
													</label>
													<input
														className="form-check-input custom-checkbox"
														type="checkbox"
														id="bay"
														checked={bayChecked}
														onChange={() => {
															setBayChecked(!bayChecked);
															handlePublisherCheckboxChange("Back Bay");
														}}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-9 col-sm-3 col-md-3 col-lg-3 col-xl-3">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button
												className="accordion-button collapsed input-custom"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#flush-collapseThree"
												aria-expanded="false"
												aria-controls="flush-collapseThree"
											>
												Year
											</button>
										</h2>
										<div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
											<div className="accordion-body">
												<input
													type="text"
													className="form-control input-custom"
													placeholder="Enter year"
													value={year}
													onChange={(e) => setYear(e.target.value)}
												/>
											</div>
										</div>
									</div>
								</div>

							</div>
							<div className="col-12 col-sm-12 col-md-12 col-lg-12">
								<div className="row d-flex justify-content-center">
									{store.books
										.filter(
											(book) =>
												(store.search &&
													(book.title.toLowerCase().includes(store.search) ||
														book.author.toLowerCase().includes(store.search))) ||
												(!store.search && book)
										)
										.filter(
											(book) =>
												genre.length === 0 || (book.genre && genre.some((g) => book.genre.includes(g)))
										)
										.filter(
											(book) =>
												publisher.length === 0 ||
												(book.publisher && publisher.some((p) => book.publisher.includes(p)))
										)
										.filter((book) => year === "" || (book.year && book.year.includes(year)))
										.map((book) => <HomeCard key={book.id} item={book} />)}
								</div>
							</div>
						</div>
					)
						:
						<div>
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div>
								Loading books...
							</div>
						</div>
					}
				</div >
			</div >

			<Footer />
		</div >
	);
};