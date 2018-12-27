import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from "react-redux";

import { deleteEducation } from "../../store/actions/profileActions";

class ProfileEducation extends Component {
  
  handleEducation = (id) => {
    this.props.deleteEducation(id);
  }

  render() {
    const { education } = this.props;

    const eduItems = education.map(edu => (
      <div className="row">
        <div key={edu._id} className="col-10">
          <div>{edu.school}</div>
          <div>
            <span>Degree:</span> {edu.degree}
          </div>
          <div>
            <span>Field Of Study:</span> {edu.fieldofstudy}
          </div>
          <div>
            {edu.description === '' ? null : (
              <span>
                <span>Description: </span> {edu.description}
              </span>
            )}
          </div>
          <div>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -&nbsp;
            {edu.to === null ? (
              'Now'
            ) : (
                <Moment format="YYYY/MM/DD">{edu.to}</Moment>
              )}
          </div>
        </div>
        <div className="col-2">
            <button type="button" onClick={() => this.handleEducation(edu._id)} className="btn btn-danger">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
        <br/>
      </div>
      

    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-display text-center">Education</h3>
          {eduItems.length > 0 ? (
            <div className="">{eduItems}</div>
          ) : (
              <p className="text-center">No Education Listed</p>
            )}
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteEducation })(ProfileEducation);
