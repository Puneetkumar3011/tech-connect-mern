import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ProfileEducation from "./profileEducation";
import ProfileExperience from "./profileExperience";
import { connect } from "react-redux";


class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const { education, experience } = profile;
    const { user } = this.props.user;

    const firstName = user.name.trim().split(' ')[0];

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <div>
              <h3 className="text-display text-center">Profile Summary</h3>
              <p className="lead">
                {_.isEmpty(profile.summary) ? (
                  <span>{firstName} have not provided summary detail</span>
                ) : (
                    <span>{profile.summary}</span>
                  )}
              </p>
            </div>
            <hr />
            <div>
              <h3 className="text-center text-display">Skill Sets</h3>
              <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {skills}
                </div>
              </div>
            </div>
            {!_.isEmpty(experience) ? (
              <React.Fragment>
                <hr/>
                <div>
                  <ProfileExperience experience={profile.experience}/>
                </div>
              </React.Fragment>
            ) : null}
            {!_.isEmpty(education) ? (
              <React.Fragment>
                <hr />
                <div>
                  <ProfileEducation education={education}/>
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps)(ProfileAbout);
