import React, { useEffect, useState, Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';

// Redux
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

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
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  screamActionsWrapper: {
    position: 'absolute',
    bottom: '0px',
    left: '-12px',
  },
  screamItemWrapper: {
    position: 'relative',
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
  }
  const handleClose = () => {
    setOpen(false);
  }
  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7} className={classes.screamItemWrapper}>
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
        <Typography variant="body1">{body}</Typography>
        <div className={classes.screamActionsWrapper}>
          <LikeButton screamId={screamId} />
          <span>{!likeCount ? '0' : likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
          <MyButton tip="Comments">
              <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </div>
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
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(ScreamDialog));
