import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router";

const BlogDetail = () => {
  const [blogPost, setBlogPost] = useState({});

  const _id = useParams().id;

  const {
    titolo,
    cover,
    readTime,
    author,
    content,
    categoria,
  } = blogPost;

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/blogposts/post/${_id}`
      );
      const data = await response.json();
      setBlogPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Card.Title style={{ height: "50px" }}>
                {titolo}
              </Card.Title>
              <Card.Img
                variant="top"
                src={cover}
                style={{
                  height: "300px",
                  objectFit: "contain",
                }}
              />
              <Card.Text>{content}</Card.Text>
              <Card.Text>{author}</Card.Text>
              <Card.Text>{categoria}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetail;
