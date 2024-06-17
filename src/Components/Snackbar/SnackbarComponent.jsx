import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert, useTheme, useMediaQuery } from '@mui/material';

export const ComponentSnackbarAlert = ({
  snackbarConfig: { message, severity = 'success', autoHideDuration = 4000, sx = {}, onClose = null, open },
  setOpen,
}) => {
  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (onClose) onClose(event, reason);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%', ...sx, ...(isLgDown && { fontSize: '0.80rem' }) }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

ComponentSnackbarAlert.propTypes = {
  snackbarConfig: PropTypes.shape({
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
    autoHideDuration: PropTypes.number,
    sx: PropTypes.object,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
  }).isRequired,
  setOpen: PropTypes.func.isRequired,
};