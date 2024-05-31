import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import GroupIcon from '@mui/icons-material/Group';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const HeaderSection = () => {

    const theme = useTheme();


    return (
        <Box sx={{ padding: '16px', borderBottom: '1px solid #ddd', backgroundColor: '#fff' }}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid container xs display='flex' flexDirection='column'>
                    <Grid item>
                        <Typography align='left' >
                            Exam Title
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" align="left" fontWeight='bold'>
                            Approximations Questions And Answers Updated Daily
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container >
                        <Grid item display='flex' flexDirection='column' gap={1} mr={2}>
                            <Grid display='flex'>
                                <GroupIcon style={{ marginRight: '8px' }} />
                                <Typography variant="body2" style={{ marginRight: '16px' }} color={theme.palette.primary.main}>
                                    Punnoose Wilson
                                </Typography>
                            </Grid>
                            <Grid display='flex'>
                                <CheckCircleOutlineIcon style={{ marginRight: '8px' }} />
                                <Typography variant="body2" style={{ marginRight: '16px' }}>
                                    Total Marks : 100
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item display='flex' alignItems='center'>
                            <AccessTimeFilledIcon style={{ marginRight: '8px' }} />
                            <Typography variant="body2">
                                Remaining Time : 02:51:00
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

