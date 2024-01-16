import React, { Component } from "react";
import { nanoid } from "nanoid";

import Carousel from "react-bootstrap/Carousel";

import { welcome } from "./data/welcome";
import "./style/welcome.css";

import logo from "../../../assets/logo.png";

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div
          key={nanoid()}
          className="container d-flex flex-column align-items-center justify-content-center jumbotron overflow-hidden"
        >
          <h1 key={nanoid()} className="jumbotron_title">
            EpiBooks
            <img src={logo} alt="EpiBooks_logo" />
          </h1>
          <article key={nanoid()} className="jumbotron_subtitle">
            Where Every Request Finds its Perfect Solution!
          </article>

          <Carousel fade key={nanoid()}>
            {welcome.map((item) => {
              return (
                <Carousel.Item key={nanoid()} className={item.className}>
                  {
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="carouselImg"
                    />
                  }
                  <Carousel.Caption key={nanoid()}>
                    <h2>{item.captionTitle}</h2>
                    <p>{item.captionDesc}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </>
    );
  }
}

export default Welcome;