import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';

import Grid from '@material-ui/core/Grid' ;

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

function User(props) {
  const [ profile, setProfile ] = useState(null);
  const [ screamIdParam, setScreamIdParam ] = useState(null);
  const {
    getUserData,
    data: {
      screams
    },
    loading,
  } = props;

  useEffect(() => {
    const { handle, screamId} = props.match.params;

    if(screamId) {
      setScreamIdParam(screamId);
    }
    getUserData(handle);
    axios.get(`/user/${handle}`)
      .then(res => {
        setProfile(res.data.user);
      })
      .catch(err => console.log(err));
  }, [ getUserData, props.match.params ])



  const screamsMarkup = loading ? (
    <p>Loading data...</p>
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map(scream => {
      if (scream.screamId !== screamIdParam) {
        return <Scream key={scream.screamId} scream={scream} />;
      } else {
        return <Scream key={scream.screamId} scream={scream} openDialog />;
      }
    })
  )
  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
       {profile === null ? (
         <p>Loading profile...</p>
       ) : ( <StaticProfile profile={profile} />) }
      </Grid>
    </Grid>
  )
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);