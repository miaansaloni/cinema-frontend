// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "./redux/actions";

import NavComponent from "./components/NavComponent";
import FooterComponent from "./components/FooterComponent";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import Offerte from "./pages/Offerte";
import Premium from "./pages/SalePremium";
import Business from "./pages/Business";
import PrenotaUnaSala from "./pages/PrenotaUnaSala";
import CinemaPage from "./pages/CinemaPage";
import GuestRoutes from "./pages/GuestRoutes";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";

// Configura axios con la baseURL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000"; // fallback se REACT_APP_API_URL non è definito
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) =>
        dispatch({
          type: LOGIN,
          payload: res.data,
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <BrowserRouter>
        <NavComponent />
        <div>
          <Routes>
            {/* rotte accessibili da tutti */}
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MovieDetails />} /> <Route path="/offerte" element={<Offerte />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/business" element={<Business />} />
            <Route path="/prenota-una-sala" element={<PrenotaUnaSala />} />
            <Route path="/cinema" element={<CinemaPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
            {/* rotte accessibili solo se NON si è loggati */}
            <Route element={<GuestRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* rotte accessibili solo se si è loggati */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    )
  );
}

export default App;
