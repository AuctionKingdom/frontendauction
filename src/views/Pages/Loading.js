import React from "react";
import loadingimg from "./static/Loading.gif";

function Loading() {
  return (
    <div style={{ height: 1000, width: "auto", backgroundColor: "#515781" }}>
      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img src={loadingimg} alt="gif" />
      </div>
    </div>
  );
}

export default Loading;
