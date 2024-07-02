import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
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
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Caricamento...</div>;
  }

  // Verifica che movie.genres sia definito e non nullo prima di chiamare map
  const genresList = movie.genres ? movie.genres.map((genre) => genre.name).join(", ") : "";

  return (
    <div>
      <Container>
        <h1>{movie.title}</h1>
        <div className="prova">
          <Carousel className="carousel-container">
            <Carousel.Item interval={4000}>
              <img className="carousel-image" src={movie.poster_url} alt={movie.title} />
              <Carousel.Caption>
                <h3>Slide 1</h3>
                <p>{movie.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <Container className="cover">
            <img src={movie.poster_url} alt={movie.title} />
            <div>
              <h5>Acquista i biglietti</h5>
              <ul>
                <li>
                  <a href="/">UCI Palermo</a>
                </li>
                <li>
                  <a href="/">UCI Ferrara</a>
                </li>
                <li>
                  <a href="/">UCI Milano</a>
                </li>
              </ul>
            </div>
          </Container>
        </div>

        <Row>
          <Col xs={5} className="col-container"></Col>
          <Col>
            <h1>{movie.title}</h1>
            <div className="synopsis">
              <h5>Dettagli e Sinossi</h5>
              <p>{movie.description}</p>
              <p>
                <span>{movie.duration} minuti </span> |<span> {genresList} </span> |<span> Anno: {movie.year} </span>
              </p>
            </div>
            <div className="ratings">
              <span>⭐ {movie.rating}/10</span>
              {/* Aggiungi altri dettagli sui voti se necessario */}
            </div>
            <Row className="moreinfo">
              <Col>
                <h6>REGIA</h6>
                <p>{movie.director}</p>
                <h6>CAST</h6>
                <p>{movie.cast}</p>
              </Col>
              <Col>
                <iframe
                  src={movie.trailer_url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Trailer"
                ></iframe>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;
