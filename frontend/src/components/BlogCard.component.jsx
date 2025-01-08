import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router";

const BlogCard = ({
  _id,
  titolo,
  cover,
  readTime,
  author,
  content,
  categoria,
}) => {
  const truncateContent = (content) => {
    if (content.length > 200) {
      return content.substring(0, 200) + " ...";
    }
    return content;
  };

  return (
    <Col xs={4}>
      <Card style={{ height: "550px" }}>
        <Card.Body>
          <Card.Title style={{ height: "50px" }}>
            {titolo}
          </Card.Title>
          <Card.Img
            variant="top"
            src={cover}
            style={{
              height: "240px",
              objectFit: "contain",
            }}
          />
          <Card.Text>{truncateContent(content)}</Card.Text>
          <Link to={`/blog/${_id}`}>Read more</Link>
          <Card.Text>{author}</Card.Text>
          <Card.Text>{categoria}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BlogCard;
