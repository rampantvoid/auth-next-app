"use client";
import "./pagecss.css";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { setSourceMapRange } from "typescript";
import { toast } from "react-hot-toast";

function page() {
  const [creds, setCreds] = React.useState({
    password: "",
    repassword: "",
  });

  const [token, setToken] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const setValue = (e: any) => {
    setCreds({
      ...creds,
      [e.target.id]: e.target.value,
    });
  };

  const onSend = async () => {
    try {
      console.log(token);
      setLoading(true);

      const res = await axios.post("/api/users/forgotpassword", {
        newPass: creds.password,
        token,
      });

      console.log(res);

      toast.success("Password Changed Successfully!");
    } catch (error: any) {
      console.log({ error_message: error.message });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const url_token = window.location.search.split("=")[1];
    setToken(url_token || "");
  }, []);

  React.useEffect(() => {
    let button: any = document.getElementById("send-btn");
    if (creds.password.length > 0 && creds.repassword.length > 0) {
      button?.classList.remove("disabled");
      button.disabled = false;
    } else {
      button?.classList.add("disabled");
      button.disabled = true;
    }
  }, [creds]);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <div className="wrapper">
          <h1>Set new password</h1>
          <br />

          <input
            type="password"
            placeholder="New Password"
            id="password"
            onChange={setValue}
            value={creds.password}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            id="repassword"
            onChange={setValue}
            value={creds.repassword}
            autoComplete="off"
          />
          <button className="disabled" id="send-btn" onClick={onSend}>
            Submit
          </button>
          <div>
            {/* <Link href="/login">
              <p>Go Back</p>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
