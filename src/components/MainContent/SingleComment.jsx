import React, { useState } from "react";

import { nanoid } from "nanoid";

import DeleteComment from "./DeleteComment";

import "./style/singleComment.css";
import EditComment from "./EditComment";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

const SingleComment = ({
  comment,
  handleDeleteComment,
  title,
  getCommentsFromApi,
}) => {
  const commentTimeStamp = new Date(comment.createdAt);
  const day = commentTimeStamp.getDate().toString().padStart(2, "0");
  const month = (commentTimeStamp.getMonth() + 1).toString().padStart(2, "0");
  const year = commentTimeStamp.getFullYear().toString();
  const formattedDate = `${day}-${month}-${year}`;

  const getStarClassName = (index) => {
    if (index < comment.rate) {
      return "bi bi-star-fill";
    }
    return "bi bi-star";
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starClassName = getStarClassName(i);
      stars.push(<i className={starClassName} key={nanoid()} />);
    }
    return stars;
  };

  return (
    <>
      <div
        className="me-auto mb-3 bg-secondary bg-opacity-10 p-2 rounded shadow"
        style={{ minWidth: "300px" }}
        key={nanoid()}
      >
        <div className="d-flex justify-content-between align-items-start gap-4">
          <div style={{ maxWidth: "70%" }}>"{comment.comment}"</div>
          <div style={{ fontSize: ".7rem" }}>{formattedDate}</div>
        </div>

        <div className="mt-4 mb-2">
          <span className="me-2">Rating:</span>
          {renderStars()}
          <span className="fs-5 ms-2">{comment.rate}</span>/5
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <i className="bi bi-patch-check-fill">&nbsp;Verified User</i>
            <em className="ms-3" style={{ fontSize: ".7rem" }}>
              ({comment.author})
            </em>
          </div>
          <div className="d-flex justify-content-between align-items-center gap-3">
            <DeleteComment
              bookId={comment._id}
              handleDeleteComment={handleDeleteComment}
            />
            <EditComment
              comment={comment}
              title={title}
              renderedStars={renderStars}
              bookId={comment._id}
              getCommentsFromApi={getCommentsFromApi}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleComment;