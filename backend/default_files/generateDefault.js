// generateCSV.js
import fs from "fs";
import { faker } from "@faker-js/faker";
import { Parser } from "json2csv";

const newRandomUser = () => {
  return {
    nome: faker.person.firstName(),
    cognome: faker.person.lastName(),
    email: faker.internet.email(),
    data_di_nascita: faker.date.birthdate(),
    avatar: faker.image.avatar(),
  };
};

const newBlogPost = (num, authors) => {
  const author =
    authors[Math.floor(Math.random() * authors.length)];
  return {
    categoria: faker.commerce.department(),
    titolo: faker.lorem.sentence(),
    cover: faker.image.url(),
    readTime: {
      value: faker.number.int({ min: 1, max: 20 }),
      unit: "minutes",
    },
    author: `${author.email}`,
    content: faker.lorem.paragraphs(),
  };
};

const generateAuthors = (num) => {
  const authors = [];
  for (let i = 0; i < num; i++) {
    authors.push(newRandomUser());
  }
  return authors;
};

const generateBlogPosts = (num, authors) => {
  const blogPosts = [];
  for (let i = 0; i < num; i++) {
    blogPosts.push(newBlogPost(i, authors));
  }
  return blogPosts;
};

const authors = generateAuthors(50);
const blogPosts = generateBlogPosts(100, authors);

const authorCsv = new Parser().parse(authors);
const blogPostCsv = new Parser().parse(blogPosts);

fs.writeFileSync("./default_files/authors.csv", authorCsv);
fs.writeFileSync(
  "./default_files/blogPosts.csv",
  blogPostCsv
);

console.log("CSV files generated successfully.");
