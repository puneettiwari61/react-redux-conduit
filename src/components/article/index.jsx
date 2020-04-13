import React, { Component } from "react";
import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SimplePopover from "../uiComponents/ PopButton";
import Comments from "./Comments";
import ReceiptTwoToneIcon from "@material-ui/icons/ReceiptTwoTone";
import DeleteSweepTwoToneIcon from "@material-ui/icons/DeleteSweepTwoTone";

export default class Article extends Component {
  constructor() {
    super();
    this.state = {
      article: "",
      favorited: "",
      open: true,
      comment: null,
      follow: ""
      // user: this.props.user && this.props.user || null
    };
  }

  componentDidMount() {
    const url = "https://conduit-campus.herokuapp.com/api/v1";

    Axios.get(`${url}/articles/${this.props.match.params.slug}`, {
      headers: { authorization: localStorage.conduit }
    })
      .then(res => {
        this.setState({
          article: res.data.article,
          favorited: res.data.favorited,
          follow: res.data.article.author.following.includes(
            this.props.user && this.props.user._id
          )
        });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    const url = "https://conduit-campus.herokuapp.com/api/v1";

    if (prevState.open !== this.state.open || prevProps !== this.props) {
      Axios.get(`${url}/articles/${this.props.match.params.slug}`, {
        headers: { authorization: localStorage.conduit }
      })
        .then(res => {
          this.setState({
            article: res.data.article,
            favorited: res.data.favorited,
            follow: res.data.article.author.following.includes(
              this.props.user && this.props.user._id
            )
          });
        })
        .catch(err => console.log(err));
    }
  }

  getDate = d => {
    const date = new Date(`${d}`);
    return date.toLocaleDateString();
  };

  handleDelete = i => {
    const url = "https://conduit-campus.herokuapp.com/api/v1";

    Axios.delete(
      `${url}/articles/${this.props.match.params.slug}/comments/${i}`,
      {
        headers: { authorization: localStorage.conduit }
      }
    )
      .then(res => this.setState({ open: !this.state.open }))
      .catch(err => console.log(err));
  };

  handleFavorite = () => {
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    if (!this.props.isLogged) return;
    // console.log("clicked in fav");
    var method = this.state.favorited !== true ? "post" : "delete";
    if (method == "post") {
      Axios.post(
        `${url}/articles/${this.props.match.params.slug}/favorite`,
        {},
        { headers: { authorization: localStorage.conduit } }
      )
        .then(res => {
          this.setState({ favorited: true });
        })
        .catch(err => console.log(err));
    } else {
      Axios.delete(`${url}/articles/${this.props.match.params.slug}/favorite`, {
        headers: { authorization: localStorage.conduit }
      })
        .then(res => {
          this.setState({ favorited: false });
        })
        .catch(err => console.log(err));
    }
  };

  handleComment = c => {
    const url = "https://conduit-campus.herokuapp.com/api/v1";

    Axios.post(
      `${url}/articles/${this.props.match.params.slug}/comments`,
      { body: c },
      { headers: { authorization: localStorage.conduit } }
    )
      .then(res => {
        this.setState({ open: !this.state.open });
        return res;
        // console.log(this.state.comment);
      })
      .catch(error => console.log(error));
  };

  handleFollow = () => {
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    if (!this.props.isLogged) return;
    var method = this.state.follow !== true ? "post" : "delete";
    if (method == "post") {
      Axios.post(
        `${url}/profiles/${this.state.article &&
          this.state.article.author.username}/follow`,
        {},
        { headers: { authorization: localStorage.conduit } }
      )
        .then(res => {
          this.setState({ follow: true });
        })
        .catch(err => console.log(err));
    } else {
      Axios.delete(
        `${url}/profiles/${this.state.article &&
          this.state.article.author.username}/follow`,
        { headers: { authorization: localStorage.conduit } }
      )
        .then(res => {
          this.setState({ follow: false });
        })
        .catch(err => console.log(err));
    }
  };

  deleteArticle = e => {
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    Axios.delete(`${url}/articles/${this.props.match.params.slug}`, {
      headers: { authorization: localStorage.conduit }
    })
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(
      this.props.user &&
        this.props.user._id === this.state.article &&
        this.state.article.author._id,
      "article following"
    );
    return (
      <>
        <Grid item xs={12}>
          <Paper className="paper">
            {this.state.article &&
              this.state.article.title.substr(0, 25) + "..."}
            <div className="flex2 author-details">
              <div className="flex2">
                <Avatar className="avatar" />
                <div className="flex2 column">
                  <p className="author">
                    {" "}
                    <Link
                      href={`/profile/${this.state.article &&
                        this.state.article.author.username}`}
                      className="link"
                    >
                      {this.state.article && this.state.article.author.username}
                    </Link>
                  </p>
                  <span className="date">
                    {this.state.article &&
                      this.getDate(this.state.article.createdAt)}
                  </span>
                </div>
                {/* <Button
                  variant="contained"
                  color="default"
                  startIcon={<AddIcon size="small" />}
                  size="small"
                  className="icon-button"
                  onClick={() => this.handleFollow()}
                >
                  {this.state.follow ? "Unfollow" : "Follow Author"}
                </Button> */}
                <SimplePopover
                  content={"please login"}
                  name={this.state.follow ? "Unfollow" : "Follow Author"}
                  startIcon={<AddIcon size="small" />}
                  status={this.props.isLogged}
                  onClickHandle={this.handleFollow}
                />
                {/* <Button
                onClick={this.handleFavorite}
        variant="contained"
        color="default"
        startIcon={<FavoriteIcon size="small" />}
        size="small"
        className="icon-button"
    >{this.state.favorited? 'Unfavorite' : "Favorite"} </Button> */}
                <SimplePopover
                  content={"please login"}
                  name={this.state.favorited ? "Unfavorite" : "Favorite"}
                  startIcon={<FavoriteIcon size="small" />}
                  status={this.props.isLogged}
                  onClickHandle={this.handleFavorite}
                />
                {(this.props.user && this.props.user._id) ==
                (this.state.article && this.state.article.author._id) ? (
                  <>
                    <Button
                      variant="contained"
                      href={`/updatearticle/${this.state.article &&
                        this.state.article.slug}`}
                      size="small"
                      className="icon-button"
                      startIcon={<ReceiptTwoToneIcon size="small" />}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      className="icon-button"
                      startIcon={<DeleteSweepTwoToneIcon size="small" />}
                      onClick={this.deleteArticle}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Paper>
        </Grid>
        <Container maxWidth="lg" className="container">
          <div>
            <Paper variant="elevation" className="padit">
              <h1>{this.state.article && this.state.article.description}</h1>
              <p className="article-body">
                {this.state.article && this.state.article.body}
              </p>
            </Paper>
          </div>
        </Container>
        <Comments
          handleClick={this.handleComment}
          comments={this.state.article && this.state.article.comments}
          handleDelete={this.handleDelete}
          isLogged={this.props.isLogged}
          user={this.props && this.props.user}
        />
      </>
    );
  }
}
