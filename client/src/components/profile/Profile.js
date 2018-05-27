import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner'
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {

  componentDidMount() {
     const pHandle = this.props.match.params.handle;
    if(pHandle) {
      this.props.getProfileByHandle(pHandle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCreds  education={profile.education} experience={profile.experience} />
              {profile.githubusername ? (<ProfileGithub username={profile.githubusername}/>) : null}
          </div>
        </div>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  getProfileByHandle: propTypes.func.isRequired,
  profile: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
