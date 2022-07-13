import "./header.css";
import logo from "../assets/logo.png";
const Header = () => {
  return (
    <div className="headerbg">
      <a href="http://localhost:3000/">
        <img className="logo" src={logo} alt={"logo"} />
      </a>
      <div className="greeting">
        <h1>Welcome *insert User* </h1>
      </div>
    </div>
  );
};

export default Header;
