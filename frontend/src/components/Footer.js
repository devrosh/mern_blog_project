import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer_container">
      <div className="left_links">
        <h3 className="font-roboto font-light text-sm">Contact</h3>
        <p>Rastr Technologies</p>
        <p>SantaFe, California,Usa</p>
        <p>info@rastr.com</p>
        <p>Tel No: 01-123578945</p>
      </div>
      <div className="mid_links">
        <h3 className="font-roboto font-light">Useful Links</h3>
        <p>Copyright Policy</p>
        <p>Community guidelines</p>
        <p>Privacy Policy</p>
        <p>Terms and Conditions</p>
      </div>
      <div className="right_links">
        <h3 className="font-roboto font-light">Quick Links</h3>
        <p>Home</p>
        <p>Blog</p>
        <p>Register</p>
        <p>Login</p>
      </div>
    </div>
  );
}

export default Footer;
