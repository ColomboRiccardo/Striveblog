import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

import AuthorCard from "../components/AuthorCard.component";

const AuthorDetails = () => {
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [avatar, setAvatar] = useState("");

  const author = {
    _id: id,
    nome,
    cognome,
    email,
    data_di_nascita: data,
    avatar,
  };

  const redirect = useNavigate();
  const fetchAuthor = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/authors/${id}`
      );
      const author = await response.json();
      if (!response.ok) {
        redirect("/404");
        throw new Error("Something went wrong");
      }
      setNome(author.nome);
      setCognome(author.cognome);
      setEmail(author.email);
      setData(author.data_di_nascita);
      setAvatar(author.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const putAuthor = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/authors/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(author),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAuthor = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/authors/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>AuthorDetails</h1>
          </Col>
        </Row>

        <Row>
          <AuthorCard {...author} isLarge={true} />
          <Col>
            <h3>Modifica author</h3>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formNome"
              >
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Scrivi un nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formCognome"
              >
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Scrivi un cognome"
                  value={cognome}
                  onChange={(e) =>
                    setCognome(e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formEmail"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Scrivi una email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formData"
              >
                <Form.Label>Data di nascita</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Scrivi una data di nascita"
                  value={new Date(
                    data
                  ).toLocaleDateString()}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formAvatar"
              >
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci un avatar"
                  value={avatar}
                  onChange={(e) =>
                    setAvatar(e.target.value)
                  }
                />
              </Form.Group>

              <Button variant="primary" onClick={putAuthor}>
                Submit
              </Button>
            </Form>
            <Button
              variant="danger"
              className="mt-2"
              onClick={deleteAuthor}
            >
              Cancella author dal database
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthorDetails;
