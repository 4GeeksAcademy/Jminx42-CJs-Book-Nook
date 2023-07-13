import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProfileBtn } from "../component/profileBtn";
import "../../styles/index.css"
import CJBookNookNoLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookNoLogoWhite.png";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [visibleSearchBar, setVisibleSearchBar] = useState(false);
	const [showOffCanvas, setShowOffCanvas] = useState(false);

	const total = () => {
		let totalCheckout = 0;
		for (let x = 0; x < store.user.items.length; x++) {
			totalCheckout += store.user.items[x].unit
		}
		return totalCheckout
	}

	const removeStyles = () => {
		document.getElementsByTagName('body')[0].style = ''
	}


	return (
		<nav className="navbar navbar-expand-md navbar-expand-lg background-custom px-md-5 px-lg-5 py-0">
			<div className="container-fluid">

				<div className="navbar-brand">
					<Link to="/" >
						<img src={CJBookNookNoLogo} height={50} alt="CJBookNookLogo" />
					</Link>
				</div>

				<button className="navbar-toggler custom-button me-3"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
					onClick={() => setShowOffCanvas(true)}>
					<i className="bi bi-list"></i>
				</button>



				<div className="offcanvas offcanvas-start" id="navbarNav" tabIndex="-1" aria-labelledby="navbarNavLabel">
					<div className="offcanvas-header justify-content-end">
						<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => { setShowOffCanvas(false) }}></button>
					</div>
					{
						showOffCanvas ? (
							<>
								<div className="offcanvas-body">
									<ul className="navbar-nav">
										<li className="nav-item active mb-2 me-2">
											{
												visibleSearchBar || showOffCanvas ?
													<div className="input-group">
														<input
															type="search"
															id="search"
															className="form-control flex-grow-1"
															aria-describedby="button-addon2"
															value={store.search}
															onChange={(e) => actions.handleSearch(e.target.value)}
															onKeyUp={(e) => {
																if (e.key === 'Enter') {
																	navigate('/explore');
																	removeStyles();
																}
															}}
															placeholder="Search" />
														<button
															type="button"
															className="btn custom-button"
															id="button-addon2"
															onClick={() => {
																if (visibleSearchBar && store.search !== "") {
																	setVisibleSearchBar(false);
																	removeStyles();
																} else {
																	setVisibleSearchBar(false);
																	navigate('/explore');
																	removeStyles();
																}

															}}>
															<i className="fas fa-search"></i>
														</button >
													</div>
													:
													<button type="button" className="btn custom-button" id="button-addon2" onClick={() => setVisibleSearchBar(!visibleSearchBar)}>
														<i className="fas fa-search"></i>
													</button >
											}
										</li>

										{!sessionStorage.getItem("token") ? (
											<>
												{
													showOffCanvas ? (
														<>
															<li className="nav-item mb-2" >

																<div onClick={() => { navigate('/explore'); setShowOffCanvas(false); removeStyles(); }} >
																	<button className="btn custom-button"><i className="bi bi-book-fill" ></i></button>
																	<label className="ms-4 filter-link">Explore</label>
																</div>
															</li>
															<li className="nav-item mb-2" >
																<Link to="/login" onClick={() => { setShowOffCanvas(false); removeStyles(); }} >
																	<button className="btn btn-secondary custom-button "><i className="fa-solid fa-right-to-bracket"></i></button>
																	<label className="ms-4 filter-link">Login</label>
																</Link>
															</li>
														</>
													) : (
														<>
															<li className="nav-item mb-2 me-2">
																<Link to="/explore" onClick={() => { setShowOffCanvas(false); removeStyles(); }}>
																	<button className="btn custom-button"><i className="bi bi-book-fill"></i></button>
																</Link>
															</li>
															<li className="nav-item mb-2 me-2">
																<Link to="/login" onClick={() => { setShowOffCanvas(false); removeStyles(); }}>
																	<button className="btn custom-button "><i className="fa-solid fa-right-to-bracket"></i></button>
																</Link>
															</li>
														</>
													)

												}
											</>
										) : (

											<>
												{
													showOffCanvas ? (
														<>
															<li className="nav-item mb-2">
																<Link to="/explore" onClick={() => { setShowOffCanvas(false); removeStyles(); }}>
																	<button className="btn custom-button"><i className="bi bi-book-fill"></i></button>
																	<label className="ms-4 filter-link">Explore</label>
																</Link>

															</li>
															<li className="nav-item mb-2">
																<Link to="/checkout" onClick={() => { setShowOffCanvas(false); removeStyles(); }}>
																	<button type="button" className="btn btn-secondary custom-button position-relative">
																		<i className="fas fa-shopping-cart"></i>
																		<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill background-dark">
																			{total()}
																		</span>
																	</button>
																	<label className="ms-4 filter-link">Checkout</label>
																</Link>

															</li>
															<li className="nav-item mb-2">
																<Link to="/wishlist" onClick={() => { setShowOffCanvas(false); removeStyles(); }} >
																	<button className="btn custom-button"><i className="fa-solid fa-heart"></i></button>
																	<label className="ms-4 filter-link">Wishlist</label>
																</Link>
															</li>
															<li className="nav-item mb-2">
																<Link to="/profile" onClick={() => { setShowOffCanvas(false); removeStyles(); }}>
																	<button className="btn custom-button"><i className="fa-solid fa-user"></i></button>
																	<label className="ms-4 filter-link">Profile</label>
																</Link>

															</li>
															<li className="nav-item mb-2">
																<button className="btn custom-button" onClick={async () => {
																	await actions.logout();
																	removeStyles();
																	navigate("/");

																}}><i className="fa-solid fa-right-from-bracket"></i></button>
																<label className="ms-4 filter-link">Logout</label>


															</li>
														</>
													) : (
														<>
															<li className="nav-item mb-2 me-2">
																<Link to="/explore" onClick={() => { setShowOffCanvas(false); removeStyles(); }}>
																	<button className="btn custom-button"><i className="bi bi-book-fill"></i></button>
																</Link>
															</li>
															<li className="nav-item mb-2 me-2">
																<Link to="/checkout" onClick={() => { setShowOffCanvas(false); removeStyles(); }}>
																	<button type="button" className="btn btn-secondary custom-button position-relative">
																		<i className="fas fa-shopping-cart"></i>
																		<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill background-dark">
																			{total()}

																		</span>

																	</button>
																</Link>
															</li>
															<li className="nav-item mb-2 me-2">
																<Link to="/wishlist" onClick={() => { setShowOffCanvas(false); removeStyles(); }}>

																	<button className="btn custom-button"><i className="fa-solid fa-heart"></i></button>
																</Link>
															</li>
															<li className="nav-item mb-2 me-2">
																<ProfileBtn />
															</li>
														</>
													)
												}


											</>
										)}



									</ul>
								</div>
							</>
						) : (
							<>
								<div className="offcanvas-body  d-flex justify-content-end align-items-center">
									<ul className="navbar-nav">
										<li className="nav-item active mb-2 me-2">
											{
												visibleSearchBar || showOffCanvas ?
													<div className="input-group">
														<input
															type="search"
															id="search"
															className="form-control flex-grow-1"
															aria-describedby="button-addon2"
															value={store.search}
															onChange={(e) => actions.handleSearch(e.target.value)}
															onKeyUp={(e) => { e.key === 'Enter' && navigate('/explore') }}
															placeholder="Search" />
														<button
															type="button"
															className="btn custom-button"
															id="button-addon2"
															onClick={() => {
																if (visibleSearchBar && store.search !== "") {
																	setVisibleSearchBar(false);
																} else {
																	setVisibleSearchBar(false);
																	navigate('/explore');
																}

															}}>
															<i className="fas fa-search"></i>
														</button >
													</div>
													:
													<button type="button" className="btn custom-button" id="button-addon2" onClick={() => setVisibleSearchBar(!visibleSearchBar)}>
														<i className="fas fa-search"></i>
													</button >
											}
										</li>

										{!sessionStorage.getItem("token") ? (
											<>
												{
													showOffCanvas ? (
														<>
															<li className="nav-item mb-2" >
																<Link to="/explore" onClick={() => setShowOffCanvas(false)} >
																	<button className="btn custom-button"><i className="bi bi-book-fill"></i></button>
																	<label className="ms-4 filter-link">Explore</label>
																</Link>
															</li>
															<li className="nav-item mb-2" >
																<Link to="/login" onClick={() => setShowOffCanvas(false)} >
																	<button className="btn btn-secondary custom-button "><i className="fa-solid fa-right-to-bracket"></i></button>

																</Link>
															</li>
														</>
													) : (
														<>
															<li className="nav-item mb-2 me-2">
																<Link to="/explore">
																	<button className="btn custom-button"><i className="bi bi-book-fill"></i></button>
																</Link>
															</li>
															<li className="nav-item mb-2 me-2">
																<Link to="/login">
																	<button className="btn btn-secondary custom-button "> Login <i className="fa-solid fa-right-to-bracket"></i></button>
																</Link>
															</li>
														</>
													)
												}
											</>
										) : (

											<>
												{
													showOffCanvas ? (
														<>
															<li className="nav-item mb-2">
																<Link to="/explore" onClick={() => setShowOffCanvas(false)} >
																	<button className="btn custom-button"><i className="bi bi-book-fill"></i></button>
																	<label className="ms-4 filter-link">Explore</label>
																</Link>

															</li>
															<li className="nav-item mb-2">
																<Link to="/checkout" onClick={() => setShowOffCanvas(false)} >
																	<button type="button" className="btn btn-secondary custom-button position-relative">
																		<i className="fas fa-shopping-cart"></i>
																		<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill background-dark">
																			{total()}
																		</span>
																	</button>
																	<label className="ms-4 filter-link">Checkout</label>
																</Link>

															</li>
															<li className="nav-item mb-2">
																<Link to="/wishlist" onClick={() => setShowOffCanvas(false)} >
																	<button className="btn custom-button"><i className="fa-solid fa-heart"></i></button>
																	<label className="ms-4 filter-link">Wishlist</label>
																</Link>
															</li>
															<li className="nav-item mb-2">
																<div className="d-flex" onClick={() => setShowOffCanvas(false)} >
																	<ProfileBtn />
																	<label className="ms-2 filter-link">Profile</label>
																</div>

															</li>
														</>
													) : (
														<>
															<li className="nav-item mb-2 me-2">
																<Link to="/explore">
																	<button className="btn custom-button"><i className="bi bi-book-fill"></i></button>
																</Link>
															</li>
															<li className="nav-item mb-2 me-2">
																<Link to="/checkout">
																	<button type="button" className="btn btn-secondary custom-button position-relative">
																		<i className="fas fa-shopping-cart"></i>
																		<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill background-dark">
																			{total()}

																		</span>

																	</button>
																</Link>
															</li>
															<li className="nav-item mb-2 me-2">
																<Link to="/wishlist">

																	<button className="btn custom-button"><i className="fa-solid fa-heart"></i></button>
																</Link>
															</li>
															<li className="nav-item mb-2 me-2">
																<ProfileBtn />
															</li>
														</>
													)
												}


											</>
										)}



									</ul>
								</div>
							</>
						)
					}

				</div>

			</div>
		</nav >
	);
};
