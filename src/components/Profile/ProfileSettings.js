import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSettings.scss";
import api from "../../api/axios";
import { useAuthContext } from "../../context/authenticationContext";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { authUser, isLoggedIn } = useAuthContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (isLoggedIn && authUser) {
      setUsername(authUser.username);
      setEmail(authUser.email);
    }
  }, [authUser, isLoggedIn]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email); 
    formData.append("password", password);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await api.patch(`/user/${authUser.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfileImage(null);
        navigate("/profile"); // Navigate to the profile page after successful update
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="profileSettingsContainer">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group form-group-half">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="form-group form-group-half">
            <label>Email:</label>
            <input type="email" name="email" value={email} disabled required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group form-group-half">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="form-group form-group-half">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Upload Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </div>
        <button className="buttonSetting" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
