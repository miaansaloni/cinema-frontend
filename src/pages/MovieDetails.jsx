import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MovieDetails = () => {
  return (
    <div>
      <Container>
        <h1>MovieDetails</h1>
        <div className="prova">
          <Carousel className="carousel-container">
            <Carousel.Item interval={4000}>
              <img
                className="carousel-image"
                src="https://www.ucicinemas.it/media/movie/slider/the-watchers-loro-ti-guardano/uci-feb-2024-4.png"
                alt=""
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
              <img
                className="carousel-image"
                src="https://www.ucicinemas.it/media/movie/slider/the-watchers-loro-ti-guardano/396.png"
                alt=""
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
              <img
                className="carousel-image"
                src="https://www.ucicinemas.it/media/movie/slider/the-watchers-loro-ti-guardano/397.png"
                alt=""
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <Container className="cover">
            <img src="https://www.ucicinemas.it/media/movie/m/2024/the-watchers-loro-ti-guardano.png" alt="" />
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
            <h1>THE WATCHERS</h1>
            <div className="synopsis">
              <h5>Dettagli e Sinossi</h5>
              <p>
                Il film segue le vicende di Mina, artista di 28 anni, che si ritrova bloccata e isolata in una vasta e
                incontaminata foresta nell’Irlanda occidentale. Quando Mina trova un riparo, rimane inconsapevolmente
                intrappolata assieme a tre sconosciuti che ogni notte sono spiati e perseguitati da misteriose creature.
              </p>
              <p>
                <span>102 minuti </span>|<span> Horror, Thriller </span> | <span> Anno: 2024 </span>
              </p>
            </div>
            <div className="ratings">
              <span>⭐ 6.9/10</span>
              <span> ☆☆☆☆☆☆☆☆☆☆/10</span>
            </div>
            <Row className="moreinfo">
              <Col>
                <h6>REGIA</h6>
                <p>Ishana Night Shyamalan</p>
                <h6>CAST</h6>
                <p>Dakota Fanning, Georgina Campbell, Olwen Fouere, Alistair Brammer, Siobhan Hewlett</p>
              </Col>
              <Col>
                <iframe
                  src={`https://youtu.be/dYo91Fq9tKY?si=O5S-n4qK_Y8Lmt1q`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded YouTube"
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
