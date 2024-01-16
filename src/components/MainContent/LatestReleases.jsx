import React, { useState, useContext, useEffect } from "react";
import { QueryContext } from "../../../context/QueryContext";
import { nanoid } from "nanoid";

//!IMPORT FROM BOOTSTRAP
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert } from "react-bootstrap";

//!INTERNAL IMPORTS
import SingleCard from "./SingleCard";
import books from "./data/fantasy.json";
//!------------------------------------------------------

function LatestReleases() {
  const { query, setQuery, filteredBooks, setFilteredBooks } =
    useContext(QueryContext);

  // const [error, setError] = useState(false);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  const renderBooks = filteredBooks.slice(0, 50).map((book) => (
    <Col
      xs
      sm={6}
      md={4}
      lg={3}
      className="d-flex justify-content-center align-items-center"
      key={nanoid()}
    >
      <SingleCard
        key={book.asin}
        img={book.img}
        title={book.title}
        price={book.price.toFixed(2)}
        btnSeeMore={<i className="bi bi-eye"></i>}
        category={book.category}
        asin={book.asin}
      />
    </Col>
  ));

  const renderErrorMsg = () => {
    if (filteredBooks.length === 0 && query !== "") {
      return (
        <Alert variant="danger" className="mt-3 mx-5">
          Ooops, seems like I couldn't find anything from your query, please try
          again!
        </Alert>
      );
    }
    return null;
  };

  return (
    <>
      <Container>
        <Row className="g-4">{renderBooks}</Row>
      </Container>

      {renderErrorMsg()}
    </>
  );
}

export default LatestReleases;