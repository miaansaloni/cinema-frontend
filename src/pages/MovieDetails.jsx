import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati del film:", error);
        setError("Film non trovato o errore nel recupero dei dati.");
      });

    axios
      .get(`http://127.0.0.1:8000/api/v1/movies/${id}/theaters`)
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati dei cinema:", error);
      });
  }, [id]);

  const handleTheaterChange = (event) => {
    const theaterId = event.target.value;
    if (theaterId) {
      navigate(`/theaters/${theaterId}`);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Caricamento...</div>;
  }

  const genresTags = movie.genres
    ? movie.genres.map((genre) => (
        <span key={genre.id} className={`genre-tag genre-${genre.name.toLowerCase()}`}>
          {genre.name}
        </span>
      ))
    : null;

  const theatersList = theaters.reduce((acc, theater) => {
    if (!acc[theater.region]) {
      acc[theater.region] = [];
    }
    acc[theater.region].push(theater);
    return acc;
  }, {});

  return (
    <div>
      <Container>
        <Carousel className="carousel-container">
          <Carousel.Item interval={4000}>
            <img className="carousel-image" src={movie.poster_url} alt={movie.title} />
            <Carousel.Caption>
              <h3>Slide 1</h3>
              <p>{movie.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <Row className="mt-5">
          <Col xs={4}>
            <img src={movie.poster_url} alt={movie.title} className="movieposter" />
            {/* <iframe
              // className="cover trailer"
              src={movie.trailer_url}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer"
            ></iframe> */}
          </Col>
          <Col>
            <h1>{movie.title}</h1>

            <div>{genresTags}</div>

            <div className="synopsis">
              <h5>Dettagli e Sinossi</h5>
              <p>{movie.description}</p>
              <p>
                <span>{movie.duration} minuti </span> |<span> Anno: {movie.year} </span>
              </p>
            </div>
            <div className="ratings">
              <span>⭐ {movie.rating}/10</span>
            </div>
            <Row className="moreinfo">
              <Col>
                <h6>REGIA</h6>
                <p>{movie.director}</p>
                <h6>CAST</h6>
                <p>{movie.cast}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>CINEMA</h6>
                <div className="dropdown-container">
                  <select className="dropdown" onChange={handleTheaterChange}>
                    <option value="">Seleziona un cinema</option>
                    {Object.entries(theatersList).map(([region, theaters]) => (
                      <optgroup key={region} label={region}>
                        {theaters.map((theater) => (
                          <option key={theater.id} value={theater.id}>
                            {theater.name}, {theater.city}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;
