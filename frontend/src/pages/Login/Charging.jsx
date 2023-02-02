import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Charging() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 5500);
  }, []);
  return (
    <div className="login__page">
      Success! Almost there...
      <div className="login__charging" />
    </div>
  );
}
