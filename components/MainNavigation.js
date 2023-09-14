"use client";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { React, useState, useEffect } from "react";
import { useMainNavigation } from "./MainNavigationContext";

const MainNavigation = () => {
  const router = useRouter();
  const { rerenderNavigation } = useMainNavigation();

  const [currentUser, setCurrentUser] = useState({});
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRedirect = () => {
    router.push("/login");
  };

  const getCSRFToken = () => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      .split("=")[1];
    return cookieValue;
  };

  async function fetchUserData() {
    const csrfToken = getCSRFToken();
    try {
      const response = await fetch("http://127.0.0.1:8000/user/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setCurrentUser(true);
      setUsername(data.user.username);
    } catch (error) {
      setCurrentUser(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [rerenderNavigation]);

  useEffect(() => {
    fetchUserData();
  }, []);

  async function submitLogout(e) {
    e.preventDefault();

    try {
      const logoutResponse = await fetch("http://127.0.0.1:8000/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!logoutResponse.ok) {
        throw new Error("Logout failed");
      }

      setCurrentUser(false);
      handleRedirect();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div>
      <nav className={`${styles["main-nav"]}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            class="font-bold"
            style={{ fontSize: "1.5rem", marginRight: "auto" }}
          >
            Finance App
          </span>
          {currentUser ? (
            <div>
              <button
                class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => submitLogout(e)}
              >
                {username}
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MainNavigation;
