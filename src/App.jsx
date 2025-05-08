import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
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

  const [openModal, setOpenModal] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
    } else if (!/^[a-zA-Z ]+$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must contain only letters and spaces only.",
      }));
    } else {
      // Clear error if valid
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };
  const handleContactChange = (e) => {
    const value = e.target.value;
    setContact(value);
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        contact: "Contact number is required.",
      }));
    } else if (
      !/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/.test(
        value
      )
    ) {
      setErrors((prev) => ({
        ...prev,
        contact: "Please enter a valid contact number.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, contact: "" }));
    }
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, message: "Message is required." }));
    } else {
      setErrors((prev) => ({ ...prev, message: "" }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      newErrors.name = "Name must be alphanumeric.";
    } else if (!/[a-zA-Z0-9]/.test(name)) {
      newErrors.name = "Name must contain at least one letter or number.";
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
    setLoading(true);
    const apiUrl = "https://send-email-hcif.onrender.com/send-email";
    try {
      const response = await axios.post(apiUrl, {
        name,
        contact,
        email,
        message,
      });
      if (response.status === 200) {
        
        setApiMessage(response.data.message || "Message sent successfully!");
      } else {
       
        setApiMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
     
      setApiMessage(
        "An error occurred while sending your message. Please try again."
      );
    } finally {
      setLoading(false);
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
              type="text"
              value={name}
              onChange={handleNameChange}
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
                  className="countrycode"
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
                onChange={handleContactChange}
                error={!!errors.contact}
                helperText={errors.contact}
                sx={{ flex: 1 }}
              />
            </div>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              value={message}
              onChange={handleMessageChange}
              error={!!errors.message}
              helperText={errors.message}
              sx={{ marginBottom: "15px" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ padding: "12px", marginTop: "20px" }}
            >
              {loading ? "Submitting..." : "Submit Your request"}
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
        <div className="footer">
        <p>Made with ❤️ by Brain Inventory</p>
      </div>
      </div>


    </>
  );
}
export default App;