import React from 'react';
import { Box, Typography, Grid, LinearProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import GroupIcon from '@mui/icons-material/Group';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ContainerHeader, ContainerLeft, ContainerRight, SectionLeft, SectionRight, GroupItems } from './Style';

export const HeaderSection = ({ progress, totalMarks, formatTime, timeLeft }) => {
    const theme = useTheme();
    const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <ContainerHeader>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '80px' }}>
                <ContainerLeft>
                    <SectionLeft>
                        <Typography
                            align='left'
                            fontWeight='bold'
                            sx={{ fontSize: isLgDown && '1rem' }}
                        >
                            Exam Title
                        </Typography>
                        <Typography
                            variant="body1"
                            align="left"
                            sx={{ fontSize: isLgDown && '0.80rem' }}
                        >
                            Approximations Questions And Answers Updated Daily
                        </Typography>
                    </SectionLeft>
                    <SectionRight>
                        <GroupItems>
                            <GroupIcon />
                            <Typography
                                variant="body2"
                                sx={{ fontSize: isLgDown && '0.80rem' }}
                            >
                                Punnoose Wilson
                            </Typography>
                        </GroupItems>
                        <GroupItems>
                            <CheckCircleOutlineIcon />
                            <Typography
                                variant="body2"
                                sx={{ fontSize: isLgDown && '0.80rem' }}
                            >
                                Total Marks: {totalMarks}
                            </Typography>
                        </GroupItems>
                    </SectionRight>
                </ContainerLeft>
                <ContainerRight>
                    <AccessTimeFilledIcon style={{ marginRight: '8px' }} />
                    <Typography
                        variant="body2"
                        fontWeight='bold'
                        sx={{ fontSize: isLgDown && '0.80rem' }}
                    >
                        Remaining Time : {formatTime(timeLeft)}
                    </Typography>
                </ContainerRight>
            </Box>
            <Box>
                <Typography variant='caption' fontWeight='bold'>Progress: {`${Math.round(progress)}%`} </Typography>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
        </ContainerHeader>
    );
};

