import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Card from "../Home/cards";
export default class Tags extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      articles: null
    };
  }
  componentDidMount() {
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    this._isMounted = true;
    Axios.get(`${url}/articles?tagList=${this.props.match.params.tagname}`)
      .then(res => {
        if (this._isMounted) {
          this.setState({ articles: res.data.searchResult });
        }
      })
      .catch(err => console.log(err));
  }
  componentWillUnmount() {
    console.log("called in componentwillunmount");
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <Grid item xs={12}>
          <Paper className="paper">
            {"#" + this.props.match.params.tagname}
          </Paper>
        </Grid>
        {this.state.articles &&
          this.state.articles.map((a, id) => {
            return (
              <Container maxWidth="sm" className="container">
                <Card {...a} key={id} />
              </Container>
            );
          })}
      </>
    );
  }
}
