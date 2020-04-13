import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Axios from "axios";
// import Alert from '@material-ui/lab/Alert';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    // console.log(e.name, e.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    Axios.post(`${url}/users/login`, { ...this.state })
      .then(res => {
        if (res.data.success == true) {
          localStorage.setItem("conduit", res.data.token);
          // localStorage.setItem('isLogged', true)
          this.props.isLoggedUpdate(true);
          this.props.history.push("/");
        }
        if (res.data.success == false) {
          // localStorage.setItem('isLogged', false)
          this.props.isLoggedUpdate(false);
          console.log("invalid credentials");
        }
        this.setState({
          email: "",
          password: ""
        });
      })
      .catch(err => {
        // localStorage.setItem('isLogged', false)
        console.log("invalid credentials");
        this.props.isLoggedUpdate(false);
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <div className="container">
          <h3 className="log">SignIn</h3>
          <form>
            <div className="form">
              <input
                className="input"
                type="email"
                placeholder="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                className="input"
                type="password"
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                onClick={this.onSubmit}
              >
                {" "}
                Submit{" "}
              </Button>
            </div>
            {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
          </form>
        </div>
      </>
    );
  }
}
