import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../store/actions/postActions';
import CommentFeed from "../post/CommentFeed";
import CommentForm from "../post/CommentForm";
import "./posts.css";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddNewComment: false,
      showComments: false
    };
  }
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  onCommentsClick() {
    this.setState({ showComments: !this.state.showComments });
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  addNewCommentHandler() {
    this.setState((prevState) => {
      return { isAddNewComment: !prevState.isAddNewComment }
    });
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        {/* Post detail  */}
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={auth.user.avatar}
                alt=""
              />
            </a>
            <div className="text-center user-name">{auth.user.name}</div>
          </div>
          <div className="col-md-10">
            <div className="lead">{post.text}</div>
            <span>
              <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                <i className={classnames('fa fa-thumbs-up', { 'text-display': this.findUserLike(post.likes) })} />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                <i className="text-secondary fa fa-thumbs-down" />
              </button>
              <button onClick={this.onCommentsClick.bind(this)} type="button" className="btn btn-light mr-1">
                <i className="text-secondary fa fa-comments" />
                <span className="badge badge-light">{post.comments.length}</span>
              </button>
              {post.user === auth.user.id ? (
                <button onClick={this.onDeleteClick.bind(this, post._id)} type="button" className="btn btn-danger mr-1">
                  <i className="fa fa-times" />
                </button>
              ) : null}
            </span>
          </div>
        </div>
        {/* comments */}
        {this.state.showComments ?
          <div>
            <div className="row">
              <div className="col-md-2">&nbsp;</div>
              <div className="col-md-10">
                <CommentFeed postId={post._id} comments={post.comments} />
              </div>
            </div>
            {/* add new comment */}
            <div className="row">
              <div className="col-md-2">&nbsp;</div>
              <button onClick={this.addNewCommentHandler.bind(this)} className="col-md-10 btn btn-link comment__add-btn">Reply to Post</button>
            </div>
            <div className="row">
              <div className="col-md-2">&nbsp;</div>
              <div className="col-md-10">
                {this.state.isAddNewComment ? <CommentForm postId={post._id} /> : null}
              </div>
            </div>
          </div>
          : null}
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  postList: state.post
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
