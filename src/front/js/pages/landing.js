import React, { useState, useEffect, useContext } from "react";
import CJBookNookLogo from "/workspaces/Jminx42-CJs-Book-Nook/images/cjbooknookwhitesmall.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { LandingCard } from "../component/landingCard";
import { CarouselNextArrow } from "../component/carouselArrow";
import { CarouselPrevArrow } from "../component/carouselArrow";
import MyCarousel from "../component/MyCarousel";

export const Landing = () => {
    const { store } = useContext(Context);
    const [userGenres, setUserGenres] = useState([]);

    const EditorsBooks = store.books.filter((book) => book.average_rating > 4).slice(0, 10);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        draggable: true,
        autoplay: false,
        speed: 2500,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    className: "center",
                    centerMode: true,
                    centerPadding: "60px",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    swipeToSlide: true,
                    className: "center",
                    centerMode: true,
                    centerPadding: "60px",
                }
            }
        ]
    };

    useEffect(() => {
        const genres = store.user.wishlist.reduce((acc, wishlistItem) => {
            return acc.concat(wishlistItem.book_id.genre || []);
        }, []);
        setUserGenres(genres.filter((genre) => genre !== null));
    }, [store.user.wishlist]);

    const recommendedBooks = store.books
        .filter((book) => {
            return (
                book.average_rating > 3 &&
                book.genre &&
                userGenres?.some((userGenre) => book.genre.includes(userGenre))
            );
        })
        .filter((book) => {
            // Exclude books that are already in store.user.items (not working at the moment)
            return !store.user.items.some((item) => item.isbn === book.isbn);
        })
        .slice(0, 5);

    return (
        <div>
            <Navbar />

            <div className="position-relative overflow-hidden p-3 p-lg-5 text-center image-background d-flex justify-content-center">
                <div className="position-relative overflow-hidden p-3 p-lg-5 m-md-3 text-center landing-background d-flex div-landing">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 my-5 p-2">
                        <h1 className="display-3 fw-bold landing-text">Designed for Book Lovers</h1>
                        <h3 className="fs-4 px-2 landing-text mt-3 mb-3">Discover Your Next 5-Star Read</h3>
                        <div className="d-flex gap-3 justify-content-center lead fw-normal pt-5 mt-xl-5">
                            <Link to={`/explore`}>
                                <button className="btn landing-button px-3 py-2 fs-4 mb-xl-5 rounded">
                                    Start Exploring <i className="bi bi-book"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 my-auto">
                        <LazyLoadImage src={CJBookNookLogo} alt="CJBookNookLogo" className="text-center img-responsive" />
                    </div>

                    <div className="product-device shadow-sm d-none d-md-block"></div>
                    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <div className="row d-flex justify-content-between ">
                    <div className="col-sm-4 col-md-4 col-lg-4 p-3 position-relative">
                        <h3 className="feature-title">Vast Book Collection</h3>
                        <p className="feature-description">Browse through our extensive collection of books, including bestsellers, classics, and hidden gems.</p>
                        <div className="divider"></div>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4 p-3 position-relative" >
                        <h3 className="feature-title">Become a Reviewer</h3>
                        <p className="feature-description">Want to indulge in a world of literary delights? Embark on this journey to find your perfect read and share your review.</p>
                        <div className="divider"></div>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4 p-3 ">
                        <h3 className="feature-title">Reviews by NYT</h3>
                        <p className="feature-description">Uncover the expertise and discernment of NYT's esteemed reviewers, and let their analysis guide your next read.</p>
                    </div>
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <div className="row mt-5 mb-1">
                    <h3 className="feature-title">Editor's Pick!</h3>
                </div>

                <Slider {...settings}>
                    {EditorsBooks.map((book) => (
                        <div key={book.id}>
                            <LandingCard item={book} />
                        </div>
                    ))}
                </Slider>
                {/* <MyCarousel recommendedBooks={EditorsBooks} /> */}
            </div>

            <div className="container mt-5 mb-5">



                {!sessionStorage.getItem("token") ?
                    null
                    :
                    store.user.wishlist.length > 1 ? (
                        <>
                            <div className="row mt-5 mb-3">
                                <h3 className="feature-title mt-4 mb-0">Recommended for you</h3>
                            </div>
                            <Slider {...settings}>
                                {recommendedBooks.map((book) => (
                                    <LandingCard key={book.id} item={book} />
                                ))}
                            </Slider>

                        </>
                    ) : (
                        <p className="fs-5 text-center mb-5">
                            Add books to your wishlist first!
                        </p >
                    )}

            </div >

            <Footer />
        </div >
    );
};
