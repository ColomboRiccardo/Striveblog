import { Route, Routes } from "react-router";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/Header.component";
import Authors from "./views/Authors.view";
import AuthorDetails from "./views/AuthorDetails.view";
import NewAuthor from "./views/NewAuthor.view";
import BlogList from "./views/BlogList.view";
import BlogDetail from "./views/BlogDetail.view";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/:page" element={<BlogList />} />
        <Route path="/authors" element={<Authors />} />
        <Route
          path="/authors/:id"
          element={<AuthorDetails />}
        />
        <Route
          path="/new-authors"
          element={<NewAuthor />}
        />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
