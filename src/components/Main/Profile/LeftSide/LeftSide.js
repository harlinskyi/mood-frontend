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
import classnames from "classnames";

class LeftSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postAuthor: [],
      userId: customFunc.getUserIdFromUrl(window.location.pathname),
      errors: "",
      loading: false,
      formPost: {
        uploudPhoto: "",
        description: ""
      }
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ loading: true, userId: id });
    try {
      const response = await http.post(
        `get-user-posts?id=${this.state.userId}`
      );
      const userPosts = response.data.posts.reverse();
      const userPostName = response.data.userInfo;
      this.setState({ posts: userPosts, postAuthor: userPostName });
    } catch (badresponse) {
      // console.log("Problem:", badresponse.response.data);
      this.setState({ errors: badresponse.response.data});
    }
    this.setState({ loading: false });
  }
  
  handleSubmitAddPost = async (e) => {
    const { formPost } = this.state
    e.preventDefault();
    this.setState({ loading: true });
    try {
      let formData = new FormData();
      const timeStamp = new Date(Date.now()).toISOString().substr(0, 19);
      formData.append("creationDate", timeStamp);
      formData.append("description", formPost.description);
      formData.append("Image", formPost.uploudPhoto);
      const res = await accountService.createPost(formData, store.getState().auth.userId);
      console.log(res);
      // reset form
      document.querySelector('#addPostModal form').reset();
      let reset = { description: '', uploudPhoto: ''}
      this.setState({formPost : reset })
      window.location.reload();
      
    } catch (badresponse) {
      console.log(badresponse);
      this.setState({ errors: badresponse.response });
    }
    this.setState({ loading: false });
  }


  handleChange = (event) => {
    let formPost = {...this.state.formPost}
    formPost.description = event.target.value
    this.setState({formPost})
  }

  changePhoto = (event) => {
    let formPost = {...this.state.formPost}
    const file = event.currentTarget.files[0];
    formPost.uploudPhoto = file
    this.setState({formPost})
  }

  render() {
    const { posts, loading, postAuthor, errors } = this.state;
    const { uploudPhoto } = this.state.formPost;
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
          {posts !== "" ? <PostList posts={posts} author={postAuthor} userId={store.getState().auth.userId} /> : "No post"}
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
                      required
                      onChange={this.handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      {t('Photo')}:
                    </label>
                    <input
                    type="file"
                    className="form-control"
                    accept=".jpg,.png,.gif,.jpeg"
                    required
                    onChange={this.changePhoto}
                    />
                  </div>
                  <div className="modal-photo">
                    <img alt={uploudPhoto} src={uploudPhoto && URL.createObjectURL(uploudPhoto)}/>
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

const PostList = (props) => {

  const handleDeletePost = async (id) => {
    console.log('click', id)
    if (window.confirm(t('Are you sure you want to delete this article?'))) {
      try {
        await http.post(`delete-post?id=${id}`);
        window.location.reload();
      } catch (badresponse) {
        console.log(badresponse.response);
      }
    }
  }

  const { firstName, lastName, email } = props.author;
  const { userId} = props
  const postlist = props.posts.map((post, index) => (
    <li className="LeftSide-list-article-item py-2 mb-3 bg-body rounded-c shadow-sm container" data-id={post.id} key={post.id}>
      <div className={classnames("row py-2 article-item-header")}>
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
        
        <div className="col-md-2 offset-md-7 col-edit-post">
        {userId === customFunc.getUserIdFromUrl() && 
          <>
          <label className="edit-post"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></label>
          <label className="edit-delete" onClick={() => handleDeletePost(post.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></label>
          </>
        }
        </div>
      </div>
      <div className="row py-3 article-item-body">
        <div className="row-12">{post.description}</div>
        <div className="row-12 py-3">
          <img
            src={customFunc.getBaseUrl() + post.image}
            alt="mdo"
          />
        </div>
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
