"use client";
import "./signup.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPass: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const setValue = (e: any) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      console.log("Signup Success", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let button: any = document.getElementById("signup-btn");
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.confirmPass.length > 0
    ) {
      button?.classList.remove("disabled");
      button.disabled = false;
    } else {
      button?.classList.add("disabled");
      button.disabled = true;
    }
  }, [user]);

  return (
    <>
      <div className="signup-container">
        <div className="signup-form-container">
          <h1>Sign Up</h1>
          <br />
          <div className="field-container">
            <div>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={user.username}
                onChange={setValue}
                autoComplete="off"
              />
            </div>

            <div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={user.email}
                onChange={setValue}
                autoComplete="off"
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={user.password}
                onChange={setValue}
                autoComplete="off"
              />
            </div>
            <div>
              <input
                type="password"
                id="confirmPass"
                placeholder="Confirm Password"
                value={user.confirmPass}
                onChange={setValue}
                autoComplete="off"
              />
            </div>
          </div>
          <button
            className="signup-btn disabled"
            id="signup-btn"
            onClick={onSignup}
          >
            SignUp
          </button>
          <div className="line">
            <div></div>
            <p>OR</p>
            <div></div>
          </div>
          <div className="alt-options">
            <p>Already have an account?</p>
            <Link href="/login">
              <p>Login</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
