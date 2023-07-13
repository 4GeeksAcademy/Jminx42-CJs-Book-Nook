import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../styles/index.css";
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/CJBookNookBG.png";


export const Register = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAndConditions: false,
    });

    const [successfulRegistration, setSuccessfulRegistration] = useState(false);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState("");
    const [errorSubmit, setErrorSubmit] = useState("");



    const validateForm = (formData) => {
        const { full_name, email, password, confirmPassword, termsAndConditions } =
            formData;
        const errors = {};

        if (!full_name) {
            errors.full_name = "Please enter your full name";
        }

        if (!email) {
            errors.email = "Please enter your email address";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!password) {
            errors.password = "Please enter a password";
        } else if (password.length < 5) {
            errors.password = "Password must be at least 5 characters long";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (!termsAndConditions) {
            errors.termsAndConditions = "Please accept the terms and conditions";
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = type === "checkbox" ? checked : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: updatedValue,
        }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        console.log(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const opts = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            };
            console.log(opts)
            const resp = await fetch(process.env.BACKEND_URL + "api/create/user", opts);
            if (resp.status !== 200) {
                const data = await resp.json();
                setErrorSubmit(data.error);
                return false;
            } else {
                setSuccessfulRegistration(true);
                setAlert("Your registration was successful");
                sessionStorage.removeItem("token");
                return true;
            }
        } catch (error) {
            console.error("There has been an error registering:", error);
        }
    };

    return (

        <div className="container p-5">
            {
                alert && alert !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <div>
                                {alert}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            {
                errorSubmit && errorSubmit !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <div>
                                {errorSubmit}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            {successfulRegistration ? (
                <div className="card text-center">
                    <div className="card-body">
                        <h2>Registration Successful!</h2>
                        <p>You can now proceed to login.</p>
                        <Link to="/login" className="btn custom-button">
                            Go to Login
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="card border-0">

                    <form className="Auth-form container-fluid m-1" onSubmit={handleRegisterSubmit}>
                        <div className='row d-flex justify-content-center mb-2'>
                            <div className='col-md-10 col-lg-9 text-center'>
                                <Link to="/">
                                    <div className="text-center custom-bg-img rounded">
                                        <LazyLoadImage
                                            src={CJBookNookLogo}
                                            alt="CJ Book Nook Logo"
                                            className="my-2 border rounded-circle"
                                            effect="blur"
                                            style={{ width: '150px' }} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mb-3'>
                            <div className='col-md-10 col-lg-9 text-center'>
                                <h3 className="Auth-form-title">Sign Up</h3>
                                <div className="text-center">
                                    Already registered?{" "}
                                    <Link to="/login">
                                        <span className="link-like">
                                            Login
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mb-3'>
                            <div className='col-md-10 col-lg-9'>
                                <label htmlFor="full_name" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.full_name && 'is-invalid'}`}
                                    id="full_name"
                                    name="full_name"
                                    placeholder="Enter full-name"
                                    aria-label="full_name"
                                    value={formData.full_name}
                                    onChange={(e) => handleChange(e, 'full_name')}
                                    required
                                />
                                {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mb-3'>
                            <div className='col-md-10 col-lg-9'>
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email && 'is-invalid'}`}
                                    id="email"
                                    name="email"
                                    placeholder="user@example.com"
                                    aria-label="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange(e, 'email')}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mb-3'>
                            <div className='col-md-10 col-lg-9'>
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password && 'is-invalid'}`}
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    aria-label="password"
                                    value={formData.password}
                                    onChange={(e) => handleChange(e, 'password')}
                                    required
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mb-3'>
                            <div className='col-md-10 col-lg-9'>
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    aria-label="confirm_password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange(e, 'confirmPassword')}
                                    required
                                />
                                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mb-3'>
                            <div className='col-md-10 col-lg-9'>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className={`form-check-input ${errors.termsAndConditions && 'is-invalid'}`}
                                        id="termsAndConditions"
                                        name="termsAndConditions"
                                        checked={formData.termsAndConditions}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="termsAndConditions">
                                        I have read and accept the{' '}
                                        <a
                                            className="link-like"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            href="#"
                                        >
                                            terms and conditions and the privacy policy.
                                        </a>{' '}

                                    </label>
                                    {errors.termsAndConditions && <div className="invalid-feedback">{errors.termsAndConditions}</div>}
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mb-3'>
                            <div className='col-md-10 col-lg-9'>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn custom-button" onClick={handleRegisterSubmit}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div >

            )}


            {/* modal for terms and conditions */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="exampleModalLabel">Terms and Conditions of Sale for CJ's Book Nook:</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>General Information:</h5>
                            <ol>
                                <li>CJ's Book Nook operates as an online bookshop and provides a platform for users to purchase books.</li>
                                <li>By accessing or using our website, you agree to be bound by these terms and conditions.</li>
                            </ol>


                            <h5>Product Information: </h5>
                            <ol>
                                <li>CJ's Book Nook endeavors to provide accurate information regarding book descriptions, prices, and availability.</li>
                                <li>We reserve the right to modify or discontinue any product without prior notice.</li>
                                <li>The images and illustrations on our website are for representation purposes and may not always reflect the exact appearance of the product.</li>
                            </ol>

                            <h5>Pricing and Payment:</h5>
                            <ol>
                                <li>All prices listed on CJ's Book Nook are in the applicable currency and inclusive of any applicable taxes.</li>
                                <li>We accept various payment methods, including credit cards, debit cards, and electronic funds transfer.</li>
                                <li>Payment is required at the time of placing the order.</li>
                            </ol>

                            <h5>Shipping and Delivery:</h5>
                            <ol>
                                <li>CJ's Book Nook offers shipping services to specified locations.</li>
                                <li>The estimated delivery time will be provided during the checkout process, and we will make reasonable efforts to meet the delivery timelines.</li>
                                <li>Any delays in delivery due to unforeseen circumstances or external factors are beyond our control, and we shall not be held liable for such delays.</li>
                            </ol>

                            <h5>Returns and Refunds:</h5>
                            <ol>
                                <li>We strive to ensure customer satisfaction. If you receive a damaged or incorrect book, please contact us within 7 days of delivery for assistance.</li>
                                <li>Refunds or replacements will be processed at our discretion, subject to verification of the issue.</li>
                            </ol>

                            <h5>Intellectual Property:</h5>
                            <ol>
                                <li>All content on the CJ's Book Nook website, including text, graphics, logos, and images, is protected by intellectual property laws.</li>
                                <li>You are not permitted to use, reproduce, or modify any of the content without our explicit consent.</li>
                            </ol>

                            <h5>Limitation of Liability:</h5>
                            <ol>
                                <li>CJ's Book Nook shall not be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use our website or products.</li>
                                <li>We do not guarantee uninterrupted access to our website or the absence of any errors or viruses.</li>
                            </ol>

                            <h5>Governing Law:</h5>
                            <ol>
                                <li>These terms and conditions are governed by and construed in accordance with the laws of [Jurisdiction].</li>
                                <li>Any disputes arising from these terms and conditions shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].</li>
                            </ol>

                            <h4>Privacy Policy for CJ's Book Nook:</h4>
                            <h5>Information Collection:</h5>
                            <ol>
                                <li>CJ's Book Nook may collect personal information from users during the registration and checkout processes.</li>
                                <li>This information may include name, email address, shipping address, and payment details.</li>
                                <li>We may also collect non-personal information such as IP addresses, browser type, and operating system for statistical purposes.</li>
                            </ol>

                            <h5>Use of Information:</h5>
                            <ol>
                                <li>CJ's Book Nook uses the collected information to process orders, deliver products, and provide customer support.</li>
                                <li>We may also use the information to send promotional offers, newsletters, and updates with your consent.</li>
                                <li>Your personal information will not be sold, rented, or shared with third parties, except as necessary to fulfill your order or comply with legal requirements.</li>
                            </ol>

                            <h5>Security:</h5>
                            <ol>
                                <li>CJ's Book Nook employs industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.</li>
                                <li>We use secure socket layer (SSL) encryption technology for secure transmission of data.</li>
                            </ol>

                            <h5>Cookies:</h5>
                            <ol>
                                <li>Our website may use cookies to enhance the user experience and track usage patterns.</li>
                                <li>Cookies may be used for remembering user preferences, analyzing trends, and improving website functionality.</li>
                                <li>You have the option to disable cookies in your browser settings, but this may affect certain features of the website.</li>
                            </ol>

                            <h5>Third-Party Links:</h5>
                            <ol>
                                <li>CJ's Book Nook may contain links to third-party websites for your convenience.</li>
                                <li>We are not responsible for the privacy practices or content of these external websites. We encourage you to review their privacy policies.</li>
                            </ol>

                            <h5>Privacy of Children:</h5>
                            <ol>
                                <li>CJ's Book Nook is intended for users above the age of 13. We do not knowingly collect personal information from children.</li>
                                <li>If we become aware that personal information of a child has been collected, we will take steps to delete the information.</li>
                            </ol>

                            <h5>Changes to the Privacy Policy:</h5>
                            <ol>
                                <li>CJ's Book Nook reserves the right to update or modify the privacy policy at any time.</li>
                                <li>Any significant changes will be notified on our website. By continuing to use our services, you agree to the updated policy.</li>
                            </ol>

                            Please read the terms and conditions and privacy policy carefully before using CJ's Book Nook. By using our website, you acknowledge and agree to be bound by these policies.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};