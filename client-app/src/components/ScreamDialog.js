import React, { useEffect, useState, Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import { ThemeProvider } from '@material-ui/core';

const styles = (theme) => ({
  ...theme.spreadThis,
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  }
});

function ScreamDialog(props) {
  const {
    getScream,
    scream,
    UI,
    classes,
    screamId,
  } = props;
  console.log(props);

  const {
    loading,
  } = UI;

  const {
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
  } = scream;

  const [ open, setOpen ] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    getScream(screamId);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const dialogMarkup = loading ? (
    <CircularProgress size={200} />
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">
          {body}
        </Typography>
      </Grid>
    </Grid>
  )

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapDispatchToProps = {
  getScream
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScreamDialog));
