import React, {
  Children,
  useEffect,
  useState,
} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router";

const BlogDetail = () => {
  const [blogPost, setBlogPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

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

  const postComment = async (event) => {
    event.preventDefault();
    const postBody = {
      author: commentAuthor,
      comment: commentBody,
      likes: 0,
    };
    try {
      const response = await fetch(
        `http://localhost:3001/api/comments/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );
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
        <Col xs={6}>
          <Card className="p-2">
            <Card.Title>Commenti</Card.Title>
            <CommentCard
              author="Giuseppe"
              text="Ciao, come va?"
            />
            <CommentCard
              author="Paolo"
              text="@Giuseppe Bene e te?"
            />
            <CommentCard
              author="Maria"
              text="Come va ragazzi?"
            />

            <CommentCard author="Mario" text="Bel post!" />

            <Card className="p-2">
              <Card.Title>Aggiungi un commento</Card.Title>
              <Form className="p-2">
                <Form.Group className="mb-2">
                  <Form.Label>
                    Autore del commento
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Chi sei?"
                    onChange={(e) =>
                      setCommentAuthor(e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Testo del commento
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Scrivi qualcosa!"
                    onChange={(e) =>
                      setCommentBody(e.target.value)
                    }
                  />
                </Form.Group>
                <Button
                  className="w-50 mt-2"
                  variant="secondary"
                  onClick={postComment}
                >
                  Aggiungi il commento
                </Button>
              </Form>
            </Card>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const CommentCard = ({ author, text }) => {
  return (
    <Card className="p-2 mb-2">
      <Card.Title>{author}</Card.Title>
      <Card.Body className="d-flex justify-content-between">
        <Card.Text>{text}</Card.Text>
        <Button className="w-25" variant="light">
          Rispondi
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BlogDetail;
