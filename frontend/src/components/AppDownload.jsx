import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div
      className="app-download m-auto mt-10 font-medium text-center font-outfit lg:scroll-mt-[100px] md:scroll-mt-20"
      style={{ fontSize: "max(3vw, 20px)" }}
      id="app-download"
    >
      <p>
        For Better Experience Download <br /> Tomato App
      </p>
      <div
        className="app-download-platforms flex justify-center mt-10"
        style={{ gap: "max(2vw, 10px)" }}
      >
        <img
          src={assets.play_store}
          alt=""
          className="max-w-[180px] cursor-pointer transition duration-500 transform hover:scale-105"
          style={{ width: "max(20vw, 120px)" }}
        />
        <img
          src={assets.app_store}
          alt=""
          className="max-w-[180px] cursor-pointer transition duration-500 transform hover:scale-105"
          style={{ width: "max(20vw, 120px)" }}
        />
      </div>
    </div>
  );
};

export default AppDownload;
