import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSettings.scss";
import api from "../../api/axios";
import { useAuthContext } from "../../context/authenticationContext";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { authUser, isLoggedIn ,setAuthUser} = useAuthContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn && authUser) {
      setUsername(authUser.username);
      setEmail(authUser.email);
      setBio(authUser.bio || "");
    }
  }, [authUser, isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    } else {
      setError("");
    }

    const formData = {
      username,
      email,
      bio,
    };
    if (password) {
      formData.password = password;
    }

    try {
      const response = await api.patch(`/user/${authUser.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const updatedUser = { ...authUser, username, bio };
        setAuthUser(updatedUser);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBio("");
        navigate("/");
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
            />
          </div>
          <div className="form-group form-group-half">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              disabled={!password} // Disable if password is empty
            />
          </div>
        </div>
        {error && (
          <div className="form-row">
            <div className="form-group">
              <p className="error-message" style={{ color: "red" }}>
                {error}
              </p>
            </div>
          </div>
        )}
        <div className="form-group">
          <label>Bio:</label>
          <input
            type="text"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            maxLength="60"
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
