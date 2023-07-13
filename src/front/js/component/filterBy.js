import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const FilterBy = (props) => {
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
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


    const handleGenreCheckboxChange = (value) => {

        if (selectedGenre.includes(value)) {
            setSelectedGenre(selectedGenre.filter((item) => item !== value));
        } else {
            setSelectedGenre([...selectedGenre, value]);
        }
        props.onFilterChange(value, selectedPublisher, selectedYear)
    };

    const handlePublisherCheckboxChange = (value) => {

        if (selectedPublisher.includes(value)) {
            setSelectedPublisher(selectedPublisher.filter((item) => item !== value));
        } else {
            setSelectedPublisher([...selectedPublisher, value]);
        }
        props.onFilterChange(selectedGenre, value, selectedYear)
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        props.onFilterChange(selectedGenre, selectedPublisher, event.target.value);
    };

    const handleClearFilters = () => {
        setSelectedGenre([]);
        setSelectedPublisher([]);
        setSelectedYear('');
        props.onFilterChange([], [], ''); // Notify the parent component of cleared filters
        setFictionChecked(false);
        setCrimeChecked(false);
        setHealthChecked(false);
        setBiographyChecked(false);
        setHistoryChecked(false);
        setHumorChecked(false);
        setSelfChecked(false);
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
        <div className="container">
            <div className="row mb-2">
                <div className="d-flex justify-content-center align-items-baseline">
                    <h4>Filter by</h4>
                    <button className="btn custom-button d-flex justify-content-start ms-3" onClick={() => {
                        handleClearFilters()
                    }}>Clear filters</button>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
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

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="fiction"
                                        checked={fictionChecked}
                                        onChange={() => {
                                            setFictionChecked(!fictionChecked);
                                            handleGenreCheckboxChange("Fiction");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Fiction
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="crime"
                                        checked={crimeChecked}
                                        onChange={() => {
                                            setCrimeChecked(!crimeChecked);
                                            handleGenreCheckboxChange("True Crime");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        True Crime
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="health"
                                        checked={healthChecked}
                                        onChange={() => {
                                            setHealthChecked(!healthChecked);
                                            handleGenreCheckboxChange("Health & Fitness");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Health & Fitness
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="biography"
                                        checked={biographyChecked}
                                        onChange={() => {
                                            setBiographyChecked(!biographyChecked);
                                            handleGenreCheckboxChange("Biography & Autobiography");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Biography
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="history"
                                        checked={historyChecked}
                                        onChange={() => {
                                            setHistoryChecked(!historyChecked);
                                            handleGenreCheckboxChange("History");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        History
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="humor"
                                        checked={humorChecked}
                                        onChange={() => {
                                            setHumorChecked(!humorChecked);
                                            handleGenreCheckboxChange("Humor");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Humor
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="self"
                                        checked={selfChecked}
                                        onChange={() => {
                                            setSelfChecked(!selfChecked);
                                            handleGenreCheckboxChange("Self-Help");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Self-Help
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
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

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="penguin"
                                        checked={penguinChecked}
                                        onChange={() => {
                                            setPenguinChecked(!penguinChecked);
                                            handlePublisherCheckboxChange("Penguin");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Penguin
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="national"
                                        checked={nationalChecked}
                                        onChange={() => {
                                            setNationalChecked(!nationalChecked);
                                            handlePublisherCheckboxChange("National Geographic Books");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        National Geo. Books
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="simon"
                                        checked={simonChecked}
                                        onChange={() => {
                                            setSimonChecked(!simonChecked);
                                            handlePublisherCheckboxChange("Simon and Schuster");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Simon and Schuster
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="washington"
                                        checked={washingtonChecked}
                                        onChange={() => {
                                            setWashingtonChecked(!washingtonChecked);
                                            handlePublisherCheckboxChange("Washington Square");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Washington Square
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="bloom"
                                        checked={bloomChecked}
                                        onChange={() => {
                                            setBloomChecked(!bloomChecked);
                                            handlePublisherCheckboxChange("Bloom Books");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Bloom Books
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="harper"
                                        checked={harperChecked}
                                        onChange={() => {
                                            setHarperChecked(!harperChecked);
                                            handlePublisherCheckboxChange("Harper");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Harper
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="ballantine"
                                        checked={ballantineChecked}
                                        onChange={() => {
                                            setBallantineChecked(!ballantineChecked);
                                            handlePublisherCheckboxChange("Ballantine Books");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Ballantine Books
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">

                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="martin"
                                        checked={martinChecked}
                                        onChange={() => {
                                            setMartinChecked(!martinChecked);
                                            handlePublisherCheckboxChange("St. Martin's Press");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        St. Martin's Press
                                    </label>
                                </div>
                                <div className="d-flex justify-content-start ms-4 mb-1">
                                    <input
                                        className="form-check-input custom-checkbox me-1"
                                        type="checkbox"
                                        id="bay"
                                        checked={bayChecked}
                                        onChange={() => {
                                            setBayChecked(!bayChecked);
                                            handlePublisherCheckboxChange("Back Bay");
                                        }}
                                    />
                                    <label className="form-check-label me-2" htmlFor="flexCheckDefault">
                                        Back Bay Books
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">

                    <input
                        type="number"
                        className="form-control "
                        placeholder="Year"
                        min={0}
                        max={new Date().getFullYear() + 1}
                        value={selectedYear}
                        onChange={handleYearChange}
                    />

                </div>
            </div>
        </div>
    );
};