import React, { useState } from "react";
import "./Modal.scss";
import { BASE_URL, USER_THUMBNAIL_URL } from "../../utils/constants";
import { FaUserPlus, FaRegUser } from "react-icons/fa";

const Modal = ({ show, onClose, user }) => {
  if (!show) {
    return null;
  }

  let ProfileImage;
  if (user?.ImageProfile) {
    ProfileImage = BASE_URL + USER_THUMBNAIL_URL + user.ImageProfile;
  } else {
    ProfileImage = process.env.PUBLIC_URL + "/default_profile_pic.jpg";
  }


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  let isFollowing =true
  const toggleFollow = () => {
    console.log(isFollowing);
    if (isFollowing) isFollowing = false;
    else isFollowing = true;  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-profile-picture-container">
              <img
                src={ProfileImage}
                alt="User Profile"
                className="modal-profile-picture"
              />
            </div>
            <h2>{user.username}</h2>
          </div>
          <div className="modal-body" style={{color :"#707070"}}>
            <p>{user.bio ? user.bio : "Has no bio yet"}</p>
            <br></br>
            <div className="modal-social-links">
              <button
                className={`btn btn-content btn-small ${
                  isFollowing ? "btn-white" : "btn-red"
                }`}
                style={{
                  marginRight: "10px",
                  height: "60px",
                  width: "140px",
                  fontSize: "15px",
                  color: "#ff3f31",
                  border: "solid #ff6f61 2px ",
                }}
                onClick={toggleFollow}
              >
                <FaUserPlus /> {isFollowing ? "Following" : "Unfollow"}
              </button>
              <button
                className={`btn btn-content btn-small ${
                  isFollowing ? "btn-white" : "btn-red"
                }`}
                style={{
                  marginRight: "10px",
                  height: "60px",
                  width: "140px",
                  fontSize: "15px",
                  color: "#ff3f31",
                  border: "solid #ff6f61 2px ",
                }}
                onClick={toggleFollow}
              >
                <FaRegUser />
                Visit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
