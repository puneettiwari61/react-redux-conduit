import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderBottom: "1px solid #333",
    maxWidth: 700
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 2
  },
  content: {
    border: "none"
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <Link href={`/profile/${props.author.username}`} color="primary">
            {props.author.username}
          </Link>
        </Typography>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.description}
        </Typography>
        {/* <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link href={`/article/${props.slug}`}>Read More...</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
