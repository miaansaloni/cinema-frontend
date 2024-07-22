import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Aside from "../components/Aside";
import Ads from "../components/Ads";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CinemaPage = () => {
  const { theaterId } = useParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [theaterName, setTheaterName] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/theaters/${theaterId}/movies-with-showtimes`)
      .then((response) => {
        console.log(response.data);
        setTheaterName(response.data.theater_name);
        setAllMovies(response.data.movies);
        setResults(response.data.movies);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [theaterId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = allMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
    setResults(filteredResults);
  };

  const handleDayClick = (dayIndex) => {
    setSelectedDay(dayIndex === selectedDay ? null : dayIndex); // Toggle selection
  };

  const daysOfWeek = ["LUNEDÌ", "MARTEDÌ", "MERCOLEDÌ", "GIOVEDÌ", "VENERDÌ", "SABATO", "DOMENICA"];

  const filterShowtimesByDay = (showtimes, dayIndex) => {
    return showtimes.filter((showtime) => {
      const showtimeDate = new Date(showtime.date);
      return showtimeDate.getDay() === (dayIndex + 1) % 7; // 0=Sunday, 6=Saturday
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  const handleShowClick = (showtimeId) => {
    navigate(`/reservation/${showtimeId}`);
  };

  return (
    <Row>
      <Aside />
      <Col>
        <>
          <div>
            <p>HOME/{theaterName.toUpperCase()}</p>
            <h1>{theaterName}</h1>
          </div>
          <div>
            <h1 className="title">PROGRAMMAZIONE</h1>
            <div className="underline">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cerca Film..."
                  className="search-input"
                />
                <button type="submit" className="button">
                  Cerca
                </button>
              </form>
            </div>

            <div className="days-buttons">
              {daysOfWeek.map((day, index) => (
                <Button
                  key={index}
                  variant={selectedDay === index ? "primary" : "outline-primary"}
                  onClick={() => handleDayClick(index)}
                  className="mx-1"
                >
                  {day}
                </Button>
              ))}
            </div>

            {/* Render Programming for Selected Day */}
            {selectedDay !== null && (
              <div className="daily-programming">
                <h2>Programmazione per {daysOfWeek[selectedDay]}</h2>
                {results.map((movie, index) => {
                  const showtimesForDay = filterShowtimesByDay(movie.showtimes, selectedDay);
                  return (
                    showtimesForDay.length > 0 && (
                      <table key={index} className="custom-table">
                        <thead>
                          <tr>
                            <th className="movie-info">
                              <h5>{movie.title}</h5>
                            </th>
                            <th>Orari</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="movie-title">
                              <img src={movie.poster_url} alt={movie.title} className="img" />
                            </td>
                            <td className="showtimes-list">
                              {showtimesForDay.map((showtime, timeIndex) => (
                                <div key={timeIndex} className="showtime-item">
                                  <button className="button" onClick={() => handleShowClick(showtime.id)}>
                                    {formatTime(showtime.start_time.split(" ")[1])}
                                  </button>
                                </div>
                              ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  );
                })}
              </div>
            )}
          </div>
        </>
      </Col>
      <Ads />
    </Row>
  );
};

export default CinemaPage;
