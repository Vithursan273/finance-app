"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMainNavigation } from "@/components/MainNavigationContext";

export default function Home() {
  const router = useRouter();
  const { rerenderNavigation, setRerenderNavigation } = useMainNavigation();

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRedirect = () => {
    router.push("/my-finances");
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/user/", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        setCurrentUser(true);
      } catch (error) {
        setCurrentUser(false);
      }
    }

    fetchUserData();
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  async function submitRegistration(e) {
    e.preventDefault();
    try {
      const registrationResponse = await fetch(
        "http://127.0.0.1:8000/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
          }),
        }
      );

      if (!registrationResponse.ok) {
        throw new Error("Registration failed");
      }

      const loginResponse = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Login failed");
      }

      setCurrentUser(true);
      setRerenderNavigation((prev) => !prev);
      handleRedirect();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function submitLogin(e) {
    e.preventDefault();

    try {
      const loginResponse = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Login failed");
      }

      console.log(loginResponse);
      const csrfToken = loginResponse.headers.get("X-CSRFToken");
      localStorage.setItem("csrfToken", csrfToken);

      setCurrentUser(true);
      setRerenderNavigation((prev) => !prev);
      handleRedirect();
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  // async function submitLogout(e) {
  //   e.preventDefault();

  //   try {
  //     const logoutResponse = await fetch("http://127.0.0.1:8000/logout/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });

  //     if (!logoutResponse.ok) {
  //       throw new Error("Logout failed");
  //     }

  //     setCurrentUser(false);
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // }

  return (
    <div className={`${styles["default-page"]}`}>
      {registrationToggle ? (
        <div class="flex flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" onSubmit={(e) => submitRegistration(e)}>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div class="mt-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    autocomplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
              Already a member?&nbsp;
              <button
                id="form_btn"
                onClick={update_form_btn}
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div class="flex flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign into your account
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" onSubmit={(e) => submitLogin(e)}>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div class="text-sm">
                    <a
                      href="#"
                      class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    autocomplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
              Not a member?&nbsp;
              <button
                id="form_btn"
                onClick={update_form_btn}
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
