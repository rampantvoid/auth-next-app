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
    email: "",
  });

  const [loading, setLoading] = React.useState(false);

  const setValue = (e: any) => {
    setCreds({
      ...creds,
      [e.target.id]: e.target.value,
    });
  };

  const onSend = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/users/changepasswordemail", creds);

      console.log(res);

      toast.success("Email Sent!");
    } catch (error: any) {
      console.log({ error_message: error.message });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let button: any = document.getElementById("send-btn");
    if (creds.email.length > 0) {
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
          <h1>Send Verication</h1>
          <br />

          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            onChange={setValue}
            value={creds.email}
            autoComplete="off"
          />
          <button className="disabled" id="send-btn" onClick={onSend}>
            Send
          </button>
          <div>
            <Link href="/login">
              <p>Go Back</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
