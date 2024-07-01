import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Aside from "../components/Aside";
import Ads from "../components/Ads";
import React, { useState } from "react";

const CinemaPage = () => {
  const data = [
    {
      title: "The Bikeriders",
      img: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2024/03/07200144/bikeriders-poster-3-scaled.jpg",
      schedule: {
        lun: "14:00",
        mar: "16:00",
        mer: "18:00",
        gio: "20:00",
        ven: "22:00",
        sab: "10:00",
        dom: "12:00",
      },
      hall: "Hall 2",
    },
    {
      title: "Inside Out",
      img: "https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg",
      schedule: {
        lun: "10:00",
        mar: "12:00",
        mer: "14:00",
        gio: "16:00",
        ven: "18:00",
        sab: "20:00",
        dom: "22:00",
      },
      hall: "Hall 5",
    },
  ];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(data);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = data.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
    setResults(filteredResults);
  };

  return (
    <Row>
      <Aside />
      <Col>
        <>
          <div>
            <p>HOME/REGIONE/NOMECINEMA</p>
            <h1>NOME CINEMA</h1>
          </div>
          <div>
            <h1 className="title">PROGRAMMAZIONE</h1>
            <div className="underline">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="search-input"
                />
                <button type="submit" className="button">
                  Search
                </button>
              </form>
            </div>

            {/* Risultati della ricerca */}
            {results.length > 0 ? (
              results.map((movie, index) => (
                <table key={index} className="custom-table">
                  <thead>
                    <tr className="tableheader">
                      <th className="movie-info">
                        <h5>{movie.title}</h5>
                        <img src={movie.img} alt={movie.title} className="img" />
                      </th>
                      <th>LUN</th>
                      <th>MAR</th>
                      <th>MER</th>
                      <th>GIO</th>
                      <th>VEN</th>
                      <th>SAB</th>
                      <th>DOM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>{movie.hall}</strong>
                      </td>
                      <td className="schedule-cell">
                        <div className="schedule-info">
                          {movie.schedule.lun}
                          <button className="buy-button">Acquista</button>
                        </div>
                      </td>
                      <td className="schedule-cell">
                        <div className="schedule-info">
                          {movie.schedule.mar}
                          <button className="buy-button">Acquista</button>
                        </div>
                      </td>
                      <td className="schedule-cell">
                        <div className="schedule-info">
                          {movie.schedule.mer}
                          <button className="buy-button">Acquista</button>
                        </div>
                      </td>
                      <td className="schedule-cell">
                        <div className="schedule-info">
                          {movie.schedule.gio}
                          <button className="buy-button">Acquista</button>
                        </div>
                      </td>
                      <td className="schedule-cell">
                        <div className="schedule-info">
                          {movie.schedule.ven}
                          <button className="buy-button">Acquista</button>
                        </div>
                      </td>
                      <td className="schedule-cell">
                        <div className="schedule-info">
                          {movie.schedule.sab}
                          <button className="buy-button">Acquista</button>
                        </div>
                      </td>
                      <td className="schedule-cell">
                        <div className="schedule-info">
                          {movie.schedule.dom}
                          <button className="buy-button">Acquista</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))
            ) : (
              <p>0 results found</p>
            )}
          </div>
        </>
      </Col>
      <Ads />
    </Row>
  );
};

export default CinemaPage;
