import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitlogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className={`app-header ${isSidebarOpen ? "" : "sidebar-closed"}`}>
      <button
        className="btn-toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Fermer la sidebar" : "Ouvrir la sidebar"}
      >
        ☰
      </button>

      <div style={{ marginLeft: 12 }}>
        <strong></strong>
      </div>

      <div className="header-right">
        <button className="btn-profile" onClick={submitlogout}>Déconnecter</button>
      </div>
    </header>
  );
};

export default Header;
