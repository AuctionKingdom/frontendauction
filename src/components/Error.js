import React from "react";
import "./css/error.css";

function Error() {
  return (
    <React.Fragment>
      <div class="error">404</div>
      <br />
      <br />
      <span className="info"> File not found </span>
      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        alt="404"
        class="static"
      />
    </React.Fragment>
  );
}

export default Error;
