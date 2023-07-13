import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LandingCard } from "../component/landingCard";

const MyCarousel = ({ recommendedBooks }) => {
    const numCardsPerSlide = 4; // Set the number of cards to display on each slide

    // Split the recommendedBooks array into chunks based on the number of cards per slide
    const chunkedCards = recommendedBooks.reduce((accumulator, currentItem, index) => {
        const chunkIndex = Math.floor(index / numCardsPerSlide);

        if (!accumulator[chunkIndex]) {
            accumulator[chunkIndex] = []; // Create a new chunk if it doesn't exist
        }

        accumulator[chunkIndex].push(currentItem);
        return accumulator;
    }, []);

    return (
        <Carousel>
            {chunkedCards.map((chunk, index) => (
                <Carousel.Item key={index}>
                    <Row className="m-0">
                        {chunk.map((book) => (
                            <Col key={book.id} md={3}>
                                <LandingCard item={book} />
                            </Col>
                        ))}
                    </Row>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default MyCarousel;