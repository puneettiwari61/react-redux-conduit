import React, { Component } from "react";
import { Grid, Button, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InsertEmoticonTwoToneIcon from "@material-ui/icons/InsertEmoticonTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "@material-ui/core/Link";
export default class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comment: ""
    };
  }

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  getDate = d => {
    const date = new Date(`${d}`);
    return date.toLocaleDateString();
  };

  render() {
    return (
      <>
        <div className="createAricle-div comment-div">
          {this.props && this.props.isLogged ? (
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows="4"
                variant="outlined"
                fullWidth
                value={this.state.comment}
                onChange={this.handleChange}
              />
              <Button
                variant="contained"
                className="one-m zero-left-m"
                size="small"
                color="primary"
                onClick={e => {
                  this.props.handleClick(this.state.comment);
                  this.setState({ comment: "" });
                }}
              >
                Post Comment
              </Button>
            </Grid>
          ) : (
            <h3>Please login to do comments</h3>
          )}
        </div>
        {this.props.comments &&
          this.props.comments.map((c, id) => {
            return (
              <>
                <div className="createAricle-div comment-div mb mt">
                  <Grid item xs={12}>
                    <Paper variant="outlined" className="padit zeropad">
                      <p className="comment-body" key={id}>
                        {c.body}
                      </p>
                      <div className="flex2 space-between grey">
                        <p className="author-para">
                          {" "}
                          <InsertEmoticonTwoToneIcon className="author-comment-icon" />
                          <Link href={`profile/${c.author.username}`}>
                            {c.author.username}
                          </Link>{" "}
                          <span className="ml">
                            {this.getDate(c.createdAt)}
                          </span>
                        </p>
                        {this.props.user &&
                        this.props.user._id == c.author._id ? (
                          <DeleteIcon
                            cursor="pointer"
                            onClick={() => this.props.handleDelete(c._id)}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </Paper>
                  </Grid>
                </div>
              </>
            );
          })}
      </>
    );
  }
}
