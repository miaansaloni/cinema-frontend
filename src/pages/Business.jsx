import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aside from "../components/Aside";
import Ads from "../components/Ads";

const Business = () => {
  return (
    <Row>
      <Aside />
      <Col>
        <div>
          <h1>BUSINESS</h1>
          <ul>
            <li>Voucher Aziendali</li>
            <li>Eventi</li>
            <li>Pubblicità</li>
            <li>Proiezioni riservate</li>
          </ul>
        </div>
      </Col>
      <Ads />
    </Row>
  );
};

export default Business;
