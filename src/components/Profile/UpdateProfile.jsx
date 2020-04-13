import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Axios from "axios";

export default class UpdateProfile extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      bio: "",
      username: "",
      email: ""
    };
  }

  componentDidMount() {
    const url = "https://conduit-campus.herokuapp.com/api/v1";

    Axios.get(`${url}/user`, {
      headers: { authorization: localStorage.conduit }
    })
      .then(res => {
        this.setState({
          image: res.data.user.image,
          bio: res.data.user.bio,
          username: res.data.user.username,
          email: res.data.user.email
        });
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
      `${url}/user`,
      { ...this.state },
      {
        headers: { authorization: localStorage.conduit }
      }
    )
      .then(res => res)
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <form>
          <Card className=" flex2 column createAricle-div">
            <h2>Update Profile</h2>
            <TextField
              label="Profile Pic"
              placeholder="url of profile pic"
              variant="outlined"
              className="padding one-m"
              fullWidth
              value={this.state.image}
              name="image"
              onChange={this.onChange}
            />
            <TextField
              label="username"
              placeholder="short bio about you"
              variant="outlined"
              className="padding one-m"
              fullWidth
              value={this.state.username}
              name="username"
              onChange={this.onChange}
            />
            <TextField
              label="bio"
              multiline
              rows="4"
              defaultValue="Default Value"
              variant="outlined"
              fullWidth
              value={this.state.bio}
              name="bio"
              onChange={this.onChange}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="padding one-m"
              fullWidth
              // value="email"
              disabled
              value={this.state.email}
              name="email"
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
