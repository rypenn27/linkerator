import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addBookmarkAPI } from "../api";

const initState = {
  websiteUrl: "",
  tag1: "",
  tag2: "",
  tag3: "",
  comments: "",
};

const NewLinkForm = () => {
  const [formState, setFormState] = useState(initState);

  const handleInput = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addBookmark = async (event) => {
    event.preventDefault();

    const tags = [];
    if (formState.tag1.length !== 0) {
      tags.push(formState.tag1);
    }

    if (formState.tag2.length !== 0) {
      tags.push(formState.tag2);
    }

    if (formState.tag3.length !== 0) {
      tags.push(formState.tag3);
    }

    const data = {
      websiteUrl: formState.websiteUrl,
      tags,
      comments: formState.comments,
    };

    const result = await addBookmarkAPI(data);
    if (result) {
      setFormState(initState);
    }
    console.log("adding bookmark", data);
  };

  return (
    <div className="newLinkForm">
      <Form onSubmit={addBookmark}>
        <Form.Group controlId="websiteUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control
            onChange={handleInput}
            value={formState.websiteUrl}
            name="websiteUrl"
            type="basic-url"
            placeholder="Enter URL"
          />
          <Form.Text className="text-muted">
            Enter the URL of the webpage you want to bookmark.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="websiteTag">
          <Form.Label>Tag 1</Form.Label>
          <Form.Control
            onChange={handleInput}
            value={formState.tag1}
            name="tag1"
            type="textarea"
            placeholder="Enter Tag"
          />
        </Form.Group>

        <Form.Group controlId="websiteTag">
          <Form.Label>Tag 2</Form.Label>
          <Form.Control
            onChange={handleInput}
            value={formState.tag2}
            name="tag2"
            type="textarea"
            placeholder="Enter Tag"
          />
        </Form.Group>

        <Form.Group controlId="websiteTag">
          <Form.Label>Tag 3</Form.Label>
          <Form.Control
            onChange={handleInput}
            value={formState.tag3}
            name="tag3"
            type="textarea"
            placeholder="Enter Tag"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            onChange={handleInput}
            value={formState.comments}
            name="comments"
            type="textarea"
            placeholder="Add Comments Here "
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Linkerate!!!
        </Button>
      </Form>
    </div>
  );
};

export default NewLinkForm;
