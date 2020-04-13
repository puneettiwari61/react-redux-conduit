import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  typography: {
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: 2,
    // fontSize: 12
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(props.status ? null : event.currentTarget);
    return props.onClickHandle()
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = props.status ? 'simple-popover' : undefined;
  return (
    <>
      <Button aria-describedby={id} variant="contained" color="default" onClick={handleClick} size="small"  className="icon-button" startIcon={props.startIcon}>
        {props.name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}        
      >
<Typography className={classes.typography}>{props.content}</Typography>
      </Popover>
    </>
  );
}