import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
function App() {
  return (
    <div className="app-container">
      <div className="content">
        <Header></Header>
        <div className="inner-content">
          <Sidebar></Sidebar>
          <div className="outlet-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
