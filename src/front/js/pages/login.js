import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../styles/index.css"
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookBG.png";



export const Login = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setTimeout(() => {
            actions.clearError();
            actions.clearAlert();
        }, 3000);
    }, []);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate email
        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (await actions.login(formData.email, formData.password)) {
                navigate("/");
            }
        }
    };


    return (

        <div className="container p-5">
            {store.errorMsg && (
                <div className="alert alert-danger text-center" role="alert">
                    {store.errorMsg}
                </div>
            )}
            <div className="card border-0">
                <form className="Auth-form container-fluid" onSubmit={handleLoginSubmit}>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-10 col-lg-9 text-center'>
                            <Link to="/">
                                <div className="text-center custom-bg-img rounded">
                                    <LazyLoadImage
                                        src={CJBookNookLogo}
                                        alt="CJ Book Nook Logo"
                                        className="my-2 border rounded-circle"
                                        effect="blur"
                                        style={{ width: '150px' }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="Auth-form-content container-fluid m-1">
                        <div className='row d-flex justify-content-center mb-2'>
                            <div className='col-md-10 col-lg-9 text-center'>
                                <h3 className="Auth-form-title">Login</h3>
                                <div>
                                    Not registered yet?{" "}
                                    <Link to="/register">
                                        <span className="link-like">
                                            Sign Up
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-md-10 col-lg-9'>
                                <div className="form-group mt-2">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className={`form-control mt-1 ${errors.email && 'is-invalid'}`}
                                        placeholder="Enter email"
                                        aria-label="Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-md-10 col-lg-9'>
                                <div className="form-group mt-2">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className={`form-control mt-1 ${errors.password && 'is-invalid'}`}
                                        placeholder="Enter password"
                                        aria-label="Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-md-10 col-lg-9'>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn custom-button">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

