import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Form, Input, Button, Upload, Icon, message, Spin } from "antd";
import Router from "next/router";
import gql from "graphql-tag";

import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const { TextArea } = Input;

const success = () => {
  message.success("This is a message of success");
};

const error = () => {
  message.error("This is a message of error");
};

const warning = () => {
  message.warning("This is message of warning");
};

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "Dog",
    description: "Ein Hund",
    image: "",
    largeImage: "large-dog.jpg",
    price: 1245345345
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    console.log(name, type, value);
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    console.log("uploading file");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "starchefs");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtz0e4luw/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              //Stop from submitting
              e.preventDefault();
              //call the mutation
              const res = await createItem();
              //change to single item page
              console.log(res);
              message.success("Sucessfully created new item");
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <Upload
                htmlFor="file"
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
              >
                Image
                <Input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an Image"
                />
                {this.state.image && (
                  <img
                    width="200"
                    src={this.state.image}
                    alt="Upload Preview"
                  />
                )}
              </Upload>
              <label htmlFor="title">
                Title
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <Input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <TextArea
                  rows={4}
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <Button htmlType="submit">Submit</Button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
