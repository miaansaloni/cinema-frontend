import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aside from "../components/Aside";
import Ads from "../components/Ads";

const PrenotaUnaSala = () => {
  return (
    <Row>
      <Aside />
      <Col>
        <div>
          <h1>PRENOTA UNA SALA</h1>
          <ul>
            <li>Sala Riservata</li>
            <li>Feste di compleanno</li>
            <li>Wedding</li>
            <li>Proiezioni per le scuole</li>
          </ul>
        </div>
      </Col>
      <Ads />
    </Row>
  );
};

export default PrenotaUnaSala;
