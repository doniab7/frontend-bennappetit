import React, { useState } from "react";
import styles from "./LoginSignup.module.scss";
import { FaUser, FaKey } from "react-icons/fa";
import { MdEmail, MdFoodBank } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/authenticationContext";

const LoginSignUp = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn, authUser, setAuthUser } = useAuthContext();

  const submit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (action === "Sign Up") {
        response = await fetch("http://localhost:3000/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });
      } else if (action === "Login") {
        response = await fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        });
      }

      if (response && response.ok) {
        const responseData = await response.json(); // Parse the JSON data
        localStorage.setItem("token", responseData.access_token);
        const content = await fetch("http://localhost:3000/user/connected", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        });
        const user = await content.json();
        setAuthUser(user);
        localStorage.setItem("user", user);

        setIsLoggedIn(true);
      } else {
        console.error("Failed to fetch user:", response.statusText);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoggedIn(false);
    }
  };
  if (isLoggedIn) {
    return <Navigate to={"/"} replace />;
  } else
    return (
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <Link to="/" className={styles.logo}>
            <MdFoodBank size={24} />
            <span className={styles.appTitle}>BennAppetit</span>
          </Link>
          <h1>{action === "Login" ? "  WELCOME BACK" : " New Here ?"}</h1>
          <div className={styles.underline}></div>
          <p>
            {action === "Login"
              ? "  Welcome back! Please enter your details."
              : " We hope you've brought your appetite"}
          </p>
          <form className={styles.form} onSubmit={submit}>
            {action === "Sign Up" && (
              <div className={styles.inputGroup}>
                <FaUser className={styles.icon} />
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className={styles.inputGroup}>
              <MdEmail className={styles.icon} />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <FaKey className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {action === "Login" && (
              <div className={styles.rememberMe}>
                <div className={styles.checkboxContainer}>
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <a href="#forgot" className={styles.forgotPasswordLink}>
                  Forgot password
                </a>
              </div>
            )}
            <button type="submit" className={styles.submitBtn}>
              {action}
            </button>
            <button type="button" className={styles.googleBtn}>
              Sign in with Google
            </button>
          </form>
          <div className={styles.signUpLink}>
            {action === "Login"
              ? " Don't have an account"
              : "Already have an account "}
            <a
              onClick={() => {
                if (action === "Login") setAction("Sign Up");
                else setAction("Login");
              }}
            >
              {action === "Login"
                ? " Sign up for free! "
                : " Use Your Account ! "}
            </a>
          </div>
        </div>
        <div className={styles.rightPanel}></div>
      </div>
    );
};

export default LoginSignUp;
