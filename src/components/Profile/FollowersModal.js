import React, { useState, useEffect } from "react";
import styles from "./UserProfile.module.scss";
import { BASE_URL, USER_THUMBNAIL_URL } from "../../utils/constants";
import { useAuthContext } from "../../context/authenticationContext";

const FollowersModal = ({ type }) => {
  const [followers, setFollowers] = useState([]);
  const {authUser} =useAuthContext();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/followers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust for your auth token storage
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFollowers(data);
        } else {
          console.error("Failed to fetch followers:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
    const eventSource = new EventSource(
      `http://localhost:3000/notifications/follow/${authUser.id}`
    );

    eventSource.onmessage = function (event) {
      console.log('im here')
      const data = JSON.parse(event.data);
     
      if (data.eventType === "new-follower") {
        fetchFollowers();
      }
    };

    eventSource.onerror = function (error) {
      console.error("EventSource failed:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className="sc-title"> Followers</div>
        <ul className={styles.followerList}>
          {followers.map((follower) => (
            <li key={follower.id}>
              <div className={styles["card"]}>
                <img
                  className={styles["card_load"]}
                  src={BASE_URL + USER_THUMBNAIL_URL + follower.ImageProfile}
                  alt="ee"
                />
                <div className={styles["card_load_extreme_title"]}>
                  {follower.username}
                </div>
                <button className={styles["card_load_extreme_descripion"]}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowersModal;
