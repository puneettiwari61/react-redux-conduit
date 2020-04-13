import { fetchArticles, fetchTags, userLogged } from "./types";
import axios from "axios";
import { store } from "./index";
export let fetchArticlesFunc = payload => {
  return { type: fetchArticles, payload };
};

export let fetchTagsFunc = payload => {
  return { type: fetchTags, payload };
};

export let fetchBoth = () => {
  return function() {
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    const articles = () => axios.get(`${url}/articles`).then(res => res.data);
    const tags = () => axios.get(`${url}/tags`).then(res => res.data);

    Promise.all([articles(), tags()])
      .then(data => {
        // this.setState({
        //   articles: data[0].searchResult,
        //   tags: data[1].tags,
        //   loader: false
        // });
        let articles = data[0].searchResult;
        let tags = data[1].tags;
        store.dispatch(fetchArticlesFunc(articles));
        store.dispatch(fetchTagsFunc(tags));
      })
      .catch(err => console.log(err));
  };
};

export let userLoggedFunc = payload => {
  return { type: userLogged, payload };
};

export let getUserInfoFunc = () => {
  return function() {
    const url = "https://conduit-campus.herokuapp.com/api/v1";
    if (localStorage["conduit"]) {
      axios
        .get(`${url}/user`, {
          headers: { authorization: localStorage.conduit }
        })
        .then(res => {
          // this.setState({
          //   isLogged: true,
          //   userData: res.data.user,
          //   loader: false
          // });
          let isLogged = true;
          let userData = res.data.user;
          store.dispatch(userLoggedFunc({ userData, isLogged }));
        })
        .catch(err => {
          store.dispatch(userLoggedFunc({ userData: null, isLogged: false }));
          console.log(err);
        });
    }
  };
};
