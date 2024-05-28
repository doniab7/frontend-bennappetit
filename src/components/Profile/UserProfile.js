import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.scss";
import { useAuthContext } from "../../context/authenticationContext";
import api from "../../api/axios";

import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, USER_THUMBNAIL_URL } from "../../utils/constants";

import UserMeal from "../Meal/UserMeal";
import BookmarkedMeals from "../Meal/BookmarkedMeals";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FollowersModal from "./FollowersModal";
import ProfileSettings from "./ProfileSettings";
import { IoIosReturnRight } from "react-icons/io";
import FollowingsModal from "./FollowingsModal";

const UserProfile = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Replace with your desired path
  };
  return (
    <>
      <div className={styles["custom-shape-divider-top-1714330091"]}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className={styles["shape-fill"]}
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className={styles["shape-fill"]}
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className={styles["shape-fill"]}
          ></path>
        </svg>
      </div>

      <div className={styles["main-content"]}>
        <div className={styles["profile-settings-container"]}>
          <ProfileCard />
          <SettingsContainer />
        </div>
        <div className={styles["back"]} onClick={handleClick}>
          <IoIosReturnRight size={25} />
          <span className={styles["back-text"]}>Go back</span>
        </div>
      </div>
    </>
  );
};

const SettingsContainer = () => {
  return (
    <div className={styles["settings-container"]}>
      <SettingsTabs />
    </div>
  );
};

const ProfileCard = () => {
  const { isLoggedIn, authUser, setAuthUser } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (authUser?.ImageProfile) {
      setPreview(BASE_URL + USER_THUMBNAIL_URL + authUser.ImageProfile);
    } else {
      setPreview(process.env.PUBLIC_URL + "/default_profile_pic.jpg");
    }
  }, [authUser]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const response = await api.post("/user/profile/photo", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      const fileName = response.data.fileName;
      setAuthUser((prevUser) => ({
        ...prevUser,
        ImageProfile: fileName,
      }));
      setPreview(BASE_URL + USER_THUMBNAIL_URL + fileName);
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  return (
    <div className={styles["profile-card"]}>
      <img className={styles["profile-picture"]} src={preview} alt="Profile" />
      <h1>{isLoggedIn ? authUser.username : ""}</h1>
      <p>The Baking Boss </p>
      <ul className={styles.stats}>
        <li>
          Recipes Published <span>32</span>
        </li>
        <li>
          Recipes Liked <span>26</span>
        </li>
        <li>
          Current opportunities <span>6</span>
        </li>
      </ul>
      <button onClick={handleUpload} className={styles["view-profile-button"]}>
        Upload Image
      </button>
      <div className={styles["profile-link"]}>
        <label htmlFor="file-upload" className={styles["custom-file-upload"]}>
          Choose File
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

const SettingsTabs = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Account Settings</Tab>
          <Tab>Your Followers</Tab>
          <Tab>Following</Tab>
          <Tab>Your Recipes</Tab>
          <Tab>Bookmarked Recipes</Tab>
          <Tab>Notifications</Tab>
        </TabList>
        <TabPanel>
          <ProfileSettings />
        </TabPanel>
        <TabPanel>
          <FollowersModal />
        </TabPanel>
        <TabPanel>
          <FollowingsModal />
        </TabPanel>
        <TabPanel>
          <div className={styles["tab-content"]}>
            <UserMeal />
          </div>{" "}
        </TabPanel>
        <TabPanel>
          <div className={styles["tab-content"]}>
            <BookmarkedMeals />
          </div>{" "}
        </TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  );
};

export default UserProfile;
