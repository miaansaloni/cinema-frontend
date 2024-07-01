import React, { useState } from "react";
import Col from "react-bootstrap/Col";

const Aside = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Simula un insieme di dati
  const data = ["UCI Ferrara", "UCI Bologna", "UCI Verona", "UCI Padova", "UCI Milan", "UCI Rome"];

  // Gestisci la ricerca
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = data.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
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
                  <a href="/">{result}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <h4>EMILIA ROMAGNA</h4>
        <p>UCI Ferrara</p>
        <p>UCI Bologna</p>
        <hr />
        <h4>VENETO</h4>
        <p>UCI Verona</p>
        <p>UCI Padova</p>
        <hr />
      </div>
    </Col>
  );
};

export default Aside;
