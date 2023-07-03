import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProfileBtn } from "./profileBtn";
import "../../styles/index.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/cjbooknookwhitesmall.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const total = () => {
		let totalCheckout = 0;
		for (let x = 0; x < store.user.items.length; x++) {
			totalCheckout += store.user.items[x].unit
		}
		return totalCheckout
	}

	// We need to add a hamburger icon for mobile view!
	return (
		<nav className="navbar navbar-expand-lg background-custom px-5">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">
					<img src={CJBookNookLogo} height={80} alt="CJBookNookLogo" />
				</Link>
				<button className="navbar-toggler border p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<i className="bi bi-list"></i>
				</button>

				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item me-2">
							<div className="input-group ">
								<input
									type="search"
									id="search"
									className="form-control"
									aria-describedby="button-addon2"
									value={store.search}
									onChange={(e) => actions.handleSearch(e.target.value)}
									placeholder="Search" />
								<button type="button" className="btn custom-button" id="button-addon2" onClick={() => navigate('/')}>
									<i className="fas fa-search"></i>
								</button >
							</div>
						</li>
						<li className="nav-item  ">
							{!sessionStorage.getItem("token") ? (
								<div className="d-flex">

									{/* <Link to="/register">
										<button className="btn btn-secondary me-2 custom-button">Register</button>
									</Link> */}
									<Link to="/login">
										<button className="btn btn-secondary custom-button"> Login <i className="fa-solid fa-right-to-bracket"></i></button>
									</Link>
								</div>
							) : (

								<div className="d-flex">
									<Link to="/checkout">
										<button type="button" className="btn btn-secondary me-2 custom-button position-relative">
											<i className="fas fa-shopping-cart"></i>
											<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill background-dark">
												{total()}

											</span>

										</button>
									</Link>

									<Link to="/support">
										<button className="btn me-2 custom-button"><i className="fa-solid fa-envelope"></i></button>
									</Link>

									<ProfileBtn />
								</div>
							)}
						</li>

					</ul>
				</div>

			</div>
		</nav>
	);
};
