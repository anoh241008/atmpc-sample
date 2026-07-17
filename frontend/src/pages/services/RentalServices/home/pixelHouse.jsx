const PixelHouse = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "35px",
        height: "35px",
      }}
    >
      {/* Roof */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "8px",
          width: "32px",
          height: "16px",
          background: "#000",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Body */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "8px",
          width: "32px",
          height: "24px",
          background: "#000",
        }}
      />

      {/* Door */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "20px",
          width: "8px",
          height: "14px",
          background: "#fff",
        }}
      />
    </div>
  );
};

export default PixelHouse;
