import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import HomeIcon from '@material-ui/icons/Menu';
import HomeIcon from "@material-ui/icons/Home";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import { withRouter } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: 30,
    letterSpacing: 2
  },
  button: {
    fontSize: 20,
    cursor: "pointer",
    padding: 15
  },
  bar: {
    backgroundColor: "#6a1b9a"
  },
  tool: {
    width: "75%",
    margin: "0 auto"
  },
  paper: {
    backgroundColor: "#4a148c",
    textAlign: "center",
    lineHeight: 5,
    fontSize: 50,
    borderRadius: "0 !important",
    color: "white",
    marginTop: 10
  },
  grid: {
    borderRadius: "0 !important"
  },
  linkButton: {
    fontSize: 20
  }
}));
// #4db6ac
function ButtonAppBar(props) {
  console.log("hello from common", props);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary" className={classes.bar}>
        <Toolbar className={classes.tool}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" color="inherit">
              Conduit
            </Link>
          </Typography>
          {props.user ? (
            <>
              <Link href="/create" className={"flex2"} color="inherit">
                <AddCircleIcon />
                <span className={classes.linkButton}>New Article</span>
              </Link>
              <Link
                href={`/profile/${props.user ? props.user.username : ""}`}
                color="inherit"
                className={classes.button}
              >
                {props.user && props.user.username}
              </Link>
              <Link
                href={`/update/${props.user ? props.user.username : ""}`}
                color="inherit"
                className={classes.button}
              >
                {"Update Profile"}
              </Link>
              <Link
                href=""
                color="inherit"
                className={classes.button}
                onClick={props.logoutFunc}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup" color="inherit" className={classes.button}>
                Signup
              </Link>
              <Link href="/signin" color="inherit" className={classes.button}>
                Login
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar);
