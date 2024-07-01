import React from "react";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aside from "../components/Aside";
import Ads from "../components/Ads";

const Offerte = () => {
  const offerte = [
    {
      id: 1,
      titolo: "Offerta 1",
      testo: "Descrizione dell'offerta 1.",
      imgUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      titolo: "Offerta 2",
      testo: "Descrizione dell'offerta 2.",
      imgUrl: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      titolo: "Offerta 3",
      testo: "Descrizione dell'offerta 3.",
      imgUrl: "https://via.placeholder.com/100",
    },
  ];

  return (
    <Row>
      <Aside />
      <Col>
        <div>
          <h1>OFFERTE</h1>
          <div className="offerte-container">
            {offerte.map((offerta) => (
              <div key={offerta.id} className="offerta-item">
                <img src={offerta.imgUrl} alt={offerta.titolo} className="offerta-img" />
                <div className="offerta-content">
                  <h2>{offerta.titolo}</h2>
                  <p>{offerta.testo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Ads />
    </Row>
  );
};

export default Offerte;
