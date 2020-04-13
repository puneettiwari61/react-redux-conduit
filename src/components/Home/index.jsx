import React, { Component } from "react";
import axios from "axios";
import Card from "./cards";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import {
  fetchArticlesFunc,
  fetchTagsFunc,
  fetchBoth
} from "../../store/actions";
// import Tags from './Tags'
import Chip from "@material-ui/core/Chip";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      tags: null,
      loader: false
    };
  }

  componentDidMount() {
    this.setState({ loader: true });
    this.props.dispatch(fetchBoth());
    this.setState({ loader: false });
  }

  render() {
    return (
      <>
        <Grid item xs={12}>
          <Paper className="paper">Conduit</Paper>
        </Grid>
        <div className="flex">
          <div className="global-feed">
            {this.props.articles &&
              this.props.articles.map((a, id) => {
                return <Card {...a} key={id} />;
              })}
          </div>
          <div className="tags">
            {this.state.loader ? (
              <>
                <Skeleton className={"skeleton"} />
                <Skeleton className={"skeleton"} />
                <Skeleton animation="wave" className={"skeleton"} />
                <Skeleton className={"skeleton"} />
                <Skeleton className={"skeleton"} />
                <Skeleton animation="wave" className={"skeleton"} />
                <Skeleton className={"skeleton"} />
                <Skeleton className={"skeleton"} />
                <Skeleton animation="wave" className={"skeleton"} />
              </>
            ) : (
              <p className={"font20"}>Popular tags</p>
            )}
            {this.props.tags &&
              this.props.tags.map((t, id) => (
                <Link className="tag-link" href={`/tag/${t}`} key={id}>
                  {" "}
                  <Chip label={t} className="padding" clickable />{" "}
                </Link>
              ))}
          </div>
        </div>
      </>
    );
  }
}

let mapStateToProps = ({ articles, tags }) => {
  // console.log(articles, "inmapprops");
  return { articles, tags };
};

export default connect(mapStateToProps)(Home);
