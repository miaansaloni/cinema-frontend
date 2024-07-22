import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";

const Reservation = () => {
  const { showtimeId } = useParams();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/reservations/${showtimeId}/seats`)
      .then((response) => {
        setSeats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [showtimeId]);

  return (
    <Container fluid>
      <Carousel>
        <Carousel.Item interval={6000}>
          <img
            className="carousel-image"
            src="https://backend.ucicinemas.tools/storage/adv-management/leaderboard//HnRYDY2EO7OdDIzQDN23259lGimbQGompll3vHF2.jpg"
            alt="First slide"
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
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Row>
        <Col>
          <h2>Seats for Showtime {showtimeId}</h2>
          {loading && <p>Loading seats...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
            <ul>
              {seats.map((seat) => (
                <li key={seat.id}>
                  Row {seat.row}, Seat {seat.seat_number} - {seat.is_available ? "Available" : "Not Available"}
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Reservation;
