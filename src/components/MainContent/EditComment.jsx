import React, { useState } from "react";

// import { nanoid } from "nanoid";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditComment = ({ comment, title, getCommentsFromApi }) => {
  const [openEditCommentModal, setOpenEditCommentModal] = useState(false);

  const [editedComment, setEditedComment] = useState("");

  const handleCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleEditComment = () => {
    setOpenEditCommentModal(!openEditCommentModal);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedComment = {
      comment: editedComment,
    };
    try {
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
        {
          method: "PUT",
          headers: {
            Authorisation:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE1MzQyNjQ1MzM1YTAwMTgyNDZkN2UiLCJpYXQiOjE3MDU0MjY5NzMsImV4cCI6MTcwNjYzNjU3M30.X8dSEKLSKjfaulayUkMD0xtPlrlJnQDhrop5LYWBaTQ"
        }
        })
        
        
      if (res.ok) {
        setTimeout(() => {
          getCommentsFromApi();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <i className="bi bi-pencil" role="button" onClick={handleEditComment}></i>

      {openEditCommentModal && (
        <Modal centered fade="true" show size="xl" onHide={handleEditComment}>
          <Modal.Header closeButton onClick={handleEditComment}>
            <Container>
              <Row>
                <Col xs={12}>
                  <Modal.Title className="mb-3">
                    Edit your Review for:
                  </Modal.Title>
                </Col>
                <Col xs={12}>
                  <Modal.Title>{title}</Modal.Title>
                </Col>
              </Row>
            </Container>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-start justify-content-center">
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>What do you think about this book?</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  cols="200"
                  rows="20"
                  type="text"
                  placeholder="Your Comment..."
                  value={editedComment}
                  onChange={handleCommentChange}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Button variant="outline-success" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default EditComment;