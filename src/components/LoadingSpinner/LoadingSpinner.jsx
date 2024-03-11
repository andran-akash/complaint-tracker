import React from "react";
import "./loadingspinner.css";

function LoadingSpinner() {
  return (
    <div className="loading-spinner-main">
      <div className="loading-spinner-overlay">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
