import { useEffect, useState } from "react";

import { nanoid } from "nanoid";

import CommentList from "./CommentList";
import AddComment from "./AddComment";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

function CommentModal({ title, asin, handleShow }) {
  const [bookComments, setBookComments] = useState(null);
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  const getCommentsFromApi = async () => {
    try {
      const data = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkxZjA2YzUwYTMzNjAwMTQ5NWJlY2YiLCJpYXQiOjE2ODcyODU4NjksImV4cCI6MTY4ODQ5NTQ2OX0.tQxXmhliai0kCiHPaCNudJi0oOEF-fL-TGw2xoU6nu0",
          },
        }
      );
      const response = await data.json();
      setBookComments(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCommentsFromApi();
  }, [asin]);

  const handleDeleteComment = () => {
    getCommentsFromApi();
  };

  const handleAddNewComment = () => {
    getCommentsFromApi();
  };

  return (
    <>
      <Modal fade="true" centered show size="lg" onHide={handleShow}>
        <Modal.Header closeButton onClick={handleShow}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Reviews</h4>
        </Modal.Body>
        <Modal.Body className="d-flex flex-column align-items-start justify-content-center">
          {bookComments &&
            bookComments.map((comment) => {
              return (
                <CommentList
                  comment={comment}
                  title={title}
                  key={nanoid()}
                  handleDeleteComment={handleDeleteComment}
                  getCommentsFromApi={getCommentsFromApi}
                />
              );
            })}
          <AddComment
            title={title}
            asin={asin}
            handleAddNewComment={handleAddNewComment}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentModal;