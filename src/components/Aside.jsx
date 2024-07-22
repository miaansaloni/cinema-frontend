import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/theaters")
      .then((response) => {
        setTheaters(response.data);
        const uniqueRegions = [...new Set(response.data.map((theater) => theater.region))].sort();
        setRegions(uniqueRegions);
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati dei cinema:", error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = theaters.filter((theater) => theater.name.toLowerCase().includes(query.toLowerCase()));
    setResults(filteredResults);
  };

  const handleShowClick = (theaterId) => {
    navigate(`/theaters/${theaterId}`);
  };

  return (
    <Col sm={2}>
      <div className="search-widget">
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

        {/* Search Results */}
        {results.length > 0 && (
          <div className="search-results">
            <h5>Search Results:</h5>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <a
                    href={`/theaters/${result.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleShowClick(result.id);
                    }}
                  >
                    {result.name}
                  </a>
                  <p>
                    {result.address}, {result.city}, {result.region}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* List of cinemas sorted by region */}
        {regions.length > 0 && (
          <>
            {regions.map((region) => (
              <div key={region}>
                <h4>{region}</h4>
                {theaters
                  .filter((theater) => theater.region === region)
                  .map((theater) => (
                    <p key={theater.id}>
                      <a
                        href={`/theaters/${theater.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleShowClick(theater.id);
                        }}
                      >
                        {theater.name}
                      </a>
                    </p>
                  ))}
                <hr />
              </div>
            ))}
          </>
        )}
      </div>
    </Col>
  );
};

export default Aside;
