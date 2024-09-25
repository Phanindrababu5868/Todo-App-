import React from "react";

const Headers = () => {
  let authToken = localStorage.getItem("authToken");
  console.log(!authToken);
  return (
    <nav>
      <span className="app-title">MyTasks</span>
      {authToken !== null && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span>{localStorage.getItem("username")}</span>
          <button
            id="logout-btn"
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Headers;
