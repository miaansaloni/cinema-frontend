import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aside from "../components/Aside";
import Ads from "../components/Ads";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const navigate = useNavigate();

  const movies = [
    {
      id: 1,
      title: "Movie 1",
      image: "https://placedog.net/200/300",
    },
    {
      id: 2,
      title: "Movie 2",
      image: "https://placedog.net/200/300",
    },
    {
      id: 3,
      title: "Movie 3",
      image: "https://placedog.net/200/300",
    },
    {
      id: 4,
      title: "Movie 4",
      image: "https://placedog.net/200/300",
    },
    {
      id: 5,
      title: "Movie 5",
      image: "https://placedog.net/200/300",
    },
  ];

  const handleShowClick = (movieId) => {
    navigate(`/movie-details/${movieId}`);
  };

  return (
    <div>
      <h1>HomePage</h1>

      <Carousel>
        <Carousel.Item interval={6000}>
          <img
            className="carousel-image"
            src="https://backend.ucicinemas.tools/storage/adv-management/leaderboard//HnRYDY2EO7OdDIzQDN23259lGimbQGompll3vHF2.jpg"
            alt=""
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={6000}>
          <img
            className="carousel-image"
            src="https://backend.ucicinemas.tools/storage/adv-management/leaderboard//oZAjLxzcQEqwxTBBPwIZ2ztWcz9MQi21azOFjNrJ.jpg"
            alt=""
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container fluid>
        <Row>
          <Aside />

          <Col sm={8}>
            <h1 className="title">PROGRAMMAZIONE</h1>
            <div className="underline">TUTTI I FILM AL CINEMA</div>

            {/* Libreria di Film */}
            <Row className="film-library">
              {movies.map((movie) => (
                <Col key={movie.id} xs={3} className="film-col">
                  <div
                    className="film-card"
                    onMouseEnter={() => setHoveredMovie(movie.id)}
                    onMouseLeave={() => setHoveredMovie(null)}
                  >
                    <img src={movie.image} alt={movie.title} className="film-image" />
                    <div className="film-title">{movie.title}</div>
                    <button
                      className={`show-button ${hoveredMovie === movie.id ? "show" : ""}`}
                      onClick={() => handleShowClick(movie.id)}
                    >
                      MOSTRA
                    </button>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          <Ads />
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
