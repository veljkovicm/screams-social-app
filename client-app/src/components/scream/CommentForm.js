import React, {  useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const styles = (theme) => ({
  ...theme.styles,
  button: {
    margin: '20px 0 10px',
  }
});

function CommentForm(props) {
  const {
    classes,
    authenticated,
    UI,
    submitComment,
    screamId,
  } = props;

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors.comment);
    } else if (!UI.errors && UI.loading === false) {
      setBody('');
    }
  }, [ UI ]);

  const [ body, setBody] = useState('');
  const [ errors, setErrors ] = useState('');

  const handleChange = (event) => {
    setBody(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    submitComment(screamId, { body });
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors ? true : false} // errors.comment?
          helperText={errors} // errors.comment?
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});


export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));