import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Instructions } from '../../Pages/Instructions/Instructions';

const DialogComponent = ({ showInstructions, setShowInstructions, handleCloseInstructions, examDetails }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
  };

  const handleProceed = () => {
    if (isChecked) {
      handleCloseInstructions();
    } else {
      alert('Please read and acknowledge the instructions before proceeding.');
    }
  };

  return (
    <Dialog open={showInstructions} onClose={() => setShowInstructions(false)} maxWidth={'lg'}>
      <DialogTitle>Instructions</DialogTitle>
      <DialogContent>
        <Instructions 
          examDetails={examDetails}
          onCheckboxChange={handleCheckboxChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProceed} color="primary">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogComponent;
