"use client";
import "./login.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";

function page() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const setValue = (e: any) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);

      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let button: any = document.getElementById("login-btn");
    if (user.email.length > 0 && user.password.length > 0) {
      button?.classList.remove("disabled");
      button.disabled = false;
    } else {
      button?.classList.add("disabled");
      button.disabled = true;
    }
  }, [user]);

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <h1>Login</h1>
          <br />
          <div className="field-container">
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
            <div className="forgot-pass">
              <i className="rem-me-container">
                {" "}
                <input type="checkbox" id="remember-me" /> Rember me
              </i>
              <Link href="/sendforgotpasswordemail">
                {" "}
                <i>forgot password?</i>{" "}
              </Link>
            </div>
          </div>
          <button
            className="login-btn disabled"
            id="login-btn"
            onClick={onLogin}
          >
            login
          </button>
          <div className="line">
            <div></div>
            <p>OR</p>
            <div></div>
          </div>
          <div className="alt-options">
            <p>Don't have an account?</p>
            <Link href="/signup">
              <p>SignUp</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
