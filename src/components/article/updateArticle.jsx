import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Axios from "axios";

export default class UpdateArticle extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      body: "",
      tags: []
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.slug);
    const url = "https://conduit-campus.herokuapp.com/api/v1";

    Axios.get(`${url}/articles/${this.props.match.params.slug}`, {
      headers: { authorization: localStorage.conduit }
    })
      .then(res => {
        this.setState({
          title: res.data.article.title,
          description: res.data.article.description,
          body: res.data.article.body,
          tags: res.data.article.tagList
        });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    Axios.put(
      `${url}/articles/${this.props.match.params.slug}`,
      { ...this.state },
      {
        headers: { authorization: localStorage.conduit }
      }
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <form>
          <Card className=" flex2 column createAricle-div">
            <h2>Update Article</h2>
            <TextField
              label="Title"
              placeholder="url of profile pic"
              variant="outlined"
              className="padding one-m"
              fullWidth
              value={this.state.title}
              name="title"
              onChange={this.onChange}
            />
            <TextField
              label="Description"
              placeholder="short bio about you"
              variant="outlined"
              className="padding one-m"
              fullWidth
              value={this.state.description}
              name="description"
              onChange={this.onChange}
            />
            <TextField
              label="body"
              multiline
              rows="20"
              defaultValue="Default Value"
              variant="outlined"
              fullWidth
              value={this.state.body}
              name="body"
              onChange={this.onChange}
            />
            <TextField
              id="outlined-basic"
              label="Tags"
              variant="outlined"
              className="padding one-m"
              fullWidth
              value={this.state.tags}
              name="tags"
            />
            <Button
              variant="contained"
              color="primary"
              className="padding one-m"
              size="large"
              type="submit"
              onClick={this.handleSubmit}
            >
              Update
            </Button>
          </Card>
        </form>
      </>
    );
  }
}
