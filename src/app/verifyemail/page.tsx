"use client";
import { NextResponse, NextRequest } from "next/server";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function page() {
  const [token, setToken] = React.useState("");

  const [verified, setVerified] = React.useState(false);

  const [error, setError] = React.useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  React.useEffect(() => {
    const url_token = window.location.search.split("=")[1];
    setToken(url_token || "");
  }, []);

  React.useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);
  return (
    <div>
      <div>
        {verified && (
          <div>
            Email Verified
            <Link href="/login">Proceed to login</Link>
          </div>
        )}
        {error && <div>error</div>}
      </div>
    </div>
  );
}

export default page;
