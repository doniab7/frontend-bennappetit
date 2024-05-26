import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserProfile.module.scss";

const FollowersModal = ({ type }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const endpoint =
        type === "followers"
          ? "http://localhost:3000/user/followers"
          : "http://localhost:3000/user/following";
      try {
        // const response = await axios.get(endpoint);
        // setFollowers(response.data);
        setFollowers([
          { id: 1, name: "User's Name" },
          { id: 2, name: "User's Name" },
          { id: 3, name: "User's Name" },
          { id: 3, name: "User's Name" },
          { id: 3, name: "User's Name" },
        ]);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [type]);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className="sc-title"> {type}</div>
        <ul className={styles.followerList}>
          {followers.map((follower) => (
            <li key={follower.id}>
              <div className={styles["card"]}>
                <img
                  className={styles["card_load"]}
                  src={require("../../assets/images/aziz.jpg")}
                  alt="ee"
                />
                <div className={styles["card_load_extreme_title"]}>
                  {follower.name}
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
