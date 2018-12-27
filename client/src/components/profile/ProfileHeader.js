import React, { Component } from 'react';
import _ from 'lodash';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-detail text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <div className="page-header text-center">{profile.user.name}</div>
              <div className="text-center">
                {profile.currentPosition}{' '}
                {_.isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
                {_.isEmpty(profile.location) ? null : <span>&nbsp;({profile.location})</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
