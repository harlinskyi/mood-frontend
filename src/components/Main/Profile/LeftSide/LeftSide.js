import "./LeftSide.css";
import React, { Component } from "react";
import store from "../../../../store";
import http from "../../../../http-common";
import default_photo from "../../../../images/default_photo.jpg";
import customFunc from "../../../../utils/customFunc";
import { connect } from "react-redux";
import accountService from "../../../../services/account.service";
import EclipseWidget from "../../../common/eclipse/eclipse";
import t from "../../../../utils/translations";

class LeftSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postAuthor: [],
      userId: customFunc.getUserIdFromUrl(window.location.pathname),
      errors: "",
      loading: false
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ loading: true, userId: id });
    try {
      const response = await http.post(
        `get-user-posts?id=${this.state.userId}`
      );
      const userPosts = response.data.posts;
      const userPostName = response.data.userInfo;
      this.setState({ posts: userPosts, postAuthor: userPostName });
    } catch (badresponse) {
      // console.log("Problem:", badresponse.response.data);
      this.setState({ errors: badresponse.response.data});
    }
    this.setState({ loading: false });
  }
  
  handleSubmitAddPost = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      let formData = new FormData();
      const timeStamp = new Date(Date.now()).toISOString();
      formData.append("creationDate", timeStamp);
      formData.append("description", 'test');
      const res = await accountService.createPost(formData, store.getState().auth.userId);
      console.log(res);
    } catch (badresponse) {
      console.log(badresponse.response);
      this.setState({ errors: badresponse.response });
    }
    this.setState({ loading: false });
  }

  render() {
    const { posts, loading, postAuthor, errors } = this.state;
    return (
      <div className="LeftSide col-9">
        <button
          type="button"
          className="btn btn-add-post shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#addPostModal"
          data-bs-whatever="@mdo"
        >
          <i className="fa fa-plus me-1" aria-hidden="true"></i>{t('Create post')}
        </button>
        <hr />
        <ul className="Leftside-list-article p-0">
          {posts !== "" ? <ArticleList posts={posts} author={postAuthor} /> : "No post"}
        </ul>

        {/* Modal start */}
        <div
          className="modal fade"
          id="addPostModal"
          tabIndex="-1"
          aria-labelledby="addPostModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addPostModalLabel">
                  {t('New post')}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={this.handleSubmitAddPost}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      {t('Description')}:
                    </label>
                    <textarea
                      name="description"
                      className="form-control"
                      id="message-text"
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    {t('Close')}
                  </button>
                  <button type="submit" className="btn">
                    {t('Create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Modal end */}

        {loading && <EclipseWidget />}
      </div>
    );
  }
}

function ArticleList(props) {
  const { firstName , lastName, email } = props.author;
  const postlist = props.posts.map((post, index) => (
    <li className="LeftSide-list-article-item py-2 mb-3 bg-body rounded-c shadow-sm container" key={index}>
      <div className="row py-2 article-item-header">
        <div className="col-auto">
          <img src={default_photo} alt="mdo" width="55" height="55" />
        </div>
        <div className="col-auto">
          <div className="row fs-5 article-item-header-username">
            {firstName} {lastName}
          </div>
          <div className="row article-item-header-date">
            {post.creationDate}
          </div>
        </div>
      </div>
      <div className="row py-3 article-item-body">
        <div className="row-12">{post.description}</div>
        {/* <div className="row-12 py-3">
          <img
            src="https://s.zagranitsa.com/images/articles/6729/870x486/53d189dfcd54fa9ecae756ddf5a7c2ee.jpg?1530714543"
            alt="mdo"
          />
        </div> */}
      </div>
    </li>
  ));
  return <>{postlist}</>;
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
  };
}

export default connect(mapStateToProps)(LeftSide);
