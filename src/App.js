import React from "react";
import "./App.css";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp/index";
import Header from "./components/Common/index.jsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Article from "./components/article";
import Tags from "./components/tags";
import Axios from "axios";
import CreateArticle from "./components/article/CreateArticle";
import { Switch } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import { LinearProgress, Divider } from "@material-ui/core";
import UpdateProfile from "./components/Profile/UpdateProfile";
import UpdateArticle from "./components/article/updateArticle";
import { connect } from "react-redux";
import { userLoggedFunc, getUserInfoFunc } from "./store/actions";

function AuthRoutes(authProps) {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" component={CreateArticle} />
        {console.log(authProps, "auth routes")}
        <Route
          path="/article/:slug"
          render={props => (
            <Article
              {...props}
              user={authProps.data && authProps.data}
              isLogged={authProps.isLogged}
            />
          )}
        />
        <Route path="/tag/:tagname" component={Tags} />
        <Route path="/profile/:author" component={Profile} />
        <Route
          path="/update/:author"
          render={props => (
            <UpdateProfile {...props} user={authProps.data && authProps.data} />
          )}
        />
        <Route
          path="/updatearticle/:slug"
          render={props => (
            <UpdateArticle {...props} user={authProps.data && authProps.data} />
          )}
        />
        <Route path="*">
          <h1>Error Page not found</h1>
        </Route>
      </Switch>
    </>
  );
}

function PulicRoutes(publicProps) {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/signin"
          render={props => (
            <SignIn {...props} isLoggedUpdate={publicProps.isLoggedUpdate} />
          )}
        />
        <Route path="/signup" component={SignUp} />
        <Route
          path="/article/:slug"
          render={props => (
            <Article {...props} isLogged={publicProps.isLogged} />
          )}
        />
        <Route path="/tag/:tagname" component={Tags} />
        <Route path="/profile/:author" component={Profile} />
        <Route path="*">
          <h1>Error Page not found</h1>
        </Route>
      </Switch>
    </>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      userData: null,
      loader: false
    };
  }

  componentDidMount() {
    this.props.dispatch(getUserInfoFunc());
  }

  componentDidUpdate(prevProps, prevState) {
    // const url = "https://conduit-campus.herokuapp.com/api/v1";
    if (
      (this.props.user && this.props.user.isLogged) !==
      (this.props.user && this.props.user.isLogged)
    ) {
      this.props.dispatch(getUserInfoFunc());
    }
  }

  isLoggedUpdate = value => {
    // this.setState({ isLogged: value });
    this.props.dispatch(userLoggedFunc({ userData: value, isLogged: true }));
  };

  logoutFunc = () => {
    localStorage.clear();
    // this.setState({ isLogged: false });
  };

  render() {
    console.log(this.props, "hello i m props");
    return (
      <>
        <CssBaseline />
        <div className="relative">
          {this.state.loader == false ? (
            ""
          ) : (
            <LinearProgress className="absolute" />
          )}
        </div>

        <Header
          isLogged={this.props.user && this.props.user.isLogged}
          logoutFunc={this.logoutFunc}
          user={this.props.user && this.props.user.userData}
        />
        {this.props.isLogged ? (
          <AuthRoutes
            data={this.props.user && this.props.user.userData}
            isLogged={this.props.user && this.props.user.isLogged}
          />
        ) : (
          <PulicRoutes
            isLoggedUpdate={this.isLoggedUpdate}
            isLogged={this.props.user && this.props.user.isLogged}
          />
        )}
      </>
    );
  }
}

function mapToProps({ user }) {
  return { user };
}

export default connect(mapToProps)(App);
