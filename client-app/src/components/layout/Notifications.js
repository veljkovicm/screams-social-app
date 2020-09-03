import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types'

// Material UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';


const Notifications = (props) => {
  const [ anchorEl, setAnchorEl ] = useState(null);

  const { notifications, markNotificationsRead } = props;

  dayjs.extend(relativeTime);

  let notificationIcon;
  if(notifications && notifications.length > 0) {
    const unreadNotificationsCount = notifications.filter(notification => notification.read === false).length;
    unreadNotificationsCount > 0
      ? notificationIcon = 
        (
          <Badge badgeContent={unreadNotificationsCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        ) : (
          notificationIcon = <NotificationsIcon />
        )
  } else {
    notificationIcon = <NotificationsIcon />
  }

  const handleOpen = (event) => {
    setAnchorEl(event.target);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter(notification => !notification.read)
      .map(notification => notification.notificationId);
    markNotificationsRead(unreadNotificationsIds);
  }

  let notificationsMarkup = notifications && notifications.length > 0 ? (
    notifications.map(notification => {
      const verb = notification.type === 'like' ? 'liked' : 'commented on';
      const time = dayjs(new Date(notification.createdAt._seconds * 1000)).fromNow();
      const iconColor = notification.read ? 'primary' : 'secondary';
      const icon = notification.type === 'like' ? (
        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
      ) : (
        <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
      )
      return (
        <MenuItem key={notification.createdAt} onClick={handleClose}>
          {icon}
          <Typography
            component={Link}
            color="default"
            variant="body1"
            to={`/users/${notification.recipient}/scream/${notification.screamId}`}
          >
            {notification.sender} {verb} your scream {time}
          </Typography>
        </MenuItem>
      )
    })
  ) : (
    <MenuItem onClick={handleClose}>
      You have no notifications yet.
    </MenuItem>
  )
  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton 
          aria-owns={anchorEl ? 'simple' : undefined}
          aria-haspopup
          onClick={handleOpen}
          >
            {notificationIcon}
          </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  )
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);