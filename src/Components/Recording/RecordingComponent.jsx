import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

export const RecordingComponent = ({ handleStartRecording, handleStopRecording, isRecording, audioURL }) => {

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            {isRecording && (
                <Box textAlign="center" mb={3}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Recording...
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            style={{ marginRight: '8px' }}
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                style={{ display: 'inline-block' }}
                            >
                                .
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                                style={{ display: 'inline-block' }}
                            >
                                .
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 0.5, delay: 0.4 }}
                                style={{ display: 'inline-block' }}
                            >
                                .
                            </motion.div>
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: 'red'
                            }}
                        />
                    </Box>
                </Box>
            )}
            {audioURL && (
                <Box textAlign="center">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Recorded Audio
                    </Typography>
                    <audio src={audioURL} controls />
                </Box>
            )}
            <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartRecording}
                    disabled={isRecording}
                >
                    Start Recording
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleStopRecording}
                    disabled={!isRecording}
                >
                    Stop Recording
                </Button>
            </Box>
        </Container>
    );
};

