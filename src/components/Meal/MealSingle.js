// MealSingle.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUtensilSpoon,
  FaUserTie,
  FaHeart,
  FaBookmark,
  FaShareSquare,
  FaUserPlus,
  FaBell,
} from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiChevronsRight } from "react-icons/bi";
import { BASE_URL, MEAL_THUMBNAIL_URL } from "../../utils/constants";
import { useAuthContext } from "../../context/authenticationContext";
import "./Meal.scss";
import axios from "axios";
import Modal from "../Profile/Modal"; // Import the modal component

const MealSingle = ({ meal }) => {
  const instructions = meal?.steps?.map((step) => step.description) || [];
  const mealThumbnail = BASE_URL + MEAL_THUMBNAIL_URL + meal?.thumbnail;

  const [isFollowing, setIsFollowing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [mealLikes, setMealLikes] = useState(0);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(true);
  const [isLikeLoading, setIsLikeLoading] = useState(true);
  const [isFollowingLoading, setIsFollowingLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (meal) {
      setMealLikes(meal.numberLikes);
    }
  }, [meal]);

  useEffect(() => {
    const checkIfBookmarked = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:3000/bookmark/isbookmarked/${meal.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setIsBookmarked(data);
        console.log("bookmarked:", data);
        setIsBookmarkLoading(false);
      } catch (error) {
        console.error("Failed to check if meal is bookmarked:", error);
        setIsBookmarkLoading(false);
      }
    };

    checkIfBookmarked();
  }, [meal.id]);

  useEffect(() => {
    const checkIfLiked = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:3000/like/isliked/${meal.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setIsLiked(data);
        console.log("liked:", data);
      } catch (error) {
        console.error("Failed to check if meal is liked:", error);
      } finally {
        setIsLikeLoading(false);
      }
    };

    checkIfLiked();
  }, [meal.id]);

  useEffect(() => {
    const checkIfFollowing = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:3000/user/followings`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Check if the current user's ID is in the list of followers
        if (data.some((user) => user.id === meal.user.id)) {
          setIsFollowing(true);
        }

        console.log("follow:", data);
      } catch (error) {
        console.error("Failed to check if person is following:", error);
      } finally {
        setIsFollowingLoading(false);
      }
    };

    checkIfFollowing();
  }, [meal]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`http://localhost:3000/comment/${meal?.id}`);

      if (response.ok) {
        const comments = await response.json();
        setComments(comments);
      } else {
        console.error("Failed to fetch comments:", response.statusText);
      }
    };

    fetchComments();
  }, [meal]);

  const bookmarkMeal = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/bookmark/${meal?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsBookmarked(true);
      } else {
        console.error("Failed to bookmark meal:", response.statusText);
      }
    } catch (error) {
      console.error("Error bookmarking meal:", error);
    }
  };

  const unbookmarkMeal = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/bookmark/${meal?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsBookmarked(false);
      } else {
        console.error("Failed to unbookmark meal:", response.statusText);
      }
    } catch (error) {
      console.error("Error unbookmarking meal:", error);
    }
  };

  const likeMeal = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/like/${meal?.id}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMealLikes(data.numberLikes);
        setIsLiked(true);
      } else {
        console.error("Failed to like meal:", response.statusText);
      }
    } catch (error) {
      console.error("Error liking meal:", error);
    }
  };

  const unlikeMeal = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/like/${meal?.id}/unlike`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMealLikes(data.numberLikes);
        setIsLiked(false);
      } else {
        console.error("Failed to unlike meal:", response.statusText);
      }
    } catch (error) {
      console.error("Error unliking meal:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/comment/${meal?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: newComment }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Returned data:", data);
      setComments([...comments, data.comment]);
      setNewComment("");
    } else {
      console.error("Failed to post comment:", response.statusText);
    }
  };

  const handleUsernameClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleFollowing = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/user/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idWanted: meal.user.id }),
        credentials: "include",
      });

      if (response.ok) {
        setIsFollowing(true);
      } else {
        console.error("Failed to follow user:", response.statusText);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollowing = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/user/unfollow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idWanted: meal.user.id }),
        credentials: "include",
      });

      if (response.ok) {
        setIsFollowing(false);
      } else {
        console.error("Failed to follow user:", response.statusText);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  if (isBookmarkLoading || isLikeLoading || isFollowingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-wrapper">
      <div className="container">
        <div className="breadcrumb bg-orange text-white">
          <ul className="flex align-center my-2">
            <li className="breadcrumb-item">
              <Link to="/" className="flex align-center">
                <AiFillHome size={22} />
              </Link>
            </li>
            <li className="flex align-center mx-1">
              <BiChevronsRight size={23} />
            </li>
            <li className="breadcrumb-item flex">
              <span to="" className="fs-15 fw-5 text-uppercase">
                {meal?.name}
              </span>
            </li>
          </ul>
        </div>

        <div className="sc-title">Meal Details</div>
        <section className="sc-details bg-white">
          <div className="details-head grid">
            <div className="details-img">
              <img src={mealThumbnail} alt={meal?.name} className="img-cover" />
            </div>

            <div className="details-intro">
              <h2 className="text-orange" style={{ textAlign: "left" }}>
                {meal?.name}
              </h2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaUserTie className="text-orange" />
                <h4
                  className="text-orange"
                  style={{
                    fontSize: "1.2em",
                    fontWeight: "normal",
                    marginLeft: "10px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleUsernameClick(meal?.user)}
                >
                  {meal?.user?.username}
                </h4>
                <button
                  className={`btn btn-content btn-small ${
                    isFollowing ? "btn-white" : "btn-red"
                  }`}
                  style={{ marginRight: "10px" }}
                  onClick={isFollowing ? handleUnfollowing : handleFollowing}
                >
                  <FaUserPlus className="icon" />{" "}
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button
                  className={`btn btn-content btn-small ${
                    notificationsEnabled ? "btn-white" : "btn-red"
                  }`}
                  style={{ marginRight: "10px" }}
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                >
                  <FaBell className="icon" />{" "}
                  {notificationsEnabled ? "Notifications On" : "Notifications"}
                </button>
              </div>
              <p className="title"> </p>
              <div className="py-4">
                <div className="category flex align-center">
                  <span className="text-uppercase fw-8 ls-1 my-1">
                    category: &nbsp;
                  </span>
                  <span className="text-uppercase ls-2">
                    {meal?.category?.name}
                  </span>
                </div>
              </div>

              <div className="button-group flex-container">
                <button
                  className={`btn btn-content ${
                    isLiked ? "btn-white" : "btn-red"
                  }`}
                  style={{ marginRight: "10px" }}
                  onClick={isLiked ? unlikeMeal : likeMeal}
                >
                  <FaHeart className="icon" /> {isLiked ? mealLikes : "Like"}
                </button>
                <button
                  className={`btn btn-content ${
                    isBookmarked ? "btn-white" : "btn-red"
                  }`}
                  style={{ marginRight: "10px" }}
                  onClick={isBookmarked ? unbookmarkMeal : bookmarkMeal}
                >
                  <FaBookmark className="icon" />{" "}
                  {isBookmarked ? "Unbookmark" : "Bookmark"}
                </button>
                <button className="btn btn-red btn-content">
                  <FaShareSquare className="icon" /> Share
                </button>
              </div>

              <div className="my-5 px-3 py-3 justified-text">
                {meal?.description}
              </div>
            </div>
          </div>

          <div className="details-body">
            <div className="measures my-4">
              <h6 className="fs-16">Ingredients:</h6>
              <ul className="grid">
                {meal?.ingredients?.map((ingredient, id) => (
                  <li key={id} className="fs-14 flex align-end">
                    <span className="li-icon fs-12 text-orange">
                      <FaUtensilSpoon />
                    </span>
                    <span className="li-text fs-15 fw-6 op-09">
                      {ingredient.name}: {ingredient.quantity} {ingredient.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="instructions my-4">
              <h6 className="fs-16">Instructions:</h6>
              <ol className="grid">
                {instructions.map((instruction, idx) => (
                  <li key={idx} className="fs-14">
                    <span className="li-text fs-16 fw-5 op-09">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <br />
            <br />
            <form className="comment-form" onSubmit={handleSubmit}>
              <label className="comment-label">
                Add comment:
                <input
                  className="comment-input"
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </label>
              <input className="comment-submit" type="submit" value="Submit" />
            </form>

            <br />
            <br />
            <div className="comments">
              <h6 className="fs-16">Comments:</h6>
              <ul>
                {comments.map((comment, idx) => (
                  <li
                    key={idx}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <strong>{comment?.user?.username}</strong>{" "}
                      {comment?.content}
                    </div>
                    <div>
                      {new Date(Number(comment?.timestamp)).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default MealSingle;
