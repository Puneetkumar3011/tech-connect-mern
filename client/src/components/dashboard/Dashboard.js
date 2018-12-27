import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { getCurrentProfile, deleteAccount } from '../../store/actions/profileActions';
import Spinner from '../common/Spinner';
import Posts from "../posts/Posts";

import "./dashboard.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <React.Fragment>
                        <div className="card card-body bg-light mb-3">
                            <div className="row">
                                <div className="col-2">
                                    <img
                                        className="rounded-circle dashboard-img"
                                        src={user.avatar}
                                        alt={user.name}
                                        title="You must have a Gravatar connected to your email to display an image"
                                    />{' '}
                                </div>
                                <div className="col-5">
                                    <div>
                                        <div>
                                            <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                                        </div>
                                        <div>
                                            {profile.currentPosition}
                                        </div>
                                        <div>
                                            {profile.company ? `at ${profile.company}` : ''}
                                        </div>
                                        <div className="profile-btn-group">
                                            <Link className="btn btn-sm btn-outline-secondary" to='/edit-profile'>
                                                Edit Profile
                                            </Link>
                                            <a href="#" onClick={this.openModal} className="btn btn-sm btn-danger">
                                                Delete Profile
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5 d-none d-md-block">
                                    <Link className="btn btn-link" to='/add-experience'>
                                        Add Experience
                                </Link>
                                    <br />
                                    <Link className="btn btn-link" to='/add-education'>
                                        Add Education
                                </Link>
                                    <br />
                                    <Link className="btn btn-link" to="/new-post">
                                        Start a Post
                                </Link>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-display">All Your Posts</h3>
                        <div className="row">
                            <div className="bg-light comments-section">
                                <div className="lead">
                                    <Posts></Posts>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>Your profile is not yest setup. Please follow the link below to complete the profile.</p>
                        <Link to="/create-profile" className="btn btn-lg btn-main">
                            Create Profile
                        </Link>
                    </div>
                );
            }
        }

        return (
            <React.Fragment>
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Delete Profile"
                    >
                        <h2>Delete Profile</h2>
                        <div>Are you sure, you want to delete the profile?</div>
                        <div>
                            <a href="#" onClick={this.onDeleteClick.bind(this)} className="btn btn-sm btn-danger">
                                Ok
                            </a>
                            <button onClick={this.closeModal}>Cancel</button>
                        </div>
                    </Modal>
                </div>
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {dashboardContent}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
);
