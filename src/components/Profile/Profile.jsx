import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Avatar, Button } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import InsertEmoticonTwoToneIcon from "@material-ui/icons/InsertEmoticonTwoTone";
import Tabs from "./Tabs";
import Axios from "axios";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: null,
      follow: ""
    };
  }

  componentDidMount() {
    const url = "https://conduit-campus.herokuapp.com/api/v1";

    Axios.get(`${url}/profiles/${this.props.match.params.author}`, {
      headers: { authorization: localStorage.conduit }
    })
      .then(res => {
        console.log(res.data, "profile");
        this.setState({ profile: res.data, follow: res.data.following });
      })
      .catch(err => console.log(err));
  }

  handleFollow = () => {
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    var method = this.state.follow !== true ? "post" : "delete";
    if (method == "post") {
      Axios.post(
        `${url}/profiles/${this.props.match.params.author}/follow`,
        {},
        { headers: { authorization: localStorage.conduit } }
      )
        .then(res => {
          this.setState({ follow: true });
        })
        .catch(err => console.log(err));
    } else {
      Axios.delete(`${url}/profiles/${this.props.match.params.author}/follow`, {
        headers: { authorization: localStorage.conduit }
      })
        .then(res => {
          this.setState({ follow: false });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <>
        <Grid item xs={12}>
          <Paper className="paper">
            <InsertEmoticonTwoToneIcon className="profile-avatar" />
            <p className="profile-name">{this.props.match.params.author}</p>
            <Button
              variant="contained"
              size="small"
              onClick={this.handleFollow}
            >
              {this.state.follow ? "Unfollow" : "Follow Author"}
            </Button>
          </Paper>
        </Grid>
        <Tabs user={this.state.profile && this.state.profile} />
      </>
    );
  }
}
