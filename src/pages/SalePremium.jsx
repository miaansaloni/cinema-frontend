import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aside from "../components/Aside";
import Ads from "../components/Ads";

const SalePremium = () => {
  return (
    <Row>
      <Aside />
      <Col>
        <div>
          <h1>SALE PREMIUM</h1>
          <ul>
            <li>luxe</li>
            <li>imax</li>
            <li>isense</li>
            <li>screenX</li>
            <li>4k laser</li>
            <li>salaXL</li>
          </ul>
        </div>
      </Col>
      <Ads />
    </Row>
  );
};

export default SalePremium;
