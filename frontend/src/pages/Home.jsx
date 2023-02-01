// import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="home__page">
      <Navbar />
      <div className="home__content">Home content</div>
    </div>
  );
}
