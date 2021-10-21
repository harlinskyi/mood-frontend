import "./LeftSide.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "../../../../store";
import http from "../../../../http-common";
import default_photo from "../../../../images/default_photo.jpg";
import getUserIdFromUrl from "../../../../utils/getUserIdFromUrl"

class LeftSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      userId: getUserIdFromUrl(window.location.pathname),
      errors: "",
      success: false,
    };
  }

  
  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await http.post(
        `get-user-posts?id=${this.state.userId}`
      );
        

      const userPosts = response.data;

      this.setState({ posts: userPosts });
    } catch (badresponse) {
      console.log("problem", badresponse);
      this.setState({ errors: badresponse });
    }
    this.setState({ loading: false });
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="LeftSide col-9">
        <p class="btn btn-add-post m-2 shadow-sm" type="submit" onClick="">
          <i class="fa fa-plus me-1" aria-hidden="true"></i>Create post
        </p>
        <ArticleList posts={posts} />
      </div>
    );
  }
}

export default LeftSide;

function ArticleList(props) {
    console.log('props', props)
  const postlist = props.posts.map((post) => (
    <li className="LeftSide-list-article-item py-2 mb-3 bg-body rounded-c shadow-sm container">
      <div className="row py-2 article-item-header">
        <div className="col-auto">
          <img src={default_photo} alt="mdo" width="55" height="55" />
        </div>
        <div className="col-auto">
          <div className="row fs-5 article-item-header-username">
            Sveta Ivanova
          </div>
          <div className="row article-item-header-date">
            {post.creationDate}
          </div>
        </div>
      </div>
      <div className="row py-3 article-item-body">
        <div className="row-12">{post.description}</div>
        <div className="row-12 py-3">
          <img
            src="https://s.zagranitsa.com/images/articles/6729/870x486/53d189dfcd54fa9ecae756ddf5a7c2ee.jpg?1530714543"
            alt="mdo"
          />
        </div>
      </div>
    </li>
  ));
  return <ul className="Leftside-list-article">{postlist}</ul>;
}
