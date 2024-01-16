import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { FormControl, FormLabel, ModalTitle } from "react-bootstrap";

import { nanoid } from "nanoid";

const AddComment = ({ title, asin, handleAddNewComment }) => {
  const [openNewCommentModal, setOpenNewCommentModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleAddCommentShow = () =>
    setOpenNewCommentModal(!openNewCommentModal);

  const handleRatingChange = (eventKey) => setSelectedRating(eventKey);

  const handleCommentChange = (event) => setComment(event.target.value);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starClassName =
        i < selectedRating ? "bi bi-star-fill" : "bi bi-star";
      stars.push(<i className={starClassName} key={nanoid()}></i>);
    }
    return (
      <div className="mb-5">
        {stars}
        <span>
          <span className="fs-5 ms-2">{selectedRating}</span>/5
        </span>
      </div>
    );
  };

  const addNewCommentFunc = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          method: "POST",
          body: JSON.stringify({
            comment: comment,
            rate: selectedRating,
            elementId: asin,
          }),
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkxZjA2YzUwYTMzNjAwMTQ5NWJlY2YiLCJpYXQiOjE2ODcyODU4NjksImV4cCI6MTY4ODQ5NTQ2OX0.tQxXmhliai0kCiHPaCNudJi0oOEF-fL-TGw2xoU6nu0",

            "Content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("comment submitted successfully");
        setTimeout(() => {
          handleAddNewComment();
        }, 1000);
        setOpenNewCommentModal(false);
      } else {
        console.log("error submitting comment");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-primary mt-5 align-self-center"
        style={{ width: "300px" }}
        onClick={handleAddCommentShow}
      >
        Add Your Review
      </button>

      {openNewCommentModal && (
        <Modal
          centered
          fade="true"
          show
          size="xl"
          onHide={handleAddCommentShow}
        >
          <Modal.Header closeButton onClick={handleAddCommentShow}>
            <Container>
              <Row>
                <Col xs={12}>
                  <Modal.Title className="mb-3">
                    Add your Review for:
                  </Modal.Title>
                </Col>
                <Col xs={12}>
                  <Modal.Title>{title}</Modal.Title>
                </Col>
              </Row>
            </Container>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-start justify-content-center">
            <Form onSubmit={addNewCommentFunc}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>What do you think about this book?</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  cols="200"
                  rows="10"
                  type="text"
                  placeholder="Your Comment..."
                  value={comment}
                  onChange={handleCommentChange}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group
                required
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Dropdown required onSelect={handleRatingChange}>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                  >
                    How would you rate this book?
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">1</Dropdown.Item>
                    <Dropdown.Item eventKey="2">2</Dropdown.Item>
                    <Dropdown.Item eventKey="3">3</Dropdown.Item>
                    <Dropdown.Item eventKey="4">4</Dropdown.Item>
                    <Dropdown.Item eventKey="5">5</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              {renderStars()}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default AddComment;