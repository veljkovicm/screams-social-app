import React from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';


// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

function LikeButton(props) {
  const {
    user,
    screamId,
    likeScream,
    unlikeScream
  } = props;
  const { authenticated } = user;

  const likedScream = () => {
    if (
      user.likes &&
      user.likes.find(like => like.screamId === screamId)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleLikeScream = () => {
    likeScream(screamId)
  }

  const handleUnlikeScream = () => {
    unlikeScream(screamId)
  }

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : (
    likedScream() ? (
      <MyButton tip="Unlike" onClick={handleUnlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={handleLikeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    )
  );
  return likeButton;
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream,
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);