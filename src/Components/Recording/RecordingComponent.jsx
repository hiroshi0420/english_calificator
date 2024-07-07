import React from 'react';
// Components
import { Container, Typography, Box } from '@mui/material';
// Styles
import { CustomButtonsActions } from '../../Pages/Style';
// Animations motions
import { motion } from 'framer-motion';

import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';


export const RecordingComponent = ({ handleStartRecording, handleStopRecording, isRecording, audioURL }) => {

    const waveVariants = {
        initial: { scale: 0, opacity: 1 },
        animate: { scale: [0, 1], opacity: [1, 0] },
      };
    
      const waveTransition = {
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 0.5,
      };

    return (
        <Container maxWidth="sm" sx={{ mt: 2 }}>
            {isRecording && (
                <Box textAlign="center" mb={3}>
                    <Typography variant='caption' gutterBottom>
                        Recording...
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <div className="wave-container">
                            <motion.div
                                className="wave"
                                variants={waveVariants}
                                initial="initial"
                                animate="animate"
                                transition={waveTransition}
                            />
                            <motion.div
                                className="wave"
                                variants={waveVariants}
                                initial="initial"
                                animate="animate"
                                transition={{ ...waveTransition, delay: 0.5 }}
                            />
                            <motion.div
                                className="wave"
                                variants={waveVariants}
                                initial="initial"
                                animate="animate"
                                transition={{ ...waveTransition, delay: 1 }}
                            />
                            <div className="circle-container">
                                <div className="inner-circle">
                                    <div className="mic-icon"><KeyboardVoiceIcon/></div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Box>
            )}
            {!isRecording && audioURL && (
                <Box textAlign="center">
                    <Typography variant='overline'>
                        Recorded Audio
                    </Typography>
                    <audio src={audioURL} controls style={{ height: '30px' }} />
                </Box>
            )}
            <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <CustomButtonsActions
                    variant="outlined"
                    color="secondary"
                    onClick={handleStopRecording}
                    disabled={!isRecording}
                >
                    Stop Recording
                </CustomButtonsActions>
                <CustomButtonsActions
                    variant="contained"
                    color="primary"
                    onClick={handleStartRecording}
                    disabled={isRecording}
                >
                    Start Recording
                </CustomButtonsActions>
            </Box>
        </Container>
    );
};
