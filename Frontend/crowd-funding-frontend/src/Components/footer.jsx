import React from "react";
import { Link } from "react-router-dom"; // Import Link
import logo from "./assets/RotaractIcon.png";
import styles from "./styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={`mb-0 p-4 ${styles.footer}`}>
      <div className="row">
        <div className={`col-12 col-sm-6 col-md-4 ${styles.left}`}>
          <a href="/">
            <img className={`${styles.logo}`} src={logo} alt="Hrishi Raj" />
          </a>
          <br />
          <p className={`${styles.caption}`}>
            Charity Website <br /> Hrishi&Achintya
          </p>
        </div>
        <div className={`col-12 col-sm-6 col-md-4 ${styles.middle}`}>
          <p>
            <b>Follow us on</b>
          </p>
          <a
            className={`${styles.facebook}`}
            href="https://www.linkedin.com/in/hrishi-raj-saxena-667094206/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a
            className={`${styles.linkedin}`}
            href="https://www.linkedin.com/in/hrishi-raj-saxena-667094206/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-linkedin"></i>
          </a>
          <br />
          <div className={`${styles.links}`}>
            {/* Use Link for internal navigation */}
            <Link className={`${styles.link}`} to="/about-us">
              About
            </Link>
            <Link className={`${styles.link}`} to="/contact-us">
              Contact Us
            </Link>
            <a
              className={`${styles.link}`}
              href="https://www.linkedin.com/in/hrishi-raj-saxena-667094206/"
              target="_blank"
              rel="noreferrer"
            >
              Hrishi&Achintya
            </a>
          </div>
        </div>
        <div className={`col-12 col-sm-12 col-md-4 ${styles.right}`}>
          <p className={`${styles.names}`}>
            <span style={{ fontWeight: "bolder" }}>Developed By </span>
            <br />
            <a
              className={`${styles.name}`}
              href="https://www.linkedin.com/in/hrishi-raj-saxena-667094206/"
              target="_blank"
              rel="noreferrer"
            >
              Hrishi Raj Saxena
            </a>
            <br />
            <a
              className={`${styles.name}`}
              href="https://www.linkedin.com/in/hrishi-raj-saxena-667094206/"
              target="_blank"
              rel="noreferrer"
            >
              Achintya Singh
            </a>
            <br />
            <br />
            <span style={{ fontWeight: "bolder" }}>Designed By </span>
            <br />
            <span>Hrishi and Achintya</span>
          </p>
          <p>
            For any queries, reach out to me at email
            <br />
            <b>hrishirajs26@gmail.com</b>
          </p>
        </div>
      </div>

      <div className={`${styles.footerBottom}`}>
        <hr className={`${styles.line}`} />
        <p style={{ textAlign: "center" }}>
          Copyright &copy; 2024 Hrishi Raj Saxena. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
