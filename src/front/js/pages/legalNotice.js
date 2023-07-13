import React, { useContext, useEffect } from "react";
import "../../styles/index.css"
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { Footer } from "../component/footer";
import { Link } from "react-router-dom";


export const LegalNotice = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    setTimeout(() => {
      actions.clearError();
      actions.clearAlert();
    }, 3000);
  }, []);
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
            <h1 className='fs-2 mt-5 fw-bold legal-title mb-3 text-center'>LEGAL NOTICE</h1>
            <p className='legal-text'>
              This website is operated by <strong>CJ's Book Nook</strong>. Throughout the site, the terms "we",
              "us", and "our" refer to <strong>CJ's Book Nook</strong>. <strong>CJ's Book Nook</strong> offers this website,
              including all information, tools, and services available from this site to you, the
              user, conditioned upon your acceptance of all terms, conditions, policies, and
              notices stated here.
            </p>
            <p className='legal-text'>
              By visiting our site and/or purchasing something from us, you engage in our "Service"
              and agree to be bound by the following terms and conditions ("Terms of Service",
              "Terms"), including those additional terms and conditions and policies referenced
              herein and/or available by hyperlink. These Terms of Service apply to all users of
              the site, including without limitation users who are browsers, vendors, customers,
              merchants, and/or contributors of content.
            </p>
            <p className='legal-text'>
              Please read these Terms of Service carefully before accessing or using our website.
              By accessing or using any part of the site, you agree to be bound by these Terms of
              Service. If you do not agree to all the terms and conditions of this agreement, then
              you may not access the website or use any services.
            </p>
            <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>1. INTELECTUAL PROPERTY</h2>
            <p className='legal-text'>
              All content on this site, including text, graphics, logos, button icons, images,
              audio clips, digital downloads, data compilations, and software, is the property of
              <strong> CJ's Book Nook</strong> or its content suppliers and protected by international
              copyright laws.
            </p>
            <p className='legal-text'>
              You may not systematically extract and/or re-utilize parts of the content of the
              website without <strong>CJ's Book Nook</strong>'s express written consent. In particular, you
              may not utilize any data mining, robots, or similar data gathering and extraction
              tools to extract (whether once or many times) for re-utilization any substantial
              parts of this website, without <strong>CJ's Book Nook</strong>'s express written consent. You
              may also not create and/or publish your own database that features substantial parts
              of this website without <strong>CJ's Book Nook</strong>'s express written consent.
            </p>
            <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>2. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY</h2>
            <p className='legal-text'>
              The information, software, products, and services included in or available through
              this website may include inaccuracies or typographical errors. Changes are
              periodically added to the information herein. <strong>CJ's Book Nook</strong> and/or its
              suppliers may make improvements and/or changes in the website at any time.
            </p>
            <p className='legal-text'>
              <strong>CJ's Book Nook</strong> and/or its suppliers make no representations about the
              suitability, reliability, availability, timeliness, and accuracy of the information,
              software, products, services, and related graphics contained on the website for any
              purpose. To the maximum extent permitted by applicable law, all such information,
              software, products, services, and related graphics are provided "as is" without
              warranty or condition of any kind. <strong>CJ's Book Nook</strong> and/or its suppliers hereby
              disclaim all warranties and conditions with regard to this information, software,
              products, services, and related graphics, including all implied warranties or
              conditions of merchantability, fitness for a particular purpose, title, and
              non-infringement.
            </p>
            <p className='legal-text'>
              To the maximum extent permitted by applicable law, in no event shall <strong>CJ's Book Nook</strong> and/or its suppliers be liable for any direct, indirect, punitive, incidental,
              special, consequential damages, or any damages whatsoever, including, without
              limitation, damages for loss of use, data, or profits, arising out of or in any way
              connected with the use or performance of the website, with the delay or inability to
              use the website or related services, the provision of or failure to provide services,
              or for any information, software, products, services, and related graphics obtained
              through the website, or otherwise arising out of the use of the website, whether
              based on contract, tort, negligence, strict liability, or otherwise, even if <strong>CJ's Book Nook</strong> or any of its suppliers has been advised of the possibility of
              damages. Because some states/jurisdictions do not allow the exclusion or limitation
              of liability for consequential or incidental damages, the above limitation may not
              apply to you. If you are dissatisfied with any portion of the website, or with any
              of these terms of use, your sole and exclusive remedy is to discontinue using the
              website.
            </p>
            <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>3. GOVERNING LAW</h2>
            <p className='legal-text'>
              These Terms of Service and any separate agreements whereby we provide you services
              shall be governed by and construed in accordance with the laws of Spain,
              without regard to its conflict of law provisions.
            </p>
            <h2 className='fs-5 mt-1 fw-bold legal-title mb-2'>4. CHANGES TO THE LEGAL NOTICE</h2>
            <p className='legal-text'>
              We reserve the right to modify this legal notice at any time, so please review it
              frequently. Changes and clarifications will take effect immediately upon their
              posting on the website. If we make material changes to this policy, we will notify
              you here that it has been updated, so that you are aware of what information we
              collect, how we use it, and under what circumstances, if any, we use and/or disclose
              it.
            </p>
            <p className='legal-text'>
              If you have any questions about the legal notice, you can contact us
              <Link to="/support">
                <button className="btn link-like m-0 ps-1">
                  here.
                </button>
              </Link>
            </p>
            <p className='legal-footnote mb-1'>Last updated: July 2023</p>
            <p className='legal-footnote'>Note: This Legal Notice is for informational purposes only and does not constitute legal advice. It is advisable to consult with a qualified attorney to ensure compliance with applicable laws and regulations</p>


          </div>
        </div>
      </div>
      <Footer />
    </div>


  );
};


