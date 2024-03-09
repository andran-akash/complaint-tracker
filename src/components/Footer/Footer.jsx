import React from "react";
import * as Icons from "react-icons/fa";
import { Stack } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <BrowserRouter>
      <Stack>
        <div className="footer">
          <div className="footer-container">
            <div className="row">
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">Our services</a>
                  </li>
                  <li>
                    <a href="#">Privacy policy</a>
                  </li>
                  <li>
                    <a href="#">Affilate Problem</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Get Help</h4>
                <ul>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Contact us</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Follow us</h4>
                <div className="social-links">
                  <a href="#">
                    <div className="icons">
                      <Icons.FaInstagram />
                    </div>
                  </a>
                  <a href="#">
                    <div className="icons">
                      <Icons.FaFacebook />
                    </div>
                  </a>
                  <a href="#">
                    <div className="icons">
                      <Icons.FaLinkedin />
                    </div>
                  </a>
                  <a href="#">
                    <div className="icons">
                      <Icons.FaTwitter />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </BrowserRouter>
  );
}

export default Footer;
