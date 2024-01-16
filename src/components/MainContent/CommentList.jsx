import React from "react";

import { nanoid } from "nanoid";

import { ListGroup } from "react-bootstrap";

import SingleComment from "./SingleComment";

const CommentList = ({
  comment,
  handleDeleteComment,
  title,
  getCommentsFromApi,
}) => {
  return (
    <>
      <ListGroup
        className="d-flex justify-content-between align-items-start"
        as="ol"
        numbered
        key={nanoid()}
      >
        <SingleComment
          comment={comment}
          title={title}
          handleDeleteComment={handleDeleteComment}
          getCommentsFromApi={getCommentsFromApi}
        />
      </ListGroup>
    </>
  );
};

export default CommentList;