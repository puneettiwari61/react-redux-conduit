import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Card } from "@material-ui/core";
import Axios from "axios";

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    e.preventDefault();
    var tagList = this.state.tagList.split(",").map(t => t.trim());
    Axios.post(
      `${url}/articles`,
      { ...this.state, tagList },
      { headers: { authorization: localStorage.conduit } }
    )
      .then(res => this.props.history.push("/"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <form>
          <Card className=" flex2 column createAricle-div">
            <TextField
              id="standard-basic"
              label="Title"
              size="medium"
              fullWidth
              className="padding one-m"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              fullWidth
              className="padding one-m"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
            <TextField
              id="standard-multiline-static"
              value={this.state.body}
              name="body"
              label="Body"
              multiline
              rows="20"
              variant="outlined"
              fullWidth
              className="padding one-m"
              onChange={this.onChange}
            />
            <TextField
              id="outlined-basic"
              label="Tags"
              variant="outlined"
              fullWidth
              className="padding"
              name="tagList"
              value={this.state.tags}
              onChange={this.onChange}
            />
            <Button
              variant="contained"
              color="primary"
              className="padding one-m"
              size="large"
              type="submit"
              onClick={this.handleSubmit}
            >
              Publish
            </Button>
          </Card>
        </form>
      </>
    );
  }
}
