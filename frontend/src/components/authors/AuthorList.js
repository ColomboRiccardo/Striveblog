import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import "./AuthorList.css";
import { Button } from "react-bootstrap";

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/authors"
      );
      const authors = await response.json();
      console.log("authors", authors);
      setAuthors(authors);
    } catch (error) {
      console.log(error);
    }
  };

  const postAuthor = async (event) => {
    const newAuthor = {
      nome: event.target[0].value,
      cognome: event.target[1].value,
      email: event.target[2].value,
      data_di_nascita: new Date(
        randomIntFromInterval(1950, 2000),
        10,
        1
      ),
      avatar: `https://randomuser.me/api/portraits/med/men/${randomIntFromInterval(
        1,
        99
      )}.jpg`,
    };
    try {
      const response = await fetch(
        "http://localhost:3001/api/authors/newAuthor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAuthor),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);

    await postAuthor(event);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <Container className="author-list">
      <Row>
        <h1>Authors</h1>
      </Row>
      <Row className="mb-2">
        <h2>Crea un nuovo autore</h2>

        <Col xs={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="formAuthorName"
            >
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Aggiungi un nome"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formAuthorSurname"
            >
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Aggiungi un cognome"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formAuthorEmail"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Aggiungi un email"
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        {authors.map((author) => (
          <Col key={Math.random()}>
            <Link to={`/authors/${author._id}`}>
              <Card.Img src={author.avatar}></Card.Img>
              <Card key={author._id}>
                <Card.Title>
                  {author.nome} {author.cognome}
                </Card.Title>
                <Card.Body>{author.email}</Card.Body>
                <Card.Body>
                  {new Date(
                    author.data_di_nascita
                  ).toLocaleDateString()}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AuthorList;
