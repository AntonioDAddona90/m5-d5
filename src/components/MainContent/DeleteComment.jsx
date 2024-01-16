import React from "react";

import "./style/deleteComment.css";

const DeleteComment = ({ bookId, handleDeleteComment }) => {
  const deleteCommentFunc = async () => {
    try {
      await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkxZjA2YzUwYTMzNjAwMTQ5NWJlY2YiLCJpYXQiOjE2ODcyODU4NjksImV4cCI6MTY4ODQ5NTQ2OX0.tQxXmhliai0kCiHPaCNudJi0oOEF-fL-TGw2xoU6nu0",
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        handleDeleteComment();
      }, 1000);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <i
      className="bi bi-trash ms-5"
      role="button"
      onClick={deleteCommentFunc}
    ></i>
  );
};

export default DeleteComment;