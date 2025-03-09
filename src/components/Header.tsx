import { LuCircleUserRound } from "react-icons/lu";
import { MdOutlineArrowDropDown } from "react-icons/md";
const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          width: "33.33333%",
          margin: "auto",
        }}
      >
        <a href="/" className="">
          <img
            className="item-image"
            src="images/Gsynergy Logo V2 Long Description.svg"
            alt="Gsynergy Logo"
            style={{ width: "30%", height: "auto", marginLeft: "5%" }}
          />
        </a>
      </div>
      <div
        style={{
          width: "33.33333%",
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "500",
          color: "  #595959",
        }}
      >
        Data Viewer App
      </div>
      <div
        style={{
          //   backgroundColor: "lightgreen",
          // flex: "1",
          width: "33.33333%",
          textAlign: "right",
          margin: "auto",
          marginRight: "1%",
        }}
      >
        <LuCircleUserRound style={{ fontSize: "30px" }} />
        <MdOutlineArrowDropDown style={{ fontSize: "30px" }} />
      </div>
    </header>
  );
};

export default Header;
