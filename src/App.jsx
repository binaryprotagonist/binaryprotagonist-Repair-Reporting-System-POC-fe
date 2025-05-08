import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import MyImage from "./assets/MyImage.png";
import LogoIMG from "./assets/logo.jpg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required.";
    }
    if (!contact) {
      newErrors.contact = "Contact number is required.";
    } else if (
      !/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/.test(
        contact
      )
    ) {
      newErrors.contact = "Please enter a valid contact number.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!message) {
      newErrors.message = "Message is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const apiUrl = "https://binaryprotagonist-repair-reporting.onrender.com/send-email";

    try {
      const response = await axios.post(apiUrl, {
        name,
        contact,
        email,
        message,
      });

      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setApiMessage(response.data.message || "Message sent successfully!");
      } else {
        setStatus("Failed to send message.");
        setApiMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred.");
      setApiMessage(
        "An error occurred while sending your message. Please try again."
      );
    }

    setOpenModal(true);
    setName("");
    setContact("");
    setEmail("");
    setMessage("");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="container">
        <div className="left-panel">
          <div className="logo">
            <img src={LogoIMG} alt="Logo" />
          </div>
          <div className="imagebox">
            <img src={MyImage} alt="Tenant" />
          </div>
        </div>
        <div className="right-panel">
          <div className="tagline">
            Stress-Free Property Ownership Starts Here.
          </div>
          <Box
            component="form"
            className="formbox"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              error={!!errors.name}
              helperText={errors.name}
              sx={{ marginBottom: "15px" }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                width: "100%",
              }}
            >
              <FormControl sx={{ width: "100px", marginRight: "10px" }}>
                <InputLabel>Country Code</InputLabel>
                <Select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  label="Country Code"
                  renderValue={(selected) => selected}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        fontSize: "0.9rem",
                      },
                    },
                  }}
                >
                  <MenuItem value="+1">+1 (USA/Canada)</MenuItem>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+91">+91 (India)</MenuItem>
                  <MenuItem value="+61">+61 (Australia)</MenuItem>
                  <MenuItem value="+81">+81 (Japan)</MenuItem>
                  <MenuItem value="+49">+49 (Germany)</MenuItem>
                  <MenuItem value="+33">+33 (France)</MenuItem>
                  <MenuItem value="+55">+55 (Brazil)</MenuItem>
                  <MenuItem value="+34">+34 (Spain)</MenuItem>
                  <MenuItem value="+39">+39 (Italy)</MenuItem>
                  <MenuItem value="+7">+7 (Russia)</MenuItem>
                  <MenuItem value="+52">+52 (Mexico)</MenuItem>
                  <MenuItem value="+27">+27 (South Africa)</MenuItem>
                  <MenuItem value="+66">+66 (Thailand)</MenuItem>
                  <MenuItem value="+82">+82 (South Korea)</MenuItem>
                  <MenuItem value="+90">+90 (Turkey)</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Contact"
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                error={!!errors.contact}
                helperText={errors.contact}
                sx={{ flex: 1 }}
              />
            </div>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={!!errors.email}
              helperText={errors.email}
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              error={!!errors.message}
              helperText={errors.message}
              sx={{ marginBottom: "15px" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ padding: "12px", marginTop: "20px" }}
            >
              Submit
            </Button>
          </Box>
        </div>

        {openModal && (
          <div className="dialog-overlay">
            <div className="backdrop" onClick={handleCloseModal} />
            <div className="dialog-content">
              <div className="close-button-container">
                <button className="close-button" onClick={handleCloseModal}>
                  ✕
                </button>
              </div>
              <div className="dialog-body">
                <div className="success-icon-container">
                  <svg className="success-icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="dialog-title">Operation Status</h3>
                <p className="dialog-message">{apiMessage}</p>
              </div>
              <div className="dialog-footer">
                <button className="confirm-button" onClick={handleCloseModal}>
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <p>Made with ❤️ - Brain Inventory</p>
      </div>
    </>
  );
}

export default App;
