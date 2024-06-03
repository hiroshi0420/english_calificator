import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Instructions } from '../../Pages/Instructions/Instructions';

const DialogComponent = ({ showInstructions, setShowInstructions, handleCloseInstructions, examDetails }) => {
  return (
    <Dialog open={showInstructions} onClose={() => setShowInstructions(false)} maxWidth={'lg'}>
      <DialogTitle>Instructions</DialogTitle>
      <DialogContent>
        <Instructions 
          examDetails={examDetails}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseInstructions} color="primary">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogComponent;
