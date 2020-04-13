import React from "react";
import Button from "@material-ui/core/Button";
import { useRef } from "react";
import Axios from "axios";

export default function SignUp(props) {
  let username = useRef("");
  let email = useRef("");
  let password = useRef("");

  const onSubmit = e => {
    e.preventDefault();
    const url = "https://conduit-campus.herokuapp.com/api/v1";

    Axios.post(`${url}/users`, {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value
    })
      .then(res => {
        console.log(res);
        props.history.push("/signin");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="container">
        <h3 className="log">SignUp</h3>
        <form action="">
          <div className="form">
            <input
              className="input"
              type="text"
              placeholder="username"
              ref={username}
            />
            <input
              className="input"
              type="email"
              placeholder="email"
              ref={email}
            />
            <input
              className="input"
              type="password"
              placeholder="password"
              ref={password}
            />
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
