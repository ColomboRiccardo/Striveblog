import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router";

const AuthorCard = ({
  _id,
  nome,
  cognome,
  data_di_nascita,
  email,
  avatar,
  isLarge = false,
}) => {
  return (
    <Col xs={isLarge ? 6 : 3}>
      <Link
        to={`/authors/${_id}`}
        className="text-decoration-none"
      >
        <Card>
          <Card.Body>
            <Card.Title>
              {nome} {cognome}
            </Card.Title>
            <Card.Img src={avatar}></Card.Img>
            <Card.Text className="fw-bold">
              {email}
            </Card.Text>
            <Card.Text>
              Some quick example text to build on the card
              title.
            </Card.Text>
            <Card.Text>
              Nato il
              {" " +
                new Date(
                  data_di_nascita
                ).toLocaleDateString()}
            </Card.Text>
            <Card.Text className="fw-light">
              {_id}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default AuthorCard;
