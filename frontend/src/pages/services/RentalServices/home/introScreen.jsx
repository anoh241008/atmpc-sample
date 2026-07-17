import { useEffect, useState } from "react";
import PixelHouse from "./pixelHouse";
import "animate.css";

const IntroScreen = ({ onFinish }) => {
  const [showHouse, setShowHouse] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show house AFTER ANNIEX animation
    const houseTimer = setTimeout(() => {
      setShowHouse(true);
    }, 2000);

    // Fade out everything
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    // Remove intro
    const endTimer = setTimeout(() => {
      onFinish();
    }, 4200);

    return () => {
      clearTimeout(houseTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#ffffff",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.7s ease",
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {/* CENTER GROUP */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* ANNIEX TEXT */}
        <h1 className="netflix-text">ANNIEX</h1>

        {/* RESERVED SPACE FOR HOUSE */}
        <div
          style={{
            width: "60px",
            height: "64px",
            marginLeft: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {showHouse && (
            <div className="animate__animated animate__bounceInDown">
              <PixelHouse />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
