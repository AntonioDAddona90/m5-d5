import React, { useState } from "react";
import CommentModal from "./CommentModal";

import "./style/singleCard.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function SingleCard({ img, title, category, price, btnSeeMore, asin }) {
  const [selected, setSelected] = useState(false);

  const [openCommentModal, setOpenCommentModal] = useState(false);

  const toggleSelected = () => setSelected(!selected);

  const handleShow = () => setOpenCommentModal(!openCommentModal);

  // console.log(openCommentModal);
  return (
    <>
      <Card
        className={`singleCard ${
          selected ? "border border-danger shadow" : null
        }`}
        onClick={toggleSelected}
        key={asin}
      >
        <div className="imgContainer">
          <Card.Img variant="top" src={img} />
        </div>
        <Card.Body>
          <Card.Title className="cardTitle fs-6">{title}</Card.Title>
          <Card.Text>
            in <em>{category}</em>
          </Card.Text>
          <Card.Text>€ {price}</Card.Text>
          <Button variant="outline-success" onClick={handleShow}>
            {btnSeeMore}
          </Button>
        </Card.Body>
      </Card>

      {openCommentModal && (
        <CommentModal asin={asin} handleShow={handleShow} title={title} />
      )}
    </>
  );
}

export default SingleCard;