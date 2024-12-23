import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NewAuthor = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newAuthor = {
        nome: event.target.formNome.value,
        cognome: event.target.formCognome.value,
        email: event.target.formEmail.value,
        data_di_nascita: new Date("05/05/2005"),
        avatar:
          "https://randomuser.me/api/portraits/med/men/1.jpg",
      };

      const response = await fetch(
        "http://localhost:3001/api/authors/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAuthor),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <h2>Aggiungi un nuovo autore</h2>
      </Row>
      <Row className="mt-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Scrivi un nome"
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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formData">
            <Form.Label>Data di nascita</Form.Label>
            <Form.Control
              type="text"
              placeholder="Scrivi una data di nascita"
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
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default NewAuthor;
