import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../store/actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      company: '',
      website: '',
      location: '',
      currentPosition: '',
      skills: '',
      githubusername: '',
      summary: '',
      github: '',
      youtube: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = !_.isEmpty(profile.company) ? profile.company : '';
      profile.website = !_.isEmpty(profile.website) ? profile.website : '';
      profile.location = !_.isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !_.isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.summary = !_.isEmpty(profile.summary) ? profile.summary : '';
      profile.social = !_.isEmpty(profile.social) ? profile.social : {};
      profile.github = !_.isEmpty(profile.social.github)
        ? profile.social.github
        : '';
      profile.youtube = !_.isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        currentPosition: profile.currentPosition,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        summary: profile.summary,
        github: profile.github,
        youtube: profile.youtube
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      currentPosition: this.state.currentPosition,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      summary: this.state.summary,
      github: this.state.github,
      youtube: this.state.youtube
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    let socialInputs;

    socialInputs = (
      <div>
        <InputGroup
          placeholder="Github Profile"
          name="github"
          icon="fab fa-github"
          value={this.state.github}
          onChange={this.onChange}
          error={errors.github}
        />

        <InputGroup
          placeholder="YouTube Channel"
          name="youtube"
          icon="fab fa-youtube"
          value={this.state.youtube}
          onChange={this.onChange}
          error={errors.youtube}
        />
      </div>
    );
    
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/me" className="btn btn-light">
                Back
              </Link>
              <h1 className="text-center page-header">Edit Your Profile</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <SelectListGroup
                  placeholder="Current Position"
                  name="currentPosition"
                  value={this.state.currentPosition}
                  onChange={this.onChange}
                  options={options}
                  error={errors.currentPosition}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Use comma separated values (eg.
                    HTML,CSS,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="To list latest repos and links, include your Github username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Summary"
                  name="summary"
                  value={this.state.summary}
                  onChange={this.onChange}
                  error={errors.summary}
                />
                <div className="mb-3">
                  <span className="text-muted">Social Network Links</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-main btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
