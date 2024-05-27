import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import styles from "./Unauthorized.module.scss"; // Import the SCSS module

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleGoHome = () => {
    navigate("/",{replace:true}); // Navigate to the home page
  };

  return (
    <div className={styles.unauthorizedContainer}>
      <div className={styles.unauthorizedContent}>
        <FaUtensils className={styles.unauthorizedIcon} />
        <h1 className={styles.heading}>403</h1>
        <h2 className={styles.subheading}>Unauthorized Access</h2>
        <p className={styles.message}>
          Sorry, you don't have permission to view this page.
        </p>
        <div className={styles.unauthorizedButtons}>
          <button className={styles.button} onClick={handleGoBack}>
            Go Back
          </button>
          <button className={styles.button} onClick={handleGoHome}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
