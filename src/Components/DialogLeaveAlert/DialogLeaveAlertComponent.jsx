import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const DialogLeaveAlertComponent = ({ open, onClose, onProceed }) => {
    
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Unsaved Changes"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have unsaved changes. If you leave, your changes will be lost. Are you sure you want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onProceed} color="primary" autoFocus>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};
