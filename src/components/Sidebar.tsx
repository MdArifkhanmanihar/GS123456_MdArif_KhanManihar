import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { MdOutlineStore, MdOutlineInsertChart } from "react-icons/md";
import { TbBrandUnity } from "react-icons/tb";
import { FaChartBar } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation(); // Get current route
  return (
    <div
      className="d-flex flex-column flex-shrink-0 sidebar"
      style={{ width: "10%", backgroundColor: "white" }}
    >
      <ul
        className="nav nav-pills flex-column mb-auto ul"
        style={{ marginTop: "20px" }}
      >
        <li
          className={`nav-item ${
            location.pathname === "/" ? "active-link" : ""
          }`}
        >
          <Link to="/" className="nav-link text-black" aria-current="page">
            <MdOutlineStore />
            Store
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/sku" ? "active-link" : ""
          }`}
        >
          <Link to="/sku" className="nav-link text-black">
            <TbBrandUnity />
            SKU
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/planning" ? "active-link" : ""
          }`}
        >
          <Link to="/planning" className="nav-link text-black">
            <FaChartBar />
            Planning
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/chart" ? "active-link" : ""
          }`}
        >
          <Link to="/chart" className="nav-link text-black">
            <MdOutlineInsertChart />
            Charts
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
