import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// MaterialUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux
import { postScream } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

const styles = theme => ({
  ...theme.styles,
  submitButton: {
    position: 'relative',
    float: 'right',
    margin: '20px 0',
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
});

function PostScream(props)  {
  const {
    postScream,
    classes,
    UI,
  } = props;

  const [ open, setOpen ] = useState(false);
  const [ body, setBody ] = useState('');
  const [ errors, setErrors ] = useState('');
 
  useEffect(() => {
    if(UI.errors) {
      setErrors(UI.errors.comment)
    }
  }, [ UI.errors ]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setErrors('');
  };
  const handleChange = (event) => {
    setBody(event.target.value);
  };
  const handleSubmit = (event) => {
    console.log('errors', errors);
    event.preventDefault();
    setErrors();
    postScream({ body });
    if(body.trim() !== '') {
      setOpen(false);
    }
  }

  return(
    <Fragment>
      <MyButton onClick={handleOpen} tip="Post a Scream!">
        <AddIcon />
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
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!!"
              multiline
              placeholder="What's on your mind?"
              error={errors ? true : false }
              helperText={errors}
              className={classes.textField}
              onChange={handleChange}
              fullWidth />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress size={30} className={classes.progressSpinner} />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI
})

export default connect(
  mapStateToProps,
  { postScream }
)(withStyles(styles)(PostScream));