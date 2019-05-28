import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return(
    <footer>
      <div className="container">
        <Row>
          <Col xs={12} md={6}>
            <p>This is a full stack JavaScript web application (challenge from <a href="https://freecodecamp.org" target="_blank" rel="noopener noreferrer">Free Code Camp</a>) I built on top of REST APIs using HTML5, CSS3, Bootstrap 4, React, Redux, Express.js and Mongoose. I use font icons from <a href="https://fontawesome.com/v4.7.0/icons/" target="_blank" rel="noopener noreferrer">Font Awesome</a> and the stock data I used for the chart is from <a href="https://www.quandl.com/" target="_blank" rel="noopener noreferrer">Quandl API</a>. And the interactive chart itself is from <a href="https://www.highcharts.com/" target="_blank" rel="noopener noreferrer">Highcharts</a>.</p>
          </Col>
          <Col xs={12} md={6}>
            <p>Do you want a Front End Engineer who will help you build your website to build your business' online presence? Or do you want to build a web application for your business idea? Or do you want a programmer who will join your team and be part of front end projects?</p>
            <p>Send me a message on my email, eiringonzales@gmail.com</p>
          </Col>
        </Row>
        <p className="text-center py-4"><a href="https://eiringonzales.com/" target="_blank" rel="noopener noreferrer">Eirin Gonzales</a></p>
      </div>
    </footer>
  );
}

export default Footer;