import React from "react";
import "./AppDownload.css";

const AppDownload = () => {
  return (
    <div className="mx-auto bg-red-400 text-center mt-25" id="app-download">
      <p>
        For Better Experience Download <br />
        App
      </p>
      {/* app download platforms */}
      <div className="flex justify-center gap-3 mt-10">
        <p>play store</p>
        <p>app store</p>
      </div>
    </div>
  );
};

export default AppDownload;
