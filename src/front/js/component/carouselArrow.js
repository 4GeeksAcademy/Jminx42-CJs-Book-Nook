import React from "react";
import "../../styles/index.css"
import "../../styles/home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const CarouselNextArrow = ({ className, onClick, style }) => {


    return (
        <>
            <div
                className={className}
                style={{ ...style, background: "black", color: "white", fontWeight: "bold" }}
                onClick={onClick}
            >

            </div >

        </>
    );
}

export const CarouselPrevArrow = ({ className, onClick, style }) => {


    return (
        <>
            <div
                className={className}
                style={{ ...style, background: "black", color: "white", fontWeight: "bold" }}
                onClick={onClick}
            >

            </div >
        </>
    );
}

