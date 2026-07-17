// src/components/main/RouteLoader.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./loader";

const RouteLoader = ({ children }) => {

  const location = useLocation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // adjust duration as you like

    return () => clearTimeout(timer);

  }, [location.pathname]);

  return (
    <>
      {loading && <Loader fullScreen label="Loading..." />}
      {children}
    </>
  );
};

export default RouteLoader;