import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../store/actions/postActions';
import "./post.css";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="comment">
        <div className="row no-gutters">
          <div className="col-md-1">
            <img className="rounded-circle d-none d-md-block" src={auth.user.avatar} alt="" />
            <div className="text-center comments__name truncate">{auth.user.name}</div>
          </div>
          <div className="col-md-9 comment-text">
            <div className="">{comment.text}</div>
            
          </div>
          <div className="col-md-1">
            {comment.user === auth.user.id ? (
              <button onClick={this.onDeleteClick.bind(this, postId, comment._id)} type="button" className="btn btn-link comments__delete">
                Delete
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
