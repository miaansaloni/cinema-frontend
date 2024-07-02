import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import axios from "axios";

const Aside = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    // Effettua la chiamata API per ottenere i dati dei cinema
    axios
      .get("http://localhost:8000/api/v1/theaters")
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati dei cinema:", error);
      });
  }, []);

  // Gestisci la ricerca dei cinema
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = theaters.filter((theater) => theater.name.toLowerCase().includes(query.toLowerCase()));
    setResults(filteredResults);
  };

  return (
    <Col sm={2}>
      <div className="search-widget">
        {/* Form di ricerca */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cinemas..."
            className="search-input"
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>

        {/* Risultati della ricerca */}
        {results.length > 0 && (
          <div className="search-results">
            <h5>Search Results:</h5>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <a href="/">{result.name}</a>
                  <p>
                    {result.address}, {result.city}, {result.region}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lista di cinema per regione */}
        {theaters.length > 0 && (
          <>
            <h4>EMILIA ROMAGNA</h4>
            {theaters
              .filter((theater) => theater.region === "Emilia Romagna")
              .map((theater) => (
                <p key={theater.id}>{theater.name}</p>
              ))}
            <hr />
            <h4>VENETO</h4>
            {theaters
              .filter((theater) => theater.region === "Veneto")
              .map((theater) => (
                <p key={theater.id}>{theater.name}</p>
              ))}
            <hr />
          </>
        )}
      </div>
    </Col>
  );
};

export default Aside;
