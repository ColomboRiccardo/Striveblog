import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router";
import BlogCard from "../components/BlogCard.component";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState({
    authorSearch: "",
    titleSearch: "",
  });

  const page = useParams().page ?? 1;

  // const fetchBlogPosts = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3001/api/blogposts/page/" + page
  //     );
  //     const data = await response.json();
  //     setBlogPosts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchBlogPostPages = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/blogposts/count"
      );
      const data = await response.json();
      setPageCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchBlogPosts = async () => {
    const response = await fetch(
      "http://localhost:3001/api/blogposts/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      }
    );
    const data = await response.json();
    setBlogPosts(data);
  };

  //TODO la search come get
  // const searchBlogPosts = async () => {
  //   const queryParams = new URLSearchParams({
  //     titleSearch: search.titleSearch,
  //     authorSearch: search.authorSearch,
  //   }).toString();
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/api/blogposts/search?${queryParams}`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(
  //         `HTTP error! status: ${response.status}`
  //       );
  //     }
  //     const data = await response.json();
  //     setBlogPosts(data);
  //   } catch (error) {
  //     console.error(
  //       "Error fetching search results:",
  //       error
  //     );
  //   }
  // };

  const handleSearch = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
    console.log(search);
  };

  useEffect(() => {
    //fetchBlogPosts();
    fetchBlogPostPages();
  }, [page]);

  useEffect(() => {
    searchBlogPosts();
  }, [search]);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Cerca nei nostri articoli</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control
            name="titleSearch"
            type="text"
            placeholder="Cerca per titolo"
            className=" mr-sm-2"
            onChange={handleSearch}
            value={search.titleSearch}
          />
        </Col>
        <Col>
          <Form.Control
            name="authorSearch"
            type="text"
            placeholder="Cerca per autore"
            className=" mr-sm-2"
            onChange={handleSearch}
            value={search.authorSearch}
          />
        </Col>
        <Col>
          <Button type="submit" onClick={searchBlogPosts}>
            Submit
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h1>Tutti i blog post dai nostri authors</h1>
        </Col>
      </Row>
      <Row className="g-4">
        {blogPosts.map((post) => (
          <BlogCard key={post._id} {...post} />
        ))}
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          {Array.from({ length: pageCount }).map(
            (_, index) => {
              return (
                <Link
                  key={index + 1}
                  className="m-2 fs-4"
                  to={`/${index + 1}`}
                >
                  {index + 1}
                </Link>
              );
            }
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogList;
