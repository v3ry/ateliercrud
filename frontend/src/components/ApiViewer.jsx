/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import "./ApiViewer.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

let myId = -1;
function ApiViewer() {
  const [articles, setArticles] = useState([]);
  const [editMod, setEditMod] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [myArticles, setMyArticles] = useState({
    title: "",
    img: "",
    descr: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/articles")
      .then((data) => setArticles(data.data))
      .catch((error) =>
        console.warn(`Authorization failed : ${error.message}`)
      );
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/articles/${id}`)
      .catch((error) =>
        console.warn(`Authorization failed : ${error.message}`)
      );
  };

  const edit = (e, id) => {
    e.preventDefault();
    setEditMod(false);
    axios
      // eslint-disable-next-line radix
      .put(`http://127.0.0.1:5000/articles/${parseInt(id)}`, { ...myArticles })
      .catch((error) =>
        console.warn(`Authorization failed : ${error.message}`)
      );
    setRefresh(!refresh);
  };

  const handleEdit = (e, index, id) => {
    e.preventDefault();
    setEditMod(true);
    myId = id;
    const tit = document.querySelector(".title");
    const img = document.querySelector(".image");
    const des = document.querySelector(".description");

    tit.value = articles[index].title;
    img.value = articles[index].img;
    des.value = articles[index].descr;
    setMyArticles({
      ...myArticles,
      title: articles[index].title,
      img: articles[index].img,
      descr: articles[index].descr,
    });
    // setMyArticles({ ...myArticles, img: articles[index].img });
    // setMyArticles({ ...myArticles, descr: articles[index].descr });
    // setMyArticles({ ...myArticles, title: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:5000/articles/`, { ...myArticles })
      .then((data) => console.warn(`${data}added`))
      .catch((error) =>
        console.warn(`Authorization failed : ${error.message}`)
      );
    setRefresh(!refresh);
  };

  return (
    <div>
      <div>
        {articles &&
          articles.map((art, index) => (
            <ul key={art.id} className="zone">
              <li>{art.title}</li>
              <li>
                <img src={art.img} alt="main img" />
              </li>
              <li className="desc">{art.descr}</li>
              <li>
                <Button
                  variant="primary"
                  onClick={(e) => handleEdit(e, index, art.id)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(art.id)}>
                  Delete
                </Button>
              </li>
            </ul>
          ))}
      </div>
      <div>
        <p>{editMod ? "Edit Them" : "Add New"}</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter title"
              value={myArticles.title}
              className="title"
              onChange={(e) =>
                setMyArticles({ ...myArticles, title: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              placeholder="image"
              value={myArticles.img}
              className="image"
              onChange={(e) =>
                setMyArticles({ ...myArticles, img: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Description"
              value={myArticles.descr}
              className="description"
              onChange={(e) =>
                setMyArticles({ ...myArticles, descr: e.target.value })
              }
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => (editMod ? edit(e, myId) : handleAdd(e))}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ApiViewer;
