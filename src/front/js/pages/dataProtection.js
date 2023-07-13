import React, { useContext, useEffect } from "react";
import "../../styles/index.css"
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { Footer } from "../component/footer";
import { Link } from "react-router-dom";


export const DataProtection = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        setTimeout(() => {
            actions.clearError();
            actions.clearAlert();
        }, 3000);
    }, []);
    return (
        <div className="">
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
                store.errorMsg && store.errorMsg !== ""
                    ?
                    <div className="container">
                        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mt-3" role="alert">
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <div>
                                {store.errorMsg}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                    :
                    null

            }
            <div className="container mx-auto">
                <div className="row mx-auto">
                    <div className="col-12 ">
                        <h1 className='fs-2 mt-5 fw-bold legal-title mb-3 text-center'>DATA PROTECTION NOTICE</h1>
                        <p className='legal-text'>
                            At <strong>CJ's Book Nook</strong>, we are committed to protecting your privacy and ensuring
                            the security of your personal information. This Data Protection Notice describes how
                            we collect, use, disclose, and store your personal information when you use our
                            website or engage with our services. By accessing our website or using our services,
                            you consent to the collection and use of your personal information as described in
                            this notice.
                        </p>
                        <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>1. COLLECTION AND USE OF PERSONAL INFORMATION</h2>
                        <p className='legal-text'>
                            We collect personal information that you voluntarily provide to us, such as your
                            name, email address, phone number, and billing/shipping address. We may use this
                            information to process your orders, communicate with you, provide customer support,
                            and improve our products and services. We may also use your personal information for
                            marketing purposes, such as sending you promotional emails or newsletters. You have
                            the right to opt-out of receiving marketing communications from us.
                        </p>
                        <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>2. DISCLOSURE OF PERSONAL INFORMATION</h2>
                        <p className='legal-text'>
                            We may disclose your personal information to third-party service providers who assist
                            us in operating our website, conducting our business, or providing services to you.
                            These service providers have access to your personal information only to perform
                            specific tasks on our behalf and are obligated not to disclose or use it for any
                            other purpose.
                        </p>
                        <p className='legal-text'>
                            We may also disclose your personal information if required by law or in response to
                            valid legal requests, such as court orders or subpoenas.
                        </p>
                        <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>3. DATA SECURITY</h2>
                        <p className='legal-text'>
                            We take the security of your personal information seriously and implement reasonable
                            measures to protect it from unauthorized access, disclosure, or loss. However, no
                            method of transmission over the internet or electronic storage is 100% secure, and we
                            cannot guarantee absolute security of your information.
                        </p>
                        <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>4. YOUR RIGHTS</h2>
                        <p className='legal-text'>
                            You have certain rights regarding your personal information, including the right to
                            access, correct, or delete the information we hold about you. If you would like to
                            exercise any of these rights, please contact us using the information provided at the
                            end of this notice.
                        </p>
                        <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>5. CHANGES TO THE DATA PROTECTION NOTICE</h2>
                        <p className='legal-text'>
                            We reserve the right to modify this data protection notice at any time. Any changes
                            we make will be effective immediately upon posting the updated notice on our website.
                            We encourage you to review this notice periodically to stay informed about how we
                            collect, use, disclose, and store your personal information.
                        </p>
                        <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>6. CONTACT US</h2>
                        <p className='legal-text'>
                            If you have any questions or concerns about our data protection practices or would
                            like to exercise your rights regarding your personal information, please contact us
                            <Link to="/support">
                                <button className="btn link-like m-0 ps-1">
                                    here.
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>


    );
};


