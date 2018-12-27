import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from "react-redux";

import { deleteExperience } from "../../store/actions/profileActions";

class ProfileExperience extends Component {

  handleDeleteExperience = (id) => {
    this.props.deleteExperience(id);
  }

  render() {
    const { experience } = this.props;

    const expItems = experience.map(exp => (
      <div className="row">
        <div key={exp._id} className="col-10">
          <div>{exp.company}</div>
          <div>
            <span>Position:</span> {exp.title}
          </div>
          <div>
            {exp.location === '' ? null : (
              <span>
                <span>Location: </span> {exp.location}
              </span>
            )}
          </div>
          <div>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -&nbsp;
          {exp.to === null ? (
              'Now'
            ) : (
                <Moment format="YYYY/MM/DD">&nbsp;{exp.to}</Moment>
              )}
          </div>
          <div>
            {exp.description === '' ? null : (
              <span>
                <span>Description: </span> {exp.description}
              </span>
            )}
          </div>
        </div>
        <div className="col-2">
            <button type="button" onClick={() => this.handleDeleteExperience(exp._id)} className="btn btn-danger">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        <br />
      </div>

    ));

    return (
      <div className="row">

        <div className="col-md-12">
          <h3 className="text-center text-display">Experience</h3>
          {expItems.length > 0 ? (
            <div className="list-group">{expItems}</div>
          ) : (
              <p className="text-center">No Experience Listed</p>
            )}
        </div>

      </div>
    );
  }
}

export default connect(null, { deleteExperience })(ProfileExperience);
