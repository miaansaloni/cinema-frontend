import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState(null);

  const updateInputValue = (ev) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitRegister = (ev) => {
    ev.preventDefault();

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/register", formData))
      .then(() => axios.get("/api/user"))
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <Container className="bg-login">
      <Row>
        {errors && (
          <div className="alert alert-danger mt-4">
            {Object.keys(errors).map((key) => (
              <div key={key}>{errors[key]}</div>
            ))}
          </div>
        )}
        <Col xs={11} md={5} className="mx-auto my-5 form-container">
          <h1>Register</h1>

          <form onSubmit={submitRegister} noValidate>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={(ev) => updateInputValue(ev)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={(ev) => updateInputValue(ev)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthday" className="form-label">
                Birthday:
              </label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={(ev) => updateInputValue(ev)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={(ev) => updateInputValue(ev)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={(ev) => updateInputValue(ev)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={(ev) => updateInputValue(ev)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(ev) => updateInputValue(ev)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={(ev) => updateInputValue(ev)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
