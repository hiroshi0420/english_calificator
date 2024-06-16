import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { Instructions } from '../../Pages/Instructions/Instructions';
import { ComponentSnackbarAlert } from '../../Components/Snackbar/SnackbarComponent'; // Importar el componente
import { CustomDialogComtent } from './Style';

const DialogComponent = ({ showInstructions, setShowInstructions, handleCloseInstructions, examDetails }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
  };

  const handleProceed = () => {
    if (isChecked) {
      handleCloseInstructions();
    } else {
      setSnackbarConfig({
        open: true,
        message: 'Please read and acknowledge the instructions before proceeding.',
        severity: 'warning',
      });
    }
  };

  return (
    <>
      <Dialog open={showInstructions} onClose={() => setShowInstructions(false)} maxWidth={'lg'}>
        <DialogTitle>Questions Test</DialogTitle>
        <CustomDialogComtent>
          <Instructions
            examDetails={examDetails}
            onCheckboxChange={handleCheckboxChange}
          />
        </CustomDialogComtent>
        <DialogActions>
          <Button onClick={handleProceed} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      <ComponentSnackbarAlert
        snackbarConfig={snackbarConfig}
        setOpen={(open) => setSnackbarConfig((prev) => ({ ...prev, open }))}
      />
    </>
  );
}

export default DialogComponent;
