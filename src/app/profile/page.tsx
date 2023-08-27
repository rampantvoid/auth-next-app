"use client";
import "./profile.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

function page() {
  const router = useRouter();

  const [user, setUser] = useState("nothing");

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful!");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Failed", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");

      const user = response.data;
      console.log(user.data);

      setUser(user.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <p>profile page </p>
      <h1>
        User Id:{" "}
        {user === "nothing" ? (
          ""
        ) : (
          <Link href={`/profile/${user}`}>{user}</Link>
        )}
      </h1>
      <button onClick={getUserDetails}>Get User</button>
      <button className="logout" onClick={onLogout}>
        LOGOUT
      </button>
    </div>
  );
}

export default page;
